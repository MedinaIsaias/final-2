import fs from "fs";

const writeFileAsync = async (arr, path) => {
  try {
    await fs.promises.writeFile(path, JSON.stringify(arr, null, 2), "utf-8");
  } catch (err) {
    throw new Error("Error de escritura!");
  }
};

const readFileAsync = async (path) => {
  try {
    let file = await fs.promises.readFile(path, "utf-8");
    return file;
  } catch (err) {
    throw new Error("Error de lectura!");
  }
};

// Class Cart
class Cart {
  constructor(path) {
    this.nameFile = path;
    this.carts = [];
  }

  // Metodo New Cart
  async newCart(date) {
    let fileExits = await readFileAsync(this.nameFile);

    if (fileExits) {
      let dataFile = JSON.parse(fileExits);
      const cart = {
        id: dataFile[dataFile.length - 1].id + 1,
        date: date,
        product: [],
      };
      this.carts = dataFile;

      this.carts.push(cart);
      writeFileAsync(this.carts, this.nameFile);
      let idNewCart = this.carts[dataFile.length - 1].id;
      return idNewCart;
    } else {
      // Si el archivo esta vacio, se crea un carrito y se asigna un id, fecha y se crea un array producto vacio.
      const cart = {
        id: 1,
        date: date,
        product: [],
      };

      this.carts.push(cart);
      writeFileAsync(this.carts, this.nameFile);
      let idNewCart = this.carts[0].id;
      return idNewCart;
    }
  }

  // Metodo Save(Object)
  async save(idCart, product) {
    let fileExits = await readFileAsync(this.nameFile);

    if (fileExits) {
      let dataFile = JSON.parse(fileExits);

      // busco el id del carrito y agrega el producto
      const searchCart = dataFile.find((element) => element.id == idCart);

      if (searchCart) {
        searchCart.product.push(product);
        writeFileAsync(dataFile, this.nameFile);
      } else {
        console.log("No se encotro el carrito asociado al ID buscado");
      }
    }
  }

  // Metodo getById(Number)
  async getById(id, position) {
    let fileExits = await readFileAsync(this.nameFile);

    // Si el archivo existe, lo parseo y realizo la busqueda del id
    if (fileExits) {
      let dataFile = JSON.parse(fileExits);
      const found = dataFile.find((element) => element.id == id);
      // console.log(dataFile.indexOf(found))

      if (!found) {
        return "NULL";
      }
      if (position) {
        return dataFile.indexOf(found);
      } else {
        // retorno el objeto encontrado
        return found;
      }
    }
  }

  // Metodo getAll(Number)
  async getAll(date) {
    let fileExits = await readFileAsync(this.nameFile);

    if (fileExits.length != 0) {
      let dataFile = JSON.parse(fileExits);
      return dataFile;
    }
    return "No hay productos cargados actualmente!..";
  }

  async getAllByCart(idCart) {
    let fileExits = await readFileAsync(this.nameFile);

    if (fileExits) {
      let dataFile = JSON.parse(fileExits);

      // busco el id del carrito y agrega el producto
      const searchCart = dataFile.find((element) => element.id == idCart);

      if (searchCart) {
        return searchCart.product;
      } else {
        console.log("No se encotro el carrito asociado al ID buscado");
      }
    }
  }

  // Metodo deleteById(Number)
  async deleteById(id) {
    const positionItem = await this.getById(id, true);
    let fileExits = await readFileAsync(this.nameFile);

    // Si el archivo existe y el id buscado existe, se elimina del archivo.
    if (fileExits && positionItem >= 0) {
      let dataFile = JSON.parse(fileExits);
      const deleteItem = dataFile.splice(positionItem, 1);

      // Actualizo el archivo
      writeFileAsync(dataFile, this.nameFile);
      return "Productos eliminado de forma correcta!..";
    } else {
      return "No se pudo eliminar!";
    }
  }

  // Metodo deleteById(Number)
  async deleteByIdProduct(id, id_prod) {
    const cart = await this.getById(id);
    const indexOfcart = await this.getById(id, true);
    let fileExits = await readFileAsync(this.nameFile);

    // Si el archivo existe y el id buscado existe, se elimina del archivo.
    if (fileExits && cart) {
      let dataFile = JSON.parse(fileExits);

      // Se producto por el id de producto
      const searchProduct = cart.product.find(
        (element) => element.id == id_prod
      );

      if (searchProduct) {
        // Se elimina el producto
        let indexOfProduct = cart.product.indexOf(searchProduct);
        cart.product.splice(indexOfProduct, 1);

        // Se actualiza los productos del carrito buscado
        dataFile[indexOfcart].product = cart.product;

        // Actualizo el archivo
        writeFileAsync(dataFile, this.nameFile);
        return "Productos eliminado de forma correcta!..";
      } else {
        return "No se pudo eliminar!";
      }
    } else {
      return "No se pudo eliminar!";
    }
  }
}

export default Cart;
