const { IssueModel, UserModel, CounterModel } = require("../ticket_database");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

exports.get_attachments = async (req, res) => {
  try {
    var file = req.params.file;
    const fileLocation = path.join("Uploads", file);
    console.log(fileLocation);
    const fileExt = path.extname(fileLocation).toLowerCase();
    var stat = fileSystem.statSync(fileLocation);
    let contentType = "application/octet-stream";
    if (fileExt === ".pdf") {
      contentType = "application/pdf";
    } else if (fileExt === ".png") {
      contentType = "image/png";
    } else if (fileExt === ".jpg") {
      contentType = "image/jpg";
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stat.size,
    });

    var readStream = fileSystem.createReadStream(fileLocation);

    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
