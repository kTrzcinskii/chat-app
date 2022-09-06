import { z } from "zod";

export const CreateChatroomSchema = z.object({
  name: z.string().min(1, "Chatroom name is required"),
  privacy: z.enum(["PUBLIC", "PRIVATE"]),
});

export type ICreateChatroomSchema = z.infer<typeof CreateChatroomSchema>;
