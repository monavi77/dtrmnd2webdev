import Header from "../components/Header";
import Tabs from "../components/Tabs";

const details = [
  { label: "Name", value: "Ava Williams" },
  { label: "Email", value: "ava.williams@example.com" },
  { label: "Member Since", value: "January 2022" },
];

const shortcuts = [
  { label: "Orders", description: "Track deliveries & history" },
  { label: "Addresses", description: "Manage shipping locations" },
  { label: "Payment Methods", description: "Cards & wallets" },
  { label: "Preferences", description: "Notifications & interests" },
];

export default function Profile() {
  return (
    <>
      <Header title="Profile" />
      <section className="card" style={{ padding: 20, textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop"
          alt="User avatar"
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            objectFit: "cover",
            margin: "0 auto 12px",
            border: "3px solid var(--ring)",
          }}
        />
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: 20,
            letterSpacing: 0.4,
          }}
        >
          Ava Williams
        </h2>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
          Premium Member
        </p>
      </section>

      <section
        className="card"
        style={{ padding: 16, marginTop: 16, display: "grid", gap: 12 }}
      >
        <h3 style={{ margin: 0, fontSize: 16 }}>Account</h3>
        {details.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              color: "var(--muted)",
            }}
          >
            <span>{item.label}</span>
            <strong style={{ color: "var(--text)" }}>{item.value}</strong>
          </div>
        ))}
      </section>

      <section
        className="card"
        style={{ padding: 16, marginTop: 16, display: "grid", gap: 12 }}
      >
        <h3 style={{ margin: 0, fontSize: 16 }}>Quick Shortcuts</h3>
        {shortcuts.map((item) => (
          <button
            key={item.label}
            className="filterchip"
            style={{
              justifyContent: "space-between",
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "10px 14px",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 600, color: "var(--text)" }}>
                {item.label}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                {item.description}
              </div>
            </div>
            <span aria-hidden="true">›</span>
          </button>
        ))}
      </section>

      <button
        className="addtocart"
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 20,
          background: "#111213",
        }}
      >
        Sign Out
      </button>
      <Tabs active="profile" />
    </>
  );
}
