export type Province = {
  id: string;
  name: string;
  island: "Sumatera" | "Jawa" | "Kalimantan" | "Sulawesi" | "Bali & Nusa Tenggara" | "Maluku" | "Papua";
  lat: number;
  lng: number;
  emoji: string;
  capital: string;
  rumahAdat: string;
  tarian: string;
  makanan: string;
  alatMusik: string;
  cerita: string;
};

export const provinces: Province[] = [
  { id: "aceh", name: "Aceh", island: "Sumatera", lat: 4.7, lng: 96.9, emoji: "🕌", capital: "Banda Aceh", rumahAdat: "Rumoh Aceh / Krong Bade", tarian: "Tari Saman", makanan: "Mie Aceh", alatMusik: "Serune Kalee", cerita: "Serambi Mekah dengan tradisi Islam yang kuat." },
  { id: "sumut", name: "Sumatera Utara", island: "Sumatera", lat: 2.19, lng: 99.38, emoji: "🏞️", capital: "Medan", rumahAdat: "Rumah Bolon", tarian: "Tari Tor-Tor", makanan: "Bika Ambon", alatMusik: "Gordang Sambilan", cerita: "Rumah suku Batak dengan Danau Toba yang legendaris." },
  { id: "sumbar", name: "Sumatera Barat", island: "Sumatera", lat: -0.74, lng: 100.8, emoji: "🏠", capital: "Padang", rumahAdat: "Rumah Gadang", tarian: "Tari Piring", makanan: "Rendang", alatMusik: "Talempong", cerita: "Tanah Minangkabau dengan tradisi matrilineal." },
  { id: "riau", name: "Riau", island: "Sumatera", lat: 0.29, lng: 101.71, emoji: "⛵", capital: "Pekanbaru", rumahAdat: "Rumah Selaso Jatuh Kembar", tarian: "Tari Zapin", makanan: "Gulai Ikan Patin", alatMusik: "Gambus", cerita: "Kaya budaya Melayu dan sungai-sungai besar." },
  { id: "kepri", name: "Kepulauan Riau", island: "Sumatera", lat: 3.94, lng: 108.14, emoji: "🏝️", capital: "Tanjung Pinang", rumahAdat: "Rumah Belah Bubung", tarian: "Tari Tandak", makanan: "Otak-otak", alatMusik: "Gambus", cerita: "Gugusan pulau Melayu di jalur maritim strategis." },
  { id: "jambi", name: "Jambi", island: "Sumatera", lat: -1.61, lng: 103.61, emoji: "🌿", capital: "Jambi", rumahAdat: "Rumah Panggung Kajang Leko", tarian: "Tari Sekapur Sirih", makanan: "Tempoyak", alatMusik: "Gambus Jambi", cerita: "Warisan Kerajaan Melayu Kuno." },
  { id: "sumsel", name: "Sumatera Selatan", island: "Sumatera", lat: -3.32, lng: 103.91, emoji: "🌉", capital: "Palembang", rumahAdat: "Rumah Limas", tarian: "Tari Gending Sriwijaya", makanan: "Pempek", alatMusik: "Accordion", cerita: "Pusat Kerajaan Sriwijaya yang berjaya di masa lampau." },
  { id: "bengkulu", name: "Bengkulu", island: "Sumatera", lat: -3.79, lng: 102.26, emoji: "🌺", capital: "Bengkulu", rumahAdat: "Rumah Bubungan Lima", tarian: "Tari Andun", makanan: "Pendap", alatMusik: "Doll", cerita: "Rumah bagi bunga Rafflesia terbesar di dunia." },
  { id: "lampung", name: "Lampung", island: "Sumatera", lat: -4.56, lng: 105.4, emoji: "🐘", capital: "Bandar Lampung", rumahAdat: "Nuwo Sesat", tarian: "Tari Sigeh Penguten", makanan: "Seruit", alatMusik: "Bende", cerita: "Tanah gajah dan tradisi Lampung Pepadun-Saibatin." },
  { id: "babel", name: "Kepulauan Bangka Belitung", island: "Sumatera", lat: -2.74, lng: 106.44, emoji: "⛱️", capital: "Pangkal Pinang", rumahAdat: "Rumah Rakit", tarian: "Tari Campak", makanan: "Mie Bangka", alatMusik: "Dambus", cerita: "Pulau timah dengan pantai batu granit yang indah." },

  { id: "banten", name: "Banten", island: "Jawa", lat: -6.4, lng: 106.06, emoji: "🎭", capital: "Serang", rumahAdat: "Rumah Sulah Nyanda", tarian: "Tari Cokek", makanan: "Sate Bandeng", alatMusik: "Angklung Buhun", cerita: "Warisan Kesultanan Banten dan suku Baduy." },
  { id: "jakarta", name: "DKI Jakarta", island: "Jawa", lat: -6.21, lng: 106.85, emoji: "🏙️", capital: "Jakarta", rumahAdat: "Rumah Kebaya", tarian: "Tari Yapong", makanan: "Kerak Telor", alatMusik: "Tanjidor", cerita: "Ibu kota multikultur dengan budaya Betawi." },
  { id: "jabar", name: "Jawa Barat", island: "Jawa", lat: -6.89, lng: 107.61, emoji: "🎋", capital: "Bandung", rumahAdat: "Rumah Kasepuhan", tarian: "Tari Jaipong", makanan: "Batagor", alatMusik: "Angklung", cerita: "Tanah Sunda dengan seni Angklung mendunia." },
  { id: "jateng", name: "Jawa Tengah", island: "Jawa", lat: -7.15, lng: 110.14, emoji: "🏯", capital: "Semarang", rumahAdat: "Rumah Joglo", tarian: "Tari Gambyong", makanan: "Lumpia", alatMusik: "Gamelan", cerita: "Rumah Borobudur dan tradisi Keraton Jawa." },
  { id: "diy", name: "DI Yogyakarta", island: "Jawa", lat: -7.8, lng: 110.36, emoji: "👑", capital: "Yogyakarta", rumahAdat: "Bangsal Kencono", tarian: "Tari Serimpi", makanan: "Gudeg", alatMusik: "Gamelan Jawa", cerita: "Kota istimewa dengan Keraton Ngayogyakarta." },
  { id: "jatim", name: "Jawa Timur", island: "Jawa", lat: -7.54, lng: 112.24, emoji: "🌋", capital: "Surabaya", rumahAdat: "Rumah Joglo Situbondo", tarian: "Tari Reog", makanan: "Rujak Cingur", alatMusik: "Bonang", cerita: "Reog Ponorogo dan Gunung Bromo yang megah." },

  { id: "kalbar", name: "Kalimantan Barat", island: "Kalimantan", lat: 0.0, lng: 109.34, emoji: "🌳", capital: "Pontianak", rumahAdat: "Rumah Panjang", tarian: "Tari Monong", makanan: "Bubur Pedas Sambas", alatMusik: "Sapek", cerita: "Kota Khatulistiwa dengan budaya Dayak dan Melayu." },
  { id: "kalteng", name: "Kalimantan Tengah", island: "Kalimantan", lat: -1.68, lng: 113.38, emoji: "🦧", capital: "Palangka Raya", rumahAdat: "Rumah Betang", tarian: "Tari Balean Dadas", makanan: "Juhu Singkah", alatMusik: "Garantung", cerita: "Hutan orangutan dan sungai-sungai luas suku Dayak." },
  { id: "kalsel", name: "Kalimantan Selatan", island: "Kalimantan", lat: -3.09, lng: 115.28, emoji: "🚣", capital: "Banjarmasin", rumahAdat: "Rumah Bubungan Tinggi", tarian: "Tari Baksa Kembang", makanan: "Soto Banjar", alatMusik: "Panting", cerita: "Kota seribu sungai dengan pasar apung." },
  { id: "kaltim", name: "Kalimantan Timur", island: "Kalimantan", lat: 0.53, lng: 116.5, emoji: "🌴", capital: "Samarinda", rumahAdat: "Rumah Lamin", tarian: "Tari Gong", makanan: "Ayam Cincane", alatMusik: "Sampe", cerita: "Ibu kota Nusantara masa depan, tanah Dayak Kenyah." },
  { id: "kalut", name: "Kalimantan Utara", island: "Kalimantan", lat: 3.07, lng: 116.04, emoji: "🐟", capital: "Tanjung Selor", rumahAdat: "Rumah Baloy", tarian: "Tari Jugit", makanan: "Kepiting Soka", alatMusik: "Rebab", cerita: "Provinsi termuda dengan budaya Tidung." },

  { id: "sulut", name: "Sulawesi Utara", island: "Sulawesi", lat: 1.05, lng: 124.62, emoji: "🐒", capital: "Manado", rumahAdat: "Rumah Pewaris (Walewangko)", tarian: "Tari Maengket", makanan: "Tinutuan", alatMusik: "Kolintang", cerita: "Bunaken dan budaya Minahasa yang kaya musik." },
  { id: "gorontalo", name: "Gorontalo", island: "Sulawesi", lat: 0.7, lng: 122.44, emoji: "🌾", capital: "Gorontalo", rumahAdat: "Bandayo Poboide", tarian: "Tari Saronde", makanan: "Binte Biluhuta", alatMusik: "Polopalo", cerita: "Serambi Madinah Sulawesi dengan tradisi Islam." },
  { id: "sulteng", name: "Sulawesi Tengah", island: "Sulawesi", lat: -1.43, lng: 121.44, emoji: "🗿", capital: "Palu", rumahAdat: "Rumah Tambi", tarian: "Tari Dero", makanan: "Kaledo", alatMusik: "Ganda", cerita: "Patung megalitik Lembah Bada yang misterius." },
  { id: "sulbar", name: "Sulawesi Barat", island: "Sulawesi", lat: -2.84, lng: 119.23, emoji: "🌊", capital: "Mamuju", rumahAdat: "Rumah Mandar (Boyang)", tarian: "Tari Patuddu", makanan: "Bau Peapi", alatMusik: "Kecapi Mandar", cerita: "Rumah pelaut ulung suku Mandar." },
  { id: "sulsel", name: "Sulawesi Selatan", island: "Sulawesi", lat: -3.67, lng: 119.97, emoji: "⛵", capital: "Makassar", rumahAdat: "Tongkonan", tarian: "Tari Pakarena", makanan: "Coto Makassar", alatMusik: "Kecapi Bugis", cerita: "Kapal Pinisi dan budaya Bugis-Makassar-Toraja." },
  { id: "sultra", name: "Sulawesi Tenggara", island: "Sulawesi", lat: -4.14, lng: 122.17, emoji: "🐴", capital: "Kendari", rumahAdat: "Rumah Buton (Malige)", tarian: "Tari Lulo", makanan: "Sinonggi", alatMusik: "Ladolado", cerita: "Wakatobi dan tradisi Kesultanan Buton." },

  { id: "bali", name: "Bali", island: "Bali & Nusa Tenggara", lat: -8.4, lng: 115.19, emoji: "🔥", capital: "Denpasar", rumahAdat: "Gapura Candi Bentar", tarian: "Tari Kecak", makanan: "Ayam Betutu", alatMusik: "Gamelan Bali", cerita: "Pulau Dewata dengan Hindu Bali yang unik." },
  { id: "ntb", name: "Nusa Tenggara Barat", island: "Bali & Nusa Tenggara", lat: -8.65, lng: 117.36, emoji: "🏝️", capital: "Mataram", rumahAdat: "Rumah Dalam Loka", tarian: "Tari Mpaa Lenggogo", makanan: "Ayam Taliwang", alatMusik: "Serunai", cerita: "Pulau Lombok, gili, dan suku Sasak." },
  { id: "ntt", name: "Nusa Tenggara Timur", island: "Bali & Nusa Tenggara", lat: -8.66, lng: 121.08, emoji: "🐉", capital: "Kupang", rumahAdat: "Rumah Musalaki", tarian: "Tari Caci", makanan: "Se'i Sapi", alatMusik: "Sasando", cerita: "Rumah Komodo dan alat musik Sasando yang legendaris." },

  { id: "maluku", name: "Maluku", island: "Maluku", lat: -3.24, lng: 130.15, emoji: "🌶️", capital: "Ambon", rumahAdat: "Baileo", tarian: "Tari Lenso", makanan: "Papeda", alatMusik: "Tifa Totobuang", cerita: "Kepulauan rempah yang mengubah sejarah dunia." },
  { id: "malut", name: "Maluku Utara", island: "Maluku", lat: 1.57, lng: 127.81, emoji: "🌋", capital: "Sofifi", rumahAdat: "Sasadu", tarian: "Tari Cakalele", makanan: "Gohu Ikan", alatMusik: "Fu", cerita: "Tanah Kesultanan Ternate dan Tidore." },

  { id: "papuabarat", name: "Papua Barat", island: "Papua", lat: -1.34, lng: 133.17, emoji: "🐟", capital: "Manokwari", rumahAdat: "Rumah Kaki Seribu", tarian: "Tari Suanggi", makanan: "Ikan Bakar Manokwari", alatMusik: "Guoto", cerita: "Raja Ampat dengan surga bawah lautnya." },
  { id: "papuabaratdaya", name: "Papua Barat Daya", island: "Papua", lat: -0.88, lng: 131.25, emoji: "🐢", capital: "Sorong", rumahAdat: "Rumah Kaki Seribu", tarian: "Tari Perang", makanan: "Papeda", alatMusik: "Tifa", cerita: "Provinsi baru gerbang Raja Ampat." },
  { id: "papua", name: "Papua", island: "Papua", lat: -4.27, lng: 138.08, emoji: "🪶", capital: "Jayapura", rumahAdat: "Rumah Honai", tarian: "Tari Yospan", makanan: "Papeda", alatMusik: "Tifa", cerita: "Puncak Jaya bersalju dan budaya suku pegunungan." },
  { id: "papuatengah", name: "Papua Tengah", island: "Papua", lat: -3.65, lng: 136.32, emoji: "⛰️", capital: "Nabire", rumahAdat: "Honai", tarian: "Tari Yospan", makanan: "Papeda", alatMusik: "Tifa", cerita: "Lembah Baliem dan tradisi suku Mee." },
  { id: "papuapegunungan", name: "Papua Pegunungan", island: "Papua", lat: -4.09, lng: 138.95, emoji: "🏔️", capital: "Jayawijaya", rumahAdat: "Honai", tarian: "Tari Perang Dani", makanan: "Bakar Batu", alatMusik: "Pikon", cerita: "Suku Dani dengan tradisi Bakar Batu." },
  { id: "papuaselatan", name: "Papua Selatan", island: "Papua", lat: -6.85, lng: 140.36, emoji: "🌳", capital: "Merauke", rumahAdat: "Rumah Kariwari", tarian: "Tari Gatsi", makanan: "Sagu Sep", alatMusik: "Tifa", cerita: "Taman Nasional Wasur dan suku Marind." },
];

export const islands = [
  "Sumatera",
  "Jawa",
  "Kalimantan",
  "Sulawesi",
  "Bali & Nusa Tenggara",
  "Maluku",
  "Papua",
] as const;

export const islandColors: Record<string, string> = {
  Sumatera: "#D84315",
  Jawa: "#4A90E2",
  Kalimantan: "#43A047",
  Sulawesi: "#FFB300",
  "Bali & Nusa Tenggara": "#8E24AA",
  Maluku: "#00897B",
  Papua: "#E53935",
};
