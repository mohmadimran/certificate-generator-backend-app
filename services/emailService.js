const nodemailer = require("nodemailer");

async function sendEmail(to, pdfPath, jpgPath) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Certificate",
    text: "Please find attached your certificate.",
    attachments: [
      { path: pdfPath },
      { path: jpgPath }
    ]
  });
}

module.exports = sendEmail;
