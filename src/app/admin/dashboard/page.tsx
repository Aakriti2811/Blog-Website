"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  _id: string;
  title: string;
  slug: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
        toast.error("Error loading posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Post deleted successfully");
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        toast.error("Error deleting post");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting post");
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 py-10">
      <Card className="mx-auto w-full max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold">All Blog Posts</h2>
          <Button asChild>
            <Link href="/admin/create">Create New Post</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No posts found. Start by creating your first post!
            </p>
          ) : (

            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/3">Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell className="w-4/5 max-w-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block truncate whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                      >
                        {post.title}
                      </Link>
                    </TableCell>

                    <TableCell className="flex justify-end gap-2">
                      <Button variant="secondary" size="sm" asChild>
                        <Link href={`/admin/edit/${post.slug}`}>Edit</Link>
                      </Button>

                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`}>View</Link>
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(post.slug)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ToastContainer />
    </div>
  );
}
