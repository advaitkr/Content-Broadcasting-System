const router = require("express").Router();
const ctrl = require("../controllers/broadcast.controller");

router.get("/live/:teacherId", ctrl.getLive);

module.exports = router;