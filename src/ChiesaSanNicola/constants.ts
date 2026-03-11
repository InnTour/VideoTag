export const DURATION = 2371; // 79.02s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A3.06 - CHIESA DI SAN NICOLA';
export const IMAGES = {
  hero:      `${DIR}/download.png`,
  portale:   `${DIR}/download (1).png`,
  navata:    `${DIR}/download (2).png`,
  statua:    `${DIR}/download (6).png`,
  affresco:  `${DIR}/download (2).png`,
  festa:     `${DIR}/download (6).png`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A3.06_CHIESA_SAN_NICOLA_Iapetus_ITA.mp3';

// s01+s02+s03+s04+s05+s06 = 2471 - 5×20 = 2371 ✓
export const SEQ_DUR = {
  s01: 290,  // Intro               ~9.7s
  s02: 490,  // Il Portale          ~16.3s
  s03: 470,  // La Devozione        ~15.7s
  s04: 450,  // La Statua           ~15.0s
  s05: 300,  // Il Seicento Vivo    ~10.0s
  s06: 471,  // La Festa/Outro      ~15.7s
  transition: 20,
} as const;

export const COLORS = {
  neroFondo:    '#08080C',
  oroSacro:     '#D4A843',
  azzurroNicola:'#1A4A7A',
  rossoMarmo:   '#9B2A2A',
  avorioCarta:  '#F0E8D8',
  gialloFesta:  '#F0C040',
  biancoCalce:  '#F8F4EE',
  verdeInnTour: '#2ECC71',
};
