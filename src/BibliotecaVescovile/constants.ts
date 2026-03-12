export const DURATION = 2068; // 68.94s @ 30fps
export const FPS = 30;

export const IMAGES = {
  // ── TAG A4.05 Biblioteca Storica Vescovile ──────────────────────
  hero:       'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download.png',
  pergamene:  'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download (1).png',
  luce:       'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download (2).png',
  volumi1:    'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download (3).png',
  volumi2:    'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download (4).png',
  biblioteca: 'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download (5).png',
  giacobini:  'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download (6).png',
  romanzi:    'images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/download (6).png',

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
