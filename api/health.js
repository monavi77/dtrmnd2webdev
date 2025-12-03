const IMAGE_MODEL = "gpt-image-1";

export default function handler(req, res) {
  // Handle CORS
  const origin = req.headers.origin;
  const allowedOrigin = process.env.CLIENT_ORIGIN || origin || "*";
  
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({ ok: true, model: IMAGE_MODEL });
}
