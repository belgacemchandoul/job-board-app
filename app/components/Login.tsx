"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded"
      onClick={() => signIn()}
    >
      Login
    </button>
  );
};

export default Login;
