"use client";

import { CreateServerModal, EditServerModal, InviteModal, MembersModal } from "@/components";
import { FC, useEffect, useState } from "react";

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
    </>
  );
};
export default ModalProvider;
