"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";

import { useGetWrokspaces } from "@/features/workspace/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "src/features/store/use-create-workspace-modal";


export default function Home() {
  const router = useRouter();
  const [ open, setOpen ] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWrokspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if(isLoading) return;
    if (workspaceId) {
      console.log("Redirecting to workspace"); // Debugging

      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
};