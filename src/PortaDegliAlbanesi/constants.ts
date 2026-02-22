import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

// === PALETTE CROMATICA ===
// Tono: pietra dorata, caldi medievali, notte del '600
export const COLORS = {
	bgScuro:       '#08060a',
	biancaCalce:   '#F5F0E8',
	oroAntico:     '#C8A84B',
	oroBrillante:  '#D4A843',
	pietraDorata:  '#8B7355',
	pietraScura:   '#4A3728',
	rossoBanditi:  '#8B1A1A',
	verdeInnTour:  '#2ECC71',
	azureInnTour:  '#3498DB',
	grigioCaldo:   '#9A8878',
	glassWhite:    'rgba(255,255,255,0.07)',
	glassBorder:   'rgba(255,255,255,0.14)',
	glassScuro:    'rgba(8,6,10,0.84)',
	neonBlue:      '#00D4FF',
	oroIrpino:     '#D4A843',
};

// === TIMING SEQUENZE (secondi · audio 65.57s) ===
// Audio: 65.57s → 1967 frame @30fps
//
//   00:00–00:08  INTRO       La porta orientale, San Nicola di Bari
//   00:08–00:22  ALBANESI    Comunità arberesche XV–XVII sec., stratificazione
//   00:22–00:38  ASSALTO     30 gennaio 1682, 80 banditi, vescovo sequestrato
//   00:38–01:06  SIMBOLO     Giovanni Botta l'Albanese, incontro di culture, oggi

export const SEQUENCES = {
	INTRO:    {start:  0,    duration:  8,    label: 'Intro'},
	ALBANESI: {start:  8,    duration: 11,    label: 'Albanesi'},   // ridotto di 3s (era 14s)
	ASSALTO:  {start: 19,    duration: 19,    label: 'Assalto'},   // anticipato + allungato (era start:22, dur:16)
	SIMBOLO:  {start: 38,    duration: 24,    label: 'Simbolo'},
	OUTRO:    {start: 62,    duration:  3.57, label: 'Outro'},
};

// === SOTTOTITOLI (dal trascritto Whisper, ms precisi) ===
export const SUBTITLES: {startMs: number; endMs: number; text: string}[] = [
	{
		startMs: 0,
		endMs: 7100,
		text: 'Ci troviamo dinanzi alla Porta degli Albanesi,\nconosciuta storicamente come la Porta orientale della cittadella.',
	},
	{
		startMs: 7100,
		endMs: 14340,
		text: 'Situata sul versante nord-est della cinta muraria,\nquesta soglia fu dedicata al patrono San Nicola di Bari.',
	},
	{
		startMs: 14340,
		endMs: 19860,
		text: 'Il suo nome riflette l\'importante stratificazione demografica di Lacedonia.',
	},
	{
		startMs: 19860,
		endMs: 26940,
		text: 'Essa documenta l\'insediamento di una comunità arberesche\ntra il XV e il XVII secolo,',
	},
	{
		startMs: 26940,
		endMs: 31940,
		text: 'segno dell\'espansione del borgo oltre il nucleo medievale più antico.',
	},
	{
		startMs: 31940,
		endMs: 36360,
		text: 'La cronaca locale ricorda un evento drammatico\nlegato a questo varco.',
	},
	{
		startMs: 36360,
		endMs: 43060,
		text: 'Il 30 gennaio 1682, una banda di 80 banditi\nprese d\'assalto il borgo',
	},
	{
		startMs: 43060,
		endMs: 48100,
		text: 'e sequestrò il vescovo Benedetto Bartoli\nper ottenerne il riscatto.',
	},
	{
		startMs: 48100,
		endMs: 56300,
		text: 'Secondo alcune fonti, a guidare quell\'incursione\nfu un uomo di nome Giovanni Botta, detto l\'Albanese.',
	},
	{
		startMs: 56300,
		endMs: 60900,
		text: 'Oggi questa porta rimane un simbolo\ndell\'incontro tra culture diverse',
	},
	{
		startMs: 60900,
		endMs: 65570,
		text: 'e della capacità di Lacedonia di accogliere\nnuovi popoli nel corso dei secoli.',
	},
];

export const msToFrame = (ms: number, fps = 30): number =>
	Math.round((ms / 1000) * fps);
