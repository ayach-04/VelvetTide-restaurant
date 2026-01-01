const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const Admin = require("../models/Admin");

const photosDir = path.join(__dirname, "..", "..", "client", "public", "Photos");

const loadAvatarFromDisk = (fileName) => {
  try {
    const filePath = path.join(photosDir, fileName);
    const data = fs.readFileSync(filePath);
    return { data, contentType: "image/jpeg" };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to load admin avatar "${fileName}": ${error.message}`);
    return null;
  }
};

const cloneAvatarPayload = (avatar) => {
  if (!avatar || !avatar.data) {
    return undefined;
  }
  return {
    data: Buffer.from(avatar.data),
    contentType: avatar.contentType || "image/jpeg",
  };
};

const adminSeedData = [
  {
    first_name: "Avery",
    last_name: "Sinclair",
    email: "avery.sinclair@velvettide.com",
    password: "VelvetTide#1",
    avatar: loadAvatarFromDisk("profile_pic(1).jpg"),
  },
  {
    first_name: "Elena",
    last_name: "Marceau",
    email: "elena.marceau@velvettide.com",
    password: "VelvetTide#2",
    avatar: loadAvatarFromDisk("profile_pic(2).jpg"),
  },
  {
    first_name: "Julian",
    last_name: "Hart",
    email: "julian.hart@velvettide.com",
    password: "VelvetTide#3",
    avatar: loadAvatarFromDisk("profile_pic(3).jpg"),
  },
];

const seedAdmins = async () => {
  const existingCount = await Admin.countDocuments();
  if (existingCount > 0) {
    return;
  }

  const records = await Promise.all(
    adminSeedData.map(async (admin) => ({
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
      role: "admin",
      password: await bcrypt.hash(admin.password, 10),
      ...(admin.avatar && { avatar: cloneAvatarPayload(admin.avatar) }),
    }))
  );

  await Admin.insertMany(records);
  // eslint-disable-next-line no-console
  console.log("Seeded admin users");
};

module.exports = {
  seedAdmins,
  adminSeedData,
};
