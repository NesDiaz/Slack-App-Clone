import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useWorkspaceId = () => {
    const params = useParams();
    console.log("Params from useParams():", params); // Debugging

    return params.workspaceId as Id<"workspaces">;
};
