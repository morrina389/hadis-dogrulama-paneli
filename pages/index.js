import React, { useState } from 'react';

export default function HadisDogrulamaPaneli() {
  const [hadis, setHadis] = useState('');
  const [sonuc, setSonuc] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const kontrolEt = async () => {
    setYukleniyor(true);
    setSonuc(null);

    try {
      const response = await fetch('/api/hadis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ metin: hadis }),
      });

      const data = await response.json();
      setSonuc(data);
    } catch (error) {
      setSonuc({ durum: 'Hata', mesaj: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    }

    setYukleniyor(false);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Hadis Doğrulama Paneli</h1>

      <textarea
        value={hadis}
        onChange={(e) => setHadis(e.target.value)}
        rows={4}
        placeholder="Bir hadis yazın..."
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          resize: 'vertical',
          boxSizing: 'border-box'
        }}
      />

      <button
        onClick={kontrolEt}
        disabled={yukleniyor}
        style={{
          width: '100%',
          backgroundColor: '#f97316',
          color: 'white',
          padding: '12px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '4px',
          marginTop: '12px',
          cursor: yukleniyor ? 'not-allowed' : 'pointer'
        }}
      >
        {yukleniyor ? 'Kontrol ediliyor...' : 'Doğruluğunu Kontrol Et'}
      </button>

      {sonuc && (
        <div style={{ marginTop: 20, fontSize: '16px', lineHeight: '1.7' }}>
          <div><strong>Sonuç:</strong> {sonuc.durum}</div>
          {sonuc.kaynak && <div><strong>Kaynak:</strong> {sonuc.kaynak}</div>}
          {sonuc.aciklama && <div><strong>Açıklama:</strong> {sonuc.aciklama}</div>}
          {sonuc.metin && <div><strong>Hadisin Doğru Şekli şöyledir:</strong> {sonuc.metin}</div>}
        </div>
      )}
    </div>
  );
}
