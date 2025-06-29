import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoDB";
import Post from "@/models/Post";
import User from "@/models/User";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  const posts = await Post.find({ user: user._id });

  return new Response(JSON.stringify(posts));
}
