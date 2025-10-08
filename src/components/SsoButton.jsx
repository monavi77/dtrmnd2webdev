export default function SsoButton({ type = "google" }) {
  const src = type === "google" ? "/google.svg" : "/apple.svg";
  const label =
    type === "google" ? "Sign in with Google" : "Sign in with Apple";

  return (
    <button className="sso-btn" aria-label={label}>
      <img src={src} alt={label} className="sso-icon" />
    </button>
  );
}
