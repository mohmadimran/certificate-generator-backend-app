const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const certificateTemplate = require("../templetes/certificateTemplete");
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

  const html = certificateTemplate(data);
  const id = uuidv4();

  const pdfPath = path.join(pdfDir, `${id}.pdf`);
  const jpgPath = path.join(jpgDir, `${id}.jpg`);

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // Generate PDF
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });

    // Generate JPG
    await page.screenshot({
      path: jpgPath,
      type: "jpeg",
      fullPage: true,
    });

    // Send email with attachments
    await sendEmail(email, pdfPath, jpgPath);

    return {
      pdf: pdfPath,
      jpg: jpgPath,
    };

  } catch (error) {
    console.error("Certificate generation failed:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { generateCertificate };
