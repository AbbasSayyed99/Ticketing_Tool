const nodemailer = require("nodemailer");

require("dotenv").config();
const { IssueRaised } = require("../lib/template/issue_raised_template");
const { IssueNumber } = require("../lib/template/IssueNumber_template");
const {
  IssueAcknowledgement,
} = require("../lib/template/issue_Acknowledge_template");
let email = process.env.email;
console.log(email);
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
  sendIssueAcknowledgementEmail: async (
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
        html: IssueAcknowledgement(first_name, receiver),
      });
    } catch (err) {
      sendingmail = false;
    }
    return sendingmail;
  },
};
