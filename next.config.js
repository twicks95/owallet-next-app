module.exports = {
  env: {
    APP_NAME: "Owallet",
    API_BASE_URL: "http://localhost:3004/api/v1",
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
    ];
  },
};
