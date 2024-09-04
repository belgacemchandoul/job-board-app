"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";

const SignInWithGoogle = () => {
  return (
    <button
      type="button"
      onClick={() =>
        signIn("google", { redirect: true, callbackUrl: "/profile" })
      }
      className="flex items-center justify-center gap-3 bg-white text-[#003366] font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none"
    >
      <GoogleIcon />
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogle;
