import { MemberRole } from "@prisma/client";
import axios from "axios";
import qs from "query-string";

export const changeRole = async (
  memberId: string,
  serverId: string,
  role: MemberRole
) => {
  const url = qs.stringifyUrl({
    url: `/api/members/${memberId}`,
    query: {
      serverId: serverId,
    },
  });

  return await axios.patch(url, { role });
};

export const deleteMemberToServer = async (
  memberId: string,
  serverId: string
) => {
  const url = qs.stringifyUrl({
    url: `/api/members/${memberId}`,
    query: {
      serverId: serverId,
    },
  });

  return await axios.delete(url);
};
