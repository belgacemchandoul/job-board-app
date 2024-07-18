"use client";
import { signIn } from "next-auth/react";
import JobForm from "./components/JobForm";

export default function Home() {
  return (
    <div className="text-center">
      MARHBA YA HANNAN
      {/* <JobForm onSubmit={() => {}} /> */}
    </div>
  );
}
