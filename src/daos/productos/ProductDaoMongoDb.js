import ContainerMongoDb from "../../contenedores/contenedorMongoDb.js";
class ProductosDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super("products", {
      name: { type: String, required: true },
      description: { type: String, required: true },
      thumbnail: { type: String },
      price: { type: Number, required: true, min: 0 },
      stock: { type: Number, required: true },
      timestamp: { type: Date },
    });
  }
}

export default ProductosDaoMongoDb;
