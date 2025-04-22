import { useState } from 'react';

export default function Home() {
  const [hadis, setHadis] = useState('');
  const [sonuc, setSonuc] = useState(null);

  const handleCheck = async () => {
    const response = await fetch('/api/hadis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metin: hadis }),
    });

    const data = await response.json();
    setSonuc(data);
  };

  return (
    <div className="text-center max-w-xl w-full px-4">
      <h1 className="text-3xl font-bold mb-8">Hadis Doğrulama Paneli</h1>

      <textarea
        placeholder="Bir hadis yazın ..."
        className="mb-4"
        rows={4}
        value={hadis}
        onChange={(e) => setHadis(e.target.value)}
      />

      <button onClick={handleCheck}>
        Doğruluğunu Kontrol Et
      </button>

      {sonuc && (
        <div className="result-box">
          <p><strong>Sonuç:</strong> {sonuc.durum}</p>
          <p><strong>Hadis Metni:</strong> {sonuc.aciklama}</p>
          <p><strong>Kaynak:</strong> {sonuc.kaynak}</p>
          <p><strong>Açıklama:</strong> {sonuc.detay}</p>
        </div>
      )}
    </div>
  );
}
