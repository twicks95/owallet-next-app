module.exports = {
  env: {
    APP_NAME: "Owallet",
    API_BASE_URL: "https://owallet-app.herokuapp.com/api/v1/",
    API_IMG_URL: "https://owallet-app.herokuapp.com/api/",
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
        source: "/create-pin",
        destination: "/auth/create-pin",
      },
      {
        source: "/create-pin/success",
        destination: "/auth/create-pin/success",
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
      },
    ];
  },
};
