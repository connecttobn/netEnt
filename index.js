const http = require("http");
const url = require("url");
//our modules
const game = require("./game");
const route = require("./route");
const PORT = process.env.PORT || 3001;

let server = http.createServer((request, response) => {
  let pathname = url.parse(request.url).pathname;
  pathname = pathname.replace("/", "");
  if (pathname.length && pathname.indexOf(".") === -1) {
    switch (pathname) {
      case "play":
        response.writeHead(200, { "Content-Type": route.route.mimeTypes.js });
        response.write(JSON.stringify(game.gameResult()));
        break;
      default:
        response.writeHead(401, { "Content-Type": route.route.mimeTypes.default });
        response.write("Unauthorised request");
    }
    response.end();
  } else {
    route.route.handleFileRequest(pathname, response);
  }
});
server.listen(PORT);

server.on("close", () => {
  console.log("Goodbye!");
});

console.log("Server running at http://127.0.0.1:" + PORT + "/");
