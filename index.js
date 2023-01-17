import express from "express";
import moment from "moment";
import methodOverride from "method-override";

import ClassContainer from "./src/utils/container.js";
const ChatData = new ClassContainer("./src/data/chatData.txt");
// let arr = require("./data/index");

const app = express();
const port = process.env.PORT || 8080;

// Fecha
let date = moment().format("DD-MM-YYYY hh:mm:ss");

// set HTTP
import http from "http";
const server = http.createServer(app);

import productsRoutes from "./src/routes/products.js";
import newProductRoutes from "./src/routes/newProducts.js";
import cartRoutes from "./src/routes/cart.js";
import arrayProduct from "./src/data/newProducts.js";

let msn = [];
let auxProduct = [];

// set Socket
import { Server } from "socket.io";
const io = new Server(server);

// import * as url from "url";
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// set Motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");

// midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + "/public"));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// Socket connection
io.on("connection", (socket) => {
  console.log("Cliente conectado!..");

  // se envia lista de los items nuevos
  if (auxProduct) {
    io.sockets.emit("message_back", auxProduct);
  }
  if (msn) {
    io.sockets.emit("chat_back", msn);
  }
  // mensaje del cliente cuando envia un nuevo item desde New items
  socket.on("message_client", (data) => {
    console.log(data);
  });

  // escucha cliente - alta de productos
  socket.on("dataProduct", (data) => {
    arrayProduct.push(data);
    console.log(arrayProduct);
    // le responde a todos los usuarios conectados a New items
    io.sockets.emit("message_back", arrayProduct);
  });

  // escuchar chat cliente
  socket.on("dataMsn", (data) => {
    data.date = date;
    msn.push(data);

    // se agrega mensaje nuevo al archivo chatData.txt
    ChatData.save(data);
    // console.log(data);

    // Coneccion Chat con socket
    io.sockets.emit("chat_back", msn);
  });

  // io.sockets.emit("message_back", "soy el back!!..");
});

// ROUTES
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/newitem", newProductRoutes);

// main page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// ERROR page
app.all("*", (req, res) => {
  res.status(404).send("Error: not found page");
});

server.listen(port, () => {
  console.log(`🚀 Server run on port ${port}`);
});
