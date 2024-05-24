import { NextRequest, NextResponse } from "next/server";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs, { ssr: true });

// Function to create a route matcher for protected routes
const createRouteMatcher = (routes: string[]) => {
  return (path: string) =>
    routes.some((route) => new RegExp(`^${route}$`).test(path));
};

// Define protected routes
const isProtectedRoute = createRouteMatcher(["/account(.*)"]);

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Authentication check
  let authenticated = false;
  try {
    const session = await fetchAuthSession();
    authenticated = !!session;
  } catch (error) {
    console.error("Error fetching current user:", error);
  }

  const isAuthRoute =
    request.nextUrl.pathname.includes("/login") ||
    request.nextUrl.pathname.includes("/register") ||
    request.nextUrl.pathname.includes("/forgot-password") ||
    request.nextUrl.pathname.includes("/reset-password") ||
    request.nextUrl.pathname.includes("/confirm-signup") ||
    request.nextUrl.pathname.includes("/resend-code");

  // Redirect authenticated users from sign-in/sign-up pages to the dashboard
  if (authenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect non-authenticated users to login page
  if (!authenticated && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue with the normal response if authenticated and no intl issues
  return response;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
