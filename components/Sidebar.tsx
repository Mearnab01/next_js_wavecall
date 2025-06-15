"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky top-0 left-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const { imgURL, route, label } = link;
          const isActive =
            pathname === route || (route !== "/" && pathname.startsWith(route));

          return (
            <Link
              href={route}
              key={label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start transition-opacity",
                {
                  "bg-blue-600 border-l-4 border-blue-400 opacity-100":
                    isActive,
                  "opacity-50 hover:opacity-80": !isActive,
                }
              )}
            >
              <Image src={imgURL} height={20} width={20} alt="link-items" />
              <p className="font-semibold text-lg max-lg:hidden">{label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
