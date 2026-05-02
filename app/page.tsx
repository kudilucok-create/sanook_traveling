'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ReviewForm from '@/components/ReviewForm';
import ContactBookingForm from '@/components/ContactBookingForm';

// ─── DATA ────────────────────────────────────────────────────────────────────

const wisataPackages = [
  {
    badge: 'Terlaris',
    location: 'Bangkok, Thailand',
    title: 'Bangkok City Explorer',
    desc: 'Jelajahi ibu kota Thailand yang memukau — Grand Palace, Wat Arun, pasar terapung Damnoen Saduak, dan kehidupan malam Khao San Road.',
    duration: '4 Hari 3 Malam',
    minPerson: 'Min. 2 Orang',
    price: 'Rp 4.800.000',
    image: '/bangkok.jpg',
  },
  {
    badge: null,
    location: 'Chiang Mai, Thailand',
    title: 'Chiang Mai Cultural Tour',
    desc: 'Rasakan keajaiban utara Thailand — kuil Doi Suthep, pasar malam Sunday Walking Street, pengalaman mahout di elephant sanctuary.',
    duration: '5 Hari 4 Malam',
    minPerson: 'Min. 2 Orang',
    price: 'Rp 5.500.000',
    image: '/chiang-mai.avif',
  },
  {
    badge: 'Premium',
    location: 'Phuket & Krabi, Thailand',
    title: 'Phuket — Krabi Paradise',
    desc: 'Island hopping Phi Phi Island, snorkeling di Koh Rok, sunset di Railay Beach, dan menikmati seafood terbaik di Rawai Night Market.',
    duration: '7 Hari 6 Malam',
    minPerson: 'Min. 2 Orang',
    price: 'Rp 8.200.000',
    image: '/phuket.jfif',
  },
];

const carList = [
  {
    type: 'Sedan',
    name: 'Toyota Camry',
    capacity: '4 Penumpang',
    tipe: 'Sedan Mewah',
    features: ['AC Dingin', 'WiFi', 'USB Charger', 'Driver Pro'],
    price: 'Rp 1.200.000',
  },
  {
    type: 'SUV',
    name: 'Honda CR-V',
    capacity: '5 Penumpang',
    tipe: 'SUV Nyaman',
    features: ['AC Ganda', 'WiFi', 'Kursi Luas', 'Bagasi Besar'],
    price: 'Rp 1.500.000',
  },
  {
    type: 'Minivan',
    name: 'Toyota HiAce',
    capacity: '10 Penumpang',
    tipe: 'Minivan Grup',
    features: ['AC Besar', 'WiFi', 'Karaoke', 'Ideal Grup'],
    price: 'Rp 2.200.000',
  },
];

const reviews = [
  { avatar: 'RA', name: 'Rina Amelia', city: 'Jakarta, Indonesia', stars: 5, text: 'Pengalaman luar biasa! Pemandu kami sangat ramah dan tahu banyak tentang budaya Thailand. Kami bisa menikmati tempat-tempat yang tidak ada di buku panduan!' },
  { avatar: 'BH', name: 'Budi Hartono', city: 'Surabaya, Indonesia', stars: 5, text: 'Mobil bersih, nyaman, driver tepat waktu. Kami pergi 8 orang dengan HiAce dan semua sangat puas. Akan pesan lagi untuk tahun depan!' },
  { avatar: 'MS', name: 'Maya & Surya', city: 'Bandung, Indonesia', stars: 5, text: 'Honeymoon kami di Phuket & Krabi sangat sempurna berkat Sannok Traveling. Setiap detail diperhatikan, suasana romantis tercipta dengan sempurna.' },
  { avatar: 'DK', name: 'Dewi Kartika', city: 'Yogyakarta, Indonesia', stars: 4, text: 'Tour ke Chiang Mai sangat berkesan. Elephant sanctuary-nya luar biasa! Pemandu kami bisa menjelaskan dalam bahasa Indonesia dengan jelas dan sabar.' },
  { avatar: 'AP', name: 'Agus Pramono', city: 'Semarang, Indonesia', stars: 5, text: 'Perjalanan keluarga kami dengan 4 anak sangat menyenangkan. Sannok Traveling sangat sabar dan kreatif menyusun itinerari yang cocok untuk semua usia.' },
  { avatar: 'NF', name: 'Nadia Fitri', city: 'Medan, Indonesia', stars: 5, text: 'Responsif, profesional, dan harga sangat kompetitif. Booking mudah lewat WhatsApp. Sudah 3 kali liburan ke Thailand selalu pakai Sannok Traveling!' },
];

const contactInfo = [
  { icon: '📱', label: 'WhatsApp / Telepon', value: '+66 XX XXXX XXXX' },
  { icon: '✉️', label: 'Email', value: 'hello@sannoktraveling.com' },
  { icon: '📍', label: 'Area Operasional', value: 'Bangkok, Chiang Mai, Phuket, Krabi, Pattaya, Hua Hin' },
  { icon: '🕐', label: 'Jam Operasional', value: 'Setiap hari, 07.00 – 22.00 WIB' },
];

// ─── HERO SLIDESHOW IMAGES ────────────────────────────────────────────────────

const heroImages = [
  { src: '/bangkok.jpg', label: 'Bangkok' },
  { src: '/chiang-mai.avif', label: 'Chiang Mai' },
  { src: '/phuket.jfif', label: 'Phuket & Krabi' },
];

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader({ sub, title, desc }: { sub: string; title: React.ReactNode; desc: string }) {
  return (
    <div className="mb-[60px] text-center">
      <span className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] font-medium block mb-4">{sub}</span>
      <div className="w-[60px] h-[2px] mx-auto bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mb-4" />
      <h2 className="text-[clamp(32px,4vw,52px)] font-playfair text-[var(--white)] tracking-[-0.5px] mb-4">{title}</h2>
      <p className="text-[16px] text-[var(--text-muted)] max-w-[500px] mx-auto leading-[1.7] font-light">{desc}</p>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // Auto slideshow hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto slideshow reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative bg-[var(--dark)] text-[var(--white)] min-h-screen overflow-x-hidden">
      <Navbar scrollY={scrollY} />

      {/* ── BERANDA ── */}
      <section id="beranda" className="min-h-screen flex flex-col justify-center px-[5%] pt-[120px] pb-[80px] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(201,168,76,0.08)_0%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_10%_80%,rgba(201,168,76,0.04)_0%,transparent_100%)]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: `${mousePos.x * 20}px ${mousePos.y * 20}px`, transition: 'background-position 0.1s ease-out' }} />
        </div>

        <div className="flex items-center justify-between relative z-10 w-full max-w-7xl mx-auto">
          <div className="max-w-[700px] w-full relative z-10">
            <div className="inline-flex items-center bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-full px-[16px] py-[8px] mb-6">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--gold)] mr-3 animate-[pulse_2s_infinite]" />
              <span className="text-[var(--gold)] text-[12px] tracking-[2px] uppercase font-medium">Tour Guide Premium Thailand</span>
            </div>
            <h1 className="text-[clamp(42px,6vw,76px)] leading-[1.05] text-[var(--white)] tracking-[-1px] mb-6 font-playfair font-bold">
              Jelajahi <em className="text-[var(--gold)] italic">Thailand</em> dengan Panduan Lokal Terpercaya
            </h1>
            <p className="text-[17px] text-[var(--text-light)] leading-[1.7] max-w-[540px] font-light mb-10">
              Pengalaman wisata Thailand yang autentik bersama pemandu lokal berpengalaman. Dari kuil bersejarah hingga pantai tersembunyi — kami hadirkan perjalanan tak terlupakan.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#paket-wisata" className="flex items-center gap-2 bg-[var(--gold)] text-[var(--dark)] px-[32px] py-[14px] font-semibold text-[14px] rounded-[4px] hover:bg-[var(--gold-light)] hover:-translate-y-[2px] transition-all">
                Lihat Paket Wisata
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </a>
              <a href="#sewa-mobil" className="flex items-center gap-2 bg-transparent text-[var(--white)] border border-[rgba(255,255,255,0.2)] px-[32px] py-[14px] font-semibold text-[14px] rounded-[4px] hover:border-[var(--gold)] hover:text-[var(--gold)] hover:-translate-y-[2px] transition-all">
                Sewa Mobil
              </a>
            </div>
            <div className="border-t border-[var(--gold)] pt-[36px] flex flex-wrap gap-[48px]">
              {[['500+', 'Wisatawan Puas'], ['8', 'Tipe Mobil'], ['⭑ 4.9', 'Rating Rata-rata'], ['5+', 'Tahun Pengalaman']].map(([num, label]) => (
                <div key={label}>
                  <span className="font-playfair text-[36px] text-[var(--gold)] block leading-none mb-2 font-bold">{num}</span>
                  <span className="text-[12px] text-[var(--text-muted)] uppercase tracking-[1.5px] font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── HERO VISUAL - SLIDESHOW ── */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[42%] max-w-[520px] aspect-[3/4] z-10 hero-visual">
            <div className="w-full h-full rounded-[12px] border border-[var(--border)] overflow-hidden relative">

              {/* Slides */}
              {heroImages.map((img, i) => (
                <div
                  key={img.src}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: i === currentSlide ? 1 : 0 }}
                >
                  <div
                    className="absolute inset-[-8%] transition-transform duration-75 ease-out"
                    style={{
                      transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px) scale(1.08)`,
                    }}
                  >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                  </div>
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.1)] to-transparent" />
                </div>
              ))}

              {/* Location label */}
              <div className="absolute bottom-[52px] left-0 right-0 text-center z-10 transition-all duration-500">
                <span className="font-playfair text-[11px] tracking-[4px] uppercase text-[var(--gold)] opacity-80 block mb-1">
                  {heroImages[currentSlide].label}
                </span>
                <span className="font-playfair text-[28px] tracking-[8px] text-[var(--gold)]">
                  THAILAND
                </span>
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-[18px] left-0 right-0 flex justify-center gap-[8px] z-10">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === currentSlide ? '20px' : '6px',
                      height: '6px',
                      backgroundColor: i === currentSlide ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── LAYANAN ── */}
      <section id="layanan" className="bg-[var(--dark2)] py-[100px] px-[5%]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            sub="Apa yang Kami Tawarkan"
            title={<>Layanan <em className="text-[var(--gold)] italic">Unggulan</em> Kami</>}
            desc="Kami hadirkan pengalaman perjalanan terbaik dengan layanan komprehensif dari awal hingga akhir perjalanan Anda."
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[24px]">
            {[
              { num: '01', icon: '🧭', title: 'Pemandu Wisata Pribadi', desc: 'Pemandu lokal berpengalaman yang fasih berbahasa Indonesia siap menemani setiap langkah petualangan Anda di Thailand.', points: ['Berbicara Bahasa Indonesia', 'Pengetahuan budaya & sejarah mendalam', 'Fleksibel & responsif', 'Rekomendasi kuliner lokal'] },
              { num: '02', icon: '🚗', title: 'Sewa Mobil Premium', desc: 'Armada kendaraan terawat dari sedan nyaman hingga minivan keluarga, lengkap dengan driver berpengalaman yang hafal seluruh jalur Thailand.', points: ['AC & WiFi tersedia', 'Driver berpengalaman', 'Mobil bersih & terawat', 'Antar-jemput bandara'] },
              { num: '03', icon: '✨', title: 'Itinerari Kustom', desc: 'Rencanakan perjalanan impian Anda dari nol. Kami menyusun itinerari yang disesuaikan dengan preferensi, durasi, dan anggaran Anda.', points: ['Konsultasi gratis', 'Paket honeymoon & keluarga', 'Destinasi tersembunyi', 'Pengaturan hotel & tiket'] },
            ].map((s) => (
              <div key={s.num} className="bg-[var(--dark3)] border border-[var(--border)] rounded-[12px] p-[40px_32px] relative overflow-hidden transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] hover:-translate-y-1 group fade-up">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute top-[16px] right-[24px] font-playfair text-[64px] text-[rgba(201,168,76,0.08)] font-bold leading-none">{s.num}</div>
                <div className="w-[56px] h-[56px] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] rounded-[10px] flex items-center justify-center text-[24px] mb-[24px]">{s.icon}</div>
                <h3 className="text-[22px] text-[var(--white)] mb-[12px] font-playfair">{s.title}</h3>
                <p className="text-[14px] text-[var(--text-muted)] leading-[1.7] font-light">{s.desc}</p>
                <div className="flex flex-col gap-[8px] mt-[24px]">
                  {s.points.map((p) => (
                    <div key={p} className="text-[13px] text-[var(--text-light)] flex items-center gap-[8px]">
                      <span className="w-[4px] h-[4px] rounded-full bg-[var(--gold)] shrink-0" />{p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAKET WISATA ── */}
      <section id="paket-wisata" className="bg-[var(--dark)] py-[100px] px-[5%]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            sub="Destinasi Terpopuler"
            title={<>Paket <em className="text-[var(--gold)] italic">Wisata</em> Thailand</>}
            desc="Pilih dari berbagai paket wisata yang telah kami rancang khusus untuk wisatawan Indonesia."
          />
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-[24px] pb-6 -mx-[5%] px-[5%] lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none lg:mx-0 lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {wisataPackages.map((pkg) => (
              <div key={pkg.title} className="bg-[var(--dark2)] border border-[var(--border)] rounded-[16px] overflow-hidden transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] lg:hover:-translate-y-[6px] relative group fade-up min-w-[320px] w-[85vw] max-w-[380px] shrink-0 snap-center lg:w-auto lg:min-w-0 lg:max-w-none lg:shrink">
                <div className="w-full h-[220px] relative overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent" />
                  {pkg.badge && (
                    <div className="absolute top-[16px] left-[16px] bg-[var(--gold)] text-[var(--dark)] text-[11px] font-bold tracking-[1px] uppercase py-[5px] px-[12px] rounded-[4px] z-10">{pkg.badge}</div>
                  )}
                </div>
                <div className="p-[24px]">
                  <div className="text-[12px] text-[var(--gold)] uppercase tracking-[1.5px] font-medium mb-[10px] flex items-center gap-[4px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    {pkg.location}
                  </div>
                  <h3 className="text-[22px] text-[var(--white)] leading-[1.2] mb-[10px] font-playfair">{pkg.title}</h3>
                  <p className="text-[13px] text-[var(--text-muted)] leading-[1.7] font-light mb-[20px]">{pkg.desc}</p>
                  <div className="flex gap-[16px] mb-[20px]">
                    <div className="text-[13px] text-[var(--text-light)]">📅 {pkg.duration}</div>
                    <div className="text-[13px] text-[var(--text-light)]">👥 {pkg.minPerson}</div>
                  </div>
                  <div className="flex justify-between items-center border-t border-[var(--border)] pt-[20px]">
                    <div>
                      <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-[1px] mb-[4px]">Mulai dari</div>
                      <div className="font-playfair text-[24px] text-[var(--gold)] leading-[1.1]">{pkg.price} <small className="text-[13px] text-[var(--text-muted)] font-sans font-normal">/orang</small></div>
                    </div>
                    <a href="#hubungi-kami" className="bg-transparent text-[var(--gold)] border border-[var(--gold)] py-[10px] px-[22px] text-[13px] font-medium rounded-[4px] tracking-[0.5px] hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors">Pesan</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEWA MOBIL ── */}
      <section id="sewa-mobil" className="bg-[var(--dark2)] py-[100px] px-[5%]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            sub="Armada Kendaraan"
            title={<>Sewa <em className="text-[var(--gold)] italic">Mobil</em> Terpercaya</>}
            desc="Pilih kendaraan yang sesuai kebutuhan perjalanan Anda, semua dilengkapi driver berpengalaman."
          />
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-[24px] pb-6 -mx-[5%] px-[5%] lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none lg:mx-0 lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {carList.map((car) => (
              <div key={car.name} className="bg-[var(--dark)] border border-[var(--border)] rounded-[16px] overflow-hidden transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] lg:hover:-translate-y-1 fade-up min-w-[300px] w-[85vw] max-w-[360px] shrink-0 snap-center lg:w-auto lg:min-w-0 lg:max-w-none lg:shrink">
                <div className="w-full h-[180px] bg-[var(--dark3)] flex items-center justify-center relative">
                  <div className="text-[56px] opacity-30">🚗</div>
                  <div className="absolute bottom-[12px] right-[12px] bg-[rgba(0,0,0,0.9)] border border-[var(--border)] text-[var(--gold)] text-[11px] font-semibold tracking-[1px] uppercase py-[4px] px-[10px] rounded-full">{car.type}</div>
                </div>
                <div className="p-[20px]">
                  <h3 className="text-[20px] text-[var(--white)] font-playfair mb-[6px]">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-[8px] my-[16px]">
                    {[['Kapasitas', car.capacity], ['Tipe', car.tipe]].map(([label, val]) => (
                      <div key={label} className="bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)] rounded-[6px] p-[10px_12px]">
                        <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-[2px]">{label}</span>
                        <span className="text-[13px] text-[var(--white)] font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-[6px] my-[12px] mb-[16px]">
                    {car.features.map((f) => (
                      <span key={f} className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] text-[var(--text-light)] text-[11px] py-[4px] px-[10px] rounded-full">{f}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center border-t border-[var(--border)] pt-[16px]">
                    <div>
                      <div className="text-[12px] text-[var(--text-muted)] mb-[2px]">Harga per hari</div>
                      <div className="font-playfair text-[20px] text-[var(--gold)]">{car.price}</div>
                    </div>
                    <a href="#hubungi-kami" className="bg-transparent text-[var(--gold)] border border-[var(--gold)] py-[10px] px-[22px] text-[13px] font-medium rounded-[4px] tracking-[0.5px] hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors">Sewa</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ULASAN ── */}
      <section id="ulasan" className="bg-[var(--dark)] py-[100px] px-[5%]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            sub="Testimoni Pelanggan"
            title={<>Kata <em className="text-[var(--gold)] italic">Mereka</em> Tentang Kami</>}
            desc="Kepuasan wisatawan adalah prioritas utama kami. Baca pengalaman nyata dari pelanggan setia Sannok Traveling."
          />
          <div className="relative fade-up mb-[60px]">
            {/* Prev / Next buttons */}
            <button
              onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-[44px] h-[44px] rounded-full bg-[var(--dark2)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center hover:border-[var(--gold)] hover:bg-[rgba(201,168,76,0.1)] transition-all"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-[44px] h-[44px] rounded-full bg-[var(--dark2)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center hover:border-[var(--gold)] hover:bg-[rgba(201,168,76,0.1)] transition-all"
            >
              ›
            </button>

            {/* Slide wrapper */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((r, i) => (
                  <div key={i} className="min-w-full px-[8px]">
                    <div className="bg-[var(--dark2)] border border-[var(--border)] rounded-[12px] p-[36px] relative max-w-[760px] mx-auto">
                      <div className="absolute top-[16px] right-[24px] font-playfair text-[56px] text-[rgba(201,168,76,0.12)] leading-none">"</div>
                      <div className="flex gap-[3px] mb-[16px]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-[18px] ${s <= r.stars ? 'text-[var(--gold)]' : 'text-[var(--dark3)]'}`}>{s <= r.stars ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <p className="text-[16px] text-[var(--text-light)] leading-[1.8] font-light italic mb-[28px]">"{r.text}"</p>
                      <div className="flex items-center gap-[14px]">
                        <div className="w-[48px] h-[48px] rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] font-playfair text-[16px] text-[var(--gold)] font-bold flex items-center justify-center shrink-0">{r.avatar}</div>
                        <div>
                          <div className="text-[15px] text-[var(--white)] font-semibold">{r.name}</div>
                          <div className="text-[13px] text-[var(--text-muted)]">{r.city}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-[8px] mt-[24px]">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReview(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === currentReview ? '20px' : '6px',
                    height: '6px',
                    backgroundColor: i === currentReview ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
          <ReviewForm />
        </div>
      </section>

      {/* ── HUBUNGI KAMI ── */}
      <section id="hubungi-kami" className="bg-[var(--dark2)] py-[100px] px-[5%]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            sub="Siap Berangkat?"
            title={<>Hubungi <em className="text-[var(--gold)] italic">Kami</em> Sekarang</>}
            desc="Konsultasikan rencana perjalanan Anda. Tim kami siap membantu 7 hari seminggu."
          />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-[60px] items-start">
            <div className="fade-up">
              <h3 className="text-[28px] text-[var(--white)] font-playfair mb-[6px]">Informasi Kontak</h3>
              <p className="text-[15px] text-[var(--text-muted)] font-light mb-[36px] leading-[1.7]">Kami dengan senang hati membantu merencanakan perjalanan impian Anda ke Thailand.</p>
              <div className="flex flex-col gap-[16px]">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex gap-[16px] p-[20px] bg-[var(--dark3)] border border-[var(--border)] rounded-[10px] hover:border-[rgba(201,168,76,0.4)] transition-colors">
                    <div className="w-[44px] h-[44px] shrink-0 bg-[rgba(201,168,76,0.1)] rounded-[8px] flex items-center justify-center text-[20px]">{c.icon}</div>
                    <div>
                      <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-[4px] font-semibold">{c.label}</div>
                      <div className="text-[15px] text-[var(--white)] font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactBookingForm />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}