/* app/(admin)/edit/[slug]/page.tsx */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const RichTextEditor = dynamic(() => import("@/components/CkEditor"), {
  ssr: false,
  loading: () => (
    <Skeleton className="h-[300px] w-full rounded-md border" />
  ),
});

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!params.slug) return;

    (async () => {
      try {
        const res = await fetch(`/api/posts/${params.slug}`);
        if (res.ok) {
          const post = await res.json();
          setTitle(post.title ?? "");
          setContent(post.content ?? "");
          setSlug(post.slug ?? "");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch(`/api/posts/${params.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, slug }),
    });

    setSubmitting(false);
    if (res.ok) router.push("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-muted/50 py-10">
      <Card className="w-full max-w-6xl">
        <CardHeader className="flex flex-row items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="shrink-0"
            onClick={() => router.back()}
          >
            {/* simple left arrow */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
          <h1 className="text-2xl font-semibold">Edit Post</h1>
        </CardHeader>


        {loading ? (
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[300px] w-full rounded-md" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "-")
                    );
                  }}
                  placeholder="Post title"
                />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor value={content} onChange={setContent} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="seo-friendly-slug"
                />
              </div>
            </CardContent>

            <CardFooter className="justify-end mt-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
