process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
const { IssueModel, UserModel, CounterModel } = require("./ticket_database")

const fs = require("fs")
const path = require("path")
require("dotenv").config()
const axios = require("axios")
const Imap = require("imap")
const { simpleParser } = require("mailparser")
const { log } = require("console")

const categorySchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/emailService/ticket_database/models/category/category.schema")

const companySchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/emailService/ticket_database/models/user/user.schema")

const counterSchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/emailService/ticket_database/models/counter/counter_Schema")

const issueSchema = require("/home/swati/Desktop/Ticketing_Tool/backend 2/emailService/ticket_database/models/issue/issue.schema")

companySchema
  .sync()
  .then((result) => {
    console.log("Company Schema created successfully ")
  })
  .catch((err) => {
    console.log(err)
  })

categorySchema
  .sync()
  .then((result) => {
    console.log("category Schema created successfully ")
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

issueSchema
  .sync()
  .then((result) => {
    console.log("Issue Schema created successfully ")
  })
  .catch((err) => {
    console.log(err)
  })

let email = process.env.email
console.log(email + "email-----")
let pass = process.env.password
const imapConfig = {
  user: email,
  password: pass,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
}
getOrAddUserIdByEmail = async (emailid) => {
  try {
    const findUser = await UserModel.findOne({ email: emailid })
    if (findUser) {
      console.log("User ID :: ", findUser._id)
      return findUser._id
    } else {
      try {
        const data = new UserModel({
          email: emailid,
        })
        console.log()
        const new_user = await data.save()
        console.log(new_user + "-------new user")

        return new_user._id
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error)
  }
}
getIssueNumber = async (subject) => {
  const match = subject.match(/\d+/)
  let number
  if (match) {
    number = parseInt(match[0])
    console.log(number)
  }
  return number
}
isValidIssueNumber = async (issueNumber) => {
  let validIssue = false
  let checkIssueNumber = await IssueModel.findOne({
    issue_number: issueNumber,
  })
  // let findIssue = await IssueModel.findOne;
  console.log(checkIssueNumber + "check issue number")
  if (checkIssueNumber) {
    validIssue = true
    console.log(validIssue)
    return validIssue
  } else {
    return validIssue
  }
}

const imap = new Imap(imapConfig)
imap.once("ready", () => {
  imap.openBox("INBOX", false, () => {
    imap.on("mail", (numNewMsgs) => {
      console.log(`New messages received: ${numNewMsgs}`)
      imap.search(["UNSEEN"], (err, results) => {
        const f = imap.fetch("*", {
          bodies: "",
        })

        f.on("message", (msg) => {
          msg.on("body", (stream) => {
            simpleParser(stream, async (err, parsed) => {
              emailid = parsed.from.value[0].address
              email_issue_title = parsed.subject
              email_issue_summery = parsed.text
                .replace(/--(.|\n)*/g, "")
                .replace(/(\r\n|\n|\r)/gm, "")
                .replace(/<\/div>/gi, " ")
                .replace(/<\/li>/gi, " ")
                .replace(/<li>/gi, " ")
                .replace(/<\/ul>/gi, " ")
                .replace(/<\/p>/gi, " ")
                .replace(/<br\/?>/gi, " ")
                .replace(/<[<^>t]+>/gi, " ")
                // .replace(/\.(?![^@]+$)/g, " ")
                .replace(/(\r\n|^)--\s*\r\n.*$/m, " ")
                .replace(/^On.*wrote:.*$/gim, " ")
                .replace(
                  /On\s\w{3},\s\d{1,2},\s\d{4}\s\w{1,2}.\d{1,2}.\d{2}\s[A-Za-z\s<>.@-]+wrote:.*?$/gm,
                  " "
                )
              const signatureIndex = email_issue_summery.indexOf("--")

              const emailBody = email_issue_summery.substring(0, signatureIndex)

              email_Attachments = parsed.attachments
              console.log(JSON.stringify(email_Attachments) + "------")

              if (email_Attachments[0]?.content != undefined || null) {
                let data = email_Attachments[0].content

                data = Buffer.from(data)
                fs.writeFile(
                  `Uploads/${(Math.random() + 1)
                    .toString(36)
                    .substring(7)}.email_Attachments[0].filename`,

                  data,
                  (err) => {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("File created successfully!")
                    }
                  }
                )
              }

              console.log("emailid----" + emailid)
              console.log(emailBody + "email body")
              console.log(email_issue_summery + "summery---")

              let emailUser = await getOrAddUserIdByEmail(emailid)
              console.log(emailUser + "object of email user")

              let token_Number = await getIssueNumber(email_issue_title)
              console.log(token_Number + "token number")
              if (token_Number > 0) {
                if (isValidIssueNumber(token_Number)) {
                  axios
                    .post(
                      "http://69.160.44.73:7002/issue/addComment",

                      {
                        user_id: emailUser,
                        comment: email_issue_summery,
                        issue_number: token_Number,
                        // issue_id: checkIssueNumber._id,
                      },
                      { timeout: 10000 }
                    )
                    .then((response) => {
                      console.log(
                        JSON.stringify(response.data) + "response data"
                      )
                      //console.log(response.data.issue_id + "response data id");
                    })
                    .catch((error) => {
                      console.error(error)
                    })
                }
                return
              } else {
                axios
                  .post(
                    "http://69.160.44.73:7002/Issue/newissue",

                    {
                      issue_title: email_issue_title,
                      issue_summery: emailBody,
                      user_ID: emailUser,
                      attachments: email_Attachments,
                      updatedAt: Date.now(),
                    },
                    { timeout: 10000 }
                  )
                  .then((response) => {
                    console.log(
                      JSON.stringify(response.data) + "response data ------"
                    )
                  })
                  .catch((error) => {
                    console.error(error)
                  })
              }
            })
          })
          msg.once("attributes", (attrs) => {
            const { uid } = attrs
            imap.addFlags(uid, ["\\Seen"], () => {
              console.log("Marked as read!")
            })
          })
        })
        f.once("error", (ex) => {
          return Promise.reject(ex)
        })
        f.once("end", () => {
          console.log("Done fetching all messages!")
        })
      })
    })
  })
})
imap.once("error", (err) => {
  console.log(err)
})

imap.connect()
