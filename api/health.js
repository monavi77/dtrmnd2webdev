const IMAGE_MODEL = "gpt-image-1";

export default function handler(req, res) {
  // Handle CORS - allow all Vercel deployments
  const origin = req.headers.origin;
  
  // Allow if origin is a Vercel domain, or use CLIENT_ORIGIN if set, otherwise allow all
  let allowedOrigin = "*";
  if (process.env.CLIENT_ORIGIN) {
    allowedOrigin = process.env.CLIENT_ORIGIN;
  } else if (origin && (origin.includes("vercel.app") || origin.includes("localhost"))) {
    allowedOrigin = origin;
  }
  
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
