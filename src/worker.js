import { handleRootRequest } from './rootHandler';
import { handleAboutRequest } from './aboutHandler';
import { handleApiRequest } from './apiHandler';


export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Routing logic based on the path
    switch (url.pathname) {
      case '/':
        return handleRootRequest(request);
      case '/about':
        return handleAboutRequest(request);
      case '/api':
        return handleApiRequest(request);
      default:
        return new Response('404 - Not Found', { status: 404 });
    }
  }
};
