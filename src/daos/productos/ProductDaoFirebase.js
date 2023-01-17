import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("products");
  }
}

export default ProductosDaoFirebase;
