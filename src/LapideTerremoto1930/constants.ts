export const DURATION = 1982; // 66.06s @ 30fps — voce Iapetus
export const FPS = 30;

// ── Asset paths ───────────────────────────────────────────────────────────────
const DIR = 'images/TAG A4.09 - LAPIDE TERREMOTO 1930';

export const IMAGES = {
  // Seq01 — Intro hero: lapide commemorativa
  lapide:        `${DIR}/download.png`,

  // Seq02 — Il Sisma: macerie e devastazione
  macerie:       `${DIR}/download (1).png`,
  lapideNomi:    `${DIR}/download (2).png`,

  // Seq03 — I Salvati: contadini nei campi / mietitura
  contadini:     `${DIR}/download (3).png`,

  // Seq04 — La Ricostruzione: nuovo paese / spianata
  ricostruzione: `${DIR}/download (4).png`,

  // Seq05 — La Speranza / Outro bookend
  speranza:      `${DIR}/download (7).png`,

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
