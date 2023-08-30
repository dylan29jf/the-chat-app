"use client";
import { FC } from "react";
import { ButtonModeToggle } from "@/components";
import { UserButton } from "@clerk/nextjs";
import { Routes } from "@/routes";

const NavigationSettings: FC = () => {
  return (
    <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
      <ButtonModeToggle />
      <UserButton
        afterSignOutUrl={Routes.HOME}
        appearance={{
          elements: {
            avatarBox: "h-[48px] w-[48px]",
          },
        }}
      />   
    </div>
  );
};
export default NavigationSettings;
