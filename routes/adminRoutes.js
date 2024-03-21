const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const adminController = require("../controllers/adminController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);
router.get("/profile", adminAuthMiddleware, async (req, res) => {
  try {
    const adminId = req.userData.userId;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
