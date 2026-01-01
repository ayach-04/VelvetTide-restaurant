const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "velvet-tide-admin-secret";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.admin = { id: admin._id, email: admin.email };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminAuth;
