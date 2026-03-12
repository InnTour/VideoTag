// ─────────────────────────────────────────────────────────────────────────────
// TAG A1.02 — Porta La Stella · "La Soglia Sepolta"
// Durata: 65.25s · 1958 frame @30fps · Voce: Iapetus
// ─────────────────────────────────────────────────────────────────────────────

export const DURATION = 1958;
export const FPS = 30;

const DIR = 'images/PORTA LA STELLA';

export const IMAGES = {
  // Unica immagine — usata con objectPosition diverse per varietà
  porta: `${DIR}/image_01a2db0f-1975-483d-9993-c8447ed813d9.png`,

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
