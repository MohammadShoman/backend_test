const express = require("express");
const sequelize = require('./database');
const Appointment = require('./Appointment');
const moment = require('moment');
const { Op } = require("sequelize");

sequelize.sync({ force: false }).then();

const app = express();

app.use(express.json());

app.post('/appointments', async (req, res) => {
  await Appointment.create(req.body);
  res.send("success");
})

app.get('/appointments', async (req, res) => {
  var query = req.query;
  const appointments = await Appointment.findAll({where : query });
  res.send(appointments);
})

app.get('/appointments/:appointment_id', async (req, res) => {
    var id = req.params.appointment_id;
    const appointment = await Appointment.findOne({where : { appointment_id : id} });
    res.send(appointment);
  })

app.get('/appointments/:startDate/:endDate', async (req, res) => {
  console.log(4);
  const startDate = new Date(moment(req.params.startDate, 'YYYY-MM-DD').format());
  const endDate = new Date(moment(req.params.endDate, 'YYYY-MM-DD').format());
  const appointment = await Appointment.findAll(
    {where: 
    {appointment_date: 
      {
        [Op.between]: [startDate, endDate]
      }
  }});
  res.send(appointment);
})

app.put('/appointments/:appointment_id', async (req, res) => {
  const id = req.params.appointment_id;
  const appointment = await Appointment.findOne({where: {appointment_id: id}});
  appointment.appointment_patient_id = req.body.appointment_patient_id;
  await appointment.save();
  res.send('updated');
})

app.delete('/appointments/:appointment_id', async (req, res) => {
  const id = req.params.appointment_id;
  await Appointment.destroy({where: {appointment_id: id}});
  res.send('removed');
})

app.listen(3000);

