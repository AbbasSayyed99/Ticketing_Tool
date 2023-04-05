const multer = require("multer");
const path = require("path");

const express = require("express");
const { IssueModel, UserModel, CounterModel } = require("../ticket_database");
const { sendIssueRaisedEmail } = require("../service/sendIssueEmail");
const {
  sendIssueAcknowledgementEmail,
} = require("../service/sendAcknowledgeEmail");
const { log } = require("console");

exports.new_issue = async (req, res) => {
  try {
    let counter = CounterModel.findOneAndUpdate(
      { id: "issue_number" },
      { $inc: { seq: 1 } },
      { new: true },
      async (err, cd) => {
        try {
          let seqId;
          if (cd == null) {
            const newVal = new CounterModel({ id: "issue_number", seq: 1 });
            newVal.save();
            seqId = 1;
            console.log("seqID if", seqId);
          } else {
            seqId = cd.seq;
            console.log("seqID else", seqId);
          }
          let assigned_to = req.body.assigned_to;
          let issue_number = seqId;
          let issue_title = req.body.issue_title;
          let issue_type = req.body.issue_type;
          let issue_summery = req.body.issue_summery;
          let user_ID = req.body.user_ID;
          let findUser = await UserModel.findOne({
            _id: user_ID,
          });
          let supportUser = await UserModel.findOne({
            _id: assigned_to,
          });
          if (!assigned_to) {
            supportUser = await UserModel.findOne({
              email: "hrtechtrail@gmail.com",
            });
          }

          if (!findUser) {
            return res.json({
              status: false,
              message: `User Not Found, Please Provide Correct Details for findUser ${findUser} `,
            });
          }
          if (!supportUser) {
            return res.json({
              status: false,
              message: `User Not Found, Please Provide Correct Details for supportUser ${supportUser} `,
            });
          }
          // else {
          let attachments = [];
          if (req.files) {
            req.files.forEach((file) => {
              attachments.push(file.path);
            });
          }
          console.log(attachments + " array ");
          const data = new IssueModel({
            assigned_to: assigned_to || supportUser._id,
            issue_number: issue_number,
            issue_title: issue_title,
            issue_type: issue_type,
            issue_summery: issue_summery,
            attachments: attachments,
            user_ID: user_ID,
            updatedAt: Date.now(),
          });
          if (attachments.length > 0) {
            data.attachments = attachments;
          }
          const result = await data.save();
          console.log("********* result" + result);
          console.log(supportUser.email + "supportuser");
          console.log(findUser.email + "finduser email");
          console.log(supportUser.first_name + "---first name");
          console.log(result.issue_number + "result_issue num");
          if (!assigned_to) {
            const sendIssueAcknowledgeEmail =
              await sendIssueAcknowledgementEmail(
                findUser.email,
                findUser.first_name,
                result.issue_number,
                result.issue_title
              );
            // console.log("*******" + SendIssueEmail);
            console.log("*******" + sendIssueAcknowledgeEmail);
            console.log(supportUser + "email-----");
          } else {
            const SendIssueEmail = await sendIssueRaisedEmail(
              supportUser.email,
              supportUser.first_name,
              result.issue_number,
              result.issue_title
            );
            console.log(SendIssueEmail + "send issue email");
            const sendIssueAcknowledgeEmail =
              await sendIssueAcknowledgementEmail(
                findUser.email,
                findUser.first_name,
                result.issue_number,
                result.issue_title
              );
            // console.log("*******" + SendIssueEmail);
            console.log("*******" + sendIssueAcknowledgeEmail);
            console.log(supportUser + "email-----");
          }

          // }
          return res.json({
            status: true,
            message: `Issue Raised Successfully `,
          });
        } catch (err) {
          console.log(err);
          return res.json({
            status: false,
            message: "Something Went Wrong Please Try Again",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Something Went Wrong Please Try Again",
    });
  }
};
