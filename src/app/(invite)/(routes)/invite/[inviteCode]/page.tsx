import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import {
  addNewMemberToServerByInviteCode,
  existingServerByInviteCode,
} from "@/services";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Params {
  inviteCode: string;
}

interface Props {
  params: Params;
}

const InviteCodePage = async ({ params }: Props) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!params.inviteCode) return redirect(Routes.HOME);

  const existingServer = await existingServerByInviteCode(
    params.inviteCode,
    profile.id
  );

  if (existingServer) return redirect(`${Routes.SERVERS}/${existingServer.id}`);

  const server = await addNewMemberToServerByInviteCode(
    params.inviteCode,
    profile.id
  );

  if (server) return redirect(`${Routes.SERVERS}/${server.id}`);

  return null;
};
export default InviteCodePage;
