import { toast } from "sonner";
import { useState } from "react";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";


export const CreateWorkspaceModal = () => {
    const router = useRouter();
    const [open, setOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState("");

    const { mutate, isPending } = useCreateWorkspace();

    const handleClose = (newOpen: boolean) => {
        setOpen(newOpen); 
        if (!newOpen) setName(""); 
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({ name }, {
            onSuccess: (workspaceId) => {
                console.log("New workspace created with ID:", workspaceId);

                if (workspaceId && typeof workspaceId === "string") {
                    router.push(`/workspace/${workspaceId}`);
                    handleClose(false);
                } else {
                    toast.error("Invalid workspace ID received");
                    console.error("Invalid workspace ID:", workspaceId);
                }
            },
        });
    }; 

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="workspace name e.g. 'Work', 'Personal', 'Home'"
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
