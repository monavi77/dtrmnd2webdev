import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SsoButton from "../components/SsoButton";

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
      <Header title="Sign In" className="card__meta" showBack={false} />

      <form
        className="card"
        onSubmit={submit}
        style={{ maxWidth: 420, margin: "0 auto" }}
      >
        <div className="card__meta" style={{ padding: "16px 16px 0" }}>
          <h3 className="login-greeting">
            Hi! Welcome Back, you’ve been missed
          </h3>
        </div>

        <div style={{ padding: 16, display: "grid", gap: 12 }}>
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
          <button className="addtocart" type="submit">
            Sign In
          </button>
          <button type="button" className="linklike">
            Forgot Password?
          </button>
          <div style={{ textAlign: "center", color: "var(--muted)" }}>
            or sign in with
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <SsoButton type="google" />
            <SsoButton type="apple" />
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
