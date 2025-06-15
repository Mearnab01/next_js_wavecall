import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import React, { useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();

  const isPersonalRoom = !!searchParams.get("personal");

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return null;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0e141b] text-white">
      {/* Layout container */}
      <div className="relative flex h-full w-full justify-center items-center">
        {/* Main video layout */}
        <div className="flex flex-grow max-w-[1000px] h-full items-center justify-center transition-all">
          <CallLayout />
        </div>

        <div
          className={cn(
            "absolute right-0 top-0 z-20 h-full w-80 transform bg-[#1a202c] border-l border-[#2d3748] shadow-lg transition-transform duration-300",
            {
              "translate-x-0": showParticipants,
              "translate-x-full": !showParticipants,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-[#12171e]/80 backdrop-blur-md flex flex-col items-center gap-3 py-4">
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-3 md:justify-between">
          <CallControls onLeave={() => router.push(`/`)} />

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-xl bg-[#19232d] px-4 py-2 hover:bg-[#2d3b49] transition">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="border border-[#2a2a2a] bg-[#1c1f24] text-white">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                    className="cursor-pointer hover:bg-[#2e3641] transition"
                  >
                    {item}
                  </DropdownMenuItem>
                  {index < 2 && (
                    <DropdownMenuSeparator className="border-[#2e2e2e]" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button
            onClick={() => setShowParticipants((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl bg-[#19232d] px-4 py-2 text-white hover:bg-[#2d3b49] transition"
          >
            <Users size={18} />
            {showParticipants ? "Hide" : "Show"} Participants
          </button>

          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
