const express=require("express");
const app=express();
const fileUpload = require("express-fileupload");
const sendMail = require("./services/sendMail");
const path = require('path');
require("dotenv").config();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post("/mail", async (req, res) => {
    try {
        const { senderEmail, email, subject, message } = req.body;
        const attachment = req.files ? req.files.attachment : null;
        await sendMail({ senderEmail, email, subject, message, attachment });
        res.send(` <center style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f8f9fa;">
                <h1 style="color: #28a745;">Email Sent Successfully!</h1>
                <p>Your email has been sent to ${email}.</p>
                <a href="/" style="color: white; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Back to Form</a>
            </center>`);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send(` <center style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f8f9fa;">
                <h1 style="color: #dc3545;">Failed to Send Email</h1>
                <p>There was an error sending your email. Please try again later.</p>
                <a href="/" style="color: white; background-color: #6c757d; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Back to Form</a>
            </center>`);
    }
});

app.listen(8080,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("server is running on port 8080");
    }
});