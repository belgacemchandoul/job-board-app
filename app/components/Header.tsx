import Link from "next/link";
import dynamic from "next/dynamic";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import Login from "./Login";
import Logout from "./Logout";

const Header = async () => {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <header className="flex justify-between items-center py-4 select-none z-50 absolute w-full ">
      <nav className="flex items-center gap-44">
        <Link href="/" className="font-bold text-2xl">
          HireHaven
        </Link>
        <ul className="flex gap-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/jobs">Jobs</Link>
          </li>
        </ul>
      </nav>
      {session ? <Logout user={session.user} /> : <Login />}
    </header>
  );
};

export default Header;
