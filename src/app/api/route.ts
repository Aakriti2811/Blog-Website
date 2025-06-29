import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoDB';
import Post from '@/models/Post';
import slugify from 'slugify';

export async function GET() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();
  const slug = slugify(title, { lower: true, strict: true });

  try {
    await dbConnect();
    const post = await Post.create({ title, content, slug });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}
