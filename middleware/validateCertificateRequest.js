function validateCertificateRequest(req, res, next) {
  const body = req.body;

  // Check body existence
  if (!body || typeof body !== "object") {
    return res.status(400).json({
      success: false,
      message: "Request body is required"
    });
  }

  const requiredFields = [
    "name",
    "email",
    "gstNumber",
    "businessName",
    "businessAddress"
  ];

  const missingFields = requiredFields.filter(
    field => !body[field]
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  next();
}

module.exports = validateCertificateRequest;
