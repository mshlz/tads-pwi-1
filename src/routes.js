const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Olá mundo!");
});

module.exports = router;
