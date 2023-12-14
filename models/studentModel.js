const database = require('../config/database');

class StudentModel {
  static fetchAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM student ORDER BY Id_student DESC";
      database.query(query, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  static fetchSingle(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM student WHERE Id_student = "${id}"`;
      database.query(query, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data[0]);
        }
      });
    });
  }

  static addStudent(studentData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO student 
        (Nom, Prenom, Cen, Cin, Tel, Adresse, Email, Password, Etat, Cartier) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      database.query(query, Object.values(studentData), (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  static editStudent(id, studentData) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE student 
        SET Nom = ?, 
            Prenom = ?, 
            Cen = ?, 
            Cin = ?,
            Tel = ?, 
            Adresse = ?, 
            Email = ?, 
            Password = ?, 
            Etat = ?, 
            Cartier = ? 
        WHERE Id_student = ?
      `;
      const values = [...Object.values(studentData), id]; // Include the id

      database.query(query, values, (error, data) => {
        if (error) {
          console.error('Error updating student:', error);
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }



  static deleteStudent(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM student WHERE Id_student = "${id}"`;
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

module.exports = StudentModel;
