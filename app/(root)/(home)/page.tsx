"use client";
import MeetingTypeList from "@/components/MeetingTypeList";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentTime);

  const [hours, minutes, seconds] = time.split(/:| /);
  return (
    <section className="flex size-full flex-col gap-8 text-white">
      {/* Hero Section with Digital Clock */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-3xl bg-hero bg-cover bg-center shadow-2xl">
        {/* Gradient overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-purple-900/30 z-0"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-purple-700/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-indigo-700/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-8">
          {/* Upcoming Meeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glassmorphism rounded-full px-6 py-3 text-center w-fit shadow-lg border border-white/10"
          >
            <span className="text-sm font-medium">
              🚀 Hey, What Are You Doing Today??
            </span>
          </motion.div>

          {/* Digital Clock */}
          <div className="flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-end gap-1"
            >
              {/* Hours */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`hours-${hours}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl font-black tracking-tighter lg:text-8xl drop-shadow-md"
                >
                  {hours}
                </motion.span>
              </AnimatePresence>

              <span className="text-7xl font-black pb-2 lg:text-8xl drop-shadow-md">
                :
              </span>

              {/* Minutes */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`minutes-${minutes}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl font-black tracking-tighter lg:text-8xl drop-shadow-md"
                >
                  {minutes}
                </motion.span>
              </AnimatePresence>

              <span className="text-7xl font-black pb-2 lg:text-8xl drop-shadow-md">
                :
              </span>

              {/* Seconds */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`seconds-${seconds}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl font-bold text-white/80 pb-1 lg:text-6xl drop-shadow-md"
                >
                  {seconds}
                </motion.span>
              </AnimatePresence>

              {/* AM/PM */}
              <span className="text-3xl font-bold text-white/70 pb-3 lg:text-4xl drop-shadow-md">
                {time.slice(-2)}
              </span>
            </motion.div>

            {/* Date */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl font-medium text-white/90 lg:text-2xl drop-shadow"
            >
              {date}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Meeting Type Cards */}
      <MeetingTypeList />
    </section>
  );
};

export default Home;
