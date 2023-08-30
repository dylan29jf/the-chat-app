import { FC } from "react";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import { getChannelsById } from "@/services";
import { ChannelType } from "@prisma/client";
import { ServerHeader } from ".";

interface Props {
  serverId: string;
}

const ServerSidebar: FC<Props> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) return redirect(Routes.HOME);

  const server = await getChannelsById(serverId);

  if (!server) return redirect(Routes.HOME);

  const filterChannelsByType = (typeCannel: ChannelType) => {
    return server.channels.filter((channel) => channel.type === typeCannel);
  };

  const textChannels = filterChannelsByType("TEXT");
  const audioChannels = filterChannelsByType("AUDIO");
  const videoChannels = filterChannelsByType("VIDEO");

  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F5F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
export default ServerSidebar;
