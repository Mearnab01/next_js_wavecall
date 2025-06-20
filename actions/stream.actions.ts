"use server";
import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not logged in");
    if (!apiKey || !apiSecret) {
      console.warn("⚠️ Missing API keys");
      throw new Error("❌ Stream API key and secret are missing.");
    }

    const client = new StreamClient(apiKey, apiSecret);
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, exp, issued);
    return token;
  } catch (error) {
    console.log("Error from tokenProvider in stream.actions ", error);
  }
};
