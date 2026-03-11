import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

export const DURATION = 2400; // 80s @ 30fps
export const FPS = 30;

const DIR = 'images/TAG A2.09 - CHIESA SANTA MARIA DELLA CANCELLATA';
export const IMAGES = {
  hero:        `${DIR}/download.png`,
  iside1:      `${DIR}/download (1).png`,
  iside2:      `${DIR}/download (2).png`,
  ibrido:      `${DIR}/download (3).png`,
  mosaici:     `${DIR}/download (4).png`,
  vescovi:     `${DIR}/download (5).png`,
  madonna:     `${DIR}/download (6).png`,
  processione: `${DIR}/download (7).png`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A2.09_CHIESA_SANTA_MARIA_Iapetus_ITA.mp3';

// s01+s02+s03+s04+s05 = 2480 - 4×20 = 2400 ✓
export const SEQ_DUR = {
  s01: 300,  // Intro                ~10s
  s02: 500,  // Iside & Dioscuri     ~17s
  s03: 440,  // La Cattedrale 1705   ~15s
  s04: 420,  // Il Miracolo 1948     ~14s
  s05: 820,  // Continuum + Outro    ~27s
  transition: 20,
} as const;

export const COLORS = {
  neroFondo:    '#08080C',
  ambraEgizia:  '#C8781A',
  oroEgizio:    '#D4A030',
  linoSacro:    '#E8D8B0',
  bluLacrime:   '#1A3A6B',
  argento:      '#C0C8D4',
  oroMedievale: '#D4A843',
  biancoCalce:  '#F8F4EE',
  verdeInnTour: '#2ECC71',
  glassScuro:   'rgba(8,8,12,0.82)',
  glassBorder:  'rgba(212,160,48,0.28)',
};
