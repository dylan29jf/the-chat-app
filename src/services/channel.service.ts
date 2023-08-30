import { db } from "@/db";
import { channelSchema } from "@/schemas";
import axios from "axios";
import qs from "query-string";
import { z } from "zod";

export const getChannelsById = async (serverId: string) => {
  return await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
};

export const createChannel = async (
  values: z.infer<typeof channelSchema>,
  serverId: string
) => {
  const url = qs.stringifyUrl({
    url: "/api/channels",
    query: {
      serverId: serverId,
    },
  });
  return await axios.post(url, values);
};

// export const handleEditServer = async (
//   values: z.infer<typeof initialServerSchema>,
//   serverId: string
// ) => {
//   return await axios.patch(`/api/servers/${serverId}`, values);
// };
