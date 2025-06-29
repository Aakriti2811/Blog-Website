import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from '@/lib/mongoDB';
import User from "@/models/User";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, hashedPassword });

  return NextResponse.json({ message: "User created", userId: user._id });
}
