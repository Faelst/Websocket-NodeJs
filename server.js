const express = require("express");
const path = require("path");
const { Socket } = require("dgram");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "views")));

app.set("views", path.join(__dirname, "views"));

app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("Index.html");
});

let messages = [];

io.on("connection", (socket) => {
  socket.emit("perviousMessages", messages);

  socket.on("sendMessage", (req) => {
    messages.push(req);
    socket.broadcast.emit("receicedMessage", req);
  });
});

server.listen(3000);
