"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { MeetingTypesProp } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import DateTimeSelection from "./DateTimeSelection";
import Loader from "./Loader";
import { Input } from "./ui/input";

const cardItems = [
  {
    img: "/icons/add-meeting.svg",
    title: "New Meeting",
    description: "Start an instant meeting",
    className:
      "bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20",
    action: "isInstantMeeting",
  },
  {
    img: "/icons/join-meeting.svg",
    title: "Join Meeting",
    description: "via invitation link",
    className:
      "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/20",
    action: "isJoiningMeeting",
  },
  {
    img: "/icons/schedule.svg",
    title: "Schedule Meeting",
    description: "Plan your meeting",
    className:
      "bg-gradient-to-br from-rose-600 to-pink-600 shadow-lg shadow-rose-500/20",
    action: "isScheduleMeeting",
  },
  {
    img: "/icons/recordings.svg",
    title: "View Recordings",
    description: "Meeting Recordings",
    className:
      "bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/20",
    action: "recordings",
  },
];

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<MeetingTypesProp>(undefined);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast.error("Please select a date and time");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call!");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      const isImmediateMeeting =
        new Date(values.dateTime).getTime() <= Date.now() + 60 * 1000;

      if (!values.description || isImmediateMeeting) {
        router.push(`/meeting/${call.id}`);
      }
      toast.success("Meeting created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting");
    }
  };
  if (!client || !user) return <Loader />;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-900/20 blur-3xl"></div>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        <AnimatePresence>
          {cardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <HomeCard
                img={item.img}
                title={item.title}
                description={item.description}
                className={item.className}
                handleClick={() =>
                  item.action === "recordings"
                    ? router.push("/recordings")
                    : setMeetingState(item.action as MeetingTypesProp)
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          buttonText="Schedule a Meeting"
          handleClick={createMeeting}
        >
          <DateTimeSelection values={values} setValues={setValues} />
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Join a meeting"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Paste the link here"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </div>
  );
};

export default MeetingTypeList;
