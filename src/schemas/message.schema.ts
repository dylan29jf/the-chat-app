import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().min(1),
});

export const messageFileSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required.",
  }),
});
