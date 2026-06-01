const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");

const app = require("../server");

function request(server, path) {
  const { port } = server.address();

  return new Promise((resolve, reject) => {
    http
      .get({ host: "127.0.0.1", port, path }, (response) => {
        let body = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          resolve({ statusCode: response.statusCode, body });
        });
      })
      .on("error", reject);
  });
}

test("GET /api returns the production API contract", async (t) => {
  const server = app.listen(0, "127.0.0.1");
  t.after(() => server.close());

  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });

  const response = await request(server, "/api");
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.success, true);
  assert.equal(body.message, "ShopVerse API running");
  assert.equal(body.endpoints.signup, "POST /api/signup");
});
