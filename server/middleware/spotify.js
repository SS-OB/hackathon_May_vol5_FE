import axios from "axios";
import qs from "qs";

export default async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  try {
    const response = await axios.post(
      tokenEndpoint,
      qs.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
      }
    );

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response.data));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Failed to fetch Spotify token" }));
  }
};
