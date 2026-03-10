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
  hero:     'images/PORTA DI SOTTO/image_212c71ab-c58f-458a-8a3b-17546497ac43.png',
  nebbia:   'images/PORTA DI SOTTO/image_ded5d1bb-c870-4d0e-ba29-814fe4fb25d9.png',
  arcoExt:  'images/PORTA DI SOTTO/image_f35000a4-0047-4df2-b83b-b9359d115d39.png',
  donna:    'images/PORTA DI SOTTO/image_f3ab8a5c-2176-4226-8dc7-6e1e1a118b61.png',
  asini:    'images/PORTA DI SOTTO/image_01a00e9a-504a-41db-9deb-23fd00f8478c.png',
  ghost:    'images/PORTA DI SOTTO/image_11cce201-bcd4-4f47-81a4-b27aa4a1424a.png',
  pittura:  'images/PORTA DI SOTTO/image_90822c8d-5b74-4a92-b586-a8f19f3b4338.png',
  vita:     'images/PORTA DI SOTTO/image_d966b1fe-7f66-4707-a4cf-d9c2a799a7f2.png',
  mercato:  'images/PORTA DI SOTTO/image_33550a11-f267-4c44-9e4b-75d15ca7a7f6.png',
  puglia:   'images/PORTA DI SOTTO/image_94c00eff-d91a-4b54-bdf4-2f59cfba84bc.png',
  famiglie: 'images/PORTA DI SOTTO/image_e2476195-0944-41b1-993c-e268d04c42fe.png',
  costru:   'images/PORTA DI SOTTO/image_d953ad65-c621-422b-8ab2-72c482509737.png',
  logoInnTour: 'Logo facicon.png',
  logoComune:  'Logo Comune di Lacedonia.png',
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
