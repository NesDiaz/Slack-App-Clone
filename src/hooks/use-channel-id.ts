"use client";

import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";

export const useChannelId = () => {
    const params = useParams();
    return params.ChannelId as Id<"channels">;
};