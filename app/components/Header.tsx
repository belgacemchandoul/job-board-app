import Link from "next/link";
import dynamic from "next/dynamic";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../lib/nextAuth";

const User = dynamic(() => import("./User"), { ssr: false });

const Header = async () => {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <header className="flex justify-between items-center p-4">
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
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      {<User user={session?.user} />}
    </header>
  );
};

export default Header;
