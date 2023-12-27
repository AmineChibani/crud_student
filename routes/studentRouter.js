// routes/studentRouter.js
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

router.get("/dashboard_student", StudentController.getDashboardStudent);
router.get("/", StudentController.getAllStudents);
router.get("/dashboard_student", (req, res) => {
    res.render('dashboard_student', { title: 'Node JS Ajax CRUD Application' });
});
router.get("/blank", (req, res)=>{
    res.render('blank', { title: 'blank'});
})

router.post("/dashboard_student/action", StudentController.handleAction);

module.exports = router;
