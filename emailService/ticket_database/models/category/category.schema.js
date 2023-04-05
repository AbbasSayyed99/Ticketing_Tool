const Sequelize = require("sequelize")
const sequelize = require("/home/swati/Desktop/Ticketing_Tool/backend 2/emailService/ticket_database/database/categoryDB/category.model")

const categorySchema = sequelize.define("categorySchema", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  category_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  primary_contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = categorySchema

// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const categorySchema = new Schema({
//   category_name: {
//     type: String,
//     required: [true, "Please Enter category"],
//   },
//   primary_contact: {
//     type: Schema.Types.ObjectId,
//     required: [true, "Please Enter category"],
//   },

//   createdAt: {
//     type: Date,
//     default: Date,
//   },
//   updatedAt: { type: Date },
//   updatedBy: {
//     type: Schema.Types.ObjectId,
//   },
// });

// module.exports = categorySchema;
