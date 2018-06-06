const fs = require("fs");

const mimeTypes = {
  htm: "text/html",
  png: "image/png",
  js: "text/javascript",
  css: "text/css",
  default: "text/plain"
};

let handleFileRequest = (pathname, response) => {
  if (pathname === "") pathname = "ui/index.htm";
  fs.exists(pathname, exists => {
    if (!exists) {
      response.writeHead(404, { "Content-Type": mimeTypes.default });
      response.write("File not found");
      response.end();
      return;
    }
    fs.readFile(pathname, "binary", (err, file) => {
      if (err) {
        response.writeHead(500, { "Content-Type": mimeTypes.default });
        response.write(err + "\n");
        response.end();
        return;
      }
      mimeType = mimeTypes[pathname.split(".").pop()];
      response.writeHead(200, { "Content-Type": mimeType });
      response.write(file, "binary");
      response.end();
    });
  });
};

exports.route = { handleFileRequest: handleFileRequest, mimeTypes: mimeTypes };
