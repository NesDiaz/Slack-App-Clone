import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const listTasks = query({
    handler: async (ctx) => {
        return await ctx.db.query("tasks").collect()
    }
})
export const addTask = mutation({
    args: {
        name: v.string(),
        userId: v.id("users"), // Ensure userId is provided
        workspaceId: v.id("workspaces"), // Ensure workspaceId is provided
        dueDate: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
        await ctx.db.insert("tasks", {
            name: args.name,
            userId: args.userId, // Now correctly included
            workspaceId: args.workspaceId,
            completed: false, // Defaulting to false since it's required
            dueDate: args.dueDate,
        });
    }
});
