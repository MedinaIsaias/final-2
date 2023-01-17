import admin from "firebase-admin";
import config from "../config.js";

try {
  admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: "http://ecomerce-backend-coderhuse.firebaseio.com",
  });
  console.log("Database Connected");
} catch (error) {
  console.log("Failed to connect to Database");
}

const db = admin.firestore();

class ContainerFirebase {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  // Metodos
  async save(product) {
    try {
      await this.collection.add({ ...product, timestamps: new Date() });
    } catch (error) {
      console.log("The file cannot be written.");
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      if (data) {
        let obj = await this.collection.doc(id).get();
        if (obj) return { id: obj.id, ...obj.data() };
        return null;
      }
    } catch (error) {
      console.log("The file cannot be read.");
    }
  }

  async getAll() {
    try {
      const data = [];
      const snapshot = await this.collection.get();
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.log("The file cannot be read.");
    }
  }

  async deleteById(id) {
    try {
      const dataDeleted = await this.collection.doc(id).delete();
    } catch (error) {
      console.log("The file cannot be deleted.");
    }
  }

  async updateById(id, product) {
    try {
      await this.collection.doc(idPr).update({ ...obj });
    } catch (error) {
      console.log("The file cannot be written.");
    }
  }
}

export default ContainerFirebase;
