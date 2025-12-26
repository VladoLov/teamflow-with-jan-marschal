import { createWorkspace, listWorkspaces } from "./workspace";

export const router = {
  workspace: {
    list: listWorkspaces,
    create: createWorkspace,
  },
};

export type Router = typeof router;

export type RouterClient<T extends Router> = {
  workspace: {
    list: T["workspace"]["list"];
    create: T["workspace"]["create"];
  };
};
