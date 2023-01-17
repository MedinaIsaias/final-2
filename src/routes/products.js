import express from "express";
import { productosDao as productosApi } from "../daos/index.js";

const { Router } = express;
const router = new Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Muestra todos los productos actualizados
router.get("/", async (req, res) => {
  let dataFIle = await productosApi.getAll();
  if (Object.keys(dataFIle).length === 0) {
    return res.send({ MSG: "El archivo se encuentra vacio..", items: false });
  }
  //   se renderiza la vista products.ejs con los datos que se obtuvieron del archivo.txt
  // console.log(dataFIle);
  res.render("productList", { data: dataFIle, items: true });
});

router.get("/update", async (req, res) => {
  // validacion temporal
  if (req.query.admin === "admin") {
    let dataFIle = await productosApi.getAll();
    if (Object.keys(dataFIle).length === 0) {
      return res.send({ MSG: "El archivo se encuentra vacio..", items: false });
    }
    //   se renderiza la vista products.ejs con los datos que se obtuvieron del archivo.txt
    // console.log(dataFIle);
    res.render("update", { data: dataFIle, items: true });
  } else {
    res.send("No esta autorizado");
  }
});

router.get("/delete", async (req, res) => {
  // validacion temporal
  if (req.query.admin === "admin") {
    let dataFIle = await productosApi.getAll();
    if (Object.keys(dataFIle).length === 0) {
      return res.send({ MSG: "El archivo se encuentra vacio..", items: false });
    }
    //   se renderiza la vista products.ejs con los datos que se obtuvieron del archivo.txt
    // console.log(dataFIle);
    res.render("delete", { data: dataFIle, items: true });
  } else {
    res.send("No esta autorizado");
  }
});

// http://localhost:8090/api/products/6 --> Por medio de un id devuelve el producto.
router.get("/:id", async (req, res) => {
  //   res.sendFile(__dirname + "/public/form.html");
  let { id } = req.params;
  let dataFIle = await productosApi.getById(id);
  if (dataFIle == "NULL") {
    return res.render("productList", {
      MSG_NOT_FOUNT: "ID not found..",
      items: false,
    });
  }
  // Como la busqueda devuelve un objeto, se lo encapsula en un array para no generar conficto con el fetch en products.ejs
  // Se muestra renderizado el producto buscado
  res.render("productList", { data: [dataFIle], items: true });
});

router.get("/update/:id", async (req, res) => {
  //   res.sendFile(__dirname + "/public/form.html");
  let { id } = req.params;
  let dataFIle = await productosApi.getById(id);
  if (dataFIle == "NULL") {
    return res.render("update", {
      MSG_NOT_FOUNT: "ID not found..",
      items: false,
    });
  }
  console.log(dataFIle);
  // Se muestra renderizado el producto buscado
  res.render("update", { data: [dataFIle], items: true });
});

router.get("/delete/:id", async (req, res) => {
  //   res.sendFile(__dirname + "/public/form.html");
  let { id } = req.params;
  let dataFIle = await productosApi.getById(id);
  if (dataFIle == "NULL") {
    return res.render("delete", {
      MSG_NOT_FOUNT: "ID not found..",
      items: false,
    });
  }
  console.log(dataFIle);
  // Se muestra renderizado el producto buscado
  res.render("delete", { data: [dataFIle], items: true });
});

// PUENTE para pase de parametro y realizar una busqueda por id ---> viene de buscador.ejs
router.post("/", async (req, res) => {
  // se capturan el id de la --> vista buscador.ejs
  let id = req.body.id;
  // se redireciona al patch /api/products/id
  res.redirect("/api/products/" + id);
});

// PUENTE
router.post("/update/", async (req, res) => {
  // se capturan el id de la --> vista buscador.ejs
  let id = req.body.id;
  // se redireciona al patch /api/products/id
  res.redirect("/api/products/update/" + id);
});

// PUENTE
router.post("/delete/", async (req, res) => {
  // se capturan el id de la --> vista buscador.ejs
  let id = req.body.id;
  // se redireciona al patch /api/products/id
  res.redirect("/api/products/delete/" + id);
});

// **Update**
// desarrollar Componente - vista de renderizado
// se debe poder buscar un item y modificarlo

router.put("/update/:id", async (req, res) => {
  console.log("Hola soy un PUT");
  console.log(req.params.id);

  let { id } = req.params;
  let { newName, newPrice } = req.body;

  let dataFIle = await productosApi.getById(id);

  if (dataFIle == "NULL") {
    return res.send({ MSG: "No se encuentra el id.." });
  }
  let newData = { name: newName, price: newPrice };
  let upDateItem = await productosApi.updateById(id, newData);
  res.redirect("/api/products/update");
});

// **FALTA**
// desarrollar Componente - vista de renderizado
// se debe poder buscar un item y eliminarlo
router.delete("/delete/:id", async (req, res) => {
  console.log("Hola soy un DELETE");
  console.log(req.params.id);

  let { id } = req.params;
  let dataFIle = await productosApi.getById(id);

  if (dataFIle == "NULL") {
    return res.send({ MSG: "No se encuentra el id.." });
  }
  let returnData = await productosApi.deleteById(id);
  res.redirect("/api/products/delete");
});

export default router;
