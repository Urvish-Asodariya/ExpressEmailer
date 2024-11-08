const nodemailer = require("nodemailer");

const sendMail = async ({ senderEmail, email, subject, message, attachment }) => {
    let transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD 
        },
    });
    let mailOptions = {
        from: `"${senderEmail}" <${senderEmail}>`, 
        to: email, 
        subject: subject,
        text: message,
        html: `<p>${message}</p>`, 
        attachments: attachment ? [{
                    filename: attachment.name,
                    content: attachment.data,
                }]:[],
    };
    let info = await transporter.sendMail(mailOptions);
    return info;
};

module.exports = sendMail;
