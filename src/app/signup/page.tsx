import Header from "@/components/Header";
import { SignupForm } from "@/components/signup";
import requireGuest from "@/lib/require-guest";

export default async function SignupPage() {
  await requireGuest();

  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-screen p-4">
        <SignupForm className="w-full max-w-sm" />
      </main>
    </>
  );
}
