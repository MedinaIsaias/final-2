import contenedorArchivos from "../../contenedores/contenedorArchivos.js";

class ProductosDaoArchivo extends contenedorArchivos {
  constructor() {
    super("products.json");
  }
}
export default ProductosDaoArchivo;
