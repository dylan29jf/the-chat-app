"use client";

import React, { FC, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  ScrollArea,
  UserAvatar,
} from "@/components";
import { useModal } from "@/hooks";
import { ServerWithMembersWithProfiles } from "@/types";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { changeRole, deleteMemberToServer } from "@/services";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const MembersModal: FC = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState<string>("");

  const isModalOpen = isOpen && type === "members";

  const { server } = data as { server: ServerWithMembersWithProfiles };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map(({ id, profile, role, profileId }) => (
            <div key={id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center">
                  {profile.name}
                  {roleIconMap[role]}
                </div>
                <p className="text-xs text-zinc-500 ">{profile.email}</p>
              </div>
              {server.profileId !== profileId && loadingId !== id && (
                <div className="ml-auto">
                  <ActionsMember
                    memberId={id}
                    role={role}
                    setLoadingId={setLoadingId}
                  />
                </div>
              )}
               {loadingId === id && (
                <Loader2
                  className="animate-spin text-zinc-500 ml-auto w-4 h-4"
                />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

interface ActionsMemberProps {
  memberId: string;
  role: MemberRole;
  setLoadingId: React.Dispatch<React.SetStateAction<string>>;
}

const ActionsMember: FC<ActionsMemberProps> = ({
  role,
  memberId,
  setLoadingId,
}) => {
  const { data, onOpen } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const router = useRouter();

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const { data: responseData } = await deleteMemberToServer(
        memberId,
        server.id
      );

      router.refresh();
      onOpen("members", { server: responseData });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const { data: responseData } = await changeRole(
        memberId,
        server.id,
        role
      );

      router.refresh();
      onOpen("members", { server: responseData });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="h-4 w-4 text-zinc-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center">
            <ShieldQuestion className="w-4 h-4 mr-2" />
            <span>Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onRoleChange(memberId, "GUEST")}>
                <Shield className="h-4 w-4 mr-2" />
                Guest
                {role === "GUEST" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onRoleChange(memberId, "MODERATOR")}
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                Moderator
                {role === "MODERATOR" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onKick(memberId)}>
          <Gavel className="h-4 w-4 mr-2" />
          Kick
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default MembersModal;
