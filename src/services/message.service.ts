import { messageFileSchema, messageSchema } from "@/schemas";
import axios from "axios";
import qs from "query-string";
import { z } from "zod";

export const newMessage = async (
  values: z.infer<typeof messageSchema>,
  apiUrl: string,
  query: Record<string, any>
) => {
  const url = qs.stringifyUrl({
    url: apiUrl,
    query,
  });

  return await axios.post(url, values);
};

export const newMessageFile = async (
  values: z.infer<typeof messageFileSchema>,
  apiUrl?: string,
  query?: Record<string, any>
) => {
  const url = qs.stringifyUrl({
    url: apiUrl ?? "",
    query,
  });

  return await axios.post(url, {
    ...values,
    content: values.fileUrl,
  });
};
