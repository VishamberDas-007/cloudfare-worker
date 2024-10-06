import { handleApiRoutes } from "./routes";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.split('/').filter(segment => segment); // Split the path into segments

    // Routing logic based on the path
    switch (path[0]) {
      case 'test':
        return new Response(JSON.stringify({ message: "Welcome to the backend" }), {
          headers: { 'Content-Type': 'application/json', },
        });
      case 'api':
        return handleApiRoutes(path.slice(1), request,env); // Sub-routes under '/api'
      default:
        return new Response('404 - Not Found', { status: 404 });
    }
  }
};
