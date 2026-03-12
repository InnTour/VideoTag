/**
 * Audioguida — Congiura dei Baroni
 * "Il Patto di Sangue"
 *
 * Audio: Audioguida_Congiura_Baroni_Patto_Sangue_Iapetus_ITA.mp3
 * Cartella immagini: public/images/CONGIURA DEI BARONI/
 */

// ── Colori ────────────────────────────────────────────────────────────────
export const COLORS = {
  bgNero:           '#030201',
  neroFondo:        '#030201',   // alias per compatibilità con index.tsx
  bgScuro:          '#0A0704',
  oroTorcia:        '#C8841A',
  oroAntico:        '#B8922A',
  oroChiaro:        '#E8B840',
  rossoTradimento:  '#8B1A1A',
  rossoVelluto:     '#6B1010',
  avorio:           '#F0E8D8',
  grigioPietra:     '#8A8078',
  biancoOstia:      '#F8F4EC',
  glassScuro:       'rgba(10,7,4,0.85)',
  glassBorder:      'rgba(200,132,26,0.25)',
  glassBorderRed:   'rgba(139,26,26,0.35)',
  verdeInnTour:     '#2ECC71',
  azureInnTour:     '#3498DB',
} as const;

// ── Tipografia ─────────────────────────────────────────────────────────────
export const PLAYFAIR = '"Playfair Display", Georgia, serif';
export const LATO     = '"Lato", Arial, sans-serif';

// ── Audio ─────────────────────────────────────────────────────────────────
export const AUDIO = {
  narrazione: 'audio/Audioguida_Congiura_Baroni_Patto_Sangue_Iapetus_ITA.mp3',
} as const;

// ── Immagini ──────────────────────────────────────────────────────────────
const DIR = 'images/CONGIURA DEI BARONI';
export const IMAGES = {
  nobili:      `${DIR}/image_0312fcac-c625-4312-9ce2-3f95a674877a.png`,
  congiurati1: `${DIR}/image_eb64892f-e908-4618-89b0-20e0f27d355f.png`,
  congiurati2: `${DIR}/image_cc45b20b-033e-48ab-b384-1d7874d3969b.png`,
  giuramento1: `${DIR}/image_68cbb35c-52d0-499b-8584-185162a14643.png`,
  giuramento2: `${DIR}/image_3d85aafc-f542-4920-9c29-6d58b1b0ac81.png`,
  atto:        `${DIR}/image_51f5aa45-ec39-472d-a2d8-f4aa061fcf2f.png`,
  epilogo:     `${DIR}/image_f7e33fa1-398a-4b8d-b5a3-63921a36ff3a.png`,
  // Immagine extra presente solo in CONGIURA DEI BARONI (non in TAG A2.03)
  extra:       `${DIR}/image_61367719-b359-4e33-9ee8-7b6848e027a9.png`,
  logoInnTour: 'logo-inntour.png',
  logoComune:  'lacedonia-logo.png',
} as const;

// ── Durate sequenze ────────────────────────────────────────────────────────
// Audio: 102.71s · 3081 frame @30fps
// s01+s02+s03+s04 − 3×20 = 3081  →  3141 − 60 = 3081 ✓
export const SEQ_DUR = {
  s01:        750,
  s02:        800,
  s03:        800,
  s04:        791,
  transition:  20,
  total:      3081,
} as const;

export const DURATION = 3081;
export const FPS = 30;
