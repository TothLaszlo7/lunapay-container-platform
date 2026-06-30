const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "lunapay-backend",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`LunaPay backend is running on port ${PORT}`);
});
