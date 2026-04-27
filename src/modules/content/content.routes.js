const router = require("express").Router();
const controller = require("./content.controller");

const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");
const upload = require("../../middlewares/upload.middleware");

// Teacher
router.post("/upload", auth, role("TEACHER"), upload.single("file"), controller.upload);
router.get("/my", auth, role("TEACHER"), controller.getMyContent);

// Principal
router.get("/pending", auth, role("PRINCIPAL"), controller.getPending);
router.post("/:id/approve", auth, role("PRINCIPAL"), controller.approve);
router.post("/:id/reject", auth, role("PRINCIPAL"), controller.reject);

// Public
router.get("/broadcast", controller.broadcast);

module.exports = router;