export const DURATION = 1761; // 58.70s @ 30fps — voce Iapetus
export const FPS = 30;

// ── Asset paths ───────────────────────────────────────────────────────────────
const DIR = 'images/TAG A4.06 - MAVI - MUSEO ANTROPOLOGICO';

export const IMAGES = {
  // Seq01 — Intro hero: manifesto mostra MAVI
  manifesto:    `${DIR}/image_34b443c2-0f3c-465e-8a15-cb30f75b3502.png`,

  // Seq02 — Frank Cancian 1957
  cancianBorgo: `${DIR}/image_dd722545-f1c8-4b54-9075-6967552e84b5.png`, // pittoresco: Cancian nel borgo
  barBW:        `${DIR}/image_d3a3d1c2-393d-41a4-9fd4-be4e0710875e.png`, // B&W autentico: bar contadini 1957

  // Seq03 — La Vita Contadina
  bambiniBW:    `${DIR}/image_d615f189-ad04-481e-830c-5843d6c1f7c4.png`, // B&W: bambini in classe
  contadini:    `${DIR}/image_bea476be-79bd-42d4-bc5e-63dfd3a0f402.png`, // pittoresco: scene contadine

  // Seq04 — Il Museo MAVI (4 nuove foto reali del MAVI)
  maviInterno:      `${DIR}/image_1596ff07-adf6-4be1-a771-9533885722b5.png`, // MAVI: visitatore guarda foto grande
  cancianRitratto:  `${DIR}/frank-cancian-1-500x500.jpg`,                     // ritratto di Frank Cancian
  scena1957:        `${DIR}/i__id152_crop600x600c__1x.jpg`,                   // scena irpina 1957
  inaugurazione:    `${DIR}/inaugurazione-museo-cancian.jpg`,                 // inaugurazione museo MAVI
  fotoArchivio:     `${DIR}/photo_2.jpg`,                                     // foto d'archivio Cancian

  // Seq05 — Outro / L'Anima
  emigrazione:  `${DIR}/image_d8d2c82f-f160-4f20-bb5e-cbc9d577b8a9.png`, // porta dorata: l'emigrazione

  // Loghi
  logoComune:   'lacedonia-logo.png',
  logoInnTour:  'logo-inntour.png',
};

// Voce Iapetus — durata reale: 58.70s = 1761 frame @30fps
export const AUDIO = 'audio/TAG_C3.01_FRANK_CANCIAN_E_IL_MAVI_Iapetus_ITA.mp3';

// TransitionSeries: 5 seq + 4 fade×20 → 1841 − 80 = 1761 frame ✓
export const SEQ_DUR = {
  s01: 300,   // Intro · Manifesto MAVI · hook storico          ~10.0s
  s02: 420,   // Frank Cancian · 1957 · Counter 0→1801          ~14.0s
  s03: 340,   // La Vita Contadina · bambiniBW → contadini      ~11.3s
  s04: 340,   // Il Museo · maviInterno · stats                 ~11.3s
  s05: 441,   // Outro · emigrazione · tagline · loghi · iris   ~14.7s
  transition: 20,
} as const;
// Verifica: 300+420+340+340+441 = 1841 − 4×20 = 1761 ✓

// ── Palette cromatica ─────────────────────────────────────────────────────────
export const COLORS = {
  neroFoto:      '#0A0804',   // nero fotografico leggermente caldo
  seppiaScuro:   '#2A1A08',   // seppia profondo — archivio fotografico
  seppia:        '#C8A878',   // seppia medio — pellicola vintage
  oroMavi:       '#D4A843',   // oro MAVI
  biancoCalce:   '#F8F4EE',
  grigioArgento: '#B8B0A8',   // toni B&W argento
  verdeInnTour:  '#2ECC71',
};
