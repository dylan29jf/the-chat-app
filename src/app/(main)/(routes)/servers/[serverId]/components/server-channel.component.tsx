"use client";

import { ActionTooltip } from "@/components";
import { ModalType, useModal } from "@/hooks";
import { cn } from "@/lib";
import { Routes } from "@/routes";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Mic, Trash, Video, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: FC<Props> = ({ channel, server, role }) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const handleClick = () => {
    router.push(
      `${Routes.SERVERS}/${params?.serverId}${Routes.CHANNELS}/${channel.id}`
    );
  };

  const handleAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400 " />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => handleAction(e, "editChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition "
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => handleAction(e, "deleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition  "
            />
          </ActionTooltip>
        </div>
      )}

      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500  dark:text-zinc-400" />
      )}
    </button>
  );
};
export default ServerChannel;
