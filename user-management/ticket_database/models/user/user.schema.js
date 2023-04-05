const Sequelize = require("sequelize")
const sequelize = require("/home/swati/Desktop/Ticketing_Tool/backend 2/Category-Management/ticket_database/database/user_categoryDB/user_category")

const companySchema = sequelize.define("companySchema", {
  first_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },

  mobile_number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 10,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emp_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "Inactive",
  },
  fullname: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`
    },
  },
  toJSON: {
    type: Sequelize.VIRTUAL,
  },

  toObject: {
    type: Sequelize.VIRTUAL,
  },
})

module.exports = companySchema

// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");

// const { Schema } = mongoose;

// const companySchema = new Schema({
//   first_name: {
//     type: String,
//     // required: [true, "Please Enter Your Name."],
//     maxlength: 50,
//   },
//   last_name: {
//     type: String,
//     // required: [true, "Please Enter Your Name."],
//     maxlength: 50,
//   },
//   mobile_number: {
//     type: String,
//     unique: true,
//     min: [10, "Phone Number Must Contain 10 Digits"],
//     // required: [true, "Please Enter Your Phone Number"],
//     // validate: [validator.isMobilePhone, 'Please Enter Correct Mobile Number'],
//     // sparse:true
//   },
//   email: {
//     type: String,
//     // required: [true, "Please Enter Your Email"],
//     unique: true,
//     // sparse: true,
//     // validate: [validator.isEmail, "Please Enter Correct Email"],
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     // required: [true, "Please Enter Your Password"],
//     //   min: [6, 'Minimum 6 Character Required, Got {VALUE}'],
//     //   match: [
//     //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
//     //     'Password Must Contain Correct Format',
//     //   ],
//     //sparse: true
//   },
//   emp_id: {
//     type: String,
//     // required: [true, "Please Enter Employee Id"],
//     // max: [3, "Employee Id Must Contain 3 Digits"],
//     unique: true,
//   },
//   // designation: {
//   //   type: String,
//   //   required: [true, "Please Enter Your Designation"],
//   // },
//   role: {
//     type: String,
//     // required: [true, "Please Enter Your Role"],
//   },
//   status: {
//     type: String,
//     default: "Inactive",
//   },

//   createdAt: {
//     type: Date,
//     default: Date,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date,
//   },
// });

// companySchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashpassword = await bcrypt.hash(this.password, salt);
//     this.password = hashpassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // companySchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) {
// //     next();
// //   }
// //   if (!this.password) {
// //     next();
// //   }
// //   const salt = await bcrypt.genSalt(10);
// //   console.log('=====generated salt=====\n', salt);
// //   const Salt = (await salt).toString();
// //   this.password = await bcrypt.hash(this.password, Salt);
// //   next();
// // });

// // companySchema.methods.passwordVerification = async function (password) {
// //   return await bcrypt.compare(password, this.password);
// // };

// // companySchema.pre('updateOne', async function (next) {
// //   this.options.runValidators = true;
// //   next();
// // });

// //   companySchema.pre("save", async function (next) {
// //     if (!this.isModified("password")) {
// //       next();
// //     }

// //     this.password = await bcrypt.hash(this.password, 10);
// //   });
// // //  compare password

// // companySchema.methods.comparePassword = async function (password) {
// //     return await bcrypt.compare(password, this.password)
// //   }

// module.exports = companySchema;
