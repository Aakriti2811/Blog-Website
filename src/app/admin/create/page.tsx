'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const RichTextEditor = dynamic(() => import('@/components/CkEditor'), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full rounded-md" />,
})

export default function CreateBlogPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value
    setTitle(t)
    setSlug(toSlug(t))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) {
      toast.error('Please fill all fields')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        toast.success('Post created!')
        setTimeout(() => router.push('/admin/dashboard'), 2500)
      } else {
        if (res.status === 409) {
          toast.error('Slug already exists. Change the title.')
        } else {
          toast.error('Failed to create post')
        }
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/50 py-10">
      <Card className="mx-auto w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={handleTitleChange}
              />
              {/* slug preview */}
              {title && (
                <p className="text-sm text-muted-foreground">
                  Slug:&nbsp;<code>{slug}</code>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Create Post'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <ToastContainer />
    </div>
  )
}
