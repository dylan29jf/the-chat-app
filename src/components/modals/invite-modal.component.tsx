"use client";

import { FC, useState } from "react";

import {
  ActionTooltip,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@/components";
import { useModal, useOrigin } from "@/hooks";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { patchInvite } from "@/services";

const InviteModal: FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose, type, data } = useModal();

  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";

  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleNew = async () => {
    try {
      setIsLoading(true);
      const { data } = await patchInvite(server?.id ?? "");
      onOpen("invite", { server: data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              disabled
              value={inviteUrl}
            />
            <ActionTooltip label="Copy" align="center" side="top">
              <Button size={"icon"} onClick={handleCopy} disabled={isLoading}>
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </ActionTooltip>
          </div>
          <Button
            variant={"link"}
            size={"sm"}
            className="text-xs text-zinc-500 mt-4"
            disabled={isLoading}
            onClick={handleNew}
          >
            Generate a new link
            <RefreshCcw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default InviteModal;
