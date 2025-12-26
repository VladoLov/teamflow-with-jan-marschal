import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace name is required")
    .max(50, "Workspace name is too long"),
});

export type WorkspaceSchemaType = z.infer<typeof workspaceSchema>;
