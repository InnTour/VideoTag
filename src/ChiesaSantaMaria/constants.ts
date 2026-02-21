export const DURATION = 1187; // 39.58s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A2.09 - CHIESA SANTA MARIA DELLA CANCELLATA';
export const IMAGES = {
  hero:        `${DIR}/image_c81f9269-6946-41a1-bdcf-6fedb9ec799f.png`,
  iside1:      `${DIR}/image_1f086b43-3848-44e3-95b0-d6fce43a00c6.png`,
  iside2:      `${DIR}/image_8feb5932-2b08-4157-a73c-f10afb26541c.png`,
  ibrido:      `${DIR}/image_9051dfe6-f1b3-419f-9054-1091b77ca769.png`,
  mosaici:     `${DIR}/image_a441a81b-f95a-45cb-8964-8aedcbc25a24.png`,
  vescovi:     `${DIR}/image_81a662d7-52ef-4466-b13f-4f9cf2ab53eb.png`,
  madonna:     `${DIR}/image_f06d7a5c-6d42-41c3-a09c-9cf1a6a25237.png`,
  processione: `${DIR}/image_7f38cc92-62c4-4d4a-9ad3-e5e44c09906f.png`,
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A2.09_CHIESA_SANTA_MARIA_Iapetus_ITA.mp3';

// s01+s02+s03+s04 = 1247 - 3×20 = 1187 ✓
export const SEQ_DUR = {
  s01: 240,  // Intro              ~8.0s
  s02: 340,  // Iside & Strati    ~11.3s
  s03: 340,  // La Madonna         ~11.3s
  s04: 327,  // Continuum/Outro    ~10.9s
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
};
