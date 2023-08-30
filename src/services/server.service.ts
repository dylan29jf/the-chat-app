import { redirect } from "next/navigation";

import { db } from "@/db";
import { Server } from "@prisma/client";

export const serverByUser = async (idUser: string): Promise<Server | any> => {
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: idUser,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
};

export const getServersByMember = async (id: string) => {
  return await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: id,
        },
      },
    },
  });
};

export const getServerById = async (serverId: string, profileId: string) => {
  return await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
        },
      },
    },
  });
};
