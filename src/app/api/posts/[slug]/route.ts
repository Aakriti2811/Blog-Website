import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/mongoDB";
import Post from "@/models/Post";
import User from "@/models/User";
import { slugify } from "@/utils/slugify";

// GET post by slug → Public
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();

  const { slug } = params;

  const post = await Post.findOne({ slug })
    .populate("user", "name")
    .lean();

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  post._id = post._id.toString();
  return NextResponse.json(post);
}

// PUT post → Admins only
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { slug } = params;
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content required" },
      { status: 400 }
    );
  }

  let newSlug = slugify(title);
  if (newSlug !== slug) {
    let counter = 1;
    while (await Post.exists({ slug: newSlug })) {
      newSlug = `${slugify(title)}-${counter++}`;
    }
  }

  const updated = await Post.findOneAndUpdate(
    { slug },
    { title, content, slug: newSlug },
    { new: true }
  ).populate("user", "name");

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const plain = updated.toObject();
  plain._id = plain._id.toString();

  return NextResponse.json(plain);
}

// DELETE post → Admins only
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { slug } = params;
  const deleted = await Post.findOneAndDelete({ slug }).populate("user", "name");

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
