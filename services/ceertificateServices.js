const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const sendEmail = require("./emailService");

const pdfDir = path.join(__dirname, "../generated/pdf");
const jpgDir = path.join(__dirname, "../generated/jpg");

[pdfDir, jpgDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function generateCertificate(data) {
  const {
    name,
    email,
    gstNumber,
    businessName,
    businessAddress
  } = data;

  if (!name || !email || !gstNumber || !businessName || !businessAddress) {
    throw new Error("Missing required fields");
  }

  const id = uuidv4();
  const pdfPath = path.join(pdfDir, `${id}.pdf`);

  try {
    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); 

    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const textFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Background
    page.drawRectangle({
      x: 20,
      y: 20,
      width: 802,
      height: 555,
      borderColor: rgb(0.2, 0.2, 0.2),
      borderWidth: 2,
    });

    // Title
    page.drawText("Certificate of Registration", {
      x: 230,
      y: 500,
      size: 30,
      font: titleFont,
      color: rgb(0, 0, 0),
    });

    // Name
    page.drawText(`This is to certify that`, {
      x: 300,
      y: 440,
      size: 16,
      font: textFont,
    });

    page.drawText(name, {
      x: 260,
      y: 400,
      size: 26,
      font: titleFont,
    });

    // Business details
    page.drawText(`Business Name: ${businessName}`, {
      x: 180,
      y: 340,
      size: 16,
      font: textFont,
    });

    page.drawText(`GST Number: ${gstNumber}`, {
      x: 180,
      y: 310,
      size: 16,
      font: textFont,
    });

    page.drawText(`Address: ${businessAddress}`, {
      x: 180,
      y: 280,
      size: 16,
      font: textFont,
    });

    page.drawText("Issued by Certificate Generator System", {
      x: 260,
      y: 120,
      size: 12,
      font: textFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdfPath, pdfBytes);

    await sendEmail(email, pdfPath);

    return {
      pdf: pdfPath,
    };

  } catch (error) {
    console.error("Certificate generation failed:", error);
    throw error;
  }
}

module.exports = { generateCertificate };
