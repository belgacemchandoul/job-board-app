import Button from "@/app/components/Button";
import SignInWithGoogle from "@/app/components/SignInWithGoogle";
import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#003366] text-white z-50 fixed inset-0">
      <div className="bg-[#0d1b2a] text-gray-200 rounded-lg shadow-2xl p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <p className="mb-6 text-center text-gray-400">
          Welcome back! Please sign in with Google to continue.
        </p>
        <section className="flex gap-4 flex-col items-center">
          <SignInWithGoogle />
          <Link href="/">
            <Button text="Home page" />
          </Link>
        </section>
      </div>
      <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-r from-teal-600 to-blue-700 rounded-full opacity-40 blur-lg"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full opacity-40 blur-xl"></div>
      <div className="absolute top-20 left-40 w-40 h-40 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full opacity-50 blur-md"></div>
    </div>
  );
};

export default SignInPage;
