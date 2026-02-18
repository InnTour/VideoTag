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
	// InnTour primari
	verdeInnTour: '#2ECC71',
	azureInnTour: '#3498DB',
	// Lacedonia / Irpinia
	pietraAntica: '#8B7355',
	oroIrpino: '#D4A843',
	terraBruciata: '#A0522D',
	verdeBosco: '#2D5016',
	cieloIrpino: '#87CEEB',
	// Neutri
	biancaCalce: '#F8F4EE',
	antracite: '#2C2C2C',
	grigioCaldo: '#6B6560',
	// Sfondi
	bgScuro: '#1a1208',
	bgPietra: '#2a1f14',
} as const;

// --- Timing Sequenze (in secondi) ---
// Durata totale: 58.2s → 1746 frame @ 30fps
export const SEQUENCES = {
	INTRO: {start: 0, duration: 10.12},
	STORIA: {start: 10.12, duration: 19.84},
	PARADOSSO: {start: 29.96, duration: 11.52},
	RISOLUZIONE: {start: 41.48, duration: 16.72},
} as const;

// --- Sottotitoli IT hardcoded dal SRT (timing preciso) ---
// Timestamp in ms, convertiti da SRT
export const SUBTITLES_ITA = [
	{startMs: 0, endMs: 6560, text: 'Siamo sul versante sud ovest della Cittadella,\nnei pressi della zona conosciuta come sotto le rupi'},
	{startMs: 6560, endMs: 10120, text: 'dove sorge la suggestiva Porta la Stella.'},
	{startMs: 10600, endMs: 20120, text: 'Questo varco è uno dei quattro accessi della cinta muraria\nvoluta dai principi Orsini dopo il devastante sisma del 1456.'},
	{startMs: 20720, endMs: 29960, text: 'In origine la porta era dedicata a Sant\'Antonio Abate,\npatrono di Rocchetta, che a quel tempo era un Casale\nsotto la giurisdizione di Lacedonia.'},
	{startMs: 30920, endMs: 41480, text: 'A causa dei successivi innalzamenti del piano stradale,\noggi la porta si trova a un livello inferiore rispetto alla carreggiata,\nrisultando difficilmente visibile ai passanti.'},
	{startMs: 41880, endMs: 58200, text: 'Recentemente, grazie a importanti lavori di messa in sicurezza\ndel costone delle Rupi, la porta è stata recuperata come punto\ndi accesso per percorsi naturalistici e itinerari della memoria,\nrestituendo la dignità come soglia tra il borgo e il paesaggio rurale.'},
] as const;

// --- Helpers ---
export const msToFrame = (ms: number, fps = 30): number =>
	Math.round((ms / 1000) * fps);

export const FPS = 30;
export const TOTAL_FRAMES = 1746; // 58.2s * 30fps
