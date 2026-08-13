import Link from "next/link";

export default function LocalCTA() {
  return (
    <section className="local-section">
        <div className="container local-content">
          <p className="section-kicker">VANBASS / ĐÀ NẴNG</p>

          <h2>
            Tìm thiết bị DJ
            <br />
            <span>tại Đà Nẵng.</span>
          </h2>

          <p>
            Khám phá thiết bị DJ, mixer, loa và các thiết bị âm thanh cho
            nhu cầu sử dụng cá nhân, studio, sự kiện và giải trí.
          </p>

          <div className="local-actions">
            <Link href="/products" className="button button-primary">
              Xem sản phẩm
              <span>→</span>
            </Link>

            <Link href="/contact" className="button button-outline">
              Liên hệ VanBass
            </Link>
          </div>
        </div>
      </section>
  );
}