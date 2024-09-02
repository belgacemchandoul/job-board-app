import SignInWithGoogle from "@/app/components/SignInWithGoogle";
import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (session) {
    redirect("/profile");
  }
  return <SignInWithGoogle />;
};

export default SignInPage;
