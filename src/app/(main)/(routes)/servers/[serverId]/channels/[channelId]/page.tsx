import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import { getChannelById, getMemberById } from "@/services";
import { redirectToSignIn } from "@clerk/nextjs";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { ChatHeader, ChatInput, ChatMessages } from "./components";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components";

interface Params {
  serverId: string;
  channelId: string;
}

interface Props {
  params: Params;
}

const ChannelIdPage: NextPage<Props> = async ({ params }) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const channel = await getChannelById(params.channelId);

  const member = await getMemberById(params.serverId, profile.id);

  if (!channel || !member) return redirect(Routes.HOME);

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};
export default ChannelIdPage;
