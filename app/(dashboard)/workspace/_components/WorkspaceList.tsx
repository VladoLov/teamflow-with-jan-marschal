"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { orpc } from "@/lib/orpc";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Workspace {
  id: string;
  name: string;
  avatar: string;
}

//after we add our queries, we can remove this mock data
/* const workspaces: Workspace[] = [
  { id: "1", name: "Organization One", avatar: "O1" },
  { id: "2", name: "Organization Two", avatar: "O2" },
  { id: "3", name: "Organization Three", avatar: "O3" },
]; */

const colorCombinations = [
  "bg-red-500 hover:bg-red-600 text-white",
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-green-500 hover:bg-green-600 text-white",
  "bg-yellow-500 hover:bg-yellow-600 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-emerald-500 hover:bg-emerald-600 text-white",
  "bg-rose-500 hover:bg-rose-600 text-white",
  "bg-amber-500 hover:bg-amber-600 text-white",
  "bg-cyan-500 hover:bg-cyan-600 text-white",
  "bg-indigo-500 hover:bg-indigo-600 text-white",
];

const getWorkspaceColor = (id: string) => {
  const charSum = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const colorIndex = charSum % colorCombinations.length;

  return colorCombinations[colorIndex];
};

export function WorkspaceList() {
  const {
    data: { workspaces, currentWorkspace },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {workspaces.map((work) => {
          const isActive = currentWorkspace.orgCode === work.id;
          return (
            <Tooltip key={work.id}>
              <TooltipTrigger asChild>
                <LoginLink orgCode={work.id}>
                  <Button
                    asChild
                    size="icon"
                    className={cn(
                      "size-12 transition-all duration-200",
                      getWorkspaceColor(work.id),
                      isActive ? "rounded-lg" : "rounded-xl hover:rounded-lg"
                    )}
                  >
                    <span className="text-sm font-semibold">{work.avatar}</span>
                  </Button>
                </LoginLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>
                  {work.name} {isActive && "(Current)"}
                </p>
              </TooltipContent>
            </Tooltip>
          );
          /*  <Tooltip key={work.id}>
             <TooltipTrigger asChild>
               <Button
                 asChild
                 size="icon"
                 className={cn(
                   "size-12 transition-all duration-200",
                   getWorkspaceColor(work.id)
                 )}
               >
                 <span className="text-sm font-semibold">{work.avatar}</span>
               </Button>
             </TooltipTrigger>
             <TooltipContent side="right">
               <p>{work.name}</p>
             </TooltipContent>
           </Tooltip> */
        })}
      </div>
    </TooltipProvider>
  );
}
