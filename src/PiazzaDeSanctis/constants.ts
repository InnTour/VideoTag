// ─────────────────────────────────────────────────────────────────────────────
// TAG A1.01 — Piazza De Sanctis · Il Telegramma che Cambiò il Mezzogiorno
// Durata: 141.92s · 4258 frame @30fps · Voce: Iapetus
// ─────────────────────────────────────────────────────────────────────────────

export const DURATION = 3175;
export const FPS = 30;

const DIR = 'images/!!!!!TAG A1.01 - PIAZZA DE SANCTIS';

export const IMAGES = {
  // Seq01 Intro hero + Seq06 Outro bookend (busto piazza)
  hero:       `${DIR}/image_be42db8a-313f-433f-806d-4d78fe9aa07b.png`,
  // Seq02 — De Sanctis (layer 1)
  deSanctis:  `${DIR}/image_ce5b4626-6630-4b90-bd96-203fb8ad82b3.png`,
  // Seq02 — Il telegramma (cross-dissolve)
  telegramma: `${DIR}/Gemini_Generated_Image_6ap6wd6ap6wd6ap6.png`,
  // Seq03 — La scuola magistrale
  scuola:     `${DIR}/Gemini_Generated_Image_6ap6wd6ap6wd6ap62.png`,
  // Seq04 — La piazza, l'eco delle voci
  piazza:     `${DIR}/Gemini_Generated_Image_6ap6wd6ap6wd6ap6_modificata.png`,
  // Seq05 — I contadini (layer 1)
  contadini:  `${DIR}/Gemini_Generated_Image_6ap6wd6ap6wd6ap62_modificata.png`,
  // Seq05 — Le ragazze a scuola (cross-dissolve)
  studenti:   `${DIR}/image_d5cca18b-d18c-4853-b954-cbbe87ad34f5.png`,

  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
} as const;

export const AUDIO = {
  narrazione: 'audio/Audioguida_Piazza_De_Sanctis_Telegramma_Iapetus_ITA.mp3',
} as const;

export const CAPTIONS_SRC = 'captions/A1-01-PiazzaDeSanctis.json';

// ── Durate sequenze (6 seq + 5 fade×20 = 3275−100=3175f ✓) ──────────────────
export const SEQ_DUR = {
  s01:        460,   // Intro · Busto · 15.3s
  s02:        560,   // De Sanctis · Il Telegramma · 18.7s
  s03:        570,   // Il Perché · Morra · 19s
  s04:        460,   // La Piazza · Campane · 15.3s
  s05:        545,   // I Contadini · Il Faro · 18.2s
  s06:        680,   // Aforisma · Outro · 22.7s
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
