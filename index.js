const express = require("express");
require("dotenv").config();
const certificateRoutes = require("./routes/certificateRoutes");


const app = express();

app.use(express.json());

app.use("/api/certificate", certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
