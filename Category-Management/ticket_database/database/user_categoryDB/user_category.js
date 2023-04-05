const Sequelize = require("sequelize")

const sequelize = new Sequelize("Ticketing_Tool", "root", "Devesh@1994", {
  dialect: "mysql",
  host: "localhost",
})

sequelize
  .authenticate()
  .then(() => {
    console.log("User category Connection has been established successfully.")
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error)
  })

module.exports = sequelize
