"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Open menu"
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="border-none bg-dark-1 max-w-full p-4"
        >
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/logo.svg"
                width={32}
                height={32}
                alt="YOOM logo"
              />
              <p className="text-2xl font-extrabold text-white">Wave Call</p>
            </Link>
            <SheetClose asChild />
          </div>

          <nav className="flex flex-col gap-4 overflow-y-auto pb-4">
            {sidebarLinks.map((item) => {
              const isActive = pathname === item.route;

              return (
                <SheetClose asChild key={item.route}>
                  <Link
                    href={item.route}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition",
                      {
                        "bg-blue-600 border-l-4 border-blue-400 opacity-100":
                          isActive,
                        "bg-white/10 border-l-4 border-white/10 opacity-70 hover:opacity-90":
                          !isActive,
                      }
                    )}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                    <p className="font-medium text-white">{item.label}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
