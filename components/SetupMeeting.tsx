import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const SetupMeeting = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOff, setIsMicCamToggledOff] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within a StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOff) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggledOff, call]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full px-4 text-white gap-6 bg-gradient-to-br from-gray-900 to-black">
      <h1 className="text-3xl font-bold tracking-tight">Setup Your Call</h1>

      <div className="rounded-xl border border-[#9a6efe40] shadow-xl">
        <VideoPreview className="rounded-md w-full h-full object-cover border-2 border-[#9a6efe]" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isMicCamToggledOff}
            onChange={(e) => setIsMicCamToggledOff(e.target.checked)}
          />
          <span className="text-gray-300">
            Join with mic & camera turned off
          </span>
        </label>

        <DeviceSettings />
      </div>

      <Button
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
        className="bg-[#9a6efe] hover:bg-[#9a6efe40] px-6 py-3 text-base font-semibold rounded-lg transition"
      >
        Join Call
      </Button>
    </div>
  );
};

export default SetupMeeting;
