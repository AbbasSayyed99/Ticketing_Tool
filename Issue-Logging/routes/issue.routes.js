const express = require("express");
const multer = require("multer");
const upload = require("../middleware/upload");
// const upload = multer({ dest: "uploads/" });
const {
  issuevalidation,
  issueStatusValidation,
  issueIdValidation,
  routeValidation,
} = require("../middleware/issueValidation");
// const upload = multer({ dest: "uploads/" });

const issueRouter = express.Router();

issueRouter
  .route("/newissue")

  .post(upload.array("attachments"), require("../src/new.issue.js").new_issue);

issueRouter.route("/get_issue/:id").get(require("../src/get.issue").get_issue);

issueRouter
  .route("/get_raised_issuelist/:id")
  .get(require("../src/get.raised.issuelist").get_raised_issuelist);

issueRouter
  .route("/get_allissue_list/:id")
  .get(require("../src/get.allissue.list").get_allissue_list);

issueRouter.route("/issueStatus/:id").patch(
  // issueStatusValidation,
  require("../src/issueStatus").changeIssueStatus
);

issueRouter.route("/addComment").post(require("../src/addComment").addComment);
issueRouter
  .route("/getAttachments/Uploads/:file(*)")
  .get(require("../src/getAttachments").get_attachments);
issueRouter
  .route("/getComment/:id")
  .get(require("../src/getComment").get_comment);
issueRouter.route("/get_specific_Issue_By_ID/:id").get(
  // routeValidation,
  require("../src/get.issue.by.id").get_specific_Issue_By_ID
);

module.exports = issueRouter;
