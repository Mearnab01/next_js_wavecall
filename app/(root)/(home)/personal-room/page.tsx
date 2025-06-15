"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const InfoRow = ({
  title,
  value,
  isLink = false,
}: {
  title: string;
  value: string;
  isLink?: boolean;
}) => (
  <div className="flex flex-col xl:flex-row items-start xl:items-center gap-1 xl:gap-4 py-3">
    <span className="min-w-[120px] text-sm font-medium text-gray-400/90">
      {title}:
    </span>
    <span
      className={cn(
        "text-base font-semibold break-all",
        isLink &&
          "text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
      )}
      onClick={
        isLink
          ? () => {
              navigator.clipboard.writeText(value);
              toast.success("Link copied to clipboard!");
            }
          : undefined
      }
    >
      {value}
    </span>
  </div>
);

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);
    if (!call) {
      await newCall.getOrCreate({
        data: { starts_at: new Date().toISOString() },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex flex-col items-start gap-8 p-6 text-white lg:p-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
          <Video size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Personal Meeting Room
        </h1>
      </div>

      <Card className="w-full bg-gradient-to-br from-dark-2 to-dark-3 border border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
        <CardContent className="p-8 space-y-4">
          <InfoRow title="Topic" value={`${user?.fullName}'s Meeting Room`} />
          <InfoRow title="Meeting ID" value={meetingId!} />
          <InfoRow title="Invite Link" value={meetingLink} isLink />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 mt-2">
        <Button
          onClick={startRoom}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-6 flex items-center gap-3 shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Video
              size={20}
              className="transition-transform group-hover:scale-110"
            />
            Start Meeting
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Button>

        <Button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Invitation copied to clipboard!");
          }}
          className="group relative overflow-hidden rounded-xl bg-dark-4 hover:bg-dark-3 text-white px-8 py-6 flex items-center gap-3 shadow-lg border border-white/10"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Copy
              size={20}
              className="transition-transform group-hover:scale-110"
            />
            Copy Invitation
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-gray-600/30 to-dark-4/30 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
