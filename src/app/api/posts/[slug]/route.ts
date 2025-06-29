import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoDB";
import Post from "@/models/Post";
import { slugify } from "@/utils/slugify";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();

  const { slug } = await params;

  const post = await Post.findOne({ slug })
    .populate("user", "name")
    .lean();

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  post._id = post._id.toString();
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();

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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();

  const { slug } = await params;
  const deleted = await Post.findOneAndDelete({ slug }).populate("user", "name");

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
