import Link from "next/link";
import dynamic from "next/dynamic";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import Login from "./Login";
import Logout from "./Logout";

const Header = async () => {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <header className="flex justify-between items-center py-4 select-none z-50 w-full ">
      <nav className="flex items-center gap-44">
        <Link
          href="/"
          className="font-bold text-4xl text-[#003366] tracking-tighter"
        >
          HireHaven
        </Link>
        <ul className="flex gap-10 font-medium">
          <li className="custom-hover p-2 rounded-md">
            <Link href="/">Home</Link>
          </li>
          <li className="custom-hover p-2 rounded-md">
            <Link href="/jobs">Jobs</Link>
          </li>
        </ul>
      </nav>
      {session ? <Logout user={session.user} /> : <Login />}
    </header>
  );
};

export default Header;
