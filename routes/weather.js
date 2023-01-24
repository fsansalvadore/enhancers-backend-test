const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  console.log("/weather")
});

module.exports = router;