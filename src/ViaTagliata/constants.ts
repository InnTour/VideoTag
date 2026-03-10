// ─────────────────────────────────────────────────────────────────────────────
// TAG B2.01 — Via Tagliata · La Strada che Custodisce il Sangue di Roma
// Durata: 173.35s · 5200 frame @30fps · Voce: Iapetus
// ─────────────────────────────────────────────────────────────────────────────

export const DURATION = 5200;
export const FPS = 30;

const DIR = 'images/VIA TAGLIATA';

export const IMAGES = {
  // Seq01 Intro hero + Seq05 Outro bookend (via oggi — selciato)
  hero:         `${DIR}/image_1cd8652f-5760-4bc0-a443-426ecca1c910.png`,
  // Seq02 — 150 d.C. · diverticulum · Via Appia (layer 1)
  viaAppia:     `${DIR}/image_2ebd31b9-3147-42ad-9343-e50886454c7b.png`,
  // Seq02 — Carri romani / botteghe (cross-dissolve)
  carri:        `${DIR}/image_83e7417c-e101-40e9-a7f4-62b1dd1e749b.png`,
  // Seq02 — Scure consolare 1820
  scure:        `${DIR}/image_97d2b206-1aa3-4cd1-91ec-77c6bf069ac5.png`,
  // Seq03 — Annibale / esercito cartaginese (layer 1)
  annibale:     `${DIR}/image_b8429402-7865-4ffb-9e97-303b9209fd17.png`,
  // Seq03 — Campo di battaglia / morti (cross-dissolve)
  battaglia:    `${DIR}/image_c20d18b3-4e23-4219-b452-5dec5984eb96.png`,
  // Seq04 — La caedes / esecuzione sul selciato (layer 1)
  caedes:       `${DIR}/image_c7bb9333-fdbd-4048-8ff4-f062e36407db.png`,
  // Seq04 — Città bruciata / rovine (cross-dissolve)
  rovine:       `${DIR}/image_cd6e3f41-90e1-40d1-a8c6-5aca122df092.png`,
  // Seq05 — Vigneti / campagna irpina oggi
  vigneti:      `${DIR}/image_eef06f58-214e-4eb0-8ae3-6e8a3c8f2f5a.png`,
  // Seq05 — Pietre selciato / memoria (layer 2)
  pietre:       `${DIR}/image_f696e461-f41f-4b48-8b53-65b2d4946d84.png`,

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
