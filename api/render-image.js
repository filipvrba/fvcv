import fetch from "node-fetch";

export default async function handler(req, res) {
  let fileId = req.query["file-id"];
  if (!fileId) return res.status(400).json({error: "File ID is required"});

  try {
    let imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    let response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(500).json({error: "Failed to fetch the image"})
    };

    let imageBuffer = await response.buffer();
    let contentType = response.headers.get("content-type");
    let base64Image = `data:${contentType};base64,${imageBuffer.toString("base64")}`;
    res.status(200).json({base64: base64Image})
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({error: "Internal server error"})
  }
}