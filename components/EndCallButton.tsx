"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const lp = useLocalParticipant();

  const [isEnding, setIsEnding] = useState(false);

  const isMeetingOwner =
    lp && call?.state.createdBy && lp.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const handleEndCall = async () => {
    setIsEnding(true);
    await call.endCall();
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <Button
      onClick={handleEndCall}
      disabled={isEnding}
      className={`bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200 ${
        isEnding ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isEnding ? "Ending call..." : "End Call For Everyone"}
    </Button>
  );
};

export default EndCallButton;
