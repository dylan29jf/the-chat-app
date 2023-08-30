import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import { getServerById } from "@/services";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { ServerSidebar } from "./components";

interface Props {
  children: ReactNode;
  params: { serverId: string };
}

const ServerIdLayout = async ({ children, params }: Props) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await getServerById(params.serverId, profile.id);

  if (!server) return redirect(Routes.HOME);

  return (
    <div className="h-full">
      <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};
export default ServerIdLayout;
