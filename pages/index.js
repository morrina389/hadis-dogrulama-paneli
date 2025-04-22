import { useState } from 'react';

export default function Home() {
  const [hadis, setHadis] = useState('');
  const [sonuc, setSonuc] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!hadis.trim()) {
      alert("Lütfen bir hadis metni yazın.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/hadis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metin: hadis }),
      });

      const data = await response.json();
      setSonuc(data);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Hadis Doğrulama Paneli
        </h1>

        <textarea
          placeholder="Bir hadis yazın..."
          className="w-full p-4 border-2 border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
          rows={5}
          value={hadis}
          onChange={(e) => setHadis(e.target.value)}
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          {loading ? "Kontrol ediliyor..." : "Doğruluğunu Kontrol Et"}
        </button>

        {sonuc && (
          <div className="mt-8 p-6 rounded-lg shadow-md bg-green-100 border border-green-400 text-green-800">
            <p className="mb-2"><strong>Sonuç:</strong> {sonuc.durum}</p>
            {sonuc.mesaj && <p className="mb-2"><strong>Mesaj:</strong> {sonuc.mesaj}</p>}
            <p className="mb-2"><strong>Hadis Metni:</strong> {sonuc.aciklama || sonuc.metin}</p>
            <p className="mb-2"><strong>Kaynak:</strong> {sonuc.kaynak}</p>
            <p><strong>Açıklama:</strong> {sonuc.detay || "Detay verilmedi."}</p>
          </div>
        )}

        {!sonuc && !loading && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            Yazım hatalarına duyarlı arama desteği vardır. Dilediğiniz gibi yazabilirsiniz.
          </p>
        )}
      </div>
    </div>
  );
}
