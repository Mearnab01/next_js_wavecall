import React from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HomeCardProps } from "@/types";

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <Card
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[325px] min-h-[260px] rounded-[14px] cursor-pointer border-none",
        "bg-gradient-to-br from-purple-900/90 to-indigo-900/90",
        "shadow-[0_10px_30px_-15px_rgba(154,110,254,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(154,110,254,0.6)]",
        "transition-all duration-300 hover:-translate-y-1",
        "relative overflow-hidden group",
        className
      )}
      onClick={handleClick}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-purple-500/30 blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-500/30 blur-xl"></div>
      </div>

      <CardContent className="relative z-10 text-white flex flex-col justify-between h-full">
        <div className="p-3 rounded-full border-2 border-white/30 bg-white/10 w-fit mb-4 group-hover:bg-white/20 group-hover:border-white/50 transition-all">
          <Image src={img} alt={title} width={27} height={27} />
        </div>

        <h3 className="text-2xl font-bold line-clamp-1 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors">
          {description}
        </p>
      </CardContent>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-[14px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 rounded-[14px] shadow-[0_0_30px_5px_rgba(154,110,254,0.4)]"></div>
      </div>
    </Card>
  );
};

export default HomeCard;
