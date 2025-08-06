import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST() {
  try {
    await connectDB();
    
    const adminEmail = "baghdasaryan.tatoyanpartners@gmail.com";
    const defaultPassword = "TatoyanPartners2024!";

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (existingUser) {
      return NextResponse.json({ message: "Admin user already exists" });
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    // Create the admin user
    const adminUser = new User({
      email: adminEmail,
      password: hashedPassword,
    });

    await adminUser.save();

    return NextResponse.json({ 
      message: "Admin user created successfully",
      email: adminEmail,
      // In production, don't return the password
      defaultPassword: defaultPassword
    });

  } catch (error) {
    console.error('Init admin error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}