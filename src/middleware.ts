// // // import { NextResponse } from "next/server";
// // // import { NextRequest } from "next/server";
// // // import { getCurrentUser } from "./services/apiAuth";
// // // import { cookies } from "next/headers";

// // // type Role = "user" | "admin";

// // // const AuthRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

// // // const roleBasedRoutes: Record<Role, (string | RegExp)[]> = {
// // //   user: [/^\/dashboard\/user/, "/feeds"],
// // //   admin: [/^\/dashboard\/admin/, "/feeds"],
// // // };

// // // export async function middleware(request: NextRequest) {
// // //   const { pathname } = request.nextUrl;
// // //   const token = cookies().get("token")?.value;

// // //   if (!token) {
// // //     if (AuthRoutes.includes(pathname)) {
// // //       return NextResponse.next();
// // //     } else {
// // //       return NextResponse.redirect(
// // //         new URL(`/sign-in?redirect=${pathname}`, request.url)
// // //       );
// // //     }
// // //   }

// // //   const user = await getCurrentUser();

// // //   if (user.role && roleBasedRoutes[user.role as Role]) {
// // //     const routes = roleBasedRoutes[user.role as Role];
// // //     if (
// // //       routes.some((route) =>
// // //         typeof route === "string"
// // //           ? pathname.startsWith(route)
// // //           : pathname.match(route)
// // //       )
// // //     ) {
// // //       return NextResponse.next();
// // //     }
// // //   }

// // //   return NextResponse.redirect(new URL("/", request.url));
// // // }

// // // export const config = {
// // //   matcher: [
// // //     "/dashboard/:path*",
// // //     "/feeds",
// // //     "/sign-in",
// // //     "/sign-up",
// // //     "/forgot-password",
// // //   ],
// // // };

// // import { NextResponse } from "next/server";
// // import { NextRequest } from "next/server";
// // import { getCurrentUser } from "./services/apiAuth";
// // import { cookies } from "next/headers";

// // type Role = "user" | "admin";

// // const AuthRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

// // const roleBasedRoutes: Record<Role, (string | RegExp)[]> = {
// //   user: [/^\/dashboard\/user/, "/feeds"],
// //   admin: [/^\/dashboard\/admin/, "/feeds"],
// // };

// // export async function middleware(request: NextRequest) {
// //   const { pathname } = request.nextUrl;
// //   const token = cookies().get("token")?.value;

// //   // Check if user is not logged in (no token)
// //   if (!token) {
// //     // Allow access to auth routes
// //     if (AuthRoutes.includes(pathname)) {
// //       return NextResponse.next();
// //     }

// //     // Redirect unauthenticated users accessing /user or /post/[id] to sign-up
// //     if (pathname === "/user" || pathname.startsWith("/post/")) {
// //       return NextResponse.redirect(
// //         new URL(`/sign-in?redirect=${pathname}`, request.url)
// //       );
// //     }

// //     // Redirect other unauthenticated requests to sign-in
// //     return NextResponse.redirect(
// //       new URL(`/sign-in?redirect=${pathname}`, request.url)
// //     );
// //   }

// //   // Fetch authenticated user information
// //   const user = await getCurrentUser();

// //   // Allow access to /user and /post/[id] for all logged-in users
// //   if (pathname === "/user" || pathname.startsWith("/post/")) {
// //     return NextResponse.next();
// //   }

// //   // Role-based route handling for dashboard and feeds
// //   if (user.role && roleBasedRoutes[user.role as Role]) {
// //     const routes = roleBasedRoutes[user.role as Role];
// //     if (
// //       routes.some((route) =>
// //         typeof route === "string"
// //           ? pathname.startsWith(route)
// //           : pathname.match(route)
// //       )
// //     ) {
// //       return NextResponse.next();
// //     }
// //   }

// //   // Redirect users without the right role-based access
// //   return NextResponse.redirect(new URL("/", request.url));
// // }

// // export const config = {
// //   matcher: [
// //     "/dashboard/:path*",
// //     "/feeds",
// //     "/sign-in",
// //     "/sign-up",
// //     "/forgot-password",
// //     "/user", // Include /user in the matcher
// //     "/post/:path*", // Include /post/:path* for dynamic post routes
// //   ],
// // };

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getCurrentUser } from "./services/apiAuth";
// import { cookies } from "next/headers";

// type Role = "user" | "admin";

// const AuthRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

// const roleBasedRoutes: Record<Role, (string | RegExp)[]> = {
//   user: [/^\/dashboard\/user/, "/feeds"],
//   admin: [/^\/dashboard\/admin/, "/feeds"],
// };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookieStore = await cookies(); // Await cookies to get the cookie store
//   const token = cookieStore.get("token")?.value;

//   // Check if user is not logged in (no token)
//   if (!token) {
//     // Allow access to auth routes
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     }

//     // Redirect unauthenticated users accessing /user or /post/[id] to sign-up
//     if (pathname === "/user" || pathname.startsWith("/post/")) {
//       return NextResponse.redirect(
//         new URL(`/sign-in?redirect=${pathname}`, request.url)
//       );
//     }

//     // Redirect other unauthenticated requests to sign-in
//     return NextResponse.redirect(
//       new URL(`/sign-in?redirect=${pathname}`, request.url)
//     );
//   }

//   // Fetch authenticated user information
//   const user = await getCurrentUser();

//   // Allow access to /user and /post/[id] for all logged-in users
//   if (pathname === "/user" || pathname.startsWith("/post/")) {
//     return NextResponse.next();
//   }

//   // Role-based route handling for dashboard and feeds
//   if (user.role && roleBasedRoutes[user.role as Role]) {
//     const routes = roleBasedRoutes[user.role as Role];
//     if (
//       routes.some((route) =>
//         typeof route === "string"
//           ? pathname.startsWith(route)
//           : pathname.match(route)
//       )
//     ) {
//       return NextResponse.next();
//     }
//   }

//   // Redirect users without the right role-based access
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/feeds",
//     "/sign-in",
//     "/sign-up",
//     "/forgot-password",
//     "/user", // Include /user in the matcher
//     "/post/:path*", // Include /post/:path* for dynamic post routes
//   ],
// };

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/apiAuth";
import { cookies } from "next/headers";

type Role = "user" | "admin";

const AuthRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

const roleBasedRoutes: Record<Role, (string | RegExp)[]> = {
  user: [/^\/dashboard\/user/, "/feeds"],
  admin: [/^\/dashboard\/admin/, "/feeds"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies(); // Await cookies to get the cookie store
  const token = cookieStore.get("token")?.value;

  // Check if user is not logged in (no token)
  if (!token) {
    // Allow access to auth routes
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users accessing /user, /post/[id], or /payment to sign-in
    if (
      pathname === "/user" ||
      pathname.startsWith("/post/") ||
      pathname === "/payment"
    ) {
      return NextResponse.redirect(
        new URL(`/sign-in?redirect=${pathname}`, request.url)
      );
    }

    // Redirect other unauthenticated requests to sign-in
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${pathname}`, request.url)
    );
  }

  // Fetch authenticated user information
  const user = await getCurrentUser();

  // Allow access to /user, /post/[id], and /payment for all logged-in users
  if (
    pathname === "/user" ||
    pathname.startsWith("/post/") ||
    pathname === "/payment"
  ) {
    return NextResponse.next();
  }

  // Role-based route handling for dashboard and feeds
  if (user.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];
    if (
      routes.some((route) =>
        typeof route === "string"
          ? pathname.startsWith(route)
          : pathname.match(route)
      )
    ) {
      return NextResponse.next();
    }
  }

  // Redirect users without the right role-based access
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/feeds",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/user", // Include /user in the matcher
    "/post/:path*", // Include /post/:path* for dynamic post routes
    "/payment", // Include /payment in the matcher
  ],
};
