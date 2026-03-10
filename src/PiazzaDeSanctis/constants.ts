// ─────────────────────────────────────────────────────────────────────────────
// TAG A1.01 — Piazza De Sanctis · Il Telegramma che Cambiò il Mezzogiorno
// Durata: 141.92s · 4258 frame @30fps · Voce: Iapetus
// ─────────────────────────────────────────────────────────────────────────────

export const DURATION = 4258;
export const FPS = 30;

const DIR = 'images/!!!!!TAG A1.01 - PIAZZA DE SANCTIS';

export const IMAGES = {
  // Seq01 Intro hero + Seq06 Outro bookend (busto piazza)
  hero:       `${DIR}/image_3ca9cc3c-df94-466d-93c9-cdc469eebb66.png`,
  // Seq02 — De Sanctis (layer 1)
  deSanctis:  `${DIR}/image_4e45bce7-604c-4eb4-bc83-122f7fb8d04a.png`,
  // Seq02 — Il telegramma (cross-dissolve)
  telegramma: `${DIR}/image_a2074ab2-de2e-4ecc-b390-570a05f2b084.png`,
  // Seq03 — La scuola magistrale
  scuola:     `${DIR}/image_bacffcf0-d648-4f52-a9f9-d6d1b8d50b74.png`,
  // Seq04 — La piazza, l'eco delle voci
  piazza:     `${DIR}/image_ca315283-97f3-490b-96b4-7f8a28d92c9b.png`,
  // Seq05 — I contadini (layer 1)
  contadini:  `${DIR}/image_cc8fc3eb-c948-4f72-8e3f-20f070c522f9.png`,
  // Seq05 — Le ragazze a scuola (cross-dissolve)
  studenti:   `${DIR}/image_d5cca18b-d18c-4853-b954-cbbe87ad34f5.png`,

  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
} as const;

export const AUDIO = {
  narrazione: 'audio/Audioguida_Piazza_De_Sanctis_Telegramma_Iapetus_ITA.mp3',
} as const;

export const CAPTIONS_SRC = 'captions/A1-01-PiazzaDeSanctis.json';

// ── Durate sequenze (6 seq + 5 fade×20 = 4358−100=4258f ✓) ──────────────────
export const SEQ_DUR = {
  s01:        600,   // Intro · Busto · 20s
  s02:        750,   // De Sanctis · Il Telegramma · 25s
  s03:        750,   // Il Perché · Morra · 25s
  s04:        600,   // La Piazza · Campane · 20s
  s05:        750,   // I Contadini · Il Faro · 25s
  s06:        908,   // Aforisma · Outro · 30.27s
  transition:  20,
} as const;

// ── Palette cromatica ─────────────────────────────────────────────────────────
export const COLORS = {
  neroFondo:      '#08080F',   // sfondo scuro profondo
  azzurroCivico:  '#2A5A8A',   // il potere civico, lo Stato
  oroIstruzione:  '#D4A843',   // oro del sapere
  oroSoft:        '#C89830',   // oro secondario
  rossoDignita:   '#7A1818',   // il riscatto dalla miseria
  verdeIrpinia:   '#2D5016',   // verde appenninico
  biancoCalce:    '#F8F4EE',   // testi principali
  beigeOratorio:  '#E8D8B0',   // tono caldo scuola/pergamena
  grigioNebbia:   '#6B6560',   // testi secondari
  pietraAntica:   '#8B7355',   // pietra del borgo
} as const;

// Font
export const PLAYFAIR = '"Playfair Display", Georgia, serif';
export const LATO     = '"Lato", "Helvetica Neue", sans-serif';
