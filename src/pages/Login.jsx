import Header from "../components/Header";
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
    nav("/women"); // go to home after sign-in
  }

  return (
    <>
      <Header title="Sign In" showBack={false} />
      <form
        className="card"
        onSubmit={submit}
        style={{ maxWidth: 420, margin: "0 auto" }}
      >
        <div className="card__meta" style={{ padding: "16px 16px 0" }}>
          <div>
            <h3 className="card__title">
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
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <button className="pill">Google</button>
            <button className="pill">Apple</button>
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
