const { IssueModel, UserModel } = require("../ticket_database");
const mongoose = require("mongoose");
const { sendIssueStatusChangedEmail } = require("../service/sendStatusChanged");

exports.changeIssueStatus = async (req, res) => {
  try {
    const id = req.params.id;
    let new_issue_status = req.body.issue_status;
    let new_assigned_to = req.body.assigned_to;
    let new_issue_type = req.body.issue_type;

    console.log(id);
    console.log(new_assigned_to);
    console.log(id.length);
    const issue = await IssueModel.findById(id);
    console.log("issueuser----" + issue.user_ID);
    const assignedUser = await UserModel.findById(new_assigned_to);
    console.log(assignedUser + "assigned user ---------");
    let userToSendEmail = issue.user_ID;
    let assignedToUser = assignedUser._id;
    let issueCreatedUser = await UserModel.findById(userToSendEmail);
    let assigned_To_User = await UserModel.findById(assignedToUser);

    // console.log(user + "user");

    const updatedIssue = await IssueModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          issue_status: new_issue_status,
          assigned_to: new_assigned_to,
          issue_type: new_issue_type,
        },
      },
      { new: true }
    );
    console.log(updatedIssue, "--------------");

    if (!updatedIssue) {
      return res.json({
        status: false,
        message: "Please Provide Correct Id Data Not Found With This ID",
      });
    } else {
      const SendIssueStatusEmail = await sendIssueStatusChangedEmail(
        issueCreatedUser.email,
        issueCreatedUser.first_name,
        updatedIssue.issue_number,
        updatedIssue.issue_title,
        updatedIssue.issue_status,
        assigned_To_User.email
      );
      console.log(SendIssueStatusEmail + "send issue email");
      return res.json({
        status: true,
        message: "Issue status changed Successfully",
        issue_status_Data: updatedIssue,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Something Went Wrong Please Try Again",
    });
  }
};
