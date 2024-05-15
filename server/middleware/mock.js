// server/middleware/mock.js

export default function (req, res, next) {
  const data = [
    {
      id: 1,
      music_id: "example-music-id-1",
      memory_date: "2023-05-16T09:12:33.001Z",
      diary: "今日は楽しかった",
      image_path: "https://www.example.com/image1.jpg",
    },
    {
      id: 2,
      music_id: "example-music-id-2",
      memory_date: "2023-05-15T09:12:33.001Z",
      diary: "昨日は疲れた",
      image_path: "https://www.example.com/image2.jpg",
    },
  ];

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
