"use client";

import { FC, useEffect, useState } from "react";
import {
  CreateChannelModal,
  CreateServerModal,
  DeleteServerModal,
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
      <LeaveServerModal />
      <DeleteServerModal />
      <InviteModal />
      <MembersModal />
      <CreateChannelModal />
    </>
  );
};
export default ModalProvider;
