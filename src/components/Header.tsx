'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            BlogCMS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <NavLink href="/" active={pathname === '/'}>Home</NavLink>
          <NavLink href="/blog" active={pathname.startsWith('/blog')}>Blogs</NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {!session ? (
            <>
              <Button asChild variant="outline">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="secondary">
                <Link href="/admin/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center text-sm font-medium transition-colors hover:text-primary ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {children}
    </Link>
  );
}
