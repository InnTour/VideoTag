export const DURATION = 1907; // 63.58s @ 30fps — voce Iapetus
export const FPS = 30;

const DIR = 'images/TAG A2.08 - POZZO DEL MIRACOLO';
export const IMAGES = {
  hero:      `${DIR}/image_03005989-fe37-48e3-a94d-954e23ae9b6f.png`,
  gerardo:   `${DIR}/image_13dab0cc-caab-4a9c-9343-5400b7cd7c88.png`,
  pozzo:     `${DIR}/image_667192fb-6364-40a4-9b6c-11acc31b8a4b.png`,
  miracolo:  `${DIR}/image_6d2430a2-09aa-44b0-8b37-8b4148cae3e2.png`,
  mistico:   `${DIR}/image_ae1b584a-4ed8-4414-9e53-be6265c8f05d.png`,
  speranza:  `${DIR}/image_cb1f1249-dfba-47d0-a85e-aad660686446.png`,
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
