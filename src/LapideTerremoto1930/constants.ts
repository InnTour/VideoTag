export const DURATION = 1982; // 66.06s @ 30fps — voce Iapetus
export const FPS = 30;

// ── Asset paths ───────────────────────────────────────────────────────────────
const DIR = 'images/TAG A4.09 - LAPIDE TERREMOTO 1930';

export const IMAGES = {
  // Seq01 — Intro hero: lapide commemorativa
  lapide:        `${DIR}/image_03b78576-b9e2-4251-8b88-f0dca0f40f71.png`,

  // Seq02 — Il Sisma: macerie e devastazione
  macerie:       `${DIR}/image_0d87df3b-f0d2-4caa-88df-607c9b06e798.png`,
  lapideNomi:    `${DIR}/image_173461cb-5f26-4f02-8cc9-a2a54e3a83f7.png`, // lapide con nomi incisi

  // Seq03 — I Salvati: contadini nei campi / mietitura
  contadini:     `${DIR}/image_2f0e0bf7-e3c3-4712-9bfe-77817c3bfe66.png`,

  // Seq04 — La Ricostruzione: nuovo paese / spianata
  ricostruzione: `${DIR}/image_b3231da5-0341-492f-a711-2251f08b0b43.png`,

  // Seq05 — La Speranza / Outro bookend
  speranza:      `${DIR}/image_e9c42da1-600f-4ab0-81cd-6861a15c04b4.png`,

  // Loghi
  logoComune:    'lacedonia-logo.png',
  logoInnTour:   'logo-inntour.png',
};

// Voce Iapetus — durata reale: 66.06s = 1982 frame @30fps
// (voce Leda = 29.64s/889f — NON usare)
export const AUDIO = 'audio/TAG_A4.09_LAPIDE_TERREMOTO_1930_Iapetus_ITA.mp3';

// TransitionSeries: 5 seq + 4 fade×20 → 2062 − 80 = 1982 frame ✓
export const SEQ_DUR = {
  s01: 350,   // L'Alba del Dolore  · lapide/notte, 3:00, hook       ~11.7s
  s02: 440,   // Il Sisma           · shake, macerie, 200 vittime     ~14.7s
  s03: 380,   // I Salvati          · contadini, feriti, Cappella     ~12.7s
  s04: 400,   // La Ricostruzione   · decisione, nuovo paese          ~13.3s
  s05: 492,   // La Speranza        · nomi, tagline, loghi, iris      ~16.4s
  transition: 20,
} as const;
// Verifica: 350+440+380+400+492 = 2062 − 4×20 = 1982 ✓

// ── Palette cromatica ─────────────────────────────────────────────────────────
export const COLORS = {
  neroNotte:     '#030306',   // nero quasi puro — le 3 di mattina
  grigioLapide:  '#6A6460',   // grigio scuro del marmo consumato
  biancoMarmo:   '#F0EDE8',   // bianco caldo del marmo
  rossoSisma:    '#8B1A1A',   // la violenza del terremoto
  polvere:       '#8B7355',   // polvere delle macerie
  oroSperanza:   '#C8A84B',   // la speranza, la rinascita
  verdeInnTour:  '#2ECC71',
};
