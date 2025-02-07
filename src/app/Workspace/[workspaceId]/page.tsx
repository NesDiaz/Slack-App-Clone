"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
    const workspaceId = useWorkspaceId();

    console.log("Workspace ID:", workspaceId); // Debugging

    return (
        <div>
            ID: {workspaceId || "No ID found"}
        </div>
    );
};

export default WorkspaceIdPage;



// interface WorkspaceIdPageProps {
//     params: {
//         workspaceId: string;
//     };
// };

// const WorkspaceIdPage = ({ params }:  WorkspaceIdPageProps) => {
//     return (
//         <div>
//             ID: {params.workspaceId}
//         </div>
//     );
// };

// export default WorkspaceIdPage;


