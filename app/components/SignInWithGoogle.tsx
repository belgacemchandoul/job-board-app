"use client";

import { signIn } from "next-auth/react";

const SignInWithGoogle = () => {
  return (
    <button
      type="button"
      onClick={() =>
        signIn("google", { redirect: true, callbackUrl: "/profile" })
      }
    >
      Signin with Google
    </button>
  );
};

export default SignInWithGoogle;
