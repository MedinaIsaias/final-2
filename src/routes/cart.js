// Para este último caso incorporar los botones actualizar y eliminar.
// También tendremos un formulario de ingreso de productos nuevos con los campos
// correspondientes y un botón enviar. Asimismo, construir la vista del carrito donde se
// podrán ver los productos agregados e incorporar productos a comprar por su id de
// producto. Esta aplicación de frontend debe enviar los requests get, post, put y delete al
// servidor utilizando fetch y debe estar ofrecida en su espacio público.

// https://www.youtube.com/watch?v=aKPcs-EIzZI&ab_channel=LeonidasEsteban

import express from "express";
import moment from "moment";

import ClassContainer from "../utils/classCart.js";

const { Router } = express;
const router = new Router();
const Container = new ClassContainer("./src/data/cart.txt");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Logica
router.get("/", async (req, res) => {
  let dataFIle = await Container.getAll();

  res.send("Soy el GET");
});

router.get("/:id/products", async (req, res) => {
  let { id } = req.params;
  let dataFIle = await Container.getAllByCart(id);
  console.log(dataFIle);

  res.send("Soy el GET");
});

router.post("/", async (req, res) => {
  // Fecha
  let date = moment().format("DD/MM/YYYY hh:mm:ss");

  // se agrega el nuevo elemento al archivo.txt
  let newCart = await Container.newCart(date);
  console.log(newCart);
  res.send("Soy el POST");
});

router.post("/:id/product", async (req, res) => {
  let { id } = req.params;
  let newProduct = req.body;

  let newProductCart = await Container.save(id, newProduct);
  // Se muestra renderizado el producto buscado
  res.send("Soy el POST:id/producto");
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deleteCart = await Container.deleteById(id);
  console.log(deleteCart);
  res.send("Soy DELETE");
});

router.delete("/:id/products/:id_prod", async (req, res) => {
  let { id, id_prod } = req.params;
  let deleteCart = await Container.deleteByIdProduct(id, id_prod);
  console.log(deleteCart);
  res.send("Soy DELETE");
});

export default router;
