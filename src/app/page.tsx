'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  PencilRuler,
  Search,
  Newspaper,
  Smartphone,
  Rocket,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-100 py-20">
      <section className="container mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          <span className="bg-gradient-to-r from-indigo-500 to-sky-600 bg-clip-text text-transparent">
            BlogCMS
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          The modern, headless-friendly blogging platform with an intuitive admin
          dashboard and blazing-fast public pages.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/admin/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/blog">
              <Newspaper className="mr-2 h-4 w-4" />
              View Blog
            </Link>
          </Button>
        </div>
      </section>


      <section className="container mx-auto mt-24 grid gap-10 px-6 md:grid-cols-2">

        <Card className="group relative overflow-hidden transition hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-indigo-600" />
              Admin Dashboard
            </CardTitle>
            <CardDescription>
              Manage posts with an elegant, clutter-free interface.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <FeatureItem icon={PencilRuler} text="Create & edit with rich-text" />
            <FeatureItem icon={Search} text="SEO-friendly slugs & meta" />
            <FeatureItem icon={Rocket} text="Instant previews & publish" />

            <Button
              asChild
              className="mt-6 w-full group-hover:translate-y-[-2px] transition"
            >
              <Link href="/admin/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>

          <BackgroundBlur className="from-indigo-400/30 via-violet-300/20 to-transparent" />
        </Card>

        {/* Public Blog Card */}
        <Card className="group relative overflow-hidden transition hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-emerald-600" />
              Public Blog
            </CardTitle>
            <CardDescription>
              Read beautifully rendered articles on any device.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <FeatureItem icon={Newspaper} text="Latest articles & categories" />
            <FeatureItem icon={Search} text="Optimised for search engines" />
            <FeatureItem icon={Smartphone} text="Responsive & fast-loading" />

            <Button
              asChild
              variant="outline"
              className="mt-6 w-full bg-transparent group-hover:translate-y-[-2px] transition"
            >
              <Link href="/blog">Browse Posts</Link>
            </Button>
          </CardContent>

          <BackgroundBlur className="from-emerald-400/30 via-teal-300/20 to-transparent" />
        </Card>
      </section>
    </div>
  )
}

function FeatureItem({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>
  text: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Badge
        variant="secondary"
        className="grid h-6 w-6 place-items-center rounded-full p-0"
      >
        <Icon className="h-3.5 w-3.5" />
      </Badge>
      <span className="text-muted-foreground">{text}</span>
    </div>
  )
}

function BackgroundBlur({
  className = '',
}: {
  className?: string
}) {
  return (
    <div
      className={`pointer-events-none absolute -inset-20 -z-10 rounded-full blur-2xl ${className}`}
    />
  )
}
