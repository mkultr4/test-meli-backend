// Endpoints for test

const { Router } = require("express");
const router = new Router();

router.get("/", function (req, res, next) {
  res.json({ ping: "pong" });
});

module.exports = router;
