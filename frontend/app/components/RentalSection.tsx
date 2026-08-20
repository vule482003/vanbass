import Link from "next/link";

export default function RentalSection() {
  return (
    <section className="rental-section" id="rental">
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
          <p className="section-kicker">CHO THUÊ THIẾT BỊ</p>

          <h2>
            Cần thiết bị DJ
            <br />
            <span>cho sự kiện?</span>
          </h2>

          <p>
            Tìm kiếm thiết bị phù hợp cho party, event, wedding, bar,
            studio hoặc các chương trình biểu diễn tại Đà Nẵng.
          </p>

          <ul className="check-list">
            <li>
              <span>✓</span>
              Thiết bị DJ và âm thanh đa dạng
            </li>
            <li>
              <span>✓</span>
              Hỗ trợ lựa chọn thiết bị phù hợp
            </li>
            <li>
              <span>✓</span>
              Tư vấn nhu cầu thuê theo sự kiện
            </li>
          </ul>

          <Link href="/rental" className="button button-light" style={{ alignSelf: "flex-start" }}>
            Xem thiết bị cho thuê
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}