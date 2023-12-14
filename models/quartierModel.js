const database = require('../config/database');

function getQuartiers(database) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, libelle FROM cartier';
    database.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getQuartiers
};
