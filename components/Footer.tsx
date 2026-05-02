import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] border-t border-[var(--border)] pt-[60px] px-[5%] pb-[30px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-[48px] mb-[48px] footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/logo.png"
                alt="Sanook Traveling"
                width={48}
                height={48}
                className="object-contain rounded-xl mix-blend-screen"
              />
              <div className="flex flex-col">
                <span className="text-[var(--gold)] text-[16px] font-playfair font-semibold leading-tight">Sanook Traveling</span>
                <span className="text-[var(--text-muted)] text-[11px] tracking-[2px]">By.A</span>
              </div>
            </div>
            <p className="text-[14px] text-[var(--text-muted)] max-w-[260px] font-light leading-[1.7] mb-6">
              Mitra perjalanan terpercaya Anda di Thailand. Pengalaman lokal, standar internasional.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-[36px] h-[36px] flex items-center justify-center bg-[rgba(201,168,76,0.1)] border border-[var(--border)] rounded-[8px] text-[16px] text-[var(--text-light)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">📘</a>
              <a href="#" className="w-[36px] h-[36px] flex items-center justify-center bg-[rgba(201,168,76,0.1)] border border-[var(--border)] rounded-[8px] text-[16px] text-[var(--text-light)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">📸</a>
              <a href="#" className="w-[36px] h-[36px] flex items-center justify-center bg-[rgba(201,168,76,0.1)] border border-[var(--border)] rounded-[8px] text-[16px] text-[var(--text-light)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">▶️</a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-[13px] text-[var(--text-light)] uppercase tracking-[1.5px] font-semibold font-sans mb-6">NAVIGASI</h4>
            <ul className="flex flex-col gap-3">
              {['#beranda', '#layanan', '#paket-wisata', '#sewa-mobil', '#ulasan'].map((href, i) => (
                <li key={href}>
                  <a href={href} className="text-[14px] text-[var(--text-muted)] font-light hover:text-[var(--gold)] transition-colors">
                    {['Beranda', 'Layanan', 'Paket Wisata', 'Sewa Mobil', 'Ulasan'][i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinasi */}
          <div>
            <h4 className="text-[13px] text-[var(--text-light)] uppercase tracking-[1.5px] font-semibold font-sans mb-6">DESTINASI</h4>
            <ul className="flex flex-col gap-3">
              {['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Pattaya'].map((city) => (
                <li key={city}>
                  <a href="#" className="text-[14px] text-[var(--text-muted)] font-light hover:text-[var(--gold)] transition-colors">{city}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-[13px] text-[var(--text-light)] uppercase tracking-[1.5px] font-semibold font-sans mb-6">LAYANAN</h4>
            <ul className="flex flex-col gap-3">
              {['Tour Guide Pribadi', 'Sewa Mobil', 'Honeymoon Package', 'Group Tour', 'Airport Transfer'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-[14px] text-[var(--text-muted)] font-light hover:text-[var(--gold)] transition-colors">{service}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-[24px] flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[var(--text-muted)] footer-bottom">
          <div>© 2025 <span className="text-[var(--gold)]">Sanook Traveling by A.</span> — All rights reserved.</div>
          <div>Made with <span className="text-[var(--gold)]">♥</span> for travelers from Indonesia</div>
        </div>
      </div>
    </footer>
  );
}