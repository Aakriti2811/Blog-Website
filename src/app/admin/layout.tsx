import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; 

export const metadata = {
  title: "Admin • MyBlog",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar className="w-64 shrink-0 border-r" />

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
