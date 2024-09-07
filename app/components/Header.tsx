import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import Login from "./Login";
import Logout from "./Logout";

const Header = async () => {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center py-2 select-none z-40 w-full shadow-md bg-white px-3 lg:px-14">
      <nav className="flex items-center gap-5 md:gap-20 ">
        <Link
          href="/"
          className="font-bold text-2xl md:text-3xl text-[#003366] tracking-tighter"
        >
          HireHaven
        </Link>

        <ul className="flex gap-4 sm:gap-8 font-medium text-sm md:text-base items-center">
          <li className="custom-hover p-1 md:p-2 rounded-md">
            <Link href="/">Home</Link>
          </li>
          <li className="custom-hover p-1 md:p-2 rounded-md ">
            <Link href="/jobs">Jobs</Link>
          </li>
        </ul>
      </nav>

      <div className="text-sm sm:text-base flex items-center">
        {session ? <Logout user={session.user} /> : <Login />}
      </div>
    </header>
  );
};

export default Header;
