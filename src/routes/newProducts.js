import express from "express";
// const ClassContainer = require("../utils/container.js");
import { productosDao as productosApi } from "../daos/index.js";
// const productosApi = new productosDao();

const { Router } = express;
const router = new Router();
// const Container = new ClassContainer("./src/data/products.txt");
// const ChatData = new ClassContainer("./src/data/chatData.txt");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// let auxProduct = [];

router.get("/", (req, res) => {
  // validacion temporal
  if (req.query.admin === "admin") {
    //   res.render("form", { data: auxProduct, items: true });
    res.render("newItem");
  } else {
    res.send("No esta autorizado");
  }
});

router.post("/", async (req, res) => {
  // se capturan los datos que se ingresan en el formulario --> vista form.ejs enviados desde el componente productComponent.ejs
  let newProduct = req.body;

  // se agrega el nuevo elemento al archivo.txt
  // (node:3997) UnhandledPromiseRejectionWarning: --> se soluciona cambiando a type module
  await productosApi.save(newProduct);

  // se redireciona al patch /newitem
  res.redirect("/newitem");
});

router.post("/chat", async (req, res) => {
  // se capturan los datos que se ingresan en el formulario --> vista form.ejs enviados desde el componente productComponent.ejs
  let chatData = req.body;
  console.log(chatData);

  // se agrega el nuevo elemento al archivo.txt
  // await ChatData.save(chatData);

  // se redireciona al patch /newitem
  res.redirect("/newitem");
});

export default router;
