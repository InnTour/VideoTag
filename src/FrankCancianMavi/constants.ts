export const DURATION = 834; // 27.79s @ 30fps
export const FPS = 30;

// ── Asset paths ───────────────────────────────────────────────────────────────
const DIR = 'images/TAG A4.06 - MAVI - MUSEO ANTROPOLOGICO';

export const IMAGES = {
  // Seq01 — Intro hero: manifesto mostra MAVI
  manifesto:     `${DIR}/image_34b443c2-0f3c-465e-8a15-cb30f75b3502.png`,

  // Seq02 — Frank Cancian 1957
  cancianBorgo:  `${DIR}/image_dd722545-f1c8-4b54-9075-6967552e84b5.png`, // pittoresco: Cancian nel borgo
  barBW:         `${DIR}/image_d3a3d1c2-393d-41a4-9fd4-be4e0710875e.png`, // B&W autentico: bar contadini

  // Seq03 — La vita contadina / Il Museo
  bambiniBW:     `${DIR}/image_d615f189-ad04-481e-830c-5843d6c1f7c4.png`, // B&W: bambini in classe con luce
  contadini:     `${DIR}/image_bea476be-79bd-42d4-bc5e-63dfd3a0f402.png`, // collage: scene contadine
  maviInterno:   `${DIR}/image_1596ff07-adf6-4be1-a771-9533885722b5.png`, // MAVI: visitatore guarda foto grande

  // Seq04 — Outro / L'anima
  emigrazione:   `${DIR}/image_d8d2c82f-f160-4f20-bb5e-cbc9d577b8a9.png`, // porta dorata: l'emigrazione

  // Loghi
  logoComune:    'lacedonia-logo.png',
  logoInnTour:   'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_C3.01_FRANK_CANCIAN_E_IL_MAVI_Leda_ITA.mp3';

// TransitionSeries: 4 seq + 3 fade×20 = 894 − 60 = 834 frame ✓
export const SEQ_DUR = {
  s01: 200,       // Intro · Benvenuti al MAVI       ~6.7s
  s02: 260,       // Frank Cancian · 1957 · 1801     ~8.7s
  s03: 240,       // Vita contadina · Il Museo       ~8.0s
  s04: 194,       // L'anima · Outro                 ~6.5s
  transition: 20,
} as const;

// ── Palette cromatica ─────────────────────────────────────────────────────────
export const COLORS = {
  neroFoto:      '#0A0804',   // nero fotografico leggermente caldo
  seppiaScuro:   '#2A1A08',   // seppia profondo — archivio fotografico
  seppia:        '#C8A878',   // seppia medio — pellicola vintage
  oroMavi:       '#D4A843',   // oro MAVI
  biancoCalce:   '#F8F4EE',
  grigioArgento: '#B8B0A8',   // toni B&W argento
  rossoCamera:   '#8B1A1A',   // camera oscura
  verdeInnTour:  '#2ECC71',
};
