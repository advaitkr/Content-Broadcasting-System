const router = require("express").Router();
const ctrl = require("../controllers/content.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

router.post(
  "/upload",
  verifyToken,
  allowRoles("teacher"),
  upload.single("file"),
  ctrl.upload
);

router.get(
  "/my",
  verifyToken,
  allowRoles("teacher"),
  ctrl.getMine
);

module.exports = router;