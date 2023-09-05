import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import { getCurrentMember, getOrCreateConversation } from "@/services";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import {
  ChatHeader,
  ChatInput,
  ChatMessages,
} from "../../channels/[channelId]/components";

interface Params {
  memberId: string;
  serverId: string;
}

interface Props {
  params: Params;
}

const SOCKET_URL = "/api/socket/direct-messages";

const MemberIdPage: NextPage<Props> = async ({ params }) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const currentMember = await getCurrentMember(params.serverId, profile.id);

  if (!currentMember) return redirect(Routes.HOME);

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      <ChatMessages
        member={currentMember}
        name={otherMember.profile.name}
        chatId={conversation.id}
        type="conversation"
        apiUrl="/api/direct-messages"
        paramKey="conversationId"
        paramValue={conversation.id}
        socketUrl={SOCKET_URL}
        socketQuery={{
          conversationId: conversation.id,
        }}
      />

      <ChatInput
        name={otherMember.profile.name}
        type="conversation"
        apiUrl={SOCKET_URL}
        query={{
          conversationId: conversation.id,
        }}
      />
    </div>
  );
};
export default MemberIdPage;
