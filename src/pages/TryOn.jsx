import { useEffect, useMemo, useRef, useState } from "react";
import { ImageIcon, Info, Loader2, Sparkles, Upload } from "lucide-react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { useCart } from "../context/CartContext";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB
// Use relative path by default (works with any deployment URL)
// Only use VITE_TRYON_ENDPOINT if explicitly set to a different endpoint
const envEndpoint = import.meta.env.VITE_TRYON_ENDPOINT?.trim();
const TRY_ON_ENDPOINT = envEndpoint || "/api/try-on";

const photoTips = [
  "Face the camera with even lighting (no harsh backlight).",
  "Leave a little space around your shoulders so garments can be composed cleanly.",
  "Neutral backgrounds help the model keep focus on you.",
];

export default function TryOn() {
  const { items: cartItems } = useCart();
  const tryOnProducts = useMemo(() => {
    const seen = new Set();
    const unique = [];
    cartItems.forEach((item) => {
      const product = item?.product;
      if (!product || seen.has(product.id)) return;
      seen.add(product.id);
      unique.push(product);
    });
    return unique;
  }, [cartItems]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [photoAspect, setPhotoAspect] = useState(null);
  const [resultUrl, setResultUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | generating | success | error
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!tryOnProducts.length) {
      setSelectedProduct(null);
      return;
    }
    setSelectedProduct((current) => {
      if (current && tryOnProducts.some((product) => product.id === current.id)) {
        return current;
      }
      return tryOnProducts[0];
    });
  }, [tryOnProducts]);

  const canGenerate = Boolean(
    selectedProduct && userImage && status !== "generating"
  );
  const isMockMode = !TRY_ON_ENDPOINT;

  const helperText = useMemo(() => {
    if (!userImage) return "Upload a selfie that clearly shows the garment area you want to style.";
    if (!selectedProduct) return "Pick a product to try.";
    if (status === "generating") return "Blending your look with the garment. This can take up to 10 seconds.";
    if (status === "success") return "Try another fit or download this render.";
    if (status === "error") return "We hit a snag. Adjust your photo and try again.";
    return "All set. Hit Generate Try-On to see the look.";
  }, [userImage, selectedProduct, status]);

  const handleFileSelection = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Images must be 8 MB or smaller.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    const probe = new Image();
    probe.onload = () => {
      if (probe.naturalWidth && probe.naturalHeight) {
        setPhotoAspect(probe.naturalWidth / probe.naturalHeight);
      } else {
        setPhotoAspect(null);
      }
    };
    probe.onerror = () => {
      setPhotoAspect(null);
    };
    probe.src = url;
    setUserImage(file);
    setError("");
    setResultUrl("");
    setStatus("idle");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    handleFileSelection(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    handleFileSelection(file);
  };

  const handleGenerate = async () => {
    if (!canGenerate) {
      setError("Upload a photo and pick a product before generating.");
      return;
    }
    setStatus("generating");
    setError("");
    try {
      const imageUrl = await requestTryOn({
        file: userImage,
        product: selectedProduct,
        endpoint: TRY_ON_ENDPOINT,
        prompt: getTryOnPrompt(selectedProduct),
        fallbackImage: getFallbackImage(selectedProduct),
      });
      setResultUrl(imageUrl);
      setStatus("success");
    } catch (err) {
      if (err.fallbackImage) {
        setResultUrl(err.fallbackImage);
        setStatus("success");
        setError(
          err.message ||
            "AI is busy right now. Showing a curated render for inspiration."
        );
        return;
      }
      setStatus("error");
      setError(err.message || "Unable to generate a try-on right now.");
    }
  };

  const resetUpload = () => {
    setUserImage(null);
    setResultUrl("");
    setStatus("idle");
    setError("");
    setPhotoAspect(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return "";
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <Header title="Virtual Try-On" />
      <section className="tryon__hero">
        <div className="tryon__hero-copy">
          <p className="eyebrow">AI STYLIST</p>
          <h2>
            Drop your photo,
            <br />
            get the fit.
          </h2>
          <p>
            Upload a full body image, pick any DTRMND piece, and let our OpenAI powered
            stylist show how it looks on you.
          </p>
        </div>
        <Sparkles size={48} className="tryon__hero-icon" />
      </section>

      {isMockMode && (
        <div className="tryon__info">
          <Info size={16} />
          <p>
            No backend endpoint configured. We&apos;ll return curated sample
            renders so you can finish the UI. Set{" "}
            <code>VITE_TRYON_ENDPOINT</code> to hook up your OpenAI function.
          </p>
        </div>
      )}

      <section className="tryon__panel tryon__upload">
        <div
          className={`tryon__dropzone ${
            previewUrl ? "tryon__dropzone--filled" : ""
          }`}
          style={
            previewUrl && photoAspect ? { aspectRatio: photoAspect } : undefined
          }
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Uploaded preview" />
          ) : (
            <div className="tryon__dropzone-empty">
              <Upload size={28} />
              <p>Drag an image or tap to upload</p>
              <span>PNG or JPG, max 8 MB</span>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </div>
        <div className="tryon__upload-meta">
          <div>
            <p className="eyebrow">Photo tips</p>
            <ul>
              {photoTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          {userImage ? (
            <button className="ghost-btn" type="button" onClick={resetUpload}>
              Replace photo
            </button>
          ) : null}
        </div>
      </section>

      <section className="tryon__panel">
        <div className="tryon__panel-head">
          <div>
            <p className="eyebrow">Product</p>
            <h3>Pick something from your bag</h3>
          </div>
          {/* {selectedProduct && (
            <p className="tryon__prompt">
              Prompt seed: {getTryOnPrompt(selectedProduct)}
            </p>
          )} */}
        </div>
        <div className="tryon__product-grid">
          {tryOnProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              className={`tryon__product-card ${
                selectedProduct?.id === product.id
                  ? "tryon__product-card--active"
                  : ""
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <img src={product.image} alt={product.title} />
              <div>
                <p>{product.title}</p>
                <span>{getTryOnNote(product)}</span>
              </div>
            </button>
          ))}
        </div>
        {tryOnProducts.length === 0 && (
          <p className="tryon__status">
            Add an item to your bag to preview it on your photo.
          </p>
        )}
      </section>

      <section className="tryon__panel tryon__action">
        <div>
          <p className="eyebrow">Status</p>
          <p className="tryon__status">{helperText}</p>
        </div>
        <button
          className="primary-btn"
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate}
        >
          {status === "generating" ? (
            <>
              <Loader2 size={18} className="spin" />
              Generating
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate try-on
            </>
          )}
        </button>
      </section>
      {error && <p className="tryon__error">{error}</p>}

      <section className="tryon__panel tryon__result">
        <div
          className="tryon__result-view"
          style={photoAspect ? { aspectRatio: photoAspect } : undefined}
        >
          {resultUrl ? (
            <img src={resultUrl} alt="Generated try-on result" />
          ) : (
            <div className="tryon__placeholder">
              <ImageIcon size={36} />
              <p>Your AI render will appear here.</p>
            </div>
          )}
        </div>
        {resultUrl && (
          <div className="tryon__result-actions">
            <a href={resultUrl} download target="_blank" rel="noreferrer">
              Download
            </a>
            <button type="button" className="ghost-btn" onClick={() => setResultUrl("")}>
              Clear result
            </button>
          </div>
        )}
      </section>

      <Tabs active="tryon" />
    </>
  );
}

async function requestTryOn({ file, product, endpoint, prompt, fallbackImage }) {
  if (!file || !product) {
    throw new Error("Upload a photo and select a product first.");
  }
  if (endpoint) {
    const payload = new FormData();
    payload.append("userImage", file);
    payload.append("productId", product.id);
    if (prompt) payload.append("prompt", prompt);
    if (fallbackImage) payload.append("fallbackImage", fallbackImage);
    payload.append("title", product.title || "");
    payload.append("tag", product.tag || "");
    const response = await fetch(endpoint, {
      method: "POST",
      body: payload,
    });

    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      const error = new Error(
        result?.error || "OpenAI endpoint returned an error."
      );
      if (result?.fallbackImage) error.fallbackImage = result.fallbackImage;
      throw error;
    }

    if (result?.imageUrl) return result.imageUrl;
    if (result?.imageBase64)
      return `data:image/png;base64,${result.imageBase64}`;
    throw new Error("The try-on endpoint did not send back an image.");
  }

  // Mocked response for local UI development.
  await new Promise((resolve) => {
    setTimeout(resolve, 1800);
  });
  return getFallbackImage(product);
}

function getTryOnPrompt(product) {
  if (product?.tryOn?.prompt) return product.tryOn.prompt;
  const descriptor = [product?.title, product?.tag].filter(Boolean).join(" ");
  return [
    "Editorial fashion portrait of a confident adult wearing the",
    descriptor || "latest DTRMND piece",
    "studio lighting, clean backdrop, full garment in frame.",
  ].join(" ");
}

function getTryOnNote(product) {
  return product?.tryOn?.note || product?.tag || "New drop";
}

function getFallbackImage(product) {
  return product?.tryOn?.sampleResult || product?.image;
}
