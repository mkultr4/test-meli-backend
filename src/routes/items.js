// Endpoints for external data
const { Router } = require("express");
const router = new Router();
const meliService = require("../services/meli.service");

router.get("/", async (req, res, next) => {
  try {
    const q = req.query ? req.query.q : "";
    const limit = req.query ? req.query.limit : 4;
    const results = await meliService.findByQuery(q, limit);
    res.json(results);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params ? req.params.id : null;
    const item = await meliService.getItemById(id);
    res.json(item);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
