import { z } from "zod";

export const UrlSchema = z.object({
  originalUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional(),
  customAlias: z.string().optional(),
  password: z.string().optional(),
});

export const UpdateUrlSchema = z.object({
  originalUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional(),
  customAlias: z.string().optional(),
  password: z.string().optional(),
});
