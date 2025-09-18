import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

// Matchers for specific routes
const isSignInPage = createRouteMatcher(['/sign-in']);
const isProtectedRoute = createRouteMatcher(['/dashboard', '/protected']);

// Middleware to handle authentication-based redirects
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  // If user is authenticated and tries to access sign-in, redirect to dashboard
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, '/dashboard');
  }
  // If user is not authenticated and tries to access protected route, redirect homepage
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, '/');
  }
});

// Run middleware on all routes except static assets and Next.js internals
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};