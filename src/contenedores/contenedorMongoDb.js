import mongoose from "mongoose";
import config from "../config.js";

try {
  await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
  console.log("Database Connected");
} catch (error) {
  console.log("Failed to connect to Database");
}

class ContainerMongoDb {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  // Metodos
  async save(product) {
    try {
      await this.collection({ ...product, timestamps: new Date() }).save();
    } catch (error) {
      console.log("The file cannot be written.");
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      if (data) {
        let obj = await this.collection.find({ _id: id }, { __v: 0 });
        if (obj) return obj[0];
        return null;
      }
    } catch (error) {
      console.log("The file cannot be read.");
    }
  }

  async getAll() {
    try {
      const data = await this.collection.find({}, { __v: 0 });
      return data;
    } catch (error) {
      console.log("The file cannot be read.");
    }
  }

  async deleteById(id) {
    try {
      const dataDeleted = await this.collection.deleteOne({ _id: id });
      console.log(dataDeleted);
    } catch (error) {
      console.log("The file cannot be deleted.");
    }
  }

  async updateById(id, product) {
    try {
      const dataUpdate = await this.collection.findByIdAndUpdate(id, product, {
        new: true,
      });
      return dataUpdate;
    } catch (error) {
      console.log("The file cannot be written.");
    }
  }
}

export default ContainerMongoDb;
