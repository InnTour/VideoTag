// ─────────────────────────────────────────────────────────────────────────────
// TAG B2.01 — Via Tagliata · La Strada che Custodisce il Sangue di Roma
// Durata: 173.35s · 5200 frame @30fps · Voce: Iapetus
// ─────────────────────────────────────────────────────────────────────────────

export const DURATION = 5200;
export const FPS = 30;

const DIR = 'images/VIA TAGLIATA';

export const IMAGES = {
  // Seq01 Intro hero + Seq05 Outro bookend (via oggi — selciato)
  hero:         `${DIR}/image_10f15eb7-c7f4-4f35-8a68-2df17b296892.png`,
  // Seq02 — 150 d.C. · diverticulum · Via Appia (layer 1)
  viaAppia:     `${DIR}/image_2231b6d6-1761-4066-9500-a97b490918e3.png`,
  // Seq02 — Carri romani / botteghe (cross-dissolve)
  carri:        `${DIR}/image_83e7417c-e101-40e9-a7f4-62b1dd1e749b.png`,
  // Seq02 — Scure consolare 1820
  scure:        `${DIR}/image_4dfa478f-8b2f-4270-a746-6b65b13f0228.png`,
  // Seq03 — Annibale / esercito cartaginese (layer 1)
  annibale:     `${DIR}/image_5ab4e5bc-9384-4d5c-b48c-0f75da9dc7b7.png`,
  // Seq03 — Campo di battaglia / morti (cross-dissolve)
  battaglia:    `${DIR}/image_6927d291-a775-4d77-9071-da8dae6a396a.png`,
  // Seq04 — La caedes / esecuzione sul selciato (layer 1)
  caedes:       `${DIR}/image_a91bd130-6ab5-453d-8346-b02be768e973.png`,
  // Seq04 — Città bruciata / rovine (cross-dissolve)
  rovine:       `${DIR}/image_b1d1a0b1-c5ab-4120-8b60-320fc1a11e2d.png`,
  // Seq05 — Vigneti / campagna irpina oggi
  vigneti:      `${DIR}/download.png`,
  // Seq05 — Pietre selciato / memoria (layer 2)
  pietre:       `${DIR}/download (1).png`,

  logoComune:   'lacedonia-logo.png',
  logoInnTour:  'logo-inntour.png',
} as const;

export const AUDIO = {
  narrazione: 'audio/Audioguida_Via_Tagliata_Sangue_Roma_Iapetus_ITA.mp3',
} as const;

// ── Durate sequenze (5 seq + 4 fade×20 = 5280−80=5200f ✓) ───────────────────
export const SEQ_DUR = {
  s01:        720,   // Intro · Selciato · 24s
  s02:       1050,   // La Via · 150 d.C. · 35s
  s03:       1080,   // 212 a.C. · Annibale · 36s
  s04:       1050,   // Caedes · Origine del nome · 35s
  s05:       1380,   // Outro · Memoria · 46s
  transition:  20,
} as const;

// ── Palette cromatica ─────────────────────────────────────────────────────────
export const COLORS = {
  neroFondo:       '#06060A',   // sfondo notturno profondo
  rossoSangue:     '#8B1A1A',   // la strage, la caedes
  rossoVivo:       '#B02020',   // accento drammatico
  oroRomano:       '#C8A84B',   // l'Impero, l'autorità
  oroSoft:         '#B89030',   // oro secondario
  pietraSelciato:  '#A09080',   // il lastricato
  terracotta:      '#A05030',   // laterizio romano
  verdeIrpinia:    '#2D5016',   // i vigneti
  biancoCalce:     '#F8F4EE',   // testi principali
  grigioPietra:    '#6B6560',   // testi secondari
  polvere:         '#C8B89A',   // polvere della via
} as const;

// Font
export const PLAYFAIR = '"Playfair Display", Georgia, serif';
export const LATO     = '"Lato", "Helvetica Neue", sans-serif';
