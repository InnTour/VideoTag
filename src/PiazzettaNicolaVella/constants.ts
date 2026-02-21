import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

// --- Fonts ---
export const {fontFamily: playfairFont} = loadPlayfair('normal', {
	weights: ['400', '700'],
	subsets: ['latin', 'latin-ext'],
});
export const {fontFamily: latoFont} = loadLato('normal', {
	weights: ['300', '400', '700'],
	subsets: ['latin', 'latin-ext'],
});

// --- Palette InnTour / Irpinia ---
export const COLORS = {
	verdeInnTour: '#2ECC71',
	azureInnTour: '#3498DB',
	pietraAntica: '#8B7355',
	oroIrpino: '#D4A843',
	terraBruciata: '#A0522D',
	verdeBosco: '#2D5016',
	cieloIrpino: '#87CEEB',
	biancaCalce: '#F8F4EE',
	antracite: '#2C2C2C',
	grigioCaldo: '#6B6560',
	bgScuro: '#080810',
	bgMid: '#0f0f1a',
	// Palette accenti moderni
	neonBlue: '#00D4FF',
	neonGold: '#FFD700',
	glassWhite: 'rgba(255,255,255,0.08)',
	glassBorder: 'rgba(255,255,255,0.15)',
} as const;

// --- Durata: 54.47s → 1634 frame @30fps (voce Iapetus) ---
export const FPS = 30;
export const TOTAL_FRAMES = 1634;

// --- Timing Sequenze (aggiornati su testo reale Whisper) ---
// Atto I   0:00–0:07  → Intro piazzetta + identità Vella
// Atto II  0:07–0:20  → Primo sindaco democratico 1946
// Atto III 0:20–0:37  → Mandato 1946-1950, sfide dopoguerra
// Atto IV  0:37–0:46  → Cariche provinciali e parlamentari
// Atto V   0:46–0:57  → Chiusura: la piazza come memoria civile
export const SEQUENCES = {
	INTRO:      {start: 0,     duration: 7},
	PERSONAGGIO:{start: 7,     duration: 13},
	STORIA:     {start: 20,    duration: 17},
	SPAZIO:     {start: 37,    duration: 9},
	OUTRO:      {start: 46,    duration: 10.83},
} as const;

// --- Sottotitoli REALI — trascritti con Whisper medium (it) ---
// Fonte: TAG_A1.05_PIAZZETTA_NICOLA_VELLA_Leda_ITA.mp3
// Segmenti aggregati per leggibilità (max ~2 righe per card)
export const SUBTITLES_PLACEHOLDER = [
	{startMs: 0,     endMs: 7000,  text: 'Siamo nella piazzetta dedicata a Nicola Vella,\nfigura centrale della storia politica locale.'},
	{startMs: 7000,  endMs: 12370, text: 'L\'avvocato Vella fu il primo sindaco democratico di Lacedonia,'},
	{startMs: 12370, endMs: 20000, text: 'eletto nel 1946 con un larghissimo consenso\nalla guida di una coalizione di sinistra.'},
	{startMs: 20000, endMs: 29000, text: 'Sotto il suo mandato, durato fino al 1950,\nla comunità affrontò le durissime sfide del dopoguerra:'},
	{startMs: 29000, endMs: 37000, text: 'la lotta per l\'acqua, la quotizzazione delle terre incolte\ne il riscatto sociale dei contadini.'},
	{startMs: 37000, endMs: 46000, text: 'Oltre all\'impegno comunale, ricoprì cariche di rilievo\ncome consigliere provinciale e candidato al Parlamento.'},
	{startMs: 46000, endMs: 56830, text: 'Questa piazza onora l\'impegno civile e politico di un uomo\nche ha guidato Lacedonia verso la libertà e la democrazia moderna.'},
] as const;

export const msToFrame = (ms: number, fps = 30): number =>
	Math.round((ms / 1000) * fps);
