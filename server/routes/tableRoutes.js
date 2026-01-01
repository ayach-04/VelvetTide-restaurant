const express = require("express");
const { getTables, getAvailableTables } = require("../controllers/tableController");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router.get("/", adminAuth, getTables);
router.get("/available", getAvailableTables);

module.exports = router;
