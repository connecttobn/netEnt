const http  = require("http");
const fs    = require("fs");
const url   = require("url");
const path  = require("path");
const game  = require("./game");
const PORT  = process.env.PORT || 3001;

const mimeTypes = {
  htm: "text/html",
  png: "image/png",
  js: "text/javascript",
  css: "text/css"
};

let server = http.createServer((request, response) => {
  let mimeType = "text/plain";
  let filename = url.parse(request.url).pathname;
  filename = filename.replace("/", "");
  //console.log(filename);
  if (filename.indexOf("play") !== -1) {
    response.writeHead(200, { "Content-Type": "text/javascript" });
    response.write(JSON.stringify(game.gameResult()));
    response.end();
  } else {
    if (filename === "") filename = "ui/index.htm";
    fs.exists(filename, exists => {
      if (!exists) {
        response.writeHead(404, { "Content-Type": mimeType });
        response.write("File not found");
        response.end();
        return;
      }
      fs.readFile(filename, "binary", (err, file) => {
        if (err) {
          response.writeHead(500, { "Content-Type": mimeType });
          response.write(err + "\n");
          response.end();
          return;
        }

        let mimeType = mimeTypes[filename.split(".").pop()];
        response.writeHead(200, { "Content-Type": mimeType });
        response.write(file, "binary");
        response.end();
      });
    });
  }
});
server.listen(PORT);

server.on("close", () => {
  console.log("Goodbye!");
});

console.log("Server running at http://127.0.0.1:" + PORT + "/");
