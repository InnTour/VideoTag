export const DURATION = 2371; // 79.02s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A3.06 - CHIESA DI SAN NICOLA';
export const IMAGES = {
  hero:      `${DIR}/image_bfae0f45-521e-48db-99e7-638697bf2532.png`,
  portale:   `${DIR}/image_653204b7-eff5-4f88-b4fe-bb429c384fab.png`,
  navata:    `${DIR}/image_6d290300-6b9d-4175-9ba8-066c5ce2aede.png`,
  statua:    `${DIR}/image_8368ec60-d084-4c2d-9750-4f50c67f3930.png`,
  affresco:  `${DIR}/image_a7fdd89d-34cd-436f-9068-e4818e8c2243.png`,
  festa:     `${DIR}/image_34f3caba-8209-45fd-98b1-9eccd05cab89.png`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A3.06_CHIESA_SAN_NICOLA_Iapetus_ITA.mp3';

// s01+s02+s03+s04+s05 = 2451 - 4×20 = 2371 ✓
export const SEQ_DUR = {
  s01: 290,  // Intro               ~9.7s
  s02: 490,  // Il Portale          ~16.3s
  s03: 470,  // La Devozione        ~15.7s
  s04: 450,  // La Statua           ~15.0s
  s05: 751,  // La Festa/Outro      ~25.0s
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
