const router = require("express").Router();
const ctrl = require("../controllers/approval.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

router.get("/pending", verifyToken, allowRoles("principal"), ctrl.getPending);
router.post("/approve/:id", verifyToken, allowRoles("principal"), ctrl.approve);
router.post("/reject/:id", verifyToken, allowRoles("principal"), ctrl.reject);

module.exports = router;