export const DURATION = 2068; // 68.94s @ 30fps
export const FPS = 30;

export const IMAGES = {
  // ── TAG A4.05 Biblioteca Storica Vescovile ──────────────────────
  hero:       'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_7f62077c-44c3-4187-97ca-a3662524365a.png',
  pergamene:  'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_e375ce7f-f07a-4547-95d6-27d6edac7b27.png',
  luce:       'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_b22ee069-18c6-4769-b9e0-203f7aeb4b5c.png',
  volumi1:    'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_55679d34-ef9a-4edf-8db9-f6be983ef252.png',
  volumi2:    'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_6e75bfa5-96c2-4676-b79c-56c920ccbd06.png',
  biblioteca: 'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_5d27520e-1b2a-4744-ba75-c80b05073c78.png',
  giacobini:  'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_306912f6-3dd5-442e-9ce4-4f0fc78f9651.png',
  romanzi:    'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/image_50c5a577-38a1-43d8-998d-34f9dc9fc0e9.png',

  // ── Loghi ─────────────────────────────────────────────────────
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A4.05_BIBLIOTECA_VESCOVILE_Iapetus_ITA.mp3';

// Durate per TransitionSeries (4 fades × 20 = 2148 − 80 = 2068 frame ✓)
export const SEQ_DUR = {
  s01: 270,        // Intro           ~9.0s
  s02: 500,        // Le Pergamene    ~16.7s
  s03: 480,        // L'Encyclopédie  ~16.0s
  s04: 450,        // Cinquecentine & 1799  ~15.0s
  s05: 448,        // Outro           ~14.9s
  transition: 20,  // Fade cross tra sequenze
} as const;

export const COLORS = {
  neroSala:      '#0D0D1A',
  pergamena:     '#E8D8B0',
  inchiostro:    '#2A1A08',
  oroAntico:     '#C89830',
  rossoVescovile:'#8B1A1A',
  azzurroSigillo:'#1A3A6B',
  biancoCalce:   '#F8F4EE',
  grigioMappa:   '#8A7A6A',
  verdeInnTour:  '#2ECC71',
  oroLampade:    '#D4A843',
};
