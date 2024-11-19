import fetch from "node-fetch";

export default async function handler(req, res) {
  let fileId = req.query.fileId;
  if (!fileId) return res.status(400).json({error: "File ID is required"});

  try {
    let imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    let response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(500).json({error: "Failed to fetch the image"})
    };

    let imageBuffer = await response.buffer();
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).send(imageBuffer)
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({error: "Internal server error"})
  }
}