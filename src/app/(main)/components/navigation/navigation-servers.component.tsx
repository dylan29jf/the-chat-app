"use client";

import { ScrollArea } from "@/components";

import { FC } from "react";
import { NavigationItem } from ".";
import { Server } from "@prisma/client";

interface Props {
  servers: Server[];
}

const NavigationServers: FC<Props> = ({ servers }) => {
  return (
    <ScrollArea className="flex-1 w-full">
      {servers.map((server) => (
        <div key={server.id} className="mb-4">
          <NavigationItem key={server.id} server={server} />
        </div>
      ))}
    </ScrollArea>
  );
};
export default NavigationServers;
