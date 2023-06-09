const express = require("express")
const morgan = require("morgan")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const helmet = require("helmet")
const nodemailer = require("nodemailer")
const cors = require("cors")
const compression = require("compression")
const cookieParser = require("cookie-parser")
const figlet = require("figlet")
const { hostIP, path, hostName, db_ip } = require("./config/config")
const issueRouter = require("./routes/issue.routes")
// const { getEmails } = require("./service/getEmail");
const bodyParser = require("body-parser")
const app = express()
// const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

// app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json())
app.use(morgan("combined"))
app.use(helmet())
app.use(compression())
app.use(cookieParser())
// app.use("Uploads", express.static("Uploads"));
app.use(express.static("Uploads"))
// getEmails();
app.use("/issue", cors(), issueRouter)

const categorySchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/Category-Management/ticket_database/models/category/category.schema")

const companySchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/Issue-Logging/ticket_database/models/user/user.schema")

const issueSchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/Issue-Logging/ticket_database/models/issue/issue.schema")

const counterSchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/Issue-Logging/ticket_database/models/counter/counter_Schema")

categorySchema
  .sync()
  .then((result) => {
    console.log("category Schema created successfully ")
  })
  .catch((err) => {
    console.log(err)
  })

companySchema
  .sync()
  .then((result) => {
    console.log("Company Schema created successfully ")
  })
  .catch((err) => {
    console.log(err)
  })

issueSchema
  .sync()
  .then((result) => {
    console.log("Issue Schema created successfully ")
  })
  .catch((err) => {
    console.log(err)
  })

counterSchema
  .sync()
  .then((result) => {
    console.log("Counter Schema created successfully ")
  })
  .catch((err) => {
    console.log(err)
  })

const PORT = process.env.port || 7002

const server = app.listen(PORT, () => {
  figlet("Issue Logging", async (err, data) => {
    if (err) {
      console.log("Something Went Wrong With figlet")
      console.dir(err)
      return
    }
    console.log(data)
    console.log(`Running on Port: ${PORT} with process id: ${process.pid}`)
    console.log("HOST IP Address: ", hostIP)
    console.log("HOST Name: ", hostName)
    console.log("Host Path: ", path)
  })
})
