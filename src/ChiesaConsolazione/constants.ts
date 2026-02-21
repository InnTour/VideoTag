export const DURATION = 2131; // 71.03s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A3.01 - CHIESA DELLA CONSOLAZIONE';
export const IMAGES = {
  hero:      `${DIR}/blwQQ.jpg`,
  laterano:  `${DIR}/8jhKy.jpg`,
  veduta:    `${DIR}/jnmUr.jpg`,
  fonte:     `${DIR}/7n7dy.jpg`,
  chiesa:    `${DIR}/sjqjY.jpg`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A3.01_CHIESA_DELLA_CONSOLAZIONE_Iapetus_ITA.mp3';

// s01+s02+s03+s04+s05 = 2211 - 4×20 = 2131 ✓
export const SEQ_DUR = {
  s01: 290,  // Intro               ~9.7s
  s02: 430,  // Laterano            ~14.3s
  s03: 420,  // La Sirena           ~14.0s
  s04: 390,  // Strati Storici      ~13.0s
  s05: 681,  // Speranza/Outro      ~22.7s
  transition: 20,
} as const;

export const COLORS = {
  neroFondo:    '#08080C',
  travertino:   '#D4C4A0',
  oroAntico:    '#C89830',
  acquaBlu:     '#2A6080',
  sirenoTeal:   '#1A7A6A',
  biancoCalce:  '#F8F4EE',
  verdeInnTour: '#2ECC71',
};
