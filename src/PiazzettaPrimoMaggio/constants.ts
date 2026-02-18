import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

// === PALETTE CROMATICA ===
export const COLORS = {
	bgScuro:      '#06060e',
	biancaCalce:  '#F8F4EE',
	oroIrpino:    '#D4A843',
	oroScuro:     '#A07830',
	verdeInnTour: '#2ECC71',
	terrabruciata:'#A0522D',
	rossoBandiera:'#CC2222',
	grigioCaldo:  '#9A8F8A',
	glassWhite:   'rgba(255,255,255,0.07)',
	glassBorder:  'rgba(255,255,255,0.13)',
	glassScuro:   'rgba(6,6,14,0.82)',
	neonBlue:     '#00D4FF',
};

// === TIMING SEQUENZE (secondi, basato su audio 68.28s) ===
// Audio: 68.28s → 2048 frame @30fps
// Struttura narrativa:
//   00:00–00:07  INTRO       piazzetta + Ignimbrite + 1456
//   00:07–00:22  ROCCIA      Ignimbrite + 1980 ricostruzione
//   00:22–00:44  MARCIA      350 contadini → latifondi → Bandiera Rossa
//   00:44–01:04  RISCATTO    fine latifondo → proprietari → istruzione
//   01:04–01:08  OUTRO       monumento vivente + logo

export const SEQUENCES = {
	INTRO:    {start:  0,    duration:  7,    label: 'Intro'},
	ROCCIA:   {start:  7,    duration: 15,    label: 'La Roccia'},
	MARCIA:   {start: 22,    duration: 22,    label: 'La Marcia'},
	RISCATTO: {start: 44,    duration: 20,    label: 'Il Riscatto'},
	OUTRO:    {start: 64,    duration:  4.28, label: 'Outro'},
};

// === SOTTOTITOLI (dal trascritto Whisper, ms precisi) ===
export const SUBTITLES: {startMs: number; endMs: number; text: string}[] = [
	{
		startMs: 0,
		endMs: 6960,
		text: 'Siamo nella Piazzetta Primo Maggio, un balcone naturale\nche sorge su un massiccio banco di Ignimbrite,',
	},
	{
		startMs: 6960,
		endMs: 14040,
		text: 'la roccia vulcanica del Vulture che sostiene il borgo\nfin dal terremoto del 1456.',
	},
	{
		startMs: 14040,
		endMs: 21240,
		text: 'Questo spazio, ridisegnato dopo il sisma del 1980,\nè un sacrario della memoria civile.',
	},
	{
		startMs: 21240,
		endMs: 30360,
		text: 'Immaginiamo il marzo del 1950. Da qui partirono\noltre 400 contadini, uomini e donne muniti di zappe,',
	},
	{
		startMs: 30360,
		endMs: 33960,
		text: 'per occupare i latifondi in contrada Chiancarelle.',
	},
	{
		startMs: 33960,
		endMs: 43320,
		text: 'Al canto di Bandiera Rossa sfidarono un sistema\ndove i braccianti erano trattati come asini dai galantuomini.',
	},
	{
		startMs: 43320,
		endMs: 51120,
		text: 'Le lotte per la terra e per l\'acqua di quegli anni\nsegnarono la fine del latifondo',
	},
	{
		startMs: 51120,
		endMs: 58080,
		text: 'e l\'inizio di una comunità democratica.',
	},
	{
		startMs: 58080,
		endMs: 64120,
		text: 'Oggi questa piazza celebra quel riscatto:\nda braccianti a proprietari, dall\'analfabetismo all\'istruzione,',
	},
	{
		startMs: 64120,
		endMs: 68280,
		text: 'grazie al faro dell\'Istituto Magistrale.\nÈ il nostro monumento vivente alla conquista della dignità.',
	},
];

// Converti ms → frame
export const msToFrame = (ms: number, fps = 30): number =>
	Math.round((ms / 1000) * fps);
