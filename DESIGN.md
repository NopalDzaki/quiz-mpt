# Design System & UI Specification (`design.md`)

Dokumen ini berisi spesifikasi desain, gaya visual, komponen antarmuka (UI), dan struktur halaman berdasarkan referensi desain aplikasi mobile **Game Kuis & Lomba 17-an Online** (seperti *Tebak Gambar* dan *Quiz Merdeka*).

---

## 1. Gambaran Umum & Gaya Visual (Design Direction)
* **Tema Utama:** Playful, Gamified, Youthful, dan Kartunis (2D Mascot-driven).
* **Karakteristik:**
  * Penggunaan sudut membulat ekstrem (*pill-shaped* dan *super-rounded corners*) pada hampir seluruh kontainer dan tombol.
  * Warna-warna cerah dengan kontras tinggi yang dipadukan dengan latar belakang *warm off-white* / krem lembut sehingga nyaman di mata.
  * Ilustrasi karakter 2D berbentuk geometri/abstrak dengan ekspresi wajah yang lucu sebagai pusat perhatian (*focal point*) di setiap kartu permainan.
  * Elemen dekoratif bergaya *doodle* atau stiker (bintang kilau, garis zig-zag, badge).

---

## 2. Palet Warna (Color Palette)

### Latar Belakang (Backgrounds)
* **Primary Background (Cream / Off-White):** `#F5F3EB` (Latar belakang utama layar dengan sedikit tekstur gelombang samar)
* **Dark Overlay / Celebration Screen:** `#262523` (Latar belakang gelap saat menampilkan perolehan poin/karakter)
* **Bottom Sheet Dark:** `#141414` (Latar belakang daftar *Other Rank*)
* **Card Surface White:** `#FFFFFF` (Digunakan pada opsi jawaban, *pill* nama, dan tombol ikon)

### Warna Aksen & Kartu Permainan (Game Card & Brand Accents)
* **Orange Card (Tebak Gambar):** `#F2A33A`
* **Sky Blue Card (Quiz Merdeka):** `#82CAFA`
* **Sunny Yellow (Quiz Options Container):** `#FCD144`
* **Mint Green (Podium / Rank Card):** `#D3E8DF`

### Warna Karakter / Ilustrasi (Mascot Colors)
* **Pink Character:** `#FF5E97`
* **Purple Character:** `#694FA6`
* **Yellow Character:** `#FACC15`
* **Cyan Character:** `#38BDF8`

### Warna Status & Interaksi (Interactive & Semantic Colors)
* **Primary Action Green (Teal/Emerald):** `#0E8366` (Digunakan pada tab aktif, tombol *Continue to Rank*, dan *Back to Home*)
* **Correct / Selected Option Green:** `#6BB384` (Warna latar opsi jawaban yang dipilih/benar)
* **Primary Dark Button:** `#111111` (Digunakan pada tombol *Play Game*, *Submit Answer*, dan *Floating Bottom Bar*)
* **Online Indicator Green:** `#34D399`
* **Highlight Rank Blue (Current User):** `#67B7C7` (Baris peringkat milik pengguna saat ini / *"You"*)
* **Coin Gold:** `#F59E0B` / `#FBBF24`

### Warna Teks (Typography Colors)
* **Text Primary:** `#111111`
* **Text Secondary / Muted:** `#6B7280`
* **Text on Dark:** `#FFFFFF`

---

## 3. Tipografi (Typography)

Desain ini menggunakan kombinasi dua jenis *font* untuk menciptakan kesan kasual namun tetap mudah dibaca:

1. **Heading / Display Font:**
   * **Gaya:** Geometric Sans-Serif, *Extra Bold / Black*, *Slightly Italicized* (miring) untuk judul utama dan nama permainan.
   * **Rekomendasi Font Alternatif:** *Poppins (Black Italic)*, *Montserrat (Black Italic)*, atau *Plus Jakarta Sans (ExtraBold)*.
   * **Penggunaan & Ukuran:**
     * **Page Title (`Pick Game To Play`, `...si 17-an Online`):** `32px - 36px`, *Line-height* `1.15`, *Font-weight* `800/900 Italic`.
     * **Game Card Title (`Tebak Gambar`, `Quiz Merdeka`):** `24px - 28px`, *Font-weight* `800 Italic`.
     * **Section Header (`OTHER RANK`):** `22px`, *Uppercase*, *Font-weight* `800`.

2. **Body & UI Font:**
   * **Gaya:** Clean Rounded Sans-Serif.
   * **Rekomendasi Font Alternatif:** *Plus Jakarta Sans*, *Nunito*, atau *DM Sans*.
   * **Penggunaan & Ukuran:**
     * **Button Label:** `14px - 16px`, *Font-weight* `600 (SemiBold)`.
     * **Quiz Option Text:** `14px`, *Font-weight* `600`.
     * **Badge / Pill Info (Nama, Koin, Timer, Online Count):** `12px - 13px`, *Font-weight* `600`.

---

## 4. Dimensi, Sudut & Bayangan (Layout, Radius & Shadows)

* **Screen Container:** Rasio layar mobile modern (`393 x 852 px` / iPhone 14-15 Pro viewport).
* **Horizontal Padding:** `20px - 24px`.
* **Border Radius:**
  * **Large Game Card / Quiz Box:** `32px - 40px`
  * **Buttons & Option Items:** `9999px` (*Full Pill Shape*)
  * **Bottom Sheet Top Corners:** `36px`
* **Shadows:**
  * Sangat minimalis (*flat design* dengan kontras warna).
  * *Soft drop shadow* halus (`0px 8px 24px rgba(0, 0, 0, 0.06)`) pada *floating pill* dan tombol aksi.

---

## 5. Spesifikasi Komponen UI (Component Library)

### A. Top User Bar
* **User Profile Pill (Kiri):** Kapsul putih berisi avatar bulat di sisi kiri (`32x32px`) dan nama pengguna (`Peter Haltermy`).
* **Coin Balance Pill (Kanan):** Kapsul putih dengan angka poin/koin tebal (`32.503`) dan ikon koin emas 3D/ilustrasi di sisi kanan.
* **Quick Action Floating Icons:** Dua tombol bulat putih (`44x44px`) bersusun vertikal di bawah koin untuk ikon **Keranjang Belanja (Shop)** dan **Pencarian (Search)**.

### B. Game Selection Card (Carousel Card)
* **Bentuk:** Kontainer vertikal besar (`border-radius: 36px`) dengan warna solid cerah (Oranye / Biru).
* **Header Kartu (Sticker Effect):** Judul permainan berada di dalam bentuk *cloud/blob* putih yang mengikuti lekukan teks (efek stiker potong).
* **Online Status:** Titik hijau menyala + teks jumlah pemain aktif (`8.472 Online`).
* **Ilustrasi Utama:** Karakter maskot besar memenuhi bagian tengah hingga bawah kartu.
* **CTA Button:** Tombol kapsul hitam (`#111111`) di bagian bawah kartu bertuliskan `Play Game` disertai ikon *play* putih.
* **Pagination Dots:** Indikator halaman di bawah kartu; titik aktif berbentuk kapsul memanjang berwarna pink (`#FF5E97`), titik inaktif berupa lingkaran kecil hitam.

### C. Floating Bottom Navigation Bar
* **Kontainer:** Kapsul hitam pekat (`#111111`) yang melayang di bagian bawah layar dengan *padding* dalam sekitar `6px`.
* **Item Navigasi:**
  1. **Active Tab (`My Games`):** Kapsul berwarna hijau (`#0E8366`), teks putih + ikon *game/book*.
  2. **Inactive Tabs:** Tiga lingkaran putih (`44x44px`) berjejer rapat berisi ikon *outline* hitam: **Leaderboard (Podium)**, **Notifikasi (Lonceng)**, dan **Menu (Hamburger)**.

### D. Komponen Gameplay & Kuis
* **Progress & Timer Bar:**
  * **Progress Step:** Deretan *dash* / garis kapsul horizontal (`8-9 step`), warna oranye untuk langkah aktif dan abu-abu untuk langkah berikutnya.
  * **Timer Pill:** Kapsul putih di kanan atas berisi angka hitung mundur (`02:54`) dan ikon *stopwatch*.
* **Canvas Area (Tebak Gambar):** Kartu putih besar tempat menampilkan ilustrasi sketsa hitam-putih (contoh: gambar kupu-kupu dengan petunjuk teks).
* **Multiple Choice Container:**
  * Kotak kuning cerah (`#FCD144`) dengan sudut membulat.
  * **Option Pill:** Kapsul putih penuh berisi lingkaran huruf (`A`, `B`, `C`, `D`) dengan latar hijau muda lembut di sisi kiri, diikuti teks jawaban (contoh: *Ir. Soekarno*, *Achmad Soebardjo*, *Sayuti Melik*, *Mohammad Hatta*).
  * **Selected / Correct State:** Seluruh kapsul opsi berubah menjadi hijau (`#6BB384`) dengan teks putih dan *border* tipis gelap.
  * **Bottom Action Button:**
    * Saat memilih jawaban: Tombol kapsul hitam `Submit Answear`.
    * Setelah dijawab: Tombol kapsul hijau (`#0E8366`) `Continue to Rank` dengan ikon podium.

### E. Komponen Leaderboard (Peringkat)
* **Top 3 Podium Area:** Menampilkan avatar pengguna peringkat teratas (contoh: *3rd Sergei Kurkov*), kapsul poin hijau (`600 PTS`, `700 PTS`), dan dekorasi stiker warna-warni.
* **Other Rank Bottom Sheet:**
  * Kontainer hitam di paruh bawah layar dengan judul `OTHER RANK`.
  * **Rank Row Item:** Kapsul putih untuk pengguna lain (`4th Jaka Manterna`, `5th Hannah Bunny`, `6th Victoria Patricya`) berisi Avatar, Peringkat, Nama, dan Poin di sisi kanan.
  * **Current User Highlight Row:** Kapsul berwarna biru toska (`#67B7C7`) dengan teks putih untuk menyorot posisi pemain saat ini (`7th You`).
* **Footer Action:** Tombol kapsul hijau penuh di bagian paling bawah bertuliskan `Back to Home`.

---

## 6. Rincian Layar (Screen Breakdown)

| No | Nama Layar | Elemen Utama |
| :--- | :--- | :--- |
| **1** | **Onboarding / Splash Screen** (Kiri Bawah) | Karakter maskot kuning berbentuk buku/mahkota, judul besar *"..si 17-an ..a Online"*, subteks kutipan perjuangan, dan tombol aksi hijau di bagian bawah. |
| **2** | **Home - Pilih Game** (Tengah Atas & Bawah) | Header profil & koin, judul *"Pick Game To Play"*, tombol *Shop* & *Search*, *carousel* kartu permainan (*Tebak Gambar* & *Quiz Merdeka*), serta *floating bottom navigation*. |
| **3** | **Gameplay - Tebak Gambar** (Tengah Bawah) | *Segmented progress bar*, *countdown timer* (`02:54`), dan kanvas putih berisi ilustrasi teka-teki gambar. |
| **4** | **Gameplay - Pilihan Ganda** (Kanan Atas & Kiri Atas) | Kontainer kuning berisi 4 opsi jawaban (`A` - `D`). Memiliki dua *state*: sebelum memilih (*Submit Answear*) dan sesudah memilih jawaban benar (*Continue to Rank*). |
| **5** | **Score / Point Feedback** (Kanan Bawah) | Layar gelap dengan efek kilau bintang, kapsul poin di atas (`498 PTS!`), dan karakter maskot biru yang ekspresif. |
| **6** | **Leaderboard / Rank** (Kanan Atas) | Visualisasi podium 3 besar di bagian atas, *bottom sheet* hitam `OTHER RANK` untuk daftar peringkat ke-4 dst., serta tombol `Back to Home`. |