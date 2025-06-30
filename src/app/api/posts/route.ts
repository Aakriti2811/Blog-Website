import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoDB";
import Post from "@/models/Post";
import User from "@/models/User";
import { slugify } from "@/utils/slugify";

// GET  /api/posts   → list posts for the logged-in user (Admins see all, users see their own)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  console.log('user requested', user._id);

  let posts;

  if (user.role === "admin") {
    // Admin can see all posts
    posts = await Post.find({}, "title slug createdAt").sort({ createdAt: -1 }).lean();
  } else {
    // Normal users see only their posts
    posts = await Post.find({ user: user._id }, "title slug createdAt").sort({ createdAt: -1 }).lean();
  }

  const formattedPosts = posts.map((p) => ({ ...p, _id: p._id.toString() }));

  return NextResponse.json(formattedPosts);
}

// POST  /api/posts  → only admin can create a new post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { title, content } = await req.json();
  if (!title || !content)
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );

  // Generate unique slug
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let n = 1;
  while (await Post.exists({ slug })) {
    slug = `${baseSlug}-${n++}`;
  }

  try {
    const post = await Post.create({ title, content, slug, user: user._id });
    console.log('post data', post);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
