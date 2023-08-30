import axios from "axios";
import { z } from "zod";
import { initialServerSchema } from "../validations";

export const handleCreateServer = async (
  values: z.infer<typeof initialServerSchema>
) => {
  return await axios.post("/api/servers", values);
};

export const handleEditServer = async (
  values: z.infer<typeof initialServerSchema>,
  serverId: string
) => {
  return await axios.patch(`/api/servers/${serverId}`, values);
};
