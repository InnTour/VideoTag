export const DURATION = 2752; // 91.74s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A3.02 - CAPPELLA SANTISSIMA TRINITÀ';
export const IMAGES = {
  hero:     `${DIR}/cXqIV.jpg`,
  lamorea:  `${DIR}/Izd0L.jpg`,
  altare:   `${DIR}/R2WBZ.jpg`,
  gerardo:  `${DIR}/XaVMK.jpg`,
  trinita:  `${DIR}/dzjro.jpg`,
  exVoto:   `${DIR}/larL8.jpg`,
  interno:  `${DIR}/vyKml.jpg`,
  outro:    `${DIR}/xLg7b.jpg`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A3.02_CAPPELLA_TRINITA_Iapetus_ITA.mp3';

// s01+s02+s03+s04+s05+s06 = 2852 - 5×20 = 2752 ✓
export const SEQ_DUR = {
  s01: 300,  // Intro               ~10.0s
  s02: 580,  // Lamorea & Iscrizione ~19.3s
  s03: 560,  // L'Altare            ~18.7s
  s04: 540,  // San Gerardo         ~18.0s
  s05: 450,  // Il Miracolo murales ~15.0s
  s06: 422,  // Rinascita/Outro     ~14.1s
  transition: 20,
} as const;

export const COLORS = {
  neroFondo:      '#08080C',
  pietraChiara:   '#D8C8A8',
  marmoRosso:     '#9B2A2A',
  oroVescovile:   '#C89830',
  lightningGold:  '#F0D060',
  azzurroCielo:   '#3A7A9A',
  biancoCalce:    '#F8F4EE',
  verdeInnTour:   '#2ECC71',
};
