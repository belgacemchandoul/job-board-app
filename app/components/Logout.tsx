"use client";
import { Session } from "next-auth";
import Image from "next/image";

interface LogoutProps {
  user: Session["user"];
}

const Logout = ({ user }: LogoutProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={user?.image || ""}
        alt=""
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
};

export default Logout;
