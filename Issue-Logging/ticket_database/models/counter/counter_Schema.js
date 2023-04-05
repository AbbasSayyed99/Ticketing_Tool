const Sequelize = require("sequelize")
const sequelize = require("/home/swati/Desktop/Ticketing_Tool/backend 2/Issue-Logging/ticket_database/database/counterDB/counterModel")

const counterSchema = sequelize.define("counterSchema", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  seq: {
    type: Sequelize.INTEGER,
  },
})

module.exports = counterSchema

// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const counterSchema = new Schema({
//   id: {
//     type: String,
//   },
//   seq: {
//     type: Number,
//   },
// });

// module.exports = counterSchema;
