"use client";

import { useSocket } from "@/providers";
import { FC } from "react";
import { Badge } from ".";

const SocketIndicator: FC = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant={"outline"} className="bg-yellow-600 text-white">
        Fallback: Polling every 1s
      </Badge>
    );
  }
  return (
    <Badge
      variant={"outline"}
      className="bg-emerald-600 text-white border-none"
    >
      Live: Real-time updates
    </Badge>
  );
};
export default SocketIndicator;
