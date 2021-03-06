import cookies from "next-cookies";

// for login page (public)
export function unauthorizationPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/dashboard",
        })
        .end();
    }
    return resolve("unauthorized");
  });
}

// for all pages after login (private)
export function authorizationPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (!allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/login",
        })
        .end();
    }

    return resolve({
      token: allCookies.token,
      userId: allCookies.userId,
    });
  });
}
