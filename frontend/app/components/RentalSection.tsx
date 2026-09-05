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
          <p className="section-kicker" data-cms-key="rental.kicker" data-cms-label="Tag Kicker Cho Thuê" data-cms-type="text">{config.kicker}</p>

          <h2>
            <span data-cms-key="rental.headline_top" data-cms-label="Tiêu Đề Trên Cho Thuê" data-cms-type="text">{config.headline_top}</span>
            <br />
            <span data-cms-key="rental.headline_bottom" data-cms-label="Tiêu Đề Nổi Bật Cho Thuê" data-cms-type="text">{config.headline_bottom}</span>
          </h2>

          <p data-cms-key="rental.desc" data-cms-label="Mô Tả Cho Thuê" data-cms-type="textarea">{config.desc}</p>

          <ul className="check-list">
            {(config.features || []).map((feature, idx) => (
              <li key={idx}>
                <span>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href={
              !config.button_link || config.button_link === "/products" || config.button_link.startsWith("/rental")
                ? "/products?mode=rental"
                : config.button_link
            }
            className="button button-primary"
            style={{ alignSelf: "flex-start" }}
            data-cms-key="rental.button_text"
            data-cms-label="Chữ Nút Cho Thuê"
            data-cms-type="text"
          >
            {config.button_text || "Xem thiết bị cho thuê"}
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}