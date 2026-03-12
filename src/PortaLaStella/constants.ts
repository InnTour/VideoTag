// ─────────────────────────────────────────────────────────────────────────────
// TAG A1.02 — Porta La Stella · "La Soglia Sepolta"
// Durata: 65.25s · 1958 frame @30fps · Voce: Iapetus
// ─────────────────────────────────────────────────────────────────────────────

export const DURATION = 1958;
export const FPS = 30;

const DIR = 'images/PORTA LA STELLA';

export const IMAGES = {
  // Seq01 Intro + Seq04 bookend circolare
  porta:           `${DIR}/image_01a2db0f-1975-483d-9993-c8447ed813d9.png`,
  // Seq02 Storia — layer 1 (contesto medievale / cinta muraria)
  orsiniCinta:     `${DIR}/image_08423ad5-5815-49f5-94bd-d1892d1f6214.png`,
  // Seq02 Storia — cross-dissolve layer 2 (portale / dettaglio murario)
  portaleMurario:  `${DIR}/image_21788caa-59d2-4aaa-8d0b-a272283b9773.png`,
  // Seq03 Paradosso — la soglia sepolta sotto l'asfalto
  sogliaInterrata: `${DIR}/image_a921e047-e981-40f0-8131-9480fd919c23.png`,
  // Seq04 Risoluzione — i percorsi naturalistici / le Rupi recuperate
  rupiRecupero:    `${DIR}/image_e2cbd546-2a22-44c9-8323-79405d5dfb47.png`,

  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
} as const;

export const AUDIO = {
  narrazione: 'audio/TAG_A1.02_PORTA_LA_STELLA_Iapetus_ITA.mp3',
} as const;

// ── Durate sequenze (4 seq + 3 fade×20 = 2018−60=1958f ✓) ───────────────────
export const SEQ_DUR = {
  s01:        490,   // Intro · Sotto le Rupi · 16.3s
  s02:        540,   // Storia · Orsini · 1456 · Sant'Antonio · 18s
  s03:        490,   // Paradosso · La porta sepolta · 16.3s
  s04:        498,   // Risoluzione · Recupero · Outro · 16.6s
  transition:  20,
} as const;

// ── Palette cromatica ─────────────────────────────────────────────────────────
export const COLORS = {
  neroFondo:     '#0A0804',   // sfondo notturno caldo
  oroOrsini:     '#D4A843',   // gli Orsini, l'autorità medievale
  oroSoft:       '#B89030',   // oro secondario
  pietraAntica:  '#8B7355',   // la pietra della porta
  verdeRupi:     '#2D5016',   // la vegetazione delle Rupi
  terracotta:    '#A0522D',   // laterizio medievale
  biancoCalce:   '#F8F4EE',   // testi principali
  grigioPietra:  '#6B6560',   // testi secondari
  seppiaAntica:  '#C8A878',   // tono archivio
} as const;

// Font
export const PLAYFAIR = '"Playfair Display", Georgia, serif';
export const LATO     = '"Lato", "Helvetica Neue", sans-serif';
