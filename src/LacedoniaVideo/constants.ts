import {loadFont as loadCinzel} from '@remotion/google-fonts/Cinzel';
import {loadFont as loadLora} from '@remotion/google-fonts/Lora';
import {loadFont as loadRaleway} from '@remotion/google-fonts/Raleway';

// --- Fonts ---
export const {fontFamily: cinzelFont} = loadCinzel('normal', {
	weights: ['400', '700'],
	subsets: ['latin', 'latin-ext'],
});
export const {fontFamily: loraFont} = loadLora('normal', {
	weights: ['400', '700'],
	subsets: ['latin', 'latin-ext'],
});
export const {fontFamily: ralewayFont} = loadRaleway('normal', {
	weights: ['400', '600'],
	subsets: ['latin', 'latin-ext'],
});

// --- Color Palette ---
export const COLORS = {
	bgDark: '#1a1410',
	parchment: '#f0e4d0',
	agedPaper: '#d4c5a9',
	bronze: '#b8860b',
	oldGold: '#cfb53b',
	textDark: '#3c2415',
	textLight: '#faf5eb',
	amber: '#e8a317',
	terracotta: '#c0503a',
	olive: '#5c7a3a',
	paleAzure: '#87ceeb',
	deepUmber: '#2c1810',
} as const;

// --- Scene Timings (in seconds) ---
export const SCENES = {
	PIAZZA: {start: 0, duration: 7},
	BUST: {start: 6.5, duration: 6.5},
	TELEGRAM: {start: 12.5, duration: 8.5},
	SCHOOL: {start: 20.5, duration: 6.5},
	LIGHTHOUSE: {start: 26.5, duration: 7.5},
	CELEBRATION: {start: 33.5, duration: 6.5},
	TRANSFORMATION: {start: 39.5, duration: 7.5},
	CLOSING: {start: 46.5, duration: 3.5},
} as const;

// --- Utilities ---
export const seededRandom = (seed: number): number => {
	const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
};
