export const DURATION = 2152; // 71.73s @ 30fps
export const FPS = 30;

export const IMAGES = {
  // ── TAG A4.04 Teatro Comunale ──────────────────────────────────
  hero:       'images/TAG A4.04 - TEATRO COMUNALE/download.png',
  archivio:   'images/TAG A4.04 - TEATRO COMUNALE/download (1).png',
  anfiteatro: 'images/TAG A4.04 - TEATRO COMUNALE/download (2).png',
  cinema:     'images/TAG A4.04 - TEATRO COMUNALE/download (4).png',
  oggi:       'images/TAG A4.04 - TEATRO COMUNALE/download (4).png',

  // ── TAG L1.01 Gerardo Vigorita L'Uomo della Luce ──────────────
  vigorita1:  "images/TAG L1.01 - GERARDO VIGORITA L'UOMO DELLA LUCE/image_07985028-4234-4172-9d7e-4ca1b3ae904b.png",
  vigorita2:  "images/TAG L1.01 - GERARDO VIGORITA L'UOMO DELLA LUCE/image_7ef6bc10-3cd8-4675-a790-d3b728bf3738.png",
  vigorita3:  "images/TAG L1.01 - GERARDO VIGORITA L'UOMO DELLA LUCE/image_a89d8da7-9941-4a8a-9a5b-f12608322653.png",

  // ── Loghi ─────────────────────────────────────────────────────
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A4.04_TEATRO_COMUNALE_Iapetus_ITA.mp3';

// Durate per TransitionSeries (4 fade×20 = 2232−80 = 2152 frame ✓)
export const SEQ_DUR = {
  s01: 290,        // Intro       ~9.7s
  s02: 560,        // Origini     ~18.7s
  s03: 590,        // Cinema      ~19.7s
  s04: 530,        // Oggi        ~17.7s
  s05: 262,        // Outro       ~8.7s
  transition: 20,  // Fade cross tra sequenze
} as const;

export const COLORS = {
  neroSala:    '#0D0D1A',
  rossoTelone: '#8B1A1A',
  rossoVivo:   '#CC2222',
  oroLampade:  '#D4A843',
  oroChiaro:   '#F0C060',
  beigeRoma:   '#D4C4A0',
  verdeInnTour:'#2ECC71',
  azureInnTour:'#3498DB',
  biancoCalce: '#F8F4EE',
  grigio:      '#6B6560',
};
