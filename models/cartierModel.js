// models/cartierModel.js
const database = require('../config/database');

class CartierModel {
    static getCartierData() {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, libelle FROM cartier";
            database.query(query, function (error, data) {
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
