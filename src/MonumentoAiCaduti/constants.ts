export const DURATION = 1848; // 61.60s @ 30fps
export const FPS = 30;

const DIR = 'images/TAG A4.08 - MONUMENTO AI CADUTI';

export const IMAGES = {
  // Intro + Outro bookend: monumento nella nebbia dorata del mattino
  hero:      `${DIR}/image_e6ece517-b6dc-475b-b3c6-98847eb3aca4.png`,

  // Seq02: statua del milite di Nicola Di Vietri — luce dorata
  monumento: `${DIR}/image_42f20829-7fbd-4f30-85c3-201bda3cf2b9.png`,

  // Seq03 layer 1: le lapidi di marmo con i nomi dei Caduti
  lapidi:    `${DIR}/image_045dcb26-6100-4199-a000-e09385c24825.png`,

  // Seq03 layer 2: soldati lacedoniesi in partenza (Lacedonia per la Patria)
  soldati:   `${DIR}/image_70a072b0-9daf-47d2-8bac-7c29584deb9c.png`,

  // Seq04: cerimonia 4 novembre — trombettista e corona tricolore
  cerimonia: `${DIR}/fdfewea.png`,

  // Loghi
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A4.08_MONUMENTO_AI_CADUTI_Iapetus_ITA.mp3';

// TransitionSeries: 5 seq + 4 fade×20 = 1928 − 80 = 1848 frame ✓
export const SEQ_DUR = {
  s01: 300,       // Intro           ~10.0s
  s02: 440,       // Il Milite       ~14.7s
  s03: 400,       // Le Lapidi       ~13.3s
  s04: 390,       // La Cerimonia    ~13.0s
  s05: 398,       // Outro           ~13.3s
  transition: 20,
} as const;

// ── Palette cromatica ─────────────────────────────────────────────────────────
export const COLORS = {
  neroProfondo:  '#0A0A0A',   // nero della solennità
  grigioPiombo:  '#3A3A3A',   // piombo dei soldati
  biancoLapide:  '#F0EDE8',   // bianco calce del marmo
  oroLuce:       '#D4A843',   // oro della luce e della memoria
  rossoPapavero: '#8B1A1A',   // rosso papavero — simbolo caduti
  grigioCielo:   '#7A8A7A',   // cielo velato
  verdeSperanza: '#2D5016',   // verde — la terra, la vita
  verdeAlloro:   '#3A6020',   // verde alloro — la corona
  verdeInnTour:  '#2ECC71',
};
