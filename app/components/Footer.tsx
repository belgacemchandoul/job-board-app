"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const headerStatus = () => {
    if (pathname.includes("/auth/sign-in")) {
      return "hidden";
    } else return "";
  };
  return (
    <footer
      className={`bg-gradient-to-r from-teal-700 to-[#20B2AA] text-center text-white h-14 flex items-center justify-center ${headerStatus()}`}
    >
      {" "}
      this is a footer
    </footer>
  );
};

export default Footer;
