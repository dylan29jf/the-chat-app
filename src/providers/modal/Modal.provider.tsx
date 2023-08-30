"use client";

import { FC, useEffect, useState } from "react";
import {
  CreateChannelModal,
  CreateServerModal,
  EditServerModal,
  InviteModal,
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
      <InviteModal />
      <MembersModal />
      <CreateChannelModal />
    </>
  );
};
export default ModalProvider;
