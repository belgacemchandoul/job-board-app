"use client";
import { signIn } from "next-auth/react";
import Button from "./Button";

const Login = () => {
  return <Button text="Sign in" onClick={() => signIn()} />;
};

export default Login;
