"use client";

import { FC, useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface Props {
  chatId: string;
  video: boolean;
  audio: boolean;
}

const MediaRoom: FC<Props> = ({ audio, chatId, video }) => {
  const { user } = useUser();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const { data } = await axios(
          `/api/livekit?room=${chatId}&username=${name}`
        );

        setToken(data.token);
      } catch (e) {
        console.error("[MEDIA_ROOM_ERROR]", e);
      }
    })();
  }, [user, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
export default MediaRoom;
