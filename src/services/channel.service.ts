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

export const getChannelById = async (channelId: string) =>
  await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

export const getInitialChannel = async (
  serverId: string,
  profileId: string
) => {
  return await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
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

export const editChannel = async (
  values: z.infer<typeof channelSchema>,
  channelId: string,
  serverId: string
) => {
  const url = qs.stringifyUrl({
    url: `/api/channels/${channelId}`,
    query: {
      serverId: serverId,
    },
  });
  return await axios.patch(url, values);
};

export const deleteChannel = async (channelId: string, serverId: string) => {
  const url = qs.stringifyUrl({
    url: `/api/channels/${channelId}`,
    query: {
      serverId: serverId,
    },
  });

  return await axios.delete(url);
};
