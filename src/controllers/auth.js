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


export const handleApiRegisterRequest=async (request,env) => {
	try {
		console.log(request);
    // Parse request body (assuming JSON payload)
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return jsonView({ error: 'Username and password are required' }, 400);
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
      username,
      password,
      createdAt: new Date().toISOString(),
    };

    // Save the user in KV
    await env.my_db.put(user.username, JSON.stringify(user));


		// const users=await getAllUsers(env.my_db)
		console.log("🚀 ~ handleApiRegisterRequest ~ users:", await env.my_db.get(username))

    // Return success response
    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
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
}