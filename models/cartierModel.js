const database = require('../config/database');

class CartierModel {
  static getDataCartiers() {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, libelle FROM cartier";
      database.query(query, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = CartierModel;
