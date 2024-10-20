import { handleApiLoginRequest, handleApiRegisterRequest } from '../controllers/auth';

export async function handleApiAuthRoutes(subPath, request, env) {
	switch (subPath[0]) {
		case 'register':
			return handleApiRegisterRequest(request, env);
		case 'login':
			return handleApiLoginRequest(request, env);
		default:
			return new Response('404 - Not Found', { status: 404 });
	}
}
