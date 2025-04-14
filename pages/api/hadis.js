import Fuse from 'fuse.js';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteklerine izin verilir.' });
  }

  const { metin } = req.body;

  const filePath = path.join(process.cwd(), 'data', 'hadisler.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const hadisler = JSON.parse(fileContents);

  const fuse = new Fuse(hadisler, {
    keys: ['metin'],
    threshold: 0.4,
  });

  const results = fuse.search(metin);
  if (results.length > 0) {
    return res.status(200).json({
      durum: 'Eşleşme Bulundu',
      mesaj: 'Bu hadisin doğrusu şöyledir:',
      ...results[0].item,
    });
  } else {
    return res.status(404).json({
      durum: 'Bilinmiyor',
      kaynak: 'Kayıtlı hadisler arasında bulunamadı.',
      aciklama: 'Girilen metin doğruluk veritabanımızda eşleşmedi.',
    });
  }
}