async function getAllUsers(my_db) {
	const users = [];
	// Iterate through all keys in the KV store
	for await (const key of my_db.list()) {
		const user = await my_db.get(key.name);
		if (user) {
			users.push(JSON.parse(user));
		}
	}
	return users;
}

export const handleApiRegisterRequest = async (request, env) => {
	try {
		// Parse request body (assuming JSON payload)
		const { email, password } = await request.json();

		// Validate input
		if (!email || !password) {
			return new Response(JSON.stringify({ message: 'Invalid parameters' }), {
				status: 422,
			});
		}

		// // Check if the user already exists in KV
		// const existingUser = await userModel.getUserByUsername(username);
		// if (existingUser) {
		//   return jsonView({ error: 'User already exists' }, 409);
		// }

		// // Hash the password before storing it
		// const hashedPassword = await hashPassword(password);

		// Create a user object
		const user = {
			email,
			password,
			createdAt: new Date().toISOString(),
		};

		// Save the user in KV
		await env.my_db.put(user.email, JSON.stringify(user));

		// const users=await getAllUsers(env.my_db)

		// Return success response
		return new Response(JSON.stringify({ message: 'User registered successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		// Handle errors
		console.error('Error during registration:', error);

		return new Response(JSON.stringify({ message: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

export const handleApiLoginRequest = async (request, env) => {
	try {
		// Parse request body (assuming JSON payload)
		const { email, password } = await request.json();
		// console.log('🚀 ~ handleApiRegisterRequest ~ username, password:', username, password);

		// Validate input
		if (!email || !password) {
			return jsonView({ error: 'Username and password are required' }, 400);
		}

		const userData = JSON.parse((await env.my_db.get(email)) || {});

		if (!userData) return jsonView({ error: 'User not found' }, 400);
		else if (userData.password !== password)
			return new Response(JSON.stringify({ message: 'Invalid password' }), {
				status: 403,
				headers: { 'Content-Type': 'application/json' },
			});

		// Return success response
		let response = new Response(JSON.stringify({ message: 'User Login successfull' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});

		response.headers.set('Set-Cookie', `email=${userData.email}; HttpOnly; Secure`);

		return response;
	} catch (error) {
		// Handle errors

		return new Response(JSON.stringify({ message: error }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
