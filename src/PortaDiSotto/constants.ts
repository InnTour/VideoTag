/**
 * TAG A1.04 — Porta di Sotto
 * "La Porta dei Mercanti"
 *
 * Durata: 41.98s · 1259 frame @30fps · Voce: Leda
 * Struttura: s01=310 + s02=330 + s03=310 + s04=369 − 3×20 = 1259 ✓
 */

// ── Colori ────────────────────────────────────────────────────────────────
export const COLORS = {
  neroFondo:    '#0A0804',
  oroMercato:   '#D4A843',
  oroSoft:      '#B89030',
  terracotta:   '#A0522D',
  pietraAntica: '#8B7355',
  biancoCalce:  '#F8F4EE',
  grigioPietra: '#6B6560',
  seppiaAntica: '#C8A878',
  verdeIrpino:  '#2D5016',
} as const;

// ── Tipografia ─────────────────────────────────────────────────────────────
export const PLAYFAIR = '"Playfair Display", Georgia, serif';
export const LATO     = '"Lato", Arial, sans-serif';

// ── Audio ─────────────────────────────────────────────────────────────────
export const AUDIO = {
  narrazione: 'audio/TAG_A1.04_PORTA_DI_SOTTO_Leda.mp3',
};

// ── Immagini ──────────────────────────────────────────────────────────────
export const IMAGES = {
  hero:     'images/PORTA DI SOTTO/image_10856b39-d0f0-4d6a-97f8-08faedc056e8.png',
  nebbia:   'images/PORTA DI SOTTO/image_ded5d1bb-c870-4d0e-ba29-814fe4fb25d9.png',
  arcoExt:  'images/PORTA DI SOTTO/image_245546c4-8a54-4571-82a0-64f6e446345f.png',
  donna:    'images/PORTA DI SOTTO/image_2562dbbf-c0c6-459c-90be-bd5950ba8d55.png',
  asini:    'images/PORTA DI SOTTO/image_33b082f6-b391-4390-8c98-3ac78c6956d2.png',
  ghost:    'images/PORTA DI SOTTO/image_602c086f-f48a-44a7-ada4-7ed37ccd1d30.png',
  pittura:  'images/PORTA DI SOTTO/image_d09dc241-398a-4b8b-b642-79bf3bd1b3c0.png',
  vita:     'images/PORTA DI SOTTO/image_d200c24f-cef2-43a1-9679-f1095161b9e9.png',
  mercato:  'images/PORTA DI SOTTO/image_e58dbdbe-84ef-4566-bc18-d251ed7e4ae2.png',
  puglia:   'images/PORTA DI SOTTO/image_10856b39-d0f0-4d6a-97f8-08faedc056e8.png',
  famiglie: 'images/PORTA DI SOTTO/image_245546c4-8a54-4571-82a0-64f6e446345f.png',
  costru:   'images/PORTA DI SOTTO/image_2562dbbf-c0c6-459c-90be-bd5950ba8d55.png',
  logoInnTour: 'logo-inntour.png',
  logoComune:  'lacedonia-logo.png',
} as const;

// ── Durate sequenze ────────────────────────────────────────────────────────
// s01=310 + s02=330 + s03=310 + s04=369 − 3×20 = 1259 @30fps
export const SEQ_DUR = {
  s01:        310,
  s02:        330,
  s03:        310,
  s04:        369,
  transition:  20,
  total:      1259,
} as const;
