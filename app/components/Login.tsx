"use client";
import { signIn } from "next-auth/react";
import Button from "./Button";
import { usePathname } from "next/navigation";

const Login = () => {
  const pathname = usePathname();
  const headerStatus = () => {
    if (pathname.includes("/auth/sign-in")) {
      return "hidden";
    } else return "";
  };
  return (
    <div className={`${headerStatus()}`}>
      <Button text="Sign in" onClick={() => signIn()} />
    </div>
  );
};

export default Login;
