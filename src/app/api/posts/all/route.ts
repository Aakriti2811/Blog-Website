import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoDB';
import Post from '@/models/Post';

export async function GET() {
  await dbConnect();

  const posts = await Post.find({}, 'title slug createdAt user')
    .populate('user', 'name email avatar')
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(posts);
}
