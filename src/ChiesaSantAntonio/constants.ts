import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

// === PALETTE CROMATICA ===
export const COLORS = {
	bgNero:           '#030201',
	bgScuro:          '#0A0704',
	oroTorcia:        '#C8841A',
	oroAntico:        '#B8922A',
	oroChiaro:        '#E8B840',
	rossoTradimento:  '#8B1A1A',
	rossoVelluto:     '#6B1010',
	avorio:           '#F0E8D8',
	grigioPietra:     '#8A8078',
	biancoOstia:      '#F8F4EC',
	glassScuro:       'rgba(10,7,4,0.85)',
	glassBorder:      'rgba(200,132,26,0.25)',
	glassBorderRed:   'rgba(139,26,26,0.35)',
	neonBlue:         '#C8841A',
	oroIrpino:        '#C8841A',
	verdeInnTour:     '#2ECC71',
	azureInnTour:     '#3498DB',
};

// === IMMAGINI ===
const DIR = 'images/TAG A2.03 - CHIESA SANT\'ANTONIO (CONGIURA)';
export const IMAGES = {
	nobili:      `${DIR}/image_0312fcac-3c25-4700-9d2e-2c9ad97196e4.png`,
	congiurati1: `${DIR}/image_eb64892f-3b5e-40f2-9063-08e9ec3e1a77.png`,
	congiurati2: `${DIR}/image_cc45b20b-8e4d-4a39-891a-9da7c8d8fcf5.png`,
	giuramento1: `${DIR}/image_68cbb35c-7a87-443c-a1ce-ef9f28e40e44.png`,
	giuramento2: `${DIR}/image_3d85aafc-09c7-4c9e-8e32-2f0b2979a3f3.png`,
	atto:        `${DIR}/image_51f5aa45-3b6e-4e38-8a26-42e8a15f1e96.png`,
	epilogo:     `${DIR}/image_f7e33fa1-7c2e-4834-894b-0d80a5e4a3b1.png`,
	logoComune:  'lacedonia-logo.png',
	logoInnTour: 'logo-inntour.png',
};

export const AUDIO = 'audio/TAG_A2.03_CHIESA_SANTANTONIO_Leda_ITA.mp3';

// === TIMING — Audio: 80s = 2400 frame @30fps ===
// s01+s02+s03+s04+s05 = 2480 - 4×20 = 2400 ✓
export const SEQ_DUR = {
	s01: 240,  // Intro           ~8s
	s02: 500,  // I Congiurati   ~17s
	s03: 460,  // Il Giuramento  ~15s
	s04: 460,  // L'Atto         ~15s
	s05: 820,  // Epilogo+Outro  ~27s
	transition: 20,
} as const;

export const DURATION = 2400;
export const FPS = 30;
