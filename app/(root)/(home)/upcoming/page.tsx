import CallList from "@/components/CallList";
import React from "react";

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="font-bold text-3xl">Upcoming Meetings</h1>
      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;
