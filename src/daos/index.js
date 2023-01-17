import dotenv from "dotenv";
dotenv.config();

let productosDao;
let carritosDao;

switch (process.env.PERS) {
  case "json":
    const { default: ProductosDaoArchivo } = await import(
      "./productos/ProductDaoFile.js"
    );
    const { default: CarritosDaoArchivo } = await import(
      "./carrito/CarritosDaoFile.js"
    );

    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
  case "firebase":
    const { default: ProductosDaoFirebase } = await import(
      "./productos/ProductDaoFirebase.js"
    );
    const { default: CarritosDaoFirebase } = await import(
      "./carrito/CarritosDaoFirebase.js"
    );

    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
  case "mongodb":
    const { default: ProductosDaoMongoDb } = await import(
      "./productos/ProductDaoMongoDb.js"
    );
    const { default: CarritosDaoMongoDb } = await import(
      "./carrito/CarritosDaoMongoDb.js"
    );

    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;
}

export { productosDao, carritosDao };
