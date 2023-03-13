const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "alfredchrisayo@gmail.com",
        pass: "someStrings"
    }
});

let mailOptions = {
    from: "alfredchrisayo@gmail.com",
    to: "elitecosmos147@gmail.com",
    subject: "Sending Email with Nodejs",
    text: "usimg node mail for email text , is easy and fun , check it out"
};

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log(error)
//     }
//     else {
//         console.log(info.response)
//     }
// });
module.exports = { transporter, mailOptions }