export default {
  devtools: { enabled: true },
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],
  axios: {
    baseURL: "http://localhost:3000", // APIのベースURLを変更
  },
  serverMiddleware: [
    { path: "/api/item", handler: "~/server/middleware/mock.js" }, // モックデータ用のミドルウェア
    { path: "/api/spotify-token", handler: "~/server/middleware/spotify.js" },
  ],
};
