module.exports = ({
  name,
  gstNumber,
  businessName,
  businessAddress
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial;
      border: 10px solid #2c3e50;
      padding: 40px;
      text-align: center;
    }
    h1 {
      color: #2c3e50;
    }
    .content {
      margin-top: 40px;
      font-size: 18px;
    }
    .footer {
      margin-top: 60px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>Certificate of Registration</h1>

  <div class="content">
    <p>This is to certify that</p>
    <h2>${name}</h2>

    <p><strong>Business Name:</strong> ${businessName}</p>
    <p><strong>GST Number:</strong> ${gstNumber}</p>
    <p><strong>Address:</strong> ${businessAddress}</p>
  </div>

  <div class="footer">
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Authorized Signature</p>
  </div>
</body>
</html>
`;
