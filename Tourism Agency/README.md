# Turizm Acente Sistemi - Frontend

- [Live Site](https://helpful-sundae-1cb4c5.netlify.app/)

Bu proje, bir turizm acentesinin otel yönetimi için geliştirilmiş bir kullanıcı arayüzü içermektedir. Aşağıda sistemin kullanıcı arayüzünü ve işlevselliğini gösteren bir rehber bulunmaktadır.

## Otel Sayfası

- **Otel Ekleme :** Bu sayfada yeni otel eklenebilir. Otel adı, adresi, iletişim bilgileri ve diğer bilgiler girilir.
- **Otel Listeleme :** Eklenen otellerin listesi görüntülenir. Her otel için silme butonu bulunur ayrıca istenilen bilginin üzerine tıklanılarak güncelleme işlemi yapabilir.
- **OteL Tesisleri :** Otele ait tesislerin listesi görüntülenir.
- **Otel Pansion Tipleri :** Otele ait pansion tiplerinin listesi görüntülenir.

## Oda Sayfası

- **Oda Ekleme:** Bu sayfada seçilen otele yeni oda eklenir. Oda tipi, özellikleri ve diğer bilgiler girilir.
- **Oda Listeleme:** Otele ait odaların listesi görüntülenir. Her oda için silme butonu bulunur ayrıca istenilen bilginin üzerine tıklanılarak güncelleme işlemi yapabilir.
- **Oda Özellikleri:** Oda özelliklerinin listesi görüntülenir.
- **Oda Tipleri:** Oda tiplerinin listesi görüntülenir.

## Rezervasyon Sayfası

- **Rezervasyon Ekleme:** Seçilen odanın rezervasyonu yapılır. Giriş tarihi, çıkış tarihi, misafir bilgileri ve diğer bilgiler girilir. Her rezervasyon için silme butonu bulunur ayrıca istenilen bilginin üzerine tıklanılarak güncelleme işlemi yapabilir. Eğer ki odanın stoğu yetersiz ise rezervasyon yapılamaz. Ayrıca geçerli bir tarih aralığı seçilmediği durumda rezervasyon yapılamaz.

## Galeri Sayfası

- **Galeri Listeleme:** Belirli kategorilere ait galeri resimlerinin listesi görüntülenir. Kategori seçimi yaparak sadece o kategoriye ait resimlerin listelenmesi sağlanabilir. Hepsinin bir arada görüntülenmesi için `Tümü` seçeneği bulunmaktadır.
  Her resim için yıldız sayısı , fiyatı , konumu ve başka özellikleri gösterilmektedir.

## Kullanılan Teknolojiler

- HTML
- CSS
- JavaScript
- React
- React Router
- React Query
