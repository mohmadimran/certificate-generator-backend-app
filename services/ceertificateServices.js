const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const certificateTemplate = require("../templetes/certificateTemplete");
const sendEmail = require("./emailService");

// Ensure directories exist (SAFE & RELIABLE)
const pdfDir = path.join(__dirname, "../generated/pdf");
const jpgDir = path.join(__dirname, "../generated/jpg");

[pdfDir, jpgDir].forEach(dir => {
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

  const html = certificateTemplate(data);
  const id = uuidv4();

  const pdfPath = path.join(pdfDir, `${id}.pdf`);
  const jpgPath = path.join(jpgDir, `${id}.jpg`);

  let browser;

  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.pdf({
      path: pdfPath,
      format: "A4"
    });

    await page.screenshot({
      path: jpgPath,
      type: "jpeg",
      fullPage: true
    });

    await sendEmail(email, pdfPath, jpgPath);

    return {
      pdf: pdfPath,
      jpg: jpgPath
    };

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { generateCertificate };
