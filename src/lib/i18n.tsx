import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'id' | 'ms';

export interface LanguageOption {
  code: Language;
  /** Shown in the switcher — the language's own name, not its English one. */
  label: string;
  short: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
  { code: 'ms', label: 'Bahasa Melayu', short: 'MY' },
];

const STORAGE_KEY = 'searah:language';
const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Translations are keyed by their English source string rather than by an abstract id
 * (`nav.about` and the like).
 *
 * The reason is the shape of this site: most labels arrive from `src/data/*` and are
 * rendered by generic components — the navbar receives a `NavItem[]` and has no idea
 * which item is "About Us". Keying by the source string lets those pass through `t()`
 * untouched, with no restructuring of the content modules and no id to keep in sync.
 *
 * The trade-off is accepted deliberately: an untranslated string falls back to the
 * English it was keyed by, so a missing entry degrades to the original copy rather than
 * to a raw key leaking into the page.
 *
 * Scope is the UI chrome — navigation, footer, controls, section furniture. Body copy
 * (articles, asset profiles, policies) stays in English until it is translated by
 * someone who can review it; machine-translating technical upstream prose into official
 * corporate pages is not a thing to do unattended.
 */
const DICTIONARY: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  id: {
    /* Navigation — top level */
    'About Us': 'Tentang Kami',
    'News & Publications': 'Berita & Publikasi',
    Operations: 'Operasi',
    'Employee Central': 'Pusat Karyawan',
    Support: 'Dukungan',

    /* Navigation — groups */
    Overview: 'Ikhtisar',
    'Operating Companies': 'Perusahaan Operasi',
    'Our People': 'Sumber Daya Manusia',
    'Two shareholders. One operating standard.': 'Dua pemegang saham. Satu standar operasi.',
    Newsfeed: 'Arus Berita',
    'By Entity': 'Berdasarkan Entitas',
    Assets: 'Aset',
    Production: 'Produksi',
    Services: 'Layanan',
    'People & Tools': 'Orang & Perangkat',
    Resources: 'Sumber Daya',
    '24/7 Emergency Response': 'Tanggap Darurat 24/7',
    Help: 'Bantuan',
    Legal: 'Hukum',

    /* Navigation — items */
    'Corporate Briefing': 'Profil Perusahaan',
    'Vision & Mission': 'Visi & Misi',
    'Core Values': 'Nilai Inti',
    'Our Journey': 'Perjalanan Kami',
    'Business Portfolio': 'Portofolio Bisnis',
    Shareholders: 'Pemegang Saham',
    'Organisation Chart': 'Struktur Organisasi',
    'Leadership Team': 'Jajaran Pimpinan',
    'All Articles': 'Semua Artikel',
    Announcements: 'Pengumuman',
    'Operations Updates': 'Pembaruan Operasi',
    'People & Culture': 'Orang & Budaya',
    'Reports & Publications': 'Laporan & Publikasi',
    'Asset Map': 'Peta Aset',
    'Indonesia — 14 Assets': 'Indonesia — 14 Aset',
    'Malaysia — 5 Assets': 'Malaysia — 5 Aset',
    'Producing Fields': 'Lapangan Produksi',
    'Development Projects': 'Proyek Pengembangan',
    'Service Portal': 'Portal Layanan',
    'HR & General Affairs': 'SDM & Umum',
    'Information Technology': 'Teknologi Informasi',
    Procurement: 'Pengadaan',
    'Health, Safety & Environment': 'Kesehatan, Keselamatan & Lingkungan',
    'Employee Directory': 'Direktori Karyawan',
    'Internal Applications': 'Aplikasi Internal',
    'Resource Centre': 'Pusat Sumber Daya',
    'Brand Assets': 'Aset Merek',
    Policies: 'Kebijakan',
    Templates: 'Templat',
    FAQ: 'Tanya Jawab',
    'Emergency Contacts': 'Kontak Darurat',
    'Contact Us': 'Hubungi Kami',
    'Terms & Conditions': 'Syarat & Ketentuan',
    'Privacy Policy': 'Kebijakan Privasi',
    Emergency: 'Darurat',
    Directory: 'Direktori',
    Whistleblowing: 'Pelaporan Pelanggaran',

    /* Footer */
    Company: 'Perusahaan',
    'About Searah': 'Tentang Searah',
    Leadership: 'Kepemimpinan',
    'Searah Ketapang': 'Searah Ketapang',
    'Searah Muara Bakau': 'Searah Muara Bakau',
    'Searah Malaysia': 'Searah Malaysia',
    Newsletter: 'Buletin',
    'Searah Limited': 'Searah Limited',
    'Operating Company Malaysia': 'Perusahaan Operasi Malaysia',
    'Operating Company Ketapang': 'Perusahaan Operasi Ketapang',
    'Operating Company Muara Bakau': 'Perusahaan Operasi Muara Bakau',
    assets: 'aset',

    /* Search */
    'Search Searah': 'Cari Searah',
    'Search people, assets, services, documents…': 'Cari orang, aset, layanan, dokumen…',
    'Jump to': 'Langsung ke',
    'Close search': 'Tutup pencarian',
    'Search everything': 'Cari semuanya',
    results: 'hasil',
    'to navigate': 'untuk menavigasi',
    'to open': 'untuk membuka',
    'to close': 'untuk menutup',
    'Emergency contacts': 'Kontak darurat',
    'Service portal': 'Portal layanan',
    'Employee directory': 'Direktori karyawan',
    'Organisation chart': 'Struktur organisasi',

    /* Controls */
    'See more': 'Selengkapnya',
    'Open menu': 'Buka menu',
    'Close menu': 'Tutup menu',
    Language: 'Bahasa',
    'Change language': 'Ubah bahasa',
    Sections: 'Bagian',

    /* Entity page — section furniture */
    'HSE & Sustainability': 'HSE & Keberlanjutan',
    Newsroom: 'Ruang Berita',
    Gallery: 'Galeri',
    Downloads: 'Unduhan',
    Contact: 'Kontak',
    Milestones: 'Tonggak Pencapaian',
    'Latest News': 'Berita Terbaru',
    HSE: 'HSE',
    'Group entities': 'Entitas grup',
    'How this entity works': 'Cara entitas ini bekerja',
    'Output and trajectory': 'Keluaran dan arah pertumbuhan',
    'Safety and environmental performance': 'Kinerja keselamatan dan lingkungan',
    'Inside the operation': 'Di dalam operasi',
    'Reports and reference material': 'Laporan dan bahan rujukan',
    'Explore the rest of the group': 'Jelajahi entitas lain dalam grup',
    'The team running {name}': 'Tim yang menjalankan {name}',
    '{count} assets under {code}': '{count} aset di bawah {code}',
    'How {name} got here': 'Perjalanan {name} sampai di sini',
    'Latest from {name}': 'Terbaru dari {name}',
    'Reach {name}': 'Hubungi {name}',
    'Quarterly production': 'Produksi kuartalan',
    'Operating base': 'Basis operasi',
    Phone: 'Telepon',
    Email: 'Surel',

    /* Homepage — hero */
    'A Strong Regional Workforce': 'Tenaga Kerja Regional yang Kuat',
    'Supporting collaboration across Malaysia and Indonesia through one connected workplace that brings every team closer together.':
      'Mendukung kolaborasi lintas Malaysia dan Indonesia melalui satu ruang kerja terhubung yang mendekatkan setiap tim.',
    'Safe, Reliable, and Efficient Operations': 'Operasi yang Aman, Andal, dan Efisien',
    'Providing seamless access to workplace services, business applications, and operational resources that support excellence every day.':
      'Menyediakan akses mulus ke layanan kerja, aplikasi bisnis, dan sumber daya operasional yang menopang keunggulan setiap hari.',
    'Creating Value Through Our People': 'Menciptakan Nilai Melalui Sumber Daya Manusia Kami',
    'Strengthening collaboration, continuous learning, and employee engagement to support our business and the communities we serve.':
      'Memperkuat kolaborasi, pembelajaran berkelanjutan, dan keterlibatan karyawan untuk menopang bisnis kami serta masyarakat yang kami layani.',

    /* Homepage — glance */
    'Powering Sustainable Energy Through Stategic Operation':
      'Menggerakkan Energi Berkelanjutan Melalui Operasi Strategis',
    'Delivering reliabel energy solution strategic operations commited investment countries of operation between Indonesia and Malaysia':
      'Menghadirkan solusi energi yang andal, operasi strategis, dan investasi berkomitmen di wilayah operasi Indonesia dan Malaysia',
    'Committed investment': 'Investasi berkomitmen',
    'Producing & Development Assets': 'Aset Produksi & Pengembangan',
    'Initial Production': 'Produksi Awal',
    'Countries of Operation': 'Negara Operasi',

    /* Homepage — entities */
    'Operating entities': 'Entitas operasi',
    'Three Operating Entities. One Commitment': 'Tiga Entitas Operasi. Satu Komitmen',
    'Each operating entity brings unique strengths and expertise while working to the same standards of safety, performance, and responsible operations.':
      'Setiap entitas operasi membawa kekuatan dan keahlian tersendiri, sambil bekerja pada standar keselamatan, kinerja, dan operasi bertanggung jawab yang sama.',
    'About the group': 'Tentang grup',

    /* Homepage — assets */
    'Asset portfolio': 'Portofolio aset',
    'Nineteen assets. Two countries. One operating model.':
      'Sembilan belas aset. Dua negara. Satu model operasi.',
    'Supporting a portfolio of 19 producing, development, and exploration assets across Indonesia and Malaysia, managed with a shared commitment to safety, operational excellence, and responsible energy development.':
      'Mengelola portofolio 19 aset produksi, pengembangan, dan eksplorasi di Indonesia dan Malaysia, dengan komitmen bersama pada keselamatan, keunggulan operasional, dan pengembangan energi yang bertanggung jawab.',
    'Open the full asset register': 'Buka daftar aset lengkap',
    'All assets': 'Semua aset',
    Producing: 'Berproduksi',
    Development: 'Pengembangan',
    Exploration: 'Eksplorasi',
    'Operated by': 'Dioperasikan oleh',
    'Working interest': 'Hak partisipasi',
    'Water depth': 'Kedalaman air',
    Reserves: 'Cadangan',
    Discovered: 'Ditemukan',
    'On stream': 'Mulai berproduksi',
    Indonesia: 'Indonesia',
    Malaysia: 'Malaysia',

    /* Homepage — quick access */
    'Quick access': 'Akses cepat',
    'Everything the team needs, one click away': 'Semua kebutuhan tim, cukup satu klik',
    'People Directory': 'Direktori Karyawan',
    'Knowledge Hub': 'Pusat Pengetahuan',
    'Organisation Structure': 'Struktur Organisasi',
    'Emergency & HSE': 'Darurat & HSE',
    'Support Centre': 'Pusat Dukungan',
    'Submit requests for IT, HR, Finance, Procurement, Facilities, and HSE services.':
      'Ajukan permintaan layanan TI, SDM, Keuangan, Pengadaan, Fasilitas, dan HSE.',
    'Find employees, teams, office locations, and contact information across Searah.':
      'Temukan karyawan, tim, lokasi kantor, dan informasi kontak di seluruh Searah.',
    'Access company policies, procedures, templates, forms, and shared documents.':
      'Akses kebijakan perusahaan, prosedur, templat, formulir, dan dokumen bersama.',
    'Explore business units, reporting lines, leadership, and departmental hierarchy.':
      'Jelajahi unit bisnis, garis pelaporan, kepemimpinan, dan hierarki departemen.',
    'Quick access to emergency contacts, medical support, and HSE response procedures.':
      'Akses cepat ke kontak darurat, dukungan medis, dan prosedur tanggap HSE.',
    'Browse frequently asked questions, user guides, and employee support resources.':
      'Telusuri pertanyaan umum, panduan pengguna, dan sumber dukungan karyawan.',
    'See all': 'Lihat semua',
    Close: 'Tutup',

    /* Entity summaries + asset descriptions */
    'Seven producing and development assets in the Kutai Basin and Mahakam Delta, supplying gas to Bontang and liquids to Senipah.':
      'Tujuh aset produksi dan pengembangan di Cekungan Kutai dan Delta Mahakam, memasok gas ke Bontang dan cairan ke Senipah.',
    'Seven deepwater and frontier assets in the Makassar Strait and beyond, including the Geng North discovery that will anchor the North Kutai hub.':
      'Tujuh aset laut dalam dan wilayah perbatasan di Selat Makassar dan sekitarnya, termasuk temuan Geng North yang akan menjadi tumpuan hub Kutai Utara.',
    'Five offshore assets in Sarawak and Sabah, home to one of the world’s largest offshore carbon capture facilities at Kasawari.':
      'Lima aset lepas pantai di Sarawak dan Sabah, tempat berdirinya salah satu fasilitas penangkapan karbon lepas pantai terbesar di dunia di Kasawari.',
    'The group’s largest producing hub. Eight wellhead platforms feed a central processing complex that exports sales gas to the Bontang liquefaction plant and liquids to the Senipah terminal.':
      'Hub produksi terbesar grup. Delapan anjungan kepala sumur memasok kompleks pengolahan pusat yang mengekspor gas jual ke kilang pencairan Bontang dan cairan ke terminal Senipah.',
    'A mature gas-condensate field kept on plateau by an infill drilling campaign and low-pressure compression installed on the existing jacket.':
      'Lapangan gas-kondensat matang yang dipertahankan pada tingkat produksi puncak melalui kampanye pengeboran sisipan dan kompresi bertekanan rendah pada jaket yang ada.',
    'A high-pressure deepwater gas development, tied back subsea to the North Mahakam complex — the longest tieback in the Indonesian portfolio at 62 kilometres.':
      'Pengembangan gas laut dalam bertekanan tinggi, tersambung bawah laut ke kompleks Mahakam Utara — tieback terpanjang di portofolio Indonesia sejauh 62 kilometer.',
    'One of the oldest producing fields in the basin, now operated as a satellite of North Mahakam with a fully unmanned, remotely supervised platform.':
      'Salah satu lapangan produksi tertua di cekungan ini, kini dioperasikan sebagai satelit Mahakam Utara dengan anjungan tanpa awak yang diawasi dari jarak jauh.',
    'A shallow-water gas field whose output is routed through the North Mahakam trunkline, supplying both domestic power generation and LNG feedstock.':
      'Lapangan gas laut dangkal yang keluarannya dialirkan melalui pipa utama Mahakam Utara, memasok pembangkit listrik domestik sekaligus bahan baku LNG.',
    'A vast delta gas field developed from clustered swamp pads, with a mangrove rehabilitation programme running alongside operations since 2021.':
      'Lapangan gas delta yang luas, dikembangkan dari klaster pad rawa, dengan program rehabilitasi mangrove yang berjalan seiring operasi sejak 2021.',
    'A mature oil field under active water and gas injection, and the group’s pilot site for produced-water reinjection at scale.':
      'Lapangan minyak matang dengan injeksi air dan gas aktif, sekaligus lokasi percontohan grup untuk reinjeksi air terproduksi berskala besar.',
    'A deepwater gas development produced through a floating production unit, with gas exported onshore via a 79-kilometre pipeline to the East Kalimantan grid.':
      'Pengembangan gas laut dalam yang diproduksi melalui unit produksi terapung, dengan gas diekspor ke darat lewat pipa 79 kilometer menuju jaringan Kalimantan Timur.',
    'A subsea-to-host development tied back to the Jangkrik floating unit — a template the group now applies across the deepwater portfolio.':
      'Pengembangan subsea-to-host yang tersambung ke unit terapung Jangkrik — pola yang kini diterapkan grup di seluruh portofolio laut dalam.',
    'A two-well subsea development extending the Merakes hub, reusing spare capacity in the existing riser and umbilical system.':
      'Pengembangan bawah laut dua sumur yang memperluas hub Merakes, memanfaatkan kapasitas cadangan pada sistem riser dan umbilical yang ada.',
    'The largest discovery in the portfolio and the anchor of the North Kutai hub — designed as a shared facility that will host third-party tiebacks.':
      'Temuan terbesar dalam portofolio dan tumpuan hub Kutai Utara — dirancang sebagai fasilitas bersama yang akan menampung tieback pihak ketiga.',
    'An appraisal campaign testing the same play that delivered Geng North, with two wells scheduled through 2027.':
      'Kampanye penilaian yang menguji play yang sama dengan penemuan Geng North, dengan dua sumur dijadwalkan hingga 2027.',
    'A frontier block awarded in the 2025 licensing round, currently under 3D seismic acquisition ahead of a first exploration well.':
      'Blok perbatasan yang diperoleh pada putaran lelang 2025, kini dalam tahap akuisisi seismik 3D sebelum sumur eksplorasi pertama.',
    'A non-operated LNG feedgas interest in West Papua, supplying an expansion train with a committed carbon capture and storage scheme.':
      'Kepemilikan gas umpan LNG non-operator di Papua Barat, memasok train perluasan dengan skema penangkapan dan penyimpanan karbon yang telah dikomitmenkan.',
    'A high-CO₂ gas field paired with the region’s flagship carbon capture facility, which strips and reinjects CO₂ into a depleted reservoir nearby.':
      'Lapangan gas ber-CO₂ tinggi yang dipadukan dengan fasilitas penangkapan karbon unggulan kawasan, yang memisahkan dan menyuntikkan kembali CO₂ ke reservoir terdeplesi di dekatnya.',
    'Malaysia’s first deepwater development, produced through a dry-tree unit and FPSO, now the hub for three satellite tiebacks.':
      'Pengembangan laut dalam pertama Malaysia, diproduksi melalui unit dry-tree dan FPSO, kini menjadi hub bagi tiga tieback satelit.',
    'A deepwater gas development feeding a floating liquefaction vessel moored offshore Sabah, removing the need for a long export pipeline.':
      'Pengembangan gas laut dalam yang memasok kapal pencairan terapung di lepas pantai Sabah, sehingga pipa ekspor panjang tidak diperlukan.',
    'A mature oil hub in late life, extended by an enhanced oil recovery scheme and the region’s first solar-hybrid powered platform.':
      'Hub minyak matang di akhir masa produksi, diperpanjang lewat skema enhanced oil recovery dan anjungan bertenaga hibrida surya pertama di kawasan ini.',
    'A carbonate play in the Luconia province, targeting the same reservoir trend that underpins Sarawak’s gas supply to Bintulu.':
      'Play karbonat di provinsi Luconia, membidik tren reservoir yang sama yang menopang pasokan gas Sarawak ke Bintulu.',
  },

  ms: {
    /* Navigation — top level */
    'About Us': 'Tentang Kami',
    'News & Publications': 'Berita & Penerbitan',
    Operations: 'Operasi',
    'Employee Central': 'Pusat Pekerja',
    Support: 'Sokongan',

    /* Navigation — groups */
    Overview: 'Gambaran Keseluruhan',
    'Operating Companies': 'Syarikat Operasi',
    'Our People': 'Warga Kerja Kami',
    'Two shareholders. One operating standard.': 'Dua pemegang saham. Satu piawaian operasi.',
    Newsfeed: 'Suapan Berita',
    'By Entity': 'Mengikut Entiti',
    Assets: 'Aset',
    Production: 'Pengeluaran',
    Services: 'Perkhidmatan',
    'People & Tools': 'Warga Kerja & Alatan',
    Resources: 'Sumber',
    '24/7 Emergency Response': 'Tindak Balas Kecemasan 24/7',
    Help: 'Bantuan',
    Legal: 'Perundangan',

    /* Navigation — items */
    'Corporate Briefing': 'Taklimat Korporat',
    'Vision & Mission': 'Visi & Misi',
    'Core Values': 'Nilai Teras',
    'Our Journey': 'Perjalanan Kami',
    'Business Portfolio': 'Portfolio Perniagaan',
    Shareholders: 'Pemegang Saham',
    'Organisation Chart': 'Carta Organisasi',
    'Leadership Team': 'Barisan Kepimpinan',
    'All Articles': 'Semua Artikel',
    Announcements: 'Pengumuman',
    'Operations Updates': 'Kemas Kini Operasi',
    'People & Culture': 'Warga Kerja & Budaya',
    'Reports & Publications': 'Laporan & Penerbitan',
    'Asset Map': 'Peta Aset',
    'Indonesia — 14 Assets': 'Indonesia — 14 Aset',
    'Malaysia — 5 Assets': 'Malaysia — 5 Aset',
    'Producing Fields': 'Medan Pengeluaran',
    'Development Projects': 'Projek Pembangunan',
    'Service Portal': 'Portal Perkhidmatan',
    'HR & General Affairs': 'Sumber Manusia & Hal Ehwal Am',
    'Information Technology': 'Teknologi Maklumat',
    Procurement: 'Perolehan',
    'Health, Safety & Environment': 'Kesihatan, Keselamatan & Alam Sekitar',
    'Employee Directory': 'Direktori Pekerja',
    'Internal Applications': 'Aplikasi Dalaman',
    'Resource Centre': 'Pusat Sumber',
    'Brand Assets': 'Aset Jenama',
    Policies: 'Dasar',
    Templates: 'Templat',
    FAQ: 'Soalan Lazim',
    'Emergency Contacts': 'Hubungan Kecemasan',
    'Contact Us': 'Hubungi Kami',
    'Terms & Conditions': 'Terma & Syarat',
    'Privacy Policy': 'Dasar Privasi',
    Emergency: 'Kecemasan',
    Directory: 'Direktori',
    Whistleblowing: 'Pendedahan Salah Laku',

    /* Footer */
    Company: 'Syarikat',
    'About Searah': 'Tentang Searah',
    Leadership: 'Kepimpinan',
    'Searah Ketapang': 'Searah Ketapang',
    'Searah Muara Bakau': 'Searah Muara Bakau',
    'Searah Malaysia': 'Searah Malaysia',
    Newsletter: 'Buletin',
    'Searah Limited': 'Searah Limited',
    'Operating Company Malaysia': 'Syarikat Operasi Malaysia',
    'Operating Company Ketapang': 'Syarikat Operasi Ketapang',
    'Operating Company Muara Bakau': 'Syarikat Operasi Muara Bakau',
    assets: 'aset',

    /* Search */
    'Search Searah': 'Cari Searah',
    'Search people, assets, services, documents…': 'Cari orang, aset, perkhidmatan, dokumen…',
    'Jump to': 'Terus ke',
    'Close search': 'Tutup carian',
    'Search everything': 'Cari semua',
    results: 'keputusan',
    'to navigate': 'untuk menavigasi',
    'to open': 'untuk membuka',
    'to close': 'untuk menutup',
    'Emergency contacts': 'Hubungan kecemasan',
    'Service portal': 'Portal perkhidmatan',
    'Employee directory': 'Direktori pekerja',
    'Organisation chart': 'Carta organisasi',

    /* Controls */
    'See more': 'Lihat lagi',
    'Open menu': 'Buka menu',
    'Close menu': 'Tutup menu',
    Language: 'Bahasa',
    'Change language': 'Tukar bahasa',
    Sections: 'Bahagian',

    /* Entity page — section furniture */
    'HSE & Sustainability': 'HSE & Kelestarian',
    Newsroom: 'Bilik Berita',
    Gallery: 'Galeri',
    Downloads: 'Muat Turun',
    Contact: 'Hubungi',
    Milestones: 'Pencapaian',
    'Latest News': 'Berita Terkini',
    HSE: 'HSE',
    'Group entities': 'Entiti kumpulan',
    'How this entity works': 'Cara entiti ini beroperasi',
    'Output and trajectory': 'Pengeluaran dan hala tuju',
    'Safety and environmental performance': 'Prestasi keselamatan dan alam sekitar',
    'Inside the operation': 'Di sebalik operasi',
    'Reports and reference material': 'Laporan dan bahan rujukan',
    'Explore the rest of the group': 'Terokai entiti lain dalam kumpulan',
    'The team running {name}': 'Pasukan yang menerajui {name}',
    '{count} assets under {code}': '{count} aset di bawah {code}',
    'How {name} got here': 'Perjalanan {name} hingga ke sini',
    'Latest from {name}': 'Terkini dari {name}',
    'Reach {name}': 'Hubungi {name}',
    'Quarterly production': 'Pengeluaran suku tahunan',
    'Operating base': 'Pangkalan operasi',
    Phone: 'Telefon',
    Email: 'E-mel',

    /* Homepage — hero */
    'A Strong Regional Workforce': 'Tenaga Kerja Serantau yang Mantap',
    'Supporting collaboration across Malaysia and Indonesia through one connected workplace that brings every team closer together.':
      'Menyokong kerjasama merentas Malaysia dan Indonesia melalui satu tempat kerja bersepadu yang mendekatkan setiap pasukan.',
    'Safe, Reliable, and Efficient Operations': 'Operasi yang Selamat, Boleh Dipercayai dan Cekap',
    'Providing seamless access to workplace services, business applications, and operational resources that support excellence every day.':
      'Menyediakan akses lancar kepada perkhidmatan tempat kerja, aplikasi perniagaan dan sumber operasi yang menyokong kecemerlangan setiap hari.',
    'Creating Value Through Our People': 'Mencipta Nilai Melalui Warga Kerja Kami',
    'Strengthening collaboration, continuous learning, and employee engagement to support our business and the communities we serve.':
      'Mengukuhkan kerjasama, pembelajaran berterusan dan penglibatan pekerja bagi menyokong perniagaan kami serta komuniti yang kami khidmati.',

    /* Homepage — glance */
    'Powering Sustainable Energy Through Stategic Operation':
      'Menggerakkan Tenaga Lestari Melalui Operasi Strategik',
    'Delivering reliabel energy solution strategic operations commited investment countries of operation between Indonesia and Malaysia':
      'Menyampaikan penyelesaian tenaga yang boleh dipercayai, operasi strategik dan pelaburan komited di negara operasi Indonesia dan Malaysia',
    'Committed investment': 'Pelaburan komited',
    'Producing & Development Assets': 'Aset Pengeluaran & Pembangunan',
    'Initial Production': 'Pengeluaran Awal',
    'Countries of Operation': 'Negara Operasi',

    /* Homepage — entities */
    'Operating entities': 'Entiti operasi',
    'Three Operating Entities. One Commitment': 'Tiga Entiti Operasi. Satu Komitmen',
    'Each operating entity brings unique strengths and expertise while working to the same standards of safety, performance, and responsible operations.':
      'Setiap entiti operasi membawa kekuatan dan kepakaran tersendiri, sambil mematuhi piawaian keselamatan, prestasi dan operasi bertanggungjawab yang sama.',
    'About the group': 'Tentang kumpulan',

    /* Homepage — assets */
    'Asset portfolio': 'Portfolio aset',
    'Nineteen assets. Two countries. One operating model.':
      'Sembilan belas aset. Dua negara. Satu model operasi.',
    'Supporting a portfolio of 19 producing, development, and exploration assets across Indonesia and Malaysia, managed with a shared commitment to safety, operational excellence, and responsible energy development.':
      'Menguruskan portfolio 19 aset pengeluaran, pembangunan dan penerokaan di Indonesia dan Malaysia, dengan komitmen bersama terhadap keselamatan, kecemerlangan operasi dan pembangunan tenaga bertanggungjawab.',
    'Open the full asset register': 'Buka daftar aset penuh',
    'All assets': 'Semua aset',
    Producing: 'Mengeluarkan',
    Development: 'Pembangunan',
    Exploration: 'Penerokaan',
    'Operated by': 'Dikendalikan oleh',
    'Working interest': 'Kepentingan kerja',
    'Water depth': 'Kedalaman air',
    Reserves: 'Rizab',
    Discovered: 'Ditemui',
    'On stream': 'Mula beroperasi',
    Indonesia: 'Indonesia',
    Malaysia: 'Malaysia',

    /* Homepage — quick access */
    'Quick access': 'Akses pantas',
    'Everything the team needs, one click away': 'Semua keperluan pasukan, satu klik sahaja',
    'People Directory': 'Direktori Warga Kerja',
    'Knowledge Hub': 'Hab Pengetahuan',
    'Organisation Structure': 'Struktur Organisasi',
    'Emergency & HSE': 'Kecemasan & HSE',
    'Support Centre': 'Pusat Sokongan',
    'Submit requests for IT, HR, Finance, Procurement, Facilities, and HSE services.':
      'Hantar permohonan perkhidmatan IT, Sumber Manusia, Kewangan, Perolehan, Fasiliti dan HSE.',
    'Find employees, teams, office locations, and contact information across Searah.':
      'Cari pekerja, pasukan, lokasi pejabat dan maklumat hubungan di seluruh Searah.',
    'Access company policies, procedures, templates, forms, and shared documents.':
      'Akses dasar syarikat, prosedur, templat, borang dan dokumen kongsi.',
    'Explore business units, reporting lines, leadership, and departmental hierarchy.':
      'Terokai unit perniagaan, garis pelaporan, kepimpinan dan hierarki jabatan.',
    'Quick access to emergency contacts, medical support, and HSE response procedures.':
      'Akses pantas kepada hubungan kecemasan, sokongan perubatan dan prosedur tindak balas HSE.',
    'Browse frequently asked questions, user guides, and employee support resources.':
      'Layari soalan lazim, panduan pengguna dan sumber sokongan pekerja.',
    'See all': 'Lihat semua',
    Close: 'Tutup',

    /* Entity summaries + asset descriptions */
    'Seven producing and development assets in the Kutai Basin and Mahakam Delta, supplying gas to Bontang and liquids to Senipah.':
      'Tujuh aset pengeluaran dan pembangunan di Lembangan Kutai dan Delta Mahakam, membekalkan gas ke Bontang dan cecair ke Senipah.',
    'Seven deepwater and frontier assets in the Makassar Strait and beyond, including the Geng North discovery that will anchor the North Kutai hub.':
      'Tujuh aset laut dalam dan sempadan baharu di Selat Makassar dan sekitarnya, termasuk penemuan Geng North yang akan menjadi tunjang hab Kutai Utara.',
    'Five offshore assets in Sarawak and Sabah, home to one of the world’s largest offshore carbon capture facilities at Kasawari.':
      'Lima aset luar pesisir di Sarawak dan Sabah, lokasi salah satu kemudahan tangkapan karbon luar pesisir terbesar dunia di Kasawari.',
    'The group’s largest producing hub. Eight wellhead platforms feed a central processing complex that exports sales gas to the Bontang liquefaction plant and liquids to the Senipah terminal.':
      'Hab pengeluaran terbesar kumpulan. Lapan pelantar kepala telaga membekalkan kompleks pemprosesan pusat yang mengeksport gas jualan ke loji pencecairan Bontang dan cecair ke terminal Senipah.',
    'A mature gas-condensate field kept on plateau by an infill drilling campaign and low-pressure compression installed on the existing jacket.':
      'Medan gas-kondensat matang yang dikekalkan pada tahap puncak melalui kempen penggerudian sisipan dan pemampatan tekanan rendah pada jaket sedia ada.',
    'A high-pressure deepwater gas development, tied back subsea to the North Mahakam complex — the longest tieback in the Indonesian portfolio at 62 kilometres.':
      'Pembangunan gas laut dalam bertekanan tinggi, disambung dasar laut ke kompleks Mahakam Utara — tieback terpanjang dalam portfolio Indonesia sejauh 62 kilometer.',
    'One of the oldest producing fields in the basin, now operated as a satellite of North Mahakam with a fully unmanned, remotely supervised platform.':
      'Antara medan pengeluaran tertua di lembangan ini, kini dikendalikan sebagai satelit Mahakam Utara dengan pelantar tanpa anak kapal yang diselia dari jauh.',
    'A shallow-water gas field whose output is routed through the North Mahakam trunkline, supplying both domestic power generation and LNG feedstock.':
      'Medan gas air cetek yang keluarannya disalurkan melalui talian utama Mahakam Utara, membekalkan penjanaan kuasa domestik dan bahan suapan LNG.',
    'A vast delta gas field developed from clustered swamp pads, with a mangrove rehabilitation programme running alongside operations since 2021.':
      'Medan gas delta yang luas, dibangunkan daripada kelompok pad paya, dengan program pemulihan bakau berjalan seiring operasi sejak 2021.',
    'A mature oil field under active water and gas injection, and the group’s pilot site for produced-water reinjection at scale.':
      'Medan minyak matang dengan suntikan air dan gas aktif, serta tapak perintis kumpulan bagi suntikan semula air terhasil secara berskala.',
    'A deepwater gas development produced through a floating production unit, with gas exported onshore via a 79-kilometre pipeline to the East Kalimantan grid.':
      'Pembangunan gas laut dalam yang dikeluarkan melalui unit pengeluaran terapung, dengan gas dieksport ke darat menerusi saluran paip 79 kilometer ke grid Kalimantan Timur.',
    'A subsea-to-host development tied back to the Jangkrik floating unit — a template the group now applies across the deepwater portfolio.':
      'Pembangunan subsea-to-host yang disambung ke unit terapung Jangkrik — corak yang kini digunakan kumpulan di seluruh portfolio laut dalam.',
    'A two-well subsea development extending the Merakes hub, reusing spare capacity in the existing riser and umbilical system.':
      'Pembangunan dasar laut dua telaga yang meluaskan hab Merakes, menggunakan semula kapasiti lebihan pada sistem riser dan umbilical sedia ada.',
    'The largest discovery in the portfolio and the anchor of the North Kutai hub — designed as a shared facility that will host third-party tiebacks.':
      'Penemuan terbesar dalam portfolio dan tunjang hab Kutai Utara — direka sebagai kemudahan bersama yang akan menampung tieback pihak ketiga.',
    'An appraisal campaign testing the same play that delivered Geng North, with two wells scheduled through 2027.':
      'Kempen penilaian yang menguji play sama yang menghasilkan Geng North, dengan dua telaga dijadualkan sehingga 2027.',
    'A frontier block awarded in the 2025 licensing round, currently under 3D seismic acquisition ahead of a first exploration well.':
      'Blok sempadan baharu yang dianugerahkan pada pusingan pelesenan 2025, kini dalam perolehan seismik 3D sebelum telaga penerokaan pertama.',
    'A non-operated LNG feedgas interest in West Papua, supplying an expansion train with a committed carbon capture and storage scheme.':
      'Kepentingan gas suapan LNG bukan pengendali di Papua Barat, membekalkan train pengembangan dengan skim tangkapan dan penyimpanan karbon yang komited.',
    'A high-CO₂ gas field paired with the region’s flagship carbon capture facility, which strips and reinjects CO₂ into a depleted reservoir nearby.':
      'Medan gas ber-CO₂ tinggi yang digandingkan dengan kemudahan tangkapan karbon utama rantau ini, yang memisah dan menyuntik semula CO₂ ke takungan susut berhampiran.',
    'Malaysia’s first deepwater development, produced through a dry-tree unit and FPSO, now the hub for three satellite tiebacks.':
      'Pembangunan laut dalam pertama Malaysia, dikeluarkan melalui unit dry-tree dan FPSO, kini menjadi hab bagi tiga tieback satelit.',
    'A deepwater gas development feeding a floating liquefaction vessel moored offshore Sabah, removing the need for a long export pipeline.':
      'Pembangunan gas laut dalam yang membekalkan kapal pencecairan terapung berlabuh di luar pesisir Sabah, menghapuskan keperluan saluran paip eksport yang panjang.',
    'A mature oil hub in late life, extended by an enhanced oil recovery scheme and the region’s first solar-hybrid powered platform.':
      'Hab minyak matang di penghujung hayat, dilanjutkan melalui skim enhanced oil recovery dan pelantar berkuasa hibrid solar pertama di rantau ini.',
    'A carbonate play in the Luconia province, targeting the same reservoir trend that underpins Sarawak’s gas supply to Bintulu.':
      'Play karbonat di wilayah Luconia, menyasarkan trend takungan sama yang menyokong bekalan gas Sarawak ke Bintulu.',
  },
};

/** Values spliced into a translated string's `{placeholders}`. */
export type TranslationParams = Record<string, string | number>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (next: Language) => void;
  t: (key: string, params?: TranslationParams) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStored(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  // Validated rather than cast: a stale or hand-edited value must not put the app into
  // a language that has no dictionary.
  return LANGUAGES.some((entry) => entry.code === stored) ? (stored as Language) : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is the default deliberately — the source content is English, so it is the
  // one language in which nothing can be missing.
  const [language, setLanguageState] = useState<Language>(readStored);

  useEffect(() => {
    // Keeping `<html lang>` honest matters beyond tidiness: it drives screen-reader
    // pronunciation and the browser's own translate prompt.
    document.documentElement.lang = language === 'ms' ? 'ms' : language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string, params?: TranslationParams) => {
      // English is the key set, so it needs no lookup — only the interpolation.
      const template = language === 'en' ? key : (DICTIONARY[language][key] ?? key);
      if (!params) return template;

      // Placeholders let a sentence keep its own word order per language: Indonesian
      // puts the entity name where English would not, and a concatenated string cannot
      // express that.
      return template.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in params ? String(params[name]) : match,
      );
    },
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside a LanguageProvider');
  return context;
}

/** Convenience for components that only need the translator. */
export function useTranslation(): (key: string, params?: TranslationParams) => string {
  return useLanguage().t;
}
