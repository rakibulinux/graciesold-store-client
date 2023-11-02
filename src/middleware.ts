// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token: ", req.nextauth.token?.user?.role);

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.user?.role !== "admin"
    )
      return NextResponse.rewrite(
        new URL("/sign-in?message=You Are Not Authorized!", req.url)
      );
    if (
      req.nextUrl.pathname.startsWith("/customer") &&
      req.nextauth.token?.user?.role !== "customer"
    )
      return NextResponse.rewrite(
        new URL("/sign-in?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};
