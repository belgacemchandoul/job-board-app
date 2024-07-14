"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="text-center" onClick={() => signIn()}>
      MARHBA YA HANNAN
    </div>
  );
}
