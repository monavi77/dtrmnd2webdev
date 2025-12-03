import OpenAI from "openai";
import { File } from "node:buffer";
import { PRODUCTS } from "../src/data/products.js";
import multer from "multer";

const IMAGE_MODEL = "gpt-image-1";
const IMAGE_SIZE = process.env.OPENAI_IMAGE_SIZE || "1024x1536";
const IMAGE_QUALITY = process.env.OPENAI_IMAGE_QUALITY || "auto";
const IMAGE_BACKGROUND = process.env.OPENAI_IMAGE_BACKGROUND || "auto";
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

const productMap = new Map(
  PRODUCTS.filter((product) => product.tryOn?.prompt).map((product) => [
    product.id,
    {
      prompt: product.tryOn.prompt,
      fallback: product.tryOn.sampleResult || product.image,
    },
  ])
);

const openaiClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});

export default async function handler(req, res) {
  // Handle CORS
  const origin = req.headers.origin;
  const allowedOrigin = process.env.CLIENT_ORIGIN || origin || "*";
  
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!openaiClient) {
    return res.status(500).json({
      error: "OPENAI_API_KEY is not configured on the server.",
    });
  }

  // Use multer to parse multipart form data
  upload.single("userImage")(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: "Failed to parse file upload." });
    }

    try {
      const { productId, prompt: promptOverride, fallbackImage } = req.body ?? {};
      const product = productMap.get(productId);
      const prompt = product?.prompt || promptOverride;
      const fallback = product?.fallback || fallbackImage;

      if (!prompt) {
        return res.status(400).json({
          error: "This product is not ready for try-on yet.",
        });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Please upload a selfie image." });
      }

      const instruction = [
        "You are a professional AI stylist. Blend the person in the reference photo with the described garment.",
        "Return a polished fashion photo showing the person wearing the garment naturally.",
        "Keep proportions realistic, retain the user's face and pose, and ensure high-end lighting.",
        "Frame the entire body without cropping heads or legs so the garment fit is fully visible.",
        `Garment brief: ${prompt}`,
      ].join(" ");

      const file = new File([req.file.buffer], req.file.originalname || "upload.png", {
        type: req.file.mimetype || "image/png",
      });

      const response = await openaiClient.images.edit({
        model: IMAGE_MODEL,
        image: file,
        prompt: instruction,
        size: IMAGE_SIZE,
        quality: IMAGE_QUALITY,
        background: IMAGE_BACKGROUND,
      });

      const imageData = response?.data?.[0];
      if (!imageData) {
        throw new Error("OpenAI did not return an image for this request.");
      }

      const payload = {
        provider: "openai",
        model: IMAGE_MODEL,
      };

      if (imageData.b64_json) {
        payload.imageBase64 = imageData.b64_json;
      } else if (imageData.url) {
        payload.imageUrl = imageData.url;
      } else {
        throw new Error("OpenAI did not deliver an image payload.");
      }

      return res.status(200).json(payload);
    } catch (error) {
      console.error("Try-on generation failed:", error);
      const { productId, fallbackImage } = req.body ?? {};
      const product = productMap.get(productId);
      const fallback = product?.fallback || fallbackImage;
      
      return res.status(500).json({
        error: error.message || "Unable to generate try-on right now.",
        fallbackImage: fallback,
      });
    }
  });
}
