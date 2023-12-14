// controllers/studentController.js

const express = require('express');
const router = express.Router();
const StudentModel = require('../models/studentModel');
const CartierModel = require('../models/cartierModel');

router.get("/", async function (request, response, next) {
  try {
    // Fetch data for the "cartier" dropdown
    const quartiers = await CartierModel.getDataCartiers();
    const students = await StudentModel.fetchAll();

    response.render('dashboard_student', {
      title: 'Node JS Ajax CRUD Application',
      quartiers: quartiers,
      students: students,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    response.status(500).send('Internal Server Error');
  }
});

router.get("/fetchSingle/:id", async function (request, response, next) {
  try {
    const id = request.params.id;
    const student = await StudentModel.fetchSingle(id);
    response.json(student);
  } catch (error) {
    console.error('Error fetching single data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/action", async function (request, response, next) {
  const action = request.body.action;

  if (action === 'fetch') {
    try {
      const students = await StudentModel.fetchAll();
      response.json({ data: students });
    } catch (error) {
      console.error('Error fetching data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
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
      Cartier: request.body.select_cartier,
    };

    try {
      await StudentModel.addStudent(studentData);
      response.json({ message: 'Data Added' });
    } catch (error) {
      console.error('Error adding data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (action === 'Edit') {
    const id = request.body.id;
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
      Cartier: request.body.select_cartier,
    };

    try {
      await StudentModel.editStudent(id, studentData);
      response.json({ message: 'Data Edited' });
    } catch (error) {
      console.error('Error editing data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (action === 'delete') {
    const id = request.body.id;

    try {
      await StudentModel.deleteStudent(id);
      response.json({ message: 'Data Deleted' });
    } catch (error) {
      console.error('Error deleting data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add other actions as needed
});

module.exports = router;
