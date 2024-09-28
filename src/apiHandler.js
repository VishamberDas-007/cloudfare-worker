
// Function for the /api route
export async function handleApiRequest(request) {
  return new Response(JSON.stringify({ message: "API response" }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
