"use client";

import { FC } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib";
import { ActionTooltip } from "@/components";
import { Routes } from "@/routes";
import { Server } from "@prisma/client";

interface Props {
  server: Server;
}

const NavigationItem: FC<Props> = ({ server }) => {
  const { id, imageUrl, name } = server;

  const params = useParams();

  const route = useRouter();

  const handleClick = () => {
    route.push(`${Routes.SERVERS}/${id}`);
  };

  return (
    <ActionTooltip label={name} side="right" align="center">
      <button
        className="group relative flex items-center"
        onClick={handleClick}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />

        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};
export default NavigationItem;
