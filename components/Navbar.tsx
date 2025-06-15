import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link
        href="/"
        className="flex items-center gap-1 shadow-[#9a6efe] shadow-md px-4 py-2 rounded-full cursor-pointer"
      >
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="wavecall"
          className="size-10"
        />
        <p className="max-sm:hidden text-[26px] font-extrabold text-white">
          Wave Call
        </p>
      </Link>
      <div className="flex-between gap-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
