const { IssueModel, UserModel } = require("../ticket_database");
const mongoose = require("mongoose");
const { sendIssueCommentEmail } = require("../service/sendCommentAdded");
exports.addComment = async (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id + "---------------//");
  const comment = req.body.comment;
  const issue_id = req.body.issue_id;
  const issue_number = req.body.issue_number;
  console.log(issue_id + "********");

  let result = null;
  if (issue_number) {
    result = await IssueModel.updateOne(
      { issue_number: issue_number },

      {
        $push: {
          comments: [
            {
              user_id,
              comment,
            },
          ],
        },
      }
    );
  } else {
    result = await IssueModel.updateOne(
      { _id: issue_id },
      // { $or: [{ _id: issue_id }, { token_Number }] },
      {
        $push: {
          comments: [
            {
              user_id,
              comment,
            },
          ],
        },
      }
    );
  }
  const findUser = await UserModel.findOne({ _id: user_id });
  console.log(findUser + "find user---");
  const findIssue = await IssueModel.findOne({
    $or: [{ _id: issue_id }, { issue_number: issue_number }],
  });
  // console.log(findIssue.issue_number + "issue number ");
  // console.log(findUser.email + "email user");
  const supportUser = await UserModel.findOne({
    email: "hrtechtrail@gmail.com",
  });
  console.log(supportUser + "support user");
  if (findUser.email != supportUser.email) {
    console.log(findUser.email);
    console.log(findUser.first_name);
    console.log(findIssue.issue_number);
    console.log(findIssue.issue_title);

    const CommentAddedEmail = await sendIssueCommentEmail(
      findUser.email,
      findUser.first_name,
      findIssue.issue_number,
      findIssue.issue_title
    );
    // console.log("*******" + SendIssueEmail);
    console.log("******* comment notification" + CommentAddedEmail);
    console.log(user_id + "email-----");
  }

  console.log(result);
  return res.json({ status: true, message: "Comment added successfully" });
};
