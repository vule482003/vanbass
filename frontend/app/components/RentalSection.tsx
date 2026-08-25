import Link from "next/link";
import { DEFAULT_HOME_DATA, RentalSectionConfig } from "../types/home_config";

interface RentalSectionProps {
  config?: RentalSectionConfig;
}

export default function RentalSection({
  config = DEFAULT_HOME_DATA.rental,
}: RentalSectionProps) {
  return (
    <section className="rental-section reveal-on-scroll" id="rental">
      <div className="container rental-grid">
        <div className="rental-visual">
          <div className="rental-grid-pattern" />

          <div className="rental-card-main">
            <span>VANBASS RENTAL</span>
            <strong>
              DJ
              <br />
              RENTAL
            </strong>
            <small>ĐÀ NẴNG / VIETNAM</small>
          </div>

          <div className="rental-card-small">
            <span>AVAILABLE</span>
            <strong>DJ</strong>
            <small>EQUIPMENT</small>
          </div>
        </div>

        <div className="rental-content">
          <p className="section-kicker">{config.kicker}</p>

          <h2>
            {config.headline_top}
            <br />
            <span>{config.headline_bottom}</span>
          </h2>

          <p>{config.desc}</p>

          <ul className="check-list">
            {(config.features || []).map((feature, idx) => (
              <li key={idx}>
                <span>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <Link href={config.button_link || "/products"} className="button button-light" style={{ alignSelf: "flex-start" }}>
            {config.button_text || "Xem thiết bị cho thuê"}
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}