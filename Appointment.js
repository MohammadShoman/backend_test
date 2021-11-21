const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Appointemnt extends Model {};
Appointemnt.init({
    appointment_id:
    {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    appointment_patient_id: DataTypes.STRING,//FK 
    appointment_doctor_id: DataTypes.STRING,//FK
    appointment_assistant_id: DataTypes.STRING,//FK
    appointment_procedure_id: DataTypes.STRING,//FK
    appointment_room_id: DataTypes.INTEGER,//FK
    appointment_date: DataTypes.DATEONLY,
    appointment_start_time: DataTypes.TIME,
    appointment_end_time: DataTypes.TIME,
    appointment_total_amount: DataTypes.DOUBLE,
    appointment_paid_amount: DataTypes.DOUBLE,
    appointment_type:DataTypes.STRING,//Range
    appointment_status:DataTypes.STRING,//Range
    appointment_creator_id:DataTypes.STRING,//FK
    patient_insurance:DataTypes.BOOLEAN
}, { sequelize, modelName: 'appointment',timestamps: false });

module.exports = Appointemnt;