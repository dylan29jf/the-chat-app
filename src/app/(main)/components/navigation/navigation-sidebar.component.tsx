import { FC } from "react";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib";
import { Routes } from "@/routes";
import { getServersByMember } from "@/services";
import { NavigationAction, NavigationServers, NavigationSettings } from ".";

const NavigationSidebar: FC = async () => {
  const profile = await currentProfile();

  const servers = await getServersByMember(profile?.id ?? "");

  if (!profile) return redirect(Routes.HOME);

  return (
    <div className="only-desktop space-y-4 flex-col items-center h-full text-primary w-full bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <NavigationServers servers={servers} />
      <NavigationSettings />
    </div>
  );
};
export default NavigationSidebar;
