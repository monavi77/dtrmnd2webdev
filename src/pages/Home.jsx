import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";

const heroSpreads = [
  {
    heading: "Our Favorites",
    subheading: "DTRMND",
    cta: "Explore now",
    video: "/loop.mp4",
    image:
      "https://images.unsplash.com/photo-1516826435551-36c121d74dc1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    heading: "Outerwear Shop",
    subheading: "DTRMND Studio",
    cta: "Discover layers",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    heading: "Holiday Dressing",
    subheading: "Evening capsule",
    cta: "Shop the edit",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-landing">
        <div className="home-logo">
          <img src="/DTRMND.png" alt="DTRMND logo" />
        </div>
        <div className="home-banner">
          <span>For delivery by December 24, see our</span>
          <button type="button" onClick={() => navigate("/browse")}>
            Holiday Delivery Schedule
          </button>
        </div>

        <div className="home-stack">
          {heroSpreads.map((hero) => (
            <section
              key={hero.heading}
              className={`home-hero ${hero.video ? "home-hero--video" : ""}`}
              style={{ backgroundImage: `url(${hero.image})` }}
            >
              {hero.video && (
                <video
                  className="home-hero__video"
                  src={hero.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={hero.image}
                />
              )}
              <div className="home-hero__overlay" />
              <div className="home-hero__content">
                <p className="home-hero__brand">{hero.subheading}</p>
                <h1>{hero.heading}</h1>
                <button
                  type="button"
                  className="home-hero__cta"
                  onClick={() => navigate("/browse")}
                >
                  {hero.cta} <ArrowRight size={18} />
                </button>
              </div>
              <button
                type="button"
                className="home-hero__control"
                onClick={() => navigate("/browse")}
              >
                <Play size={16} />
              </button>
            </section>
          ))}
        </div>
      </div>
      <Tabs active="home" />
    </>
  );
}
