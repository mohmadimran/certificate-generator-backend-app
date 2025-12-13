const express = require("express");
const router = express.Router();
const {
  generateCertificate
} = require("../services/ceertificateServices");

router.post("/generate", async (req, res) => {
  try {
    const result = await generateCertificate(req.body);
    res.status(200).json({
      success: true,
      message: "Certificate generated and emailed successfully",
      files: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
