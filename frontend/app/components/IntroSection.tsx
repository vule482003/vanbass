import Link from "next/link";

export default function IntroSection() {
  return (
    <section className="intro-section">
        <div className="container intro-grid">
          <div>
            <p className="section-kicker">VANBASS MUSIC CENTER</p>
            <h2>
              Thiết bị phù hợp.
              <br />
              <span>Âm thanh đúng chất.</span>
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              VanBass Music Center hướng đến việc mang đến một nơi đơn giản
              để tìm kiếm, trải nghiệm và thuê các thiết bị DJ, âm thanh phù
              hợp với nhu cầu cá nhân, studio và sự kiện.
            </p>

            <Link href="/about" className="text-link">
              Tìm hiểu về VanBass <span>→</span>
            </Link>
          </div>
        </div>
      </section>
  );
}