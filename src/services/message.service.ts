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

interface EditMessageProps {
  socketUrl?: string;
  id?: string;
  socketQuery: any;
  values: z.infer<typeof messageSchema>;
}

export const editMessage = async ({
  socketUrl,
  id,
  socketQuery,
  values,
}: EditMessageProps) => {
  const url = qs.stringifyUrl({
    url: `${socketUrl}/${id}`,
    query: socketQuery,
  });

  return await axios.patch(url, values);
};


export const deleteMessage = async (apiUrl?: string, query?: any) => {
  const url = qs.stringifyUrl({
    url: apiUrl ?? "",
    query,
  });

  await axios.delete(url);
} 