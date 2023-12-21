// models/studentModel.js
const database = require('../config/database');

class StudentModel {
    static getAllStudents() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM student ORDER BY Id_student DESC";
            database.query(query, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
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

            const values = [
                studentData.Nom,
                studentData.Prenom,
                studentData.Cen,
                studentData.Cin,
                studentData.Tel,
                studentData.Adresse,
                studentData.Email,
                studentData.Password,
                studentData.Etat,
                studentData.Cartier
            ];

            database.query(query, values, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static getStudentById(studentId) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM student WHERE Id_student = ?";
            database.query(query, [studentId], function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data[0]);
                }
            });
        });
    }

    static updateStudent(studentId, updatedData) {
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

            const values = [
                updatedData.Nom,
                updatedData.Prenom,
                updatedData.Cen,
                updatedData.Cin,
                updatedData.Tel,
                updatedData.Adresse,
                updatedData.Email,
                updatedData.Password,
                updatedData.Etat,
                updatedData.Cartier,
                studentId
            ];

            database.query(query, values, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static deleteStudent(studentId) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM student WHERE Id_student = ?";
            database.query(query, [studentId], function (error, data) {
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
