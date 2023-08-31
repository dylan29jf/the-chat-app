import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import { getInitialChannel } from "@/services";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { NextPage } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: {
    serverId: string;
  };
}

const ServerIdPage: NextPage<Props> = async ({ params }) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn({ returnBackUrl: "/" });

  const initialChannel = await getInitialChannel(
    params.serverId ?? "",
    profile.id
  );

  const generalChannel = initialChannel?.channels[0];

  if (generalChannel?.name !== "general") {
    return null;
  }

  return redirect(
    `${Routes.SERVERS}/${params.serverId}${Routes.CHANNELS}/${generalChannel?.id}`
  );
};
export default ServerIdPage;
