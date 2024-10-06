import { handleApiAuthRoutes } from "./auth.routes";

export async function handleApiRoutes(subPath, request,env) {
  switch (subPath[0]) {
    case 'auth':
      return handleApiAuthRoutes(subPath.slice(1), request,env); // Sub-routes like '/api/user'
    default:
      return new Response('404 - Not Found', { status: 404 });
  }
}
