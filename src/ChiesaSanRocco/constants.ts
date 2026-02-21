export const DURATION = 2819; // 93.96s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A3.04 - CHIESA DI SAN ROCCO';
export const IMAGES = {
  hero:       `${DIR}/41IYo.jpg`,
  sanrocco:   `${DIR}/SLBps.jpg`,
  emigrazione:`${DIR}/IZAgf.jpg`,
  promessa:   `${DIR}/Tjhg5.jpg`,
  festa:      `${DIR}/z7TCH.jpg`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A3.04_CHIESA_SAN_ROCCO_Iapetus_ITA.mp3';

// s01+s02+s03+s04+s05+s06 = 2919 - 5×20 = 2819 ✓
export const SEQ_DUR = {
  s01: 310,  // Intro               ~10.3s
  s02: 590,  // Il Santo            ~19.7s
  s03: 580,  // La Chiesa           ~19.3s
  s04: 560,  // La Promessa         ~18.7s
  s05: 300,  // Il Grande Ritorno   ~10.0s
  s06: 579,  // La Festa/Outro      ~19.3s
  transition: 20,
} as const;

export const COLORS = {
  neroFondo:    '#08080C',
  oroSanto:     '#D4A843',
  rossoPeste:   '#8B1A1A',
  azzurroOceano:'#1A4A7A',
  gialloFesta:  '#F0C040',
  arancioneFesta:'#E87030',
  biancoCalce:  '#F8F4EE',
  verdeInnTour: '#2ECC71',
};
