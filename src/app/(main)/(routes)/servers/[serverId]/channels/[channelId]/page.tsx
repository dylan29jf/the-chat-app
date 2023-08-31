import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import { getChannelById, getMemberById } from "@/services";
import { redirectToSignIn } from "@clerk/nextjs";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { ChatHeader } from "./components";

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
    </div>
  );
};
export default ChannelIdPage;
