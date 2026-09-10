// Cloudflare Worker: reverse-proxy to your Railway backend
// Works for both WebSocket and XHTTP (plain HTTP request/response) transports.
// Deploy this for free at *.workers.dev, or attach it to your own domain
// via a Custom Domain / Route in the Cloudflare dashboard.

const BACKEND_HOST = "io.manob.ir"; // <-- replace with your Railway domain

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Rebuild the target URL, same path/query, pointing at the Railway backend
    const targetUrl = `https://${BACKEND_HOST}${url.pathname}${url.search}`;

    // Clone the incoming request (method, headers, body, and the
    // Upgrade header for WebSocket are preserved automatically)
    const newRequest = new Request(targetUrl, request);
    newRequest.headers.set("Host", BACKEND_HOST);

    return fetch(newRequest);
  }
};
