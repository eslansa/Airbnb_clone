import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  // Cast cookieValues to ReadonlyRequestCookies if necessary
  const cookieValues = request.cookies as ReadonlyRequestCookies;

  // Pass the readonly cookies to createServerComponentClient
  const supabase = createServerComponentClient({
    cookies: () => cookieValues,
  });

  const { data } = await supabase.auth.getUser();

  if (data.user == null) {
    return NextResponse.redirect(
      new URL("/?error=Please login first to access this route.", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-home", "/dashboard"],
};
