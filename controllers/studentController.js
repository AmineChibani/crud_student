// controllers/studentController.js
const StudentModel = require('../models/studentModel');
const CartierModel = require('../models/cartierModel');

const getDashboardStudent = async (req, res) => {
    try {
        // Charger les données dans le menu déroulant
        const quartiers = await CartierModel.getCartierData();

        // Récupérer les données de la table "student"
        const students = await StudentModel.getAllStudents();

        res.render('dashboard_student', {
            title: 'Node JS Ajax CRUD Application',
            students: students,
            quartiers: quartiers
        });
    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

const getAllStudents = async (request, response, next) => {
    try {
        // Charger les données dans le menu déroulant
        const quartiers = await CartierModel.getCartierData();

        // Fetch data for the "student" table
        const students = await StudentModel.getAllStudents();

        response.render('dashboard_student', {
            title: 'Node JS Ajax CRUD Application',
            students: students,
            quartiers: quartiers
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        response.status(500).send('Internal Server Error');
    }
};

const handleAction = async (request, response, next) => {
    try {
        const action = request.body.action;

        if (action === 'fetch') {
            const students = await StudentModel.getAllStudents();
            response.json({ data: students });
        } else if (action === 'Add') {
            const studentData = {
                Nom: request.body.txt_nom,
                Prenom: request.body.txt_prenom,
                Cen: request.body.txt_cen,
                Cin: request.body.txt_cin,
                Tel: request.body.txt_tel,
                Adresse: request.body.txt_adresse,
                Email: request.body.txt_email,
                Password: request.body.txt_password,
                Etat: request.body.txt_etat,
                Cartier: request.body.select_cartier
            };

            await StudentModel.addStudent(studentData);
            response.json({ message: 'Data Added' });
        } else if (action === 'fetch_single') {
            const studentId = request.body.id;
            const student = await StudentModel.getStudentById(studentId);
            response.json(student);
        } else if (action === 'Edit') {
            const studentId = request.body.id;
            const updatedData = {
                Nom: request.body.txt_nom,
                Prenom: request.body.txt_prenom,
                Cen: request.body.txt_cen,
                Cin: request.body.txt_cin,
                Tel: request.body.txt_tel,
                Adresse: request.body.txt_adresse,
                Email: request.body.txt_email,
                Password: request.body.txt_password,
                Etat: request.body.txt_etat,
                Cartier: request.body.select_cartier
            };

            await StudentModel.updateStudent(studentId, updatedData);
            response.json({ message: 'Data Edited' });
        } else if (action === 'delete') {
            const studentId = request.body.id;
            await StudentModel.deleteStudent(studentId);
            response.json({ message: 'Data Deleted' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getDashboardStudent,
    getAllStudents,
    handleAction
};
