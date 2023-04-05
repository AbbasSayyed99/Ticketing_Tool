const Sequelize = require("sequelize")
const companySchema = require("../user/user.schema")
const sequelize = require("/home/swati/Desktop/Ticketing_Tool/backend 2/emailService/ticket_database/database/issueDB/issue.model")

const issueSchema = sequelize.define("issueSchema", {
  assigned_to: {
    type: Sequelize.INTEGER,
  },
  emailid: {
    type: Sequelize.INTEGER,
    unique: true,
    sparse: true,
  },
  issue_number: {
    type: Sequelize.INTEGER,
  },
  issue_title: {
    type: Sequelize.STRING,
  },
  issue_summery: {
    type: Sequelize.STRING,
  },
  issue_status: {
    type: Sequelize.STRING,
    defaultValue: "Open",
  },
  issue_type: {
    type: Sequelize.STRING,
  },
  user_ID: {
    type: Sequelize.STRING,
    references: {
      model: "companySchema",
      key: "user_ID",
    },
  },
  // comments: [
  //   {
  //     comment: { type: String },
  //     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  //     createdAt: {
  //       type: Date,
  //       default: Date,
  //     },
  //   },
  // ],
})

module.exports = issueSchema

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const UserModel = require("../../database/userDB/user.model");

// const { Schema } = mongoose;

// const issueSchema = new Schema({
//   assigned_to: {
//     type: Schema.Types.ObjectId,
//     // required: [true, "Please Enter Id ."],
//   },
//   emailid: {
//     type: String,
//     // required: [true, "Please Enter Your Email"],
//     unique: true,
//     sparse: true,
//     //sparse: true,
//     //   validate: [validator.isEmail, 'Please Enter Correct Email'],
//   },
//   attachments: {
//     type: [String], // array of strings
//   },
//   issue_number: {
//     type: Number,
//   },
//   issue_title: {
//     type: String,
//     // required: [true, "Please Enter Title"],
//   },
//   issue_summery: {
//     type: String,
//     // required: [true, "Please Enter Summery"],
//   },
//   issue_status: {
//     type: String,
//     default: "Open",
//     // lowercase: true,
//   },
//   issue_type: {
//     // type: String,
//     type: Schema.Types.ObjectId,
//     // required: [true, "Please Enter Type"],
//     // lowercase: true,
//   },

//   user_ID: {
//     type: Schema.Types.ObjectId,
//     ref: UserModel,
//     // type: String,
//     // required: [true, "Please Enter Creater Id "],
//   },
//   // createdBy: {
//   //   type: Schema.Types.ObjectId,
//   //   // required: [true, "Please Enter Creater Id "],
//   // },
//   createdAt: {
//     type: Date,
//     default: Date,
//   },
//   updatedAt: { type: Date },
//   // updatedBy: {
//   //   type: Schema.Types.ObjectId,
//   // },

//   comments: [
//     {
//       comment: { type: String },
//       user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
//       createdAt: {
//         type: Date,
//         default: Date,
//       },
//     },
//   ],

//   // issue_id: { type: mongoose.Schema.Types.ObjectId, ref: "IssueModel" },

//   // comments: [{ type: String }],
// });

// module.exports = issueSchema;
