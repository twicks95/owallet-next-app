module.exports = {
  env: {
    APP_NAME: "Owallet",
    API_BASE_URL: "http://localhost:3004/api/v1/",
    API_IMG_URL: "http://localhost:3004/api/",
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
      {
        source: "/create-pin/:id",
        destination: "/auth/create-pin/[id]",
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
      },
    ];
  },
};
