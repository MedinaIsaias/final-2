import fs from "fs";
import config from "../config.js";

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

// Class container
class Contenedor {
  constructor(path) {
    this.ruta = `${config.fileSystem.path}/${path}`;
    this.producto = [];
  }

  // Metodo Save(Object)
  async save(product) {
    // Leo el archivo
    let fileExits = await readFileAsync(this.ruta);

    // Si el archivo ya contiene productos, le asigno un id correlativo y lo sumo al array de productos ya definidos.
    if (fileExits && fileExits.length >= 0) {
      let dataFile = JSON.parse(fileExits);
      product.id = dataFile.length + 1;
      dataFile.push(product);

      this.producto = dataFile;
      writeFileAsync(this.producto, this.ruta);
    } else {
      // Si el archivo esta vacio, le asigno un id y lo agrego.
      product.id = 1;
      this.producto.push(product);
      writeFileAsync(this.producto, this.ruta);
    }
  }

  // Metodo getById(Number)
  async getById(id, position) {
    let fileExits = await readFileAsync(this.ruta);

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
  async getAll() {
    let fileExits = await readFileAsync(this.ruta);

    if (fileExits.length != 0) {
      let dataFile = JSON.parse(fileExits);
      return dataFile;
    }
    return "No hay productos cargados actualmente!..";
  }

  // Metodo deleteById(Number)
  async deleteById(id) {
    const positionItem = await this.getById(id, true);
    let fileExits = await readFileAsync(this.ruta);

    // Si el archivo existe y el id buscado existe, se elimina del archivo.
    if (fileExits && positionItem >= 0) {
      let dataFile = JSON.parse(fileExits);
      const deleteItem = dataFile.splice(positionItem, 1);

      // Actualizo el archivo
      writeFileAsync(dataFile, this.ruta);
      return "Productos eliminado de forma correcta!..";
    } else {
      return "No se pudo eliminar!";
    }
  }

  // Metodo deleteAll(Number)
  async deleteAll() {
    writeFileAsync(this.producto, this.ruta);
  }

  // Metodo updateById(id, prodcut)
  async updateById(id, product) {
    // levanto data del .txt
    const auxPruducts = await this.getAll();

    // busco si el id pasado como param existe
    const itemId = await this.getById(id);

    // valido si id existe y realizo la modificacion
    if (itemId != "NULL") {
      const auxUpdateProducts = auxPruducts.map((item) => {
        if (item.id == id) {
          item.name = product.name;
          item.price = product.price;
        }
        return item;
      });
      writeFileAsync(auxUpdateProducts, this.ruta);
      return "Producto actualizado de forma correcta!..";
    } else {
      return "No se pudo actualizar!";
    }
  }
}

export default Contenedor;
