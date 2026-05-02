'use client';

import { useState } from 'react';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('rev-nama') as HTMLInputElement).value;
    const city = (form.elements.namedItem('rev-kota') as HTMLInputElement).value;
    const text = (form.elements.namedItem('rev-isi') as HTMLTextAreaElement).value;

    if (!name || !city || !text || rating === 0) {
      alert('Harap lengkapi semua bidang dan berikan penilaian bintang.');
      return;
    }

    setSuccess(true);
    form.reset();
    setRating(0);
    setTimeout(() => setSuccess(false), 5000);
  };

  const inputClass = 'bg-[var(--dark3)] border border-[rgba(201,168,76,0.15)] text-[var(--white)] font-sans text-[14px] p-[12px_16px] rounded-[8px] outline-none focus:border-[var(--gold)] placeholder:text-[var(--text-muted)] w-full';

  return (
    <div className="max-w-[640px] mx-auto bg-[var(--dark2)] border border-[var(--border)] rounded-[16px] p-[40px] review-form-wrapper">
      <h3 className="font-playfair text-[24px] text-[var(--white)] form-title mb-2">Bagikan Pengalaman Anda</h3>
      <p className="text-[14px] text-[var(--text-muted)] form-sub mb-6">Ulasan Anda akan membantu wisatawan lain merencanakan perjalanan impian mereka.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <input id="rev-nama" name="rev-nama" type="text" placeholder="Masukkan nama Anda" className={inputClass} />
          <input id="rev-kota" name="rev-kota" type="text" placeholder="Jakarta, Surabaya, dll" className={inputClass} />
        </div>

        <div className="flex gap-[8px] my-[4px]" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-[24px] transition-transform ${star <= (hoverRating || rating) ? 'text-[var(--gold)] scale-110' : 'text-[var(--dark3)]'}`}
              onMouseEnter={() => setHoverRating(star)}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          id="rev-isi"
          name="rev-isi"
          placeholder="Ceritakan pengalaman wisata Anda bersama Sannok Traveling..."
          className={`${inputClass} min-h-[100px] resize-y`}
        />

        <button type="submit" className="w-full bg-[var(--gold)] text-[var(--dark)] font-bold uppercase rounded-[8px] p-[15px] text-[14px] tracking-[0.5px] hover:bg-[var(--gold-light)] hover:-translate-y-[1px] transition-all mt-2 btn-submit">
          KIRIM ULASAN
        </button>

        {success && (
          <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] text-[var(--gold)] p-[14px_20px] rounded-[8px] text-center mt-[16px]">
            ✓ Ulasan Anda sedang menunggu persetujuan admin. Terima kasih!
          </div>
        )}
      </form>
    </div>
  );
}
