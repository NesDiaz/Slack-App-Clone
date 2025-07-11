"use client";

import { useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Loader } from "lucide-react";


export default function Home() {
  const router = useRouter();
  const [ open, setOpen ] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
  
    if (workspaceId && typeof workspaceId === "string") {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
      console.log(workspaceId);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);
  
  
  return (
    <div className="h-full flex items-center justify-center">
    <Loader className="size-6  animate-spin text-muted-foreground" />
</div>
  );
  
};