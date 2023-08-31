"use client";

import { FC, useEffect, useState } from "react";
import {
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
  DeleteServerModal,
  EditChannelModal,
  EditServerModal,
  InviteModal,
  LeaveServerModal,
  MembersModal,
} from "@/components";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <DeleteServerModal />
      <LeaveServerModal />
      <CreateChannelModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <InviteModal />
      <MembersModal />
    </>
  );
};
export default ModalProvider;
