import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return NextResponse.json({ message: "If an account with that email exists, we've sent a password reset link." });
    }

    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1h' }
    );

    // Store the reset token in the user document
    await User.findByIdAndUpdate(user._id, {
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    });

    // In a production app, you would send an email here
    // For now, we'll just return the token (remove this in production)
    console.log('Password reset link:', `${process.env.NEXTAUTH_URL || 'http://localhost:2005'}/reset-password?token=${resetToken}`);

    return NextResponse.json({ 
      message: "If an account with that email exists, we've sent a password reset link.",
      // Remove this in production - only for development
      resetLink: `${process.env.NEXTAUTH_URL || 'http://localhost:2005'}/reset-password?token=${resetToken}`
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}