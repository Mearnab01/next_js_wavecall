import CallList from "@/components/CallList";
import React from "react";

const RecordingPage = () => {
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">Recordings</h1>
      <CallList type="recordings" />
    </section>
  );
};

export default RecordingPage;
