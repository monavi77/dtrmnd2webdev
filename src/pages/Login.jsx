import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* Text matches the PDF: "Sign In", greeting, email/password, 'Forgot Password?', 
   social sign-in area, and sign-up prompt. :contentReference[oaicite:0]{index=0} */
export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("abcd.12@gmail.com"); // matches mock
  const [password, setPassword] = useState("*************");

  function submit(e) {
    e.preventDefault();
    nav("/home");
  }

  return (
    <>
      <div className="home-logo" style={{ marginBottom: 20 }}>
        <img src="/DTRMND.png" alt="DTRMND logo" style={{ height: 110 }} />
      </div>
      <form
        className="card"
        onSubmit={submit}
        style={{ maxWidth: 420, margin: "0 auto" }}
      >
        <div
          className="card__meta"
          style={{ padding: "16px 16px 0", justifyContent: "center" }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <h3 className="card__title login__title" style={{ textAlign: "center" }}>
              Hi! Welcome Back, you’ve been missed
            </h3>
          </div>
        </div>
        <div style={{ padding: 16, display: "grid", gap: 28 }}>
          <label>
            <div
              style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}
            >
              Email
            </div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <div
              style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}
            >
              Password
            </div>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="signin" type="submit">
            Sign In
          </button>
          <button type="button" className="linklike">
            Forgot Password?
          </button>
          <div style={{ textAlign: "center", color: "var(--muted)" }}>
            or sign in with
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <button
              className="pill pill--icon"
              aria-label="Sign in with Google"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt="Google logo"
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
            </button>
            <button className="pill pill--icon" aria-label="Sign in with Apple">
              <img
                src="https://pngimg.com/uploads/apple_logo/apple_logo_PNG19667.png"
                alt="Apple logo"
                style={{ width: 60, height: 62, objectFit: "contain" }}
              />
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "var(--muted)" }}>
              Don’t have an account?{" "}
            </span>
            <button type="button" className="linklike">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
