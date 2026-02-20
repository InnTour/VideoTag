export const DURATION = 1776; // 59.19s @ 30fps
export const FPS = 30;

export const IMAGES = {
  // ── TAG A4.10 Colonna del Pedoca ──────────────────────────────
  hero:        'images/TAG A4.10 - COLONNA DEL PEDOCA/fssfsfasf.png',
  tempioIside: 'images/TAG A4.10 - COLONNA DEL PEDOCA/image_28d55fc9-1d28-4991-a752-0c83520c7d92.png',
  travertino:  'images/TAG A4.10 - COLONNA DEL PEDOCA/image_8aa60710-a35f-4eea-863d-e8bf3881093a.png',
  vescovo:     'images/TAG A4.10 - COLONNA DEL PEDOCA/image_9678b6d2-25c1-4e0c-bb0e-2076138760a0.png',
  croce:       'images/TAG A4.10 - COLONNA DEL PEDOCA/image_afd583ef-7705-44b8-8c4a-8d9542402a39.png',
  contadini:   'images/TAG A4.10 - COLONNA DEL PEDOCA/image_cc17995a-c9a6-498b-a108-4a88a47d5f8d.png',

  // ── Loghi ─────────────────────────────────────────────────────
  logoComune:  'lacedonia-logo.png',
  logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A4.10_COLONNA_DEL_PEDOCA_Iapetus_ITA.mp3';

// Durate per TransitionSeries (4 fades × 20 = 1856 − 80 = 1776 frame ✓)
// 300+380+380+340+456 = 1856
export const SEQ_DUR = {
  s01: 300,        // Intro                ~10.0s
  s02: 380,        // Il Tempio di Iside   ~12.7s
  s03: 380,        // Il Vescovo Pedoca    ~12.7s
  s04: 340,        // Il Confine Sacro     ~11.3s
  s05: 456,        // Outro                ~15.2s
  transition: 20,  // Fade cross tra sequenze
} as const;

export const COLORS = {
  neroFondo:        '#0A0808',
  travertino:       '#D8C8A8',
  oroVescovile:     '#C89830',
  rossoVescovile:   '#6A1A1A',
  verdePagano:      '#2D5A3A',
  biancoCalce:      '#F0EDE8',
  grigioIscrizione: '#8A8078',
  verdeInnTour:     '#2ECC71',
  oroAntico:        '#C89830',
};
