"use server";

import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const handleLogin = async (message: string, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email.trim() || !password.trim()) {
    return "Please fill your email or password";
  }
  try {
    await connectDB();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return "Wron user credentials";
    }

    const correctPassword = await bcrypt.compare(password, admin.password);
    if (!correctPassword) {
      return "Wron user credentials";
    }

    //add Token
    const token: string = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      String(process.env.JWT_SECRET),
      { expiresIn: "1h" }
    );

    (await cookies()).set("_token", token);

    return "success";
  } catch (error) {
    return "Login failed. Please try again.";
  }
};

export const removeToken = async () => {
  (await cookies()).delete("_token");
};
