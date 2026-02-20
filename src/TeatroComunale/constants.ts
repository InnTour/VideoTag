export const DURATION = 2152; // 71.73s @ 30fps
export const FPS = 30;

export const IMAGES = {
  hero:       'images/TAG A4.04 - TEATRO COMUNALE/image_09055990-42a6-4510-99fc-ddf93842579c.png',
  archivio:   'images/TAG A4.04 - TEATRO COMUNALE/image_b0d3125e-68bb-4895-8355-78cf3a240640.png',
  anfiteatro: 'images/TAG A4.04 - TEATRO COMUNALE/image_d6a7a600-31f6-42ab-82d6-ba9957f8ff1f.png',
  cinema:     'images/TAG A4.04 - TEATRO COMUNALE/image_dd9cbe46-717c-427c-9404-b89a656f99fb.png',
  oggi:       'images/TAG A4.04 - TEATRO COMUNALE/image_ee8cda8a-359b-4d77-bb35-d48de2212f69.png',
};

export const AUDIO = 'audio/TAG_A4.04_TEATRO_COMUNALE_Iapetus_ITA.mp3';

// Durate locali per TransitionSeries (frame per sequenza, 4 fade×20 = 2232−80 = 2152 ✓)
export const SEQ_DUR = {
  s01: 290,        // Intro      ~9.7s
  s02: 560,        // Origini    ~18.7s
  s03: 590,        // Cinema     ~19.7s
  s04: 530,        // Oggi       ~17.7s
  s05: 262,        // Outro      ~8.7s
  transition: 20,  // Fade cross tra sequenze
} as const;

export const COLORS = {
  neroSala:    '#0D0D1A',
  rossoTelone: '#8B1A1A',
  rossoVivo:   '#CC2222',
  oroLampade:  '#D4A843',
  oroChiaro:   '#F0C060',
  beigeRoma:   '#D4C4A0',
  verdeInnTour:'#2ECC71',
  azureInnTour:'#3498DB',
  biancoCalce: '#F8F4EE',
  grigio:      '#6B6560',
};
