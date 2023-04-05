const Sequelize = require("sequelize")
const sequelize = require("/home/swati/Desktop/Ticketing_Tool/backend 2/Category-Management/ticket_database/database/userDB/user.model")

const userCategorySchema = sequelize.define("userCategorySchema", {
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = userCategorySchema

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const UserModel = require("../../database/userDB/user.model");
// const CategoryModel = require("../../database/categoryDB/category.model");

// const { Schema } = mongoose;

// const userCategorySchema = new Schema({
//   category_id: {
//     type: Schema.Types.ObjectId,
//     required: [true, "Please Enter categoryId ."],
//   },
//   user_id: {
//     type: Schema.Types.ObjectId,
//     required: [true, "Please Enter userId ."],
//   },
// });

// module.exports = userCategorySchema;
