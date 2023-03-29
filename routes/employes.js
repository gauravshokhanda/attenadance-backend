const express   = require('express');

const router    = express.Router();

const  Employes = require("../models/employe")


router.get('/attendance', async (req, res) => {
    try {
      const attendance = await Employes.find({});
      res.status(200).json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/attendance', async (req, res) => {
    try {
      const { studentId, date, present } = req.body;
      const attendance = new Employes({ studentId, date, present });
      await attendance.save();
      res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.put('/attendance/:studentId/:date', async (req, res) => {
    try {
      const { studentId, date } = req.params;
      const { present } = req.body;
  
      const attendance = await Employes.findOneAndUpdate(
        { studentId, date },
        { present },
        { new: true }
      );
  
      if (!attendance) {
        return res.status(404).json({ message: 'Attendance not found' });
      }
  
      res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router