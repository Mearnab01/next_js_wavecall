"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const formatDateTime = (dateStr: string) => {
  try {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Invalid Date";
  }
};

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const formattedDate = formatDateTime(date);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex min-h-[280px] w-full flex-col justify-between rounded-2xl bg-gradient-to-br from-dark-2 to-dark-3 p-6 shadow-xl xl:max-w-[600px] border border-white/10"
    >
      <article className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-500/10 p-3">
            <Image
              src={icon}
              alt="upcoming"
              width={28}
              height={28}
              className="filter brightness-125"
            />
          </div>
          {!isPreviousMeeting && (
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              Upcoming
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <div className="flex items-center gap-2">
              <Image
                src="/images/schedule.png"
                alt="calendar"
                width={16}
                height={16}
                className="filter brightness-125"
              />
              <p className="text-base font-medium text-gray-300">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </article>

      <article className={cn("flex flex-col gap-6", {})}>
        <div className="relative flex w-full items-center">
          <div className="flex -space-x-3">
            {avatarImages.slice(0, 5).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Image
                  src={img}
                  alt="attendees"
                  width={44}
                  height={44}
                  className="rounded-full border-2 border-dark-2 object-cover"
                />
                {index === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-dark-4/80 text-sm font-medium text-white">
                    +{avatarImages.length - 1}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {!isPreviousMeeting && (
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleClick}
              className="group relative overflow-hidden rounded-xl bg-indigo-600 px-6 py-5 text-white hover:bg-indigo-700"
            >
              {buttonIcon1 && (
                <Image
                  src={buttonIcon1}
                  alt="feature"
                  width={20}
                  height={20}
                  className="transition-transform group-hover:scale-110"
                />
              )}
              <span className="ml-2">{buttonText}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Button>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Meeting link copied to clipboard!");
              }}
              className="group relative overflow-hidden rounded-xl bg-dark-4 px-6 py-5 text-white hover:bg-dark-3"
            >
              <Image
                src="/icons/copy.svg"
                alt="copy"
                width={20}
                height={20}
                className="transition-transform group-hover:scale-110"
              />
              <span className="ml-2">Copy Link</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-600/30 to-dark-4/30 opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Button>
          </motion.div>
        )}
      </article>
    </motion.section>
  );
};

export default MeetingCard;
