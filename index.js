import React from 'react';

export default function HadisDogrulamaPaneli() {
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>Hadis Doğrulama Paneli</h1>
      <textarea
        placeholder="Bir hadis yazın..."
        style={{
          width: '100%',
          height: 150,
          padding: 12,
          borderRadius: 8,
          border: '1px solid #ccc',
          fontSize: 16,
        }}
      ></textarea>
      <button
        style={{
          marginTop: 16,
          padding: '12px 24px',
          fontSize: 16,
          backgroundColor: '#f97316',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        Doğruluğunu Kontrol Et
      </button>

      <div style={{ marginTop: 30, backgroundColor: '#f1f5f9', padding: 20, borderRadius: 8 }}>
        <p><strong>Sonuç:</strong> Sahih</p>
        <p><strong>Kaynak:</strong> Buhârî 1/3 - Müslim 1907</p>
        <p><strong>Açıklama:</strong> Bu hadis Kütüb-i Sitte’de geçmektedir ve sahih kabul edilmiştir.</p>
      </div>
    </div>
  );
}