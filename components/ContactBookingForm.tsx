'use client';

import { useState } from 'react';

export default function ContactBookingForm() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('bk-nama') as HTMLInputElement).value;
    const layanan = (form.elements.namedItem('bk-layanan') as HTMLSelectElement).value;
    const destinasi = (form.elements.namedItem('bk-destinasi') as HTMLSelectElement).value;
    const tanggalBerangkat = (form.elements.namedItem('bk-tanggal-berangkat') as HTMLInputElement).value;
    const tanggalPulang = (form.elements.namedItem('bk-tanggal-pulang') as HTMLInputElement).value;

    if (!name || !layanan || !destinasi || !tanggalBerangkat || !tanggalPulang) {
      alert('Harap lengkapi semua bidang bertanda *.');
      return;
    }

    setSuccess(true);
    form.reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  const inputClass = 'bg-[var(--dark3)] border border-[rgba(201,168,76,0.15)] text-[var(--white)] font-sans text-[14px] p-[12px_16px] rounded-[8px] outline-none focus:border-[var(--gold)] placeholder:text-[var(--text-muted)] w-full';
  const selectClass = `${inputClass}`;

  return (
    <div className="bg-[var(--dark)] border border-[var(--border)] rounded-[16px] p-[40px] booking-form relative fade-up" style={{ transitionDelay: '0.2s' }}>
      <h3 className="text-[26px] text-[var(--white)] font-playfair mb-[6px]">Form Pemesanan Cepat</h3>
      <p className="text-[14px] text-[var(--text-muted)] mb-[24px]">Isi formulir di bawah dan kami akan menghubungi Anda dalam 1×24 jam.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
        <input id="bk-nama" name="bk-nama" type="text" placeholder="Masukkan nama Anda *" className={inputClass} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <select id="bk-layanan" name="bk-layanan" className={selectClass} defaultValue="">
            <option value="" disabled>Pilih Layanan</option>
            <option value="Paket Wisata">Paket Wisata</option>
            <option value="Sewa Mobil">Sewa Mobil</option>
            <option value="Tour Guide Pribadi">Tour Guide Pribadi</option>
            <option value="Itinerari Kustom">Itinerari Kustom</option>
          </select>
          <select id="bk-destinasi" name="bk-destinasi" className={selectClass} defaultValue="">
            <option value="" disabled>Pilih Destinasi</option>
            {['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Pattaya', 'Hua Hin', 'Koh Samui', 'Custom Route'].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="bk-tanggal-berangkat" className="text-[12px] text-[var(--text-muted)] ml-1">Tanggal Berangkat *</label>
            <input id="bk-tanggal-berangkat" name="bk-tanggal-berangkat" type="date" className={inputClass} style={{ colorScheme: 'dark' }} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="bk-tanggal-pulang" className="text-[12px] text-[var(--text-muted)] ml-1">Tanggal Pulang *</label>
            <input id="bk-tanggal-pulang" name="bk-tanggal-pulang" type="date" className={inputClass} style={{ colorScheme: 'dark' }} />
          </div>
        </div>

        <textarea
          id="bk-pesan"
          name="bk-pesan"
          placeholder="Jumlah orang, preferensi hotel, kebutuhan khusus, dll..."
          className={`${inputClass} min-h-[100px] resize-y`}
        />

        <button type="submit" className="w-full bg-[var(--gold)] text-[var(--dark)] font-bold uppercase rounded-[8px] p-[15px] text-[14px] tracking-[0.5px] hover:bg-[var(--gold-light)] hover:-translate-y-[1px] transition-all mt-2">
          KIRIM PEMESANAN
        </button>

        {success && (
          <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] text-[var(--gold)] p-[14px_20px] rounded-[8px] text-center mt-[16px]">
            ✓ Pemesanan Anda telah diterima! Kami akan menghubungi Anda segera.
          </div>
        )}
      </form>
    </div>
  );
}
