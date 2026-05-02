'use client';

import { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#paket-wisata', label: 'Paket Wisata' },
  { href: '#sewa-mobil', label: 'Sewa Mobil' },
  { href: '#ulasan', label: 'Ulasan' },
  { href: '#hubungi-kami', label: 'Hubungi Kami' },
];

export default function Navbar({ scrollY }: { scrollY: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[1000] border-b border-[var(--border)] h-[72px] px-[5%] flex justify-between items-center transition-colors duration-300 ${scrollY > 60 ? 'bg-[rgba(0,0,0,0.98)] backdrop-blur-md' : 'bg-[rgba(0,0,0,0.92)] backdrop-blur-md'}`}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Sanook Traveling"
            width={48}
            height={48}
            className="object-contain rounded-xl mix-blend-screen"
            priority
          />
          <div className="flex flex-col">
            <span className="text-[var(--gold)] text-[16px] font-playfair font-semibold leading-tight">Sanook Traveling</span>
            <span className="text-[var(--text-muted)] text-[11px] tracking-[2px] Semibold">By.A </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-[14px] text-[var(--text-light)] hover:text-[var(--gold)] transition-colors nav-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#hubungi-kami" className="hidden md:inline-block bg-[var(--gold)] text-[var(--dark)] px-[24px] py-[10px] text-[13px] font-semibold rounded-[4px] uppercase tracking-[0.5px] hover:bg-[var(--gold-light)] hover:-translate-y-[1px] transition-all">
          PESAN SEKARANG
        </a>

        {/* Hamburger Button (mobile only) */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-[40px] h-[40px] gap-[6px] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[24px] h-[2px] bg-[var(--gold)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block w-[24px] h-[2px] bg-[var(--gold)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[24px] h-[2px] bg-[var(--gold)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className={`fixed top-[72px] left-0 w-full z-[999] bg-[rgba(0,0,0,0.98)] backdrop-blur-md border-b border-[var(--border)] flex flex-col transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-[15px] text-[var(--text-light)] hover:text-[var(--gold)] hover:bg-[rgba(201,168,76,0.07)] px-[5%] py-[16px] border-b border-[var(--border)] transition-colors"
          >
            {link.label}
          </a>
        ))}
        <div className="px-[5%] py-[20px]">
          <a
            href="#hubungi-kami"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-[var(--gold)] text-[var(--dark)] px-[24px] py-[12px] text-[13px] font-semibold rounded-[4px] uppercase tracking-[0.5px] hover:bg-[var(--gold-light)] transition-all"
          >
            PESAN SEKARANG
          </a>
        </div>
      </div>
    </>
  );
}