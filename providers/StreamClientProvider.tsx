"use client";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  const userName = `${user?.firstName} ${user?.lastName}`;
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Missing Stream API Key");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: userName || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: async () => {
        const token = await tokenProvider();
        if (!token) throw new Error("Failed to fetch Stream token");
        return token;
      },
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
