import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authPath = "/auth/sign-in";

  if (user && req.nextUrl.pathname === authPath) {
    return NextResponse.redirect(new URL("/journal", req.url));
  }

  if (!user && req.nextUrl.pathname !== authPath) {
    return NextResponse.redirect(new URL(authPath, req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
