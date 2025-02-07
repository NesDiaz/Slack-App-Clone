import { 
    convexAuthNextjsMiddleware, 
    createRouteMatcher, 
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect, 
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request) => {
    const isAuthenticated = await isAuthenticatedNextjs(request);

    if (!isPublicPage(request) && !isAuthenticated) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }

    if (isPublicPage(request) && isAuthenticated) {
        return nextjsMiddlewareRedirect(request, "/");
    }
});

export const config = {
    // Apply middleware to all routes except static assets
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
