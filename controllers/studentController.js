const studentModel = require('../models/studentModel');
const cartierModel = require('../models/quartierModel');



const studentController = {
    fetchAll: (req, res) => {
        studentModel.fetchAll((error, data) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json({ data });
            }
        });
    },

    fetchQuartiers: async (req, res) => {
        try {
            const quartiers = await cartierModel.getQuartiers(db);
            res.json({ quartiers });
        } catch (error) {
            console.error('Erreur lors de la récupération des quartiers :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des quartiers' });
        }
    },

    add: (req, res) => {
        const values = [
            req.body.txt_nom,
            req.body.txt_prenom,
            req.body.txt_cen,
            req.body.txt_cin,
            req.body.txt_tel,
            req.body.txt_adresse,
            req.body.txt_email,
            req.body.txt_password,
            req.body.txt_etat,
            req.body.txt_cartier
        ];

        studentModel.add(values, (error, data) => {
            if (error) {
                console.error(error);
                res.json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Data Added' });
            }
        });
    },

    fetchSingle: (req, res) => {
        const id = req.body.id;

        studentModel.fetchSingle(id, (error, data) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json(data);
            }
        });
    },

    edit: (req, res) => {
        const id = req.body.id;
        const values = [
            req.body.txt_nom,
            req.body.txt_prenom,
            req.body.txt_cen,
            req.body.txt_cin,
            req.body.txt_tel,
            req.body.txt_adresse,
            req.body.txt_email,
            req.body.txt_password,
            req.body.txt_etat,
            req.body.txt_cartier
        ];

        studentModel.edit(id, values, (error, data) => {
            if (error) {
                console.error(error);
                res.json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Data Edited' });
            }
        });
    },

    delete: (req, res) => {
        const id = req.body.id;

        studentModel.delete(id, (error, data) => {
            res.json({ message: 'Data Deleted' });
        });
    }
};

module.exports = studentController;
