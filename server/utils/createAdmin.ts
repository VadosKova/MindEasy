import bcrypt from "bcryptjs";
import Users from "../models/Users.js";

export const createAdminIfNotExists = async (): Promise<void> => {
  try {
    const email = "admin@gmail.com";

    const existingAdmin = await Users.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("1234", 10);

    await Users.create({
      username: "admin",
      email,
      password: hashedPassword,
    });

    console.log("Admin created");
  } catch (error) {
    console.error("Failed to create admin:", error);
  }
};