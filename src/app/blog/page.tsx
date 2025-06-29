import Link from "next/link";
import { headers } from "next/headers";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/Header";

// Simulate fetch delay (optional)
async function getPosts() {
  const h = await headers();
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const base = `${protocol}://${h.get("host")}`;

  const res = await fetch(`${base}/api/posts/all`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json() as Promise<
    {
      _id: string;
      title: string;
      slug: string;
      createdAt: string;
      user?: { name?: string };
    }[]
  >;
}

export default async function BlogArchive() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];

  try {
    posts = await getPosts();
  } catch (err) {
    console.error(err);
  }

  const loading = posts.length === 0;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-10 text-center text-4xl font-bold text-foreground">
          📝 All Blog Posts
        </h1>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-1/3" />
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
              const name = p.user?.name ?? "User";
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <Card
                  key={p.slug}
                  className="transition hover:shadow-md hover:border-gray-300"
                >
                  <CardHeader className="space-y-1">
                    <Link href={`/blog/${p.slug}`}>
                      <h2 className="text-lg font-semibold text-foreground hover:underline line-clamp-2">
                        {p.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Published on {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </CardHeader>

                  <CardContent className="mt-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {name}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
