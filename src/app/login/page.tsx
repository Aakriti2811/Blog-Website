import Header from "@/components/Header";
import { LoginForm } from "@/components/login-form";
import requireGuest from "@/lib/require-guest";

export default async function LoginPage() {
  await requireGuest();

  return (
    <>
    <Header />
      <main className="flex items-center justify-center min-h-screen p-4">
        <LoginForm className="w-full max-w-sm" />
      </main>
    </>
  );
}
