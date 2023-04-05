const nodemailer = require("nodemailer");

require("dotenv").config();
const { IssueRaised } = require("../lib/template/issue_raised_template");
const { IssueNumber } = require("../lib/template/IssueNumber_template");
let email = process.env.email;
// console.log(email + "email-----");
let pass = process.env.password;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // secure for 465, false for other
  auth: {
    user: email,
    pass: pass,
  },
});

module.exports = {
  sendIssueRaisedEmail: async (
    receiver,
    first_name,
    issue_number,
    issue_title
  ) => {
    console.log("------------" + issue_number);
    let sendingmail = true;
    try {
      await transporter.sendMail({
        from: email,
        to: receiver,
        subject: IssueNumber(issue_number, issue_title),
        html: IssueRaised(first_name, receiver),
      });
    } catch (err) {
      sendingmail = false;
    }
    return sendingmail;
  },
};
