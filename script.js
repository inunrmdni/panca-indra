/**
 * =============================================
 * VIRTUAL LAB PANCA INDERA — script.js
 * Interaksi & Simulasi untuk semua 5 indera
 * =============================================
 */

// === STATE GLOBAL ===
let visitedSenses = new Set();

// =============================================
// 🔀 NAVIGASI ANTAR INDERA
// =============================================
function switchSense(senseName) {
  // Sembunyikan semua panel
  document
    .querySelectorAll(".sense-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".sense-tab")
    .forEach((t) => t.classList.remove("active"));

  // Tampilkan panel yang dipilih
  document.getElementById("sense-" + senseName).classList.add("active");
  
  // Highlight tombol yang aktif - cari tombol berdasarkan teks atau gunakan selector yang tepat
  const activeButton = document.querySelector('.sense-tab[onclick*="' + senseName + '"]');
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// =============================================
// 👁️ SIMULASI MATA
// =============================================
let currentEyeCondition = "normal";
let blinkInterval = null;

// Data tiap kondisi mata
const eyeData = {
  normal: {
    badge: "☀️ Kondisi Normal",
    text: "Dalam kondisi <strong>normal</strong>, mata kita bisa melihat dengan jelas! Cahaya masuk melalui <strong>pupil</strong> (titik hitam di tengah), lalu diproses oleh <strong>retina</strong> di belakang mata. Pupil berukuran sedang untuk menyesuaikan cahaya yang cukup.",
    fact: "Mata kita berkedip ± 15–20 kali per menit untuk menjaga mata tetap lembab!",
    pupilSize: "24px",
    irisSize: "60px",
    overlayBg: "transparent",
    overlayBlur: "0px",
    sceneBrightness: "brightness(1)",
  },
  air: {
    badge: "💧 Mata Kena Air",
    text: "<strong>Ketika mata terkena air</strong>, penglihatan kita menjadi kabur (blur)! Ini karena air di permukaan mata mengubah cara cahaya masuk. Air membuat lapisan bening di kornea tidak merata, sehingga bayangan menjadi tidak fokus.",
    fact: "Air mata sebenarnya melindungi mata! Tapi air dari luar (kolam, air hujan) bisa mengiritasi karena beda komposisi kimianya.",
    pupilSize: "24px",
    irisSize: "60px",
    overlayBg: "rgba(100,180,255,0.35)",
    overlayBlur: "5px",
    sceneBrightness: "brightness(1)",
  },
  gelap: {
    badge: "🌙 Kondisi Malam Hari",
    text: "<strong>Di tempat gelap atau malam hari</strong>, pupil kita membesar (melebar) untuk menangkap lebih banyak cahaya! Ini disebut <strong>dilatasi pupil</strong>. Makin gelap, makin besar pupil membuka agar cahaya yang masuk lebih banyak.",
    fact: 'Butuh sekitar 20–30 menit bagi mata untuk benar-benar beradaptasi di tempat gelap. Ini disebut "adaptasi gelap"!',
    pupilSize: "44px",
    irisSize: "56px",
    overlayBg: "rgba(0,0,0,0)",
    overlayBlur: "0px",
    sceneBrightness: "brightness(0.12)",
  },
};

function setEyeCondition(condition) {
  currentEyeCondition = condition;
  const data = eyeData[condition];

  // Update UI tombol
  document
    .querySelectorAll(".cond-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("btn-" + condition).classList.add("active");

  // Update teks info
  document.getElementById("mata-badge").textContent = data.badge;
  document.getElementById("mata-text").innerHTML = data.text;
  document.getElementById("mata-fact").textContent = data.fact;

  // Update visual mata
  const overlay = document.getElementById("eye-overlay");
  const sceneBg = document.getElementById("scene-bg");

  if (overlay && data.overlayBg) {
    overlay.style.background = data.overlayBg;
    overlay.style.backdropFilter = `blur(${data.overlayBlur})`;
  }
  
  if (sceneBg && data.sceneBrightness) {
    sceneBg.style.filter = data.sceneBrightness;
  }

  // Tampilkan tetes air untuk kondisi 'air'
  const waterDrops = document.getElementById("water-drops");
  if(waterDrops) {
    waterDrops.innerHTML = "";
    if (condition === "air") {
      for (let i = 0; i < 5; i++) {
        const drop = document.createElement("div");
        drop.className = "water-drop";
        drop.style.left = 20 + i * 22 + "px";
        drop.style.animationDelay = i * 0.3 + "s";
        waterDrops.appendChild(drop);
      }
    }
  }
}

// Kedip otomatis (Mode FPV)
function startBlinking() {
  if (blinkInterval) clearInterval(blinkInterval);
  blinkInterval = setInterval(() => {
    const lidTop = document.getElementById("eyelid-top");
    const lidBottom = document.getElementById("eyelid-bottom");
    if (lidTop && lidBottom) {
      // Kelopak tertutup (Full screen)
      lidTop.style.transform = "scaleY(1)";
      lidBottom.style.transform = "scaleY(1)";
      
      setTimeout(() => {
        // Kelopak terbuka (Membuka layar)
        lidTop.style.transform = "scaleY(0)";
        lidBottom.style.transform = "scaleY(0)";
      }, 150); // Waktu kedip sangat singkat
    }
  }, 4000); // Berkedip tiap 4 detik
}

function resetEye() {
  setEyeCondition("normal");
}

// =============================================
// 👃 SIMULASI HIDUNG
// =============================================
const smellData = {
  bunga: {
    badge: "🌺 Mencium Bunga Harum",
    text: "Saat mencium <strong>bunga harum</strong>, molekul bau masuk ke hidung dan menyentuh reseptor penciuman (olfaktorius) di bagian atas hidung. Reseptor ini mengirim sinyal ke otak dan kita merasa senang!",
    fact: "Bau bunga bisa membuat suasana hati lebih baik karena mempengaruhi bagian otak yang mengatur emosi!",
    reaction: "😍",
    particles: ["🌸", "✨", "💐", "🌺"],
    color: "#ff6b9d",
  },
  bulu: {
    badge: "🪶 Bulu Masuk Hidung!",
    text: "Ketika <strong>bulu atau debu</strong> masuk ke hidung, rambut-rambut halus di dalam hidung (silia) mendeteksi benda asing. Otak langsung memerintahkan otot untuk melakukan <strong>bersin</strong> agar benda asing itu keluar!",
    fact: "Kecepatan udara saat bersin bisa mencapai 160 km/jam! Sangat kencang untuk membuang benda asing!",
    reaction: "🤧",
    particles: ["🪶", "💨", "🤧", "😮"],
    color: "#74b9ff",
    sneeze: true,
  },
  makanan: {
    badge: "🍕 Bau Makanan Yummy!",
    text: "Bau <strong>makanan lezat</strong> membuat kita langsung lapar! Ini karena hidung terhubung langsung dengan sistem pencernaan. Mencium bau makanan memicu produksi air liur dan perut siap menerima makanan.",
    fact: "80% dari rasa makanan yang kita nikmati sebenarnya berasal dari bau, bukan rasa lidah!",
    reaction: "😋",
    particles: ["🍕", "🤤", "✨", "💛"],
    color: "#ffd43b",
  },
  busuk: {
    badge: "🗑️ Bau Tidak Enak!",
    text: "Bau <strong>tidak enak atau busuk</strong> adalah sinyal bahaya dari hidung! Hidung mendeteksi senyawa berbahaya seperti sulfur dari bahan busuk. Reaksi langsung adalah menghindari sumber bau — ini melindungi kita dari makanan beracun!",
    fact: "Hidung kita lebih sensitif terhadap bau busuk daripada bau harum. Ini adalah mekanisme perlindungan diri!",
    reaction: "🤢",
    particles: ["💚", "😵", "🗑️", "🤮"],
    color: "#95afc0",
  },
};

let smellTimeout = null;

function triggerSmell(type) {
  const data = smellData[type];

  // Update info
  document.getElementById("hidung-badge").textContent = data.badge;
  document.getElementById("hidung-text").innerHTML = data.text;
  document.getElementById("hidung-fact").textContent = data.fact;

  // Reaksi wajah
  const mouth = document.getElementById("char-mouth");
  const eyeL = document.getElementById("eye-l");
  const eyeR = document.getElementById("eye-r");
  const face = document.getElementById("char-face");

  mouth.textContent = data.reaction;

  // Animasi bersin jika bulu
  if (data.sneeze) {
    eyeL.classList.add("squint");
    eyeR.classList.add("squint");
    const charFace = document.getElementById("char-face");
    charFace.classList.add("sneezing");

    // Tambah efek getaran
    face.style.background = "#ffe0e0";
    setTimeout(() => {
      charFace.classList.remove("sneezing");
      eyeL.classList.remove("squint");
      eyeR.classList.remove("squint");
      face.style.background = "#ffeaa7";
    }, 800);
  } else {
    eyeL.classList.remove("squint");
    eyeR.classList.remove("squint");
    face.style.background = "#ffeaa7";
  }

  // Partikel bau
  spawnSmellParticles(data.particles, data.color);

  // Highlight tombol yang diklik
  document
    .querySelectorAll(".smell-obj")
    .forEach((b) => (b.style.borderColor = "transparent"));

  // Reset setelah 4 detik
  if (smellTimeout) clearTimeout(smellTimeout);
  smellTimeout = setTimeout(() => {
    mouth.textContent = "😊";
  }, 4000);
}

function spawnSmellParticles(emojis, color) {
  const container = document.getElementById("smell-particles");
  container.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.textContent = emojis[i % emojis.length];
    p.style.left = 10 + Math.random() * 80 + "%";
    p.style.animationDelay = Math.random() * 0.8 + "s";
    container.appendChild(p);
  }
  setTimeout(() => {
    container.innerHTML = "";
  }, 2500);
}

function showNosePart(part) {
  const info = document.getElementById("nose-part-info");

  if (part === "lubang") {
    info.innerHTML = `
      <strong>Lubang Hidung & Bulu Hidung</strong><br>
      Pintu masuk udara ke dalam hidung. Terdapat bulu hidung yang berfungsi menyaring debu dan kotoran agar udara yang masuk ke paru-paru bersih.
    `;
  } else if (part === "rongga") {
    info.innerHTML = `
      <strong>Rongga Hidung</strong><br>
      Ruang di dalam hidung yang berfungsi mengatur suhu dan kelembapan udara yang masuk agar sesuai dengan kondisi tubuh kita.
    `;
  } else if (part === "lendir") {
    info.innerHTML = `
      <strong>Selaput Lendir (Mukus)</strong><br>
      Lapisan yang menghasilkan lendir untuk menangkap kotoran halus dan bakteri yang lolos dari bulu hidung.
    `;
  } else if (part === "saraf") {
    info.innerHTML = `
      <strong>Saraf Pembau (Olfaktori)</strong><br>
      Saraf khusus di bagian atas rongga hidung yang mendeteksi partikel kimia dari benda dan mengirim sinyal bau ke otak.
    `;
  }
}

function resetNose() {
  document.getElementById("hidung-badge").textContent =
    "👃 Sentuh objek untuk dicoba!";
  document.getElementById("hidung-text").textContent =
    "Pilih salah satu objek di sebelah kiri untuk melihat bagaimana hidung bereaksi!";
  document.getElementById("hidung-fact").textContent =
    "Manusia bisa mencium lebih dari 1 triliun bau yang berbeda!";
  document.getElementById("char-mouth").textContent = "😊";
  document.getElementById("eye-l").classList.remove("squint");
  document.getElementById("eye-r").classList.remove("squint");
  document.getElementById("smell-particles").innerHTML = "";
}

// =============================================
// 👅 SIMULASI LIDAH
// =============================================
const tasteData = {
  pedas: {
    badge: "🌶️ Rasa Pedas!",
    expression: "😤",
    text: "<strong>Rasa pedas</strong> sebenarnya bukan rasa asli — itu adalah sensasi panas dan rasa sakit! Zat capsaicin di cabai mengaktifkan reseptor panas (TRPV1) di lidah. Seluruh permukaan lidah bisa merasakan pedas, bukan satu zona khusus.",
    activeZones: ["tip", "side-l", "side-r", "middle", "back"],
    color: "#ff4757",
    faceBg: "#ffe0e0",
  },
  manis: {
    badge: "🍭 Rasa Manis!",
    expression: "😄",
    text: "<strong>Rasa manis</strong> terutama dirasakan oleh <strong>ujung lidah</strong>! Reseptor rasa manis (T1R2 dan T1R3) banyak terdapat di papila (bintil) di ujung depan lidah. Makanya kita langsung suka cokelat begitu menyentuh lidah!",
    activeZones: ["tip"],
    color: "#ff6b9d",
    faceBg: "#ffe4f0",
  },
  asin: {
    badge: "🧂 Rasa Asin!",
    expression: "😗",
    text: "<strong>Rasa asin atau gurih</strong> paling terasa di <strong>pinggir/sisi lidah</strong>! Reseptor asin mendeteksi ion natrium dari garam. Sedikit garam dalam makanan membuat rasa jadi lebih enak (gurih), tapi terlalu banyak tidak baik untuk kesehatan.",
    activeZones: ["side-l", "side-r"],
    color: "#4ecdc4",
    faceBg: "#e0f7f6",
  },
  asam: {
    badge: "🍋 Rasa Asam!",
    expression: "😬",
    text: "<strong>Rasa asam</strong> dirasakan di <strong>bagian tengah lidah</strong>! Zat asam (ion H+) mengaktifkan reseptor asam. Reaksi langsung kita adalah menyipitkan mata dan menarik muka — itu refleks alami!",
    activeZones: ["middle"],
    color: "#ffe66d",
    faceBg: "#fffde7",
  },
  pahit: {
    badge: "☕ Rasa Pahit!",
    expression: "🤮",
    text: '<strong>Rasa pahit</strong> paling kuat dirasakan di <strong>bagian belakang lidah</strong>. Ini adalah mekanisme keamanan — sebagian besar racun alami rasanya pahit. Lidah memberi "peringatan terakhir" sebelum kita menelan sesuatu yang berbahaya!',
    activeZones: ["back"],
    color: "#a29bfe",
    faceBg: "#f0efff",
  },
};

function tastFood(type) {
  const data = tasteData[type];

  // Update info
  document.getElementById("lidah-badge").textContent = data.badge;
  document.getElementById("lidah-text").innerHTML = data.text;

  // Update ekspresi wajah
  document.getElementById("face-expression").textContent = data.expression;

  // Update wajah background
  const face = document.getElementById("taste-face");
  face.style.background = data.faceBg;
  face.style.borderColor = data.color;

  // Reset zona aktif lidah
  document
    .querySelectorAll(".taste-zone")
    .forEach((z) => {
      z.classList.remove("active-zone");
      z.style.fillOpacity = "0.3";
      z.style.filter = "none";
    });

  // Aktifkan zona yang relevan
  data.activeZones.forEach((zone) => {
    document.querySelectorAll("." + zone).forEach((el) => {
      el.classList.add("active-zone");
      el.style.fillOpacity = "1";
      el.style.filter = "drop-shadow(0 0 10px " + data.color + ")";
    });
  });

  // Tampilkan/sembunyikan label rasa
  document.querySelectorAll(".taste-label").forEach((label) => {
    label.style.opacity = "0";
  });
  
  // Tampilkan label untuk zona aktif
  data.activeZones.forEach((zone) => {
    document.querySelectorAll(`.taste-zone.${zone}`).forEach((zoneEl) => {
      const labels = document.querySelectorAll(".taste-label");
      labels.forEach((label) => {
        const labelText = label.textContent.toLowerCase();
        const zoneDataAttr = zoneEl.getAttribute("data-zone");
        if (labelText === zoneDataAttr) {
          label.style.opacity = "1";
        }
      });
    });
  });

  // Highlight tombol
  document
    .querySelectorAll(".food-btn")
    .forEach((b) => b.classList.remove("selected"));
  document.getElementById("food-" + type).classList.add("selected");
}

function resetTongue() {
  document.getElementById("lidah-badge").textContent =
    "👅 Pilih makanan untuk dicicipi!";
  document.getElementById("lidah-text").textContent =
    "Klik makanan untuk melihat bagian lidah mana yang merasakan rasa tersebut!";
  document.getElementById("face-expression").textContent = "😐";
  document.querySelectorAll(".taste-zone").forEach((z) => {
    z.classList.remove("active-zone");
    z.style.fillOpacity = "0.3";
    z.style.filter = "none";
  });
  document.querySelectorAll(".taste-label").forEach((label) => {
    label.style.opacity = "0";
  });
  document
    .querySelectorAll(".food-btn")
    .forEach((b) => b.classList.remove("selected"));
}

// =============================================
// ✋ SIMULASI KULIT
// =============================================
const touchData = {
  halus: {
    badge: "🧁 Permukaan Halus",
    sensation: "Halus & Lembut ✨",
    text: "<strong>Permukaan halus</strong> dirasakan oleh reseptor Meissner di kulit yang sensitif terhadap sentuhan ringan. Reseptor ini banyak di ujung jari — makanya kita sangat peka terhadap tekstur halus!",
    handEmoji: "✋",
    handBg: "radial-gradient(circle, #fce4ec, #f8bbd0)",
    animation: "bounce-hand 0.6s ease infinite",
    waveColor: "#ff6b9d",
  },
  kasar: {
    badge: "🪨 Permukaan Kasar",
    sensation: "Kasar & Berpasir 🪨",
    text: "<strong>Tekstur kasar</strong> dirasakan oleh reseptor Merkel yang mendeteksi tekanan berkelanjutan dan detail tekstur. Saat menyentuh batu kasar, ribuan reseptor kecil mengirim sinyal cepat ke otak!",
    handEmoji: "🤚",
    handBg: "radial-gradient(circle, #fff3e0, #ffe0b2)",
    animation: "shake 0.3s ease infinite",
    waveColor: "#ff9800",
  },
  lembut: {
    badge: "🧸 Permukaan Lembut",
    sensation: "Lembut seperti kapas 🧸",
    text: "<strong>Kelembutan</strong> dirasakan oleh reseptor Ruffini dan Meissner yang bekerja sama. Ketika memegang boneka atau bantal lembut, otak merespons dengan rasa nyaman dan rileks!",
    handEmoji: "🤲",
    handBg: "radial-gradient(circle, #e8f5e9, #c8e6c9)",
    animation: "bounce-hand 1s ease infinite",
    waveColor: "#4caf50",
  },
  panas: {
    badge: "🔥 Sensasi Panas",
    sensation: "Panas! Hati-hati! 🔥",
    text: "<strong>Sensasi panas</strong> dideteksi oleh reseptor termoreseptor (TRPV1) yang sama dengan yang mendeteksi capsaicin cabai! Saat suhu tinggi terdeteksi, otak langsung memerintahkan tangan untuk menjauh — refleks perlindungan!",
    handEmoji: "🖐️",
    handBg: "radial-gradient(circle, #fff9c4, #ffcc80)",
    animation: "shake 0.2s ease infinite",
    waveColor: "#f44336",
  },
  dingin: {
    badge: "🧊 Sensasi Dingin",
    sensation: "Dingin & Segar 🧊",
    text: '<strong>Sensasi dingin</strong> dideteksi oleh reseptor TRPM8. Suhu dingin memperlambat sinyal saraf, makanya kulit yang sangat dingin bisa "mati rasa" sementara. Es batu bisa mengurangi rasa sakit sementara!',
    handEmoji: "🤙",
    handBg: "radial-gradient(circle, #e3f2fd, #bbdefb)",
    animation: "shake 0.5s ease infinite",
    waveColor: "#2196f3",
  },
  bergetar: {
    badge: "📳 Sensasi Getaran",
    sensation: "Bergetar & Berdenyut! 📳",
    text: "<strong>Getaran</strong> dideteksi oleh reseptor Pacini yang bisa merasakan frekuensi getaran dari 40–400 Hz. Reseptor ini paling dalam di kulit dan bisa merasakan getaran yang datang dari jauh!",
    handEmoji: "✋",
    handBg: "radial-gradient(circle, #f3e5f5, #e1bee7)",
    animation: "shake 0.1s ease infinite",
    waveColor: "#9c27b0",
  },
};

function touchTexture(type) {
  const data = touchData[type];

  // Update info
  document.getElementById("kulit-badge").textContent = data.badge;
  document.getElementById("kulit-text").innerHTML = data.text;

  // Update visual tangan
  const handEmoji = document.getElementById("hand-emoji");
  const handDisplay = document.querySelector(".hand-display");
  const sensationText = document.getElementById("sensation-text");

  handEmoji.textContent = data.handEmoji;
  handDisplay.style.background = data.handBg;
  handDisplay.style.borderColor = data.waveColor;
  handDisplay.style.animation = data.animation;
  handDisplay.style.boxShadow = `0 0 0 0 ${data.waveColor}66`;
  sensationText.textContent = data.sensation;
  sensationText.style.color = data.waveColor;

  // Animasi ripple
  if (type === "bergetar") {
    handDisplay.style.animation = "shake 0.15s ease infinite";
  } else if (type === "kasar") {
    handDisplay.style.animation = "shake 0.3s ease infinite";
  } else if (type === "panas") {
    handDisplay.style.animation = "shake 0.2s ease infinite";
  } else {
    handDisplay.style.animation = "bounce-hand 0.8s ease infinite";
  }

  // Tandai kulit dermis aktif
  const dermis = document.querySelector(".dermis");
  dermis.style.background = data.waveColor + "40";
  dermis.style.borderLeft = `4px solid ${data.waveColor}`;

  // Stop animasi setelah 3 detik
  setTimeout(() => {
    handDisplay.style.animation = "";
    dermis.style.background = "#f8bbd0";
    dermis.style.borderLeft = "none";
  }, 3000);
}

function resetTouch() {
  document.getElementById("kulit-badge").textContent =
    "✋ Pilih tekstur untuk dirasakan!";
  document.getElementById("kulit-text").textContent =
    "Kulit kita punya jutaan reseptor kecil yang bisa merasakan sentuhan, suhu, dan tekanan. Pilih tekstur untuk belajar lebih lanjut!";
  document.getElementById("hand-emoji").textContent = "✋";
  document.getElementById("sensation-text").textContent = "Pilih tekstur!";

  const handDisplay = document.querySelector(".hand-display");
  handDisplay.style.background = "radial-gradient(circle, #fff3e0, #ffe0b2)";
  handDisplay.style.borderColor = "#ffcc80";
  handDisplay.style.animation = "";
  handDisplay.style.boxShadow = "";
  document.getElementById("sensation-text").style.color = "";

  const dermis = document.querySelector(".dermis");
  dermis.style.background = "#f8bbd0";
  dermis.style.borderLeft = "none";
}

// =============================================
// 👂 SIMULASI TELINGA
// =============================================
let currentVolume = 30;

function updateVolume(value) {
  currentVolume = parseInt(value);
  document.getElementById("vol-value").textContent = value;

  // Update icon volume
  const icon = document.getElementById("vol-icon");
  if (value <= 20) icon.textContent = "🔈";
  else if (value <= 60) icon.textContent = "🔉";
  else icon.textContent = "🔊";

  // Update indicator bar (masking dari kanan)
  const fill = document.getElementById("indicator-fill");
  const pct = 100 - value;
  fill.style.right = value + "%";
  fill.style.left = "auto";
  fill.style.width = 100 - value + "%";

  // Update status
  const status = document.getElementById("vol-status");
  const statusIcon = document.getElementById("vol-status-icon");
  const statusText = document.getElementById("vol-status-text");

  // Update ear anatomy highlights
  const outer = document.getElementById("anat-outer");
  const middle = document.getElementById("anat-middle");
  const inner = document.getElementById("anat-inner");
  outer.classList.remove("active");
  middle.classList.remove("active");
  inner.classList.remove("active");

  if (value < 40) {
    // AMAN
    status.className = "vol-status";
    statusIcon.textContent = "✅";
    statusText.textContent = "Volume aman untuk didengar";
    document.getElementById("telinga-badge").textContent = "✅ Volume Aman";
    document.getElementById("telinga-text").innerHTML =
      `<strong>${value} dB</strong> — Volume ini aman! Kita bisa mendengar suara seperti angin semilir, bisikan, atau suara perpustakaan. Telinga kita sangat nyaman.`;
    outer.classList.add("active");

    // Gelombang suara lambat
    updateSoundWaves(value, "#4caf50");
  } else if (value < 75) {
    // NORMAL - HATI-HATI
    status.className = "vol-status";
    statusIcon.textContent = "✅";
    statusText.textContent = "Volume normal, nyaman untuk percakapan";
    document.getElementById("telinga-badge").textContent = "🗣️ Volume Normal";
    document.getElementById("telinga-text").innerHTML =
      `<strong>${value} dB</strong> — Volume percakapan normal. Ini setara dengan suara orang berbicara di ruangan. Telinga kita bisa mendengar dengan baik dan nyaman.`;
    outer.classList.add("active");
    middle.classList.add("active");
    updateSoundWaves(value, "#ffc107");
  } else if (value < 85) {
    // HATI-HATI
    status.className = "vol-status warning-state";
    statusIcon.textContent = "⚠️";
    statusText.textContent = "Mulai keras, batasi paparannya";
    document.getElementById("telinga-badge").textContent = "⚠️ Mulai Keras";
    document.getElementById("telinga-text").innerHTML =
      `<strong>${value} dB</strong> — Mulai keras! Ini setara dengan suara mesin cuci atau lalu lintas kota. Jangan terlalu lama terpapar suara ini ya!`;
    outer.classList.add("active");
    middle.classList.add("active");
    inner.classList.add("active");
    updateSoundWaves(value, "#ff9800");
  } else {
    // BERBAHAYA
    status.className = "vol-status danger-state";
    statusIcon.textContent = "🚨";
    statusText.textContent = "⚠️ BERBAHAYA! Bisa merusak telinga!";
    document.getElementById("telinga-badge").textContent = "🚨 BAHAYA!";
    document.getElementById("telinga-text").innerHTML =
      `<strong>${value} dB</strong> — <span style="color:red">BERBAHAYA!</span> Di atas 85 dB bisa merusak sel rambut di koklea yang tidak bisa tumbuh kembali! Paparan jangka panjang menyebabkan <strong>tuli permanen</strong>. Segera kecilkan volume!`;
    outer.classList.add("active");
    middle.classList.add("active");
    inner.classList.add("active");
    updateSoundWaves(value, "#f44336");

    // Shake ear at dangerous levels
    const earDisplay = document.querySelector(".big-ear-display");
    earDisplay.style.animation = "shake 0.2s ease infinite";
    setTimeout(() => {
      earDisplay.style.animation = "";
    }, 1000);

    if (currentVolume >= 85) {
    }
  }
}

function updateSoundWaves(volume, color) {
  const waves = document.querySelectorAll(".wave");
  const speed = 2.5 - volume / 50; // makin keras makin cepat
  const opacity = volume / 200;

  waves.forEach((w, i) => {
    w.style.borderColor = color + "60";
    w.style.animationDuration = Math.max(0.5, speed - i * 0.2) + "s";
  });
}

function setVolume(val) {
  document.getElementById("vol-slider").value = val;
  updateVolume(val);
}

function resetEar() {
  setVolume(30);
  document.getElementById("telinga-badge").textContent =
    "👂 Geser slider untuk atur volume!";
  document.getElementById("telinga-text").textContent =
    "Geser slider volume untuk melihat bagaimana tingkat suara mempengaruhi kesehatan telinga kita. Batas aman pendengaran adalah di bawah 85 dB!";
}

// =============================================
// 🚀 INISIALISASI
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi mata
  setEyeCondition("normal");
  startBlinking();

  // Inisialisasi volume
  updateVolume(30);

  // Tandai indera pertama sudah dikunjungi
  visitedSenses.add("mata");

  // Tambah bintang awal selamat datang
  setTimeout(() => {}, 1000);

  // Hover effects pada smell objects
  document.querySelectorAll(".smell-obj").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.08)";
      this.style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
    });
    btn.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  console.log("🔬 Virtual Lab Panca Indera siap! Selamat belajar!");
});

// =============================================
// LOGIKA SLIDER & FPV MATA
// =============================================
function updateEyeVision() {
  const nightVal = document.getElementById("night-slider").value;
  const lightVal = document.getElementById("light-slider").value;
  const waterVal = document.getElementById("water-slider").value;
  const minusVal = parseFloat(document.getElementById("minus-slider").value);
  const plusVal = parseFloat(document.getElementById("plus-slider").value);
  const silinderVal = parseFloat(document.getElementById("silinder-slider").value);
  const axisVal = document.getElementById("axis-slider").value;

  // Update Teks Label Night, Light, Water
  document.getElementById("night-value").innerText = nightVal;
  document.getElementById("light-value").innerText = lightVal;
  document.getElementById("water-value").innerText = waterVal;

  // Formatting teks Minus
  let minusText = "-" + minusVal.toFixed(2) + " D";
  let minusDesc = "";
  if (minusVal === 0) { minusText = "0.00 D"; minusDesc = "(Normal)"; }
  else if (minusVal <= 3.00) minusDesc = "(Buram Rendah)";
  else if (minusVal <= 6.00) minusDesc = "(Buram Sedang)";
  else minusDesc = "(Buram Tinggi)";
  document.getElementById("minus-value").innerText = minusText;
  document.getElementById("minus-desc").innerText = minusDesc;

  // Formatting teks Plus
  let plusText = "+" + plusVal.toFixed(2) + " D";
  let plusDesc = "";
  if (plusVal === 0) { plusText = "+0.00 D"; plusDesc = "(Normal)"; }
  else if (plusVal <= 2.00) plusDesc = "(Buram Rendah)";
  else if (plusVal <= 5.00) plusDesc = "(Buram Sedang)";
  else plusDesc = "(Buram Tinggi)";
  document.getElementById("plus-value").innerText = plusText;
  document.getElementById("plus-desc").innerText = plusDesc;

  // Formatting teks Silinder
  let cylText = "-" + silinderVal.toFixed(2) + " D";
  if (silinderVal === 0) cylText = "0.00 D";
  document.getElementById("silinder-value").innerText = cylText;
  document.getElementById("axis-value").innerText = axisVal + "°";

  // 1. Kalkulasi Pencahayaan (Night vs Light)
  const darkness = (nightVal - 18) / 6; 
  const baseBrightness = lightVal / 100;
  const finalBrightness = Math.max(0.1, baseBrightness - (darkness * 0.8));

  // 2. Kalkulasi Blur Minus & Plus
  const distantBlur = minusVal * 1.5; 
  const nearBlur = plusVal * 2; 

  // 3. Kalkulasi Silinder (Astigmatisme)
  const isSilinder = silinderVal > 0;
  let silinderShadow = "";
  let silinderBlur = 0;
  if (isSilinder) {
     const rad = (axisVal * Math.PI) / 180;
     const offset = silinderVal * 2;
     const xOff = Math.cos(rad) * offset;
     const yOff = Math.sin(rad) * offset;
     silinderShadow = `drop-shadow(${xOff}px ${yOff}px ${silinderVal}px rgba(255,255,255,0.6))`;
     silinderBlur = silinderVal * 0.5;
  }

  // Menerapkan ke Elemen
  const sceneBg = document.getElementById("scene-bg");
  const distantObjects = document.getElementById("distant-objects");
  const nearObjects = document.getElementById("near-objects");

  if(sceneBg) {
    sceneBg.style.filter = `brightness(${finalBrightness})`;
  }

  if(distantObjects) {
    const totalDistantBlur = distantBlur + (waterVal / 30) + silinderBlur;
    distantObjects.style.filter = `blur(${totalDistantBlur}px) ${silinderShadow}`;
  }

  if(nearObjects) {
    const totalNearBlur = nearBlur + (waterVal / 30) + silinderBlur;
    nearObjects.style.filter = `blur(${totalNearBlur}px) ${silinderShadow}`;
  }

  // Tetesan Air Mata
  const waterDrops = document.getElementById("water-drops");
  if(waterDrops) {
    waterDrops.style.opacity = waterVal / 100;
    // Jika slider air diputar, tambahkan efek tetesan air acak
    if(waterVal > 0 && waterDrops.children.length === 0) {
      for (let i = 0; i < 15; i++) {
        const drop = document.createElement("div");
        drop.className = "water-drop";
        drop.style.left = (Math.random() * 100) + "%";
        drop.style.top = (Math.random() * 100) + "%";
        drop.style.animationDelay = (Math.random() * 2) + "s";
        waterDrops.appendChild(drop);
      }
    } else if (waterVal == 0) {
      waterDrops.innerHTML = "";
    }
  }
}

function showEyePart(part) {
  const info = document.getElementById("eye-part-info");

  const white = document.querySelector(".eye-white");
  const iris = document.getElementById("eye-iris");
  const pupil = document.getElementById("eye-pupil");
  const eyelids = document.querySelectorAll(".eyelid-top, .eyelid-bottom");

  // Reset active classes
  if (white) white.classList.remove("eye-active");
  if (iris) iris.classList.remove("eye-active");
  if (pupil) pupil.classList.remove("eye-active");
  if (eyelids) eyelids.forEach((e) => e.classList.remove("eye-active"));

  if (part === "sklera") {
    info.innerHTML = `
      <strong>Sklera</strong><br>
      Sklera adalah bagian putih mata yang berfungsi melindungi bola mata. 
      Bagian ini menjaga bentuk mata agar tetap bulat dan kuat. 
      Sklera juga menjadi tempat melekatnya otot-otot mata yang membantu mata bergerak.
    `;
    if (white) white.classList.add("eye-active");
  } else if (part === "iris") {
    info.innerHTML = `
      <strong>Iris</strong><br>
      Iris adalah bagian mata yang berwarna, misalnya coklat atau hitam. 
      Iris berfungsi mengatur besar kecilnya pupil untuk mengontrol jumlah cahaya yang masuk ke mata. 
      Saat cahaya terang, iris membuat pupil mengecil. Saat gelap, iris membuat pupil membesar.
    `;
    if (iris) iris.classList.add("eye-active");
  } else if (part === "pupil") {
    info.innerHTML = `
      <strong>Pupil</strong><br>
      Pupil adalah lubang kecil berwarna hitam di tengah mata. 
      Cahaya masuk ke mata melalui pupil. 
      Besar kecil pupil berubah sesuai banyaknya cahaya yang diterima mata agar penglihatan tetap nyaman.
    `;
    if (pupil) pupil.classList.add("eye-active");
  } else if (part === "kelopak") {
    info.innerHTML = `
      <strong>Kelopak Mata</strong><br>
      Kelopak mata berfungsi melindungi mata dari debu, kotoran, dan cahaya yang terlalu terang. 
      Saat berkedip, kelopak mata membantu menyebarkan air mata agar mata tetap lembap dan tidak kering.
    `;
    if (eyelids) eyelids.forEach((e) => e.classList.add("eye-active"));
  } else if (part === "kornea") {
    info.innerHTML = `
      <strong>Kornea</strong><br>
      Kornea adalah lapisan bening di bagian depan mata yang membantu memfokuskan cahaya.
    `;
  } else if (part === "lensa") {
    info.innerHTML = `
      <strong>Lensa</strong><br>
      Lensa membantu memfokuskan cahaya agar bayangan jatuh tepat di retina.
    `;
  } else if (part === "retina") {
    info.innerHTML = `
      <strong>Retina</strong><br>
      Retina menangkap cahaya lalu mengubahnya menjadi sinyal saraf.
    `;
  } else if (part === "saraf") {
    info.innerHTML = `
      <strong>Saraf Optik</strong><br>
      Saraf optik mengirim sinyal dari retina ke otak agar kita bisa melihat.
    `;
  }
}

// ==========================================
// FUNGSI ANATOMI BARU (Lidah, Kulit, Telinga)
// ==========================================
function showTonguePart(part) {
  const info = document.getElementById("tongue-part-info");
  if (part === "papila") info.innerHTML = "<strong>Papila (Bintil Lidah)</strong><br>Bintil-bintil kecil di permukaan lidah yang membuat lidah terasa kasar. Di sinilah kuncup pengecap bersembunyi!";
  else if (part === "kuncup") info.innerHTML = "<strong>Kuncup Pengecap (Taste Buds)</strong><br>Reseptor khusus di dalam papila yang bertugas mengenali molekul rasa dari makanan yang kita kunyah.";
  else if (part === "saraf") info.innerHTML = "<strong>Saraf Pengecap (Gustatori)</strong><br>Saraf yang membawa pesan rasa dari kuncup pengecap langsung ke otak agar kita tahu rasa makanannya!";
}

function showSkinPart(part) {
  const info = document.getElementById("skin-part-info");
  if (part === "epidermis") info.innerHTML = "<strong>Epidermis (Lapisan Luar)</strong><br>Lapisan kulit terluar yang berfungsi sebagai pelindung tubuh dari debu, kuman, dan air.";
  else if (part === "dermis") info.innerHTML = "<strong>Dermis (Lapisan Tengah)</strong><br>Lapisan tempat berkumpulnya jutaan reseptor sentuhan, suhu, kelenjar keringat, dan folikel rambut.";
  else if (part === "hipodermis") info.innerHTML = "<strong>Hipodermis (Lapisan Dalam)</strong><br>Lapisan paling bawah yang banyak mengandung jaringan lemak pelindung untuk menjaga tubuh tetap hangat.";
  else if (part === "reseptor") info.innerHTML = "<strong>Reseptor Kulit</strong><br>Saraf-saraf super kecil yang bisa mendeteksi rasa sakit, tekanan, sentuhan halus, dan suhu panas atau dingin.";
}

function showEarPart(part) {
  const info = document.getElementById("ear-part-info");
  if (part === "daun") info.innerHTML = "<strong>Daun Telinga (Pinna)</strong><br>Bagian luar telinga yang berfungsi seperti corong raksasa untuk menangkap gelombang suara dari luar.";
  else if (part === "saluran") info.innerHTML = "<strong>Saluran Telinga</strong><br>Jalan masuk suara yang juga dilindungi oleh rambut halus agar debu atau serangga tidak bisa masuk ke dalam.";
  else if (part === "gendang") info.innerHTML = "<strong>Gendang Telinga (Membran Timpani)</strong><br>Selaput super tipis yang akan bergetar kencang ketika terkena gelombang suara, mirip seperti alat musik drum!";
  else if (part === "koklea") info.innerHTML = "<strong>Koklea (Rumah Siput)</strong><br>Organ berbentuk cangkang siput berisi cairan yang tugas utamanya mengubah getaran suara menjadi sinyal saraf ke otak.";
}
