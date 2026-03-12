export const DURATION = 1907; // 63.58s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A2.08 - POZZO DEL MIRACOLO';
export const IMAGES = {
  hero:      `${DIR}/download.png`,
  gerardo:   `${DIR}/download (1).png`,
  pozzo:     `${DIR}/download (2).png`,
  miracolo:  `${DIR}/download (3).png`,
  mistico:   `${DIR}/download (6).png`,
  speranza:  `${DIR}/download (6).png`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A2.08_POZZO_DEL_MIRACOLO_Iapetus_ITA.mp3';

// s01+s02+s03+s04+s05 = 1987 - 4×20 = 1907 ✓
export const SEQ_DUR = {
  s01: 280,  // Intro               ~9.3s
  s02: 400,  // San Gerardo         ~13.3s
  s03: 400,  // La Chiave           ~13.3s
  s04: 400,  // Il Miracolo         ~13.3s
  s05: 507,  // Outro               ~16.9s
  transition: 20,
} as const;

export const COLORS = {
  neroFondo:      '#08080C',
  oroMiracolo:    '#F0C040',
  azzurroAcqua:   '#4A8FAA',
  biancoPurezza:  '#F5F0E8',
  verdeInnTour:   '#2ECC71',
  oroAntico:      '#C89830',
  biancoCalce:    '#F8F4EE',
};
