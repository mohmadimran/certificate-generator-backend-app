const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000, 
});

async function sendEmail(to, pdfPath) {
  await transporter.sendMail({
    from: `"Certificate Generator" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Certificate",
    text: "Please find your certificate attached.",
    attachments: [
      {
        filename: "certificate.pdf",
        path: pdfPath,
      },
    ],
  });
}

module.exports = sendEmail;
