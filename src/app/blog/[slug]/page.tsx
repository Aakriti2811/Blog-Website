/* app/blog/[slug]/page.tsx */
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  user?: { name?: string };
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const getPost = (slug: string) => fetchJSON<Post>(`${base}/api/posts/${slug}`);
const getSuggestions = (slug: string) =>
  fetchJSON<Post[]>(`${base}/api/posts/all`).then(
    (all) => all?.filter((p) => p.slug !== slug).slice(0, 2) ?? []
  );

/* ---------------- metadata ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const {slug} =await params
  const post = await getPost(slug);
  if (!post) return {};

  const desc = post.content
    .replace(/<[^>]+>/g, "")
    .slice(0, 150)
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: post.title,
    description: desc,
    openGraph: {
      title: post.title,
      description: desc,
      url: `${base}/blog/${slug}`,
    },
    twitter: {
      title: post.title,
      description: desc,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const {slug} = await params
  const post = await getPost(slug);
  if (!post) notFound();

  const suggestions = await getSuggestions(slug);

  const author = post.user?.name ?? "User";
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-gradient-to-b from-muted/50 to-background py-24 px-4">
      <article className="mx-auto max-w-3xl ck-content">
        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>

        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">{author}</span>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <time>{new Date(post.createdAt).toLocaleDateString()}</time>
        </div>

        <div
          className="prose mt-8 max-w-none prose-img:rounded-lg prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {suggestions.length > 0 && (
        <section className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
          {suggestions.map((s) => (
            <Card
              key={s._id}
              className="transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link href={`/blog/${s.slug}`}>
                <CardHeader className="space-y-2">
                  <h3 className="line-clamp-2 text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </section>
      )}

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 transition hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
