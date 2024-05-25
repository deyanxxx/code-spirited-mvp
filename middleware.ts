// middleware.ts
import { NextRequest, NextResponse } from "next/server";

import { fetchAuthSession } from "aws-amplify/auth/server";

import { runWithAmplifyServerContext } from "@/utils/amplify-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const isAuthRoute = [
    "/login",
    "/register",
    "/forgot-password",
    "/rest-password",
    "/confirm",
    "/resend-code",
  ].some((route) => request.nextUrl.pathname.includes(route));

  const isProtectedRoute = ["/account", "/p2p-coding-bootcamp/create"].some(
    (route) => request.nextUrl.pathname.startsWith(route)
  );

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  if (authenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!authenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
  //   return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
