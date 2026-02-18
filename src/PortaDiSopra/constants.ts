import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

// === PALETTE CROMATICA ===
// Tema: bianco e nero + oro — la memoria in assenza
// Le fotografie B&W della porta demolita guidano la scelta cromatica
export const COLORS = {
	bgScuro:      '#080808',
	bgNero:       '#030303',
	biancaCalce:  '#F2EDE6',
	grigio90:     '#E8E4DE',
	grigio60:     '#A8A49E',
	grigio40:     '#686460',
	oroMemoria:   '#C8A84B',   // oro caldo — il ricordo
	oroAntico:    '#8B6914',   // oro scuro — solennità
	biancoLuce:   '#FFFFFF',
	nebbiaGrigia: 'rgba(240,236,230,0.12)',
	verdeInnTour: '#2ECC71',
	azureInnTour: '#3498DB',
	glassScuro:   'rgba(8,8,8,0.84)',
	glassBianco:  'rgba(240,236,230,0.08)',
	glassBorder:  'rgba(240,236,230,0.14)',
	// Alias per ParticleField
	neonBlue:     '#B8A878',   // remap: particelle dorate, non blu
	oroIrpino:    '#C8A84B',
};

// === TIMING SEQUENZE (secondi · audio 73.34s) ===
// Audio reale: 73.34s → 2200 frame @30fps
//
//   00:00–00:08  INTRO       "Cosa manca?" — il vuoto come hook
//   00:08–00:28  MAESTOSA    La porta com'era — arco gotico, stemma Orsini
//   00:28–00:42  PASSAGGIO   Vescovi e principi, la sacralità dell'ingresso
//   00:42–01:03  DEMOLITA    1851 · Franciosi · abbattimento
//   01:03–01:13  ECCO        Il vuoto oggi, l'eco dei passi solenni, campane

export const SEQUENCES = {
	INTRO:     {start:  0,    duration:  8,    label: 'Intro'},
	MAESTOSA:  {start:  8,    duration: 20,    label: 'La Porta'},
	PASSAGGIO: {start: 28,    duration: 14,    label: 'Il Passaggio'},
	DEMOLITA:  {start: 42,    duration: 21,    label: 'La Demolizione'},
	ECO:       {start: 63,    duration: 10.34, label: "L'Eco"},
};

// === SOTTOTITOLI (dal trascritto Whisper, ms precisi) ===
export const SUBTITLES: {startMs: number; endMs: number; text: string}[] = [
	{
		startMs: 0,
		endMs: 7700,
		text: 'Fermiamoci in questo spazio. Cosa manca?\nQui sorgeva la Porta del Messere, detta anche Di Sopra,',
	},
	{
		startMs: 7700,
		endMs: 13940,
		text: 'la più monumentale delle quattro porte medievali.\nIl nome deriva dal titolo di rispetto per il Signore o il Vescovo,',
	},
	{
		startMs: 13940,
		endMs: 19660,
		text: 'era l\'ingresso d\'onore per i prelati che\ndal 1059 hanno governato la diocesi.',
	},
	{
		startMs: 19660,
		endMs: 27620,
		text: 'Immaginiamo la sua maestosità: un arco gotico decorato\ncon lo stemma degli Orsini, battenti rinforzati e cardini giganteschi.',
	},
	{
		startMs: 27620,
		endMs: 35360,
		text: 'Attraverso questo passaggio sono entrati decine di vescovi\ne principi, portando con sé la sacralità del loro ruolo.',
	},
	{
		startMs: 35360,
		endMs: 41280,
		text: 'Nel 1851, il sindaco Vincenzo Franciosi\nne ordinò l\'abbattimento,',
	},
	{
		startMs: 41280,
		endMs: 49320,
		text: 'perché la struttura era ormai pericolante,\nsacrificando l\'antico varco gotico alle nuove necessità urbanistiche.',
	},
	{
		startMs: 49320,
		endMs: 55780,
		text: 'Nel 1851, il sindaco Vincenzo Franciosi ne ordinò\nl\'abbattimento per ragioni di sicurezza.',
	},
	{
		startMs: 55780,
		endMs: 62980,
		text: 'Oggi resta solo un vuoto e un semplice passaggio\nricavato sotto una palazzina moderna,',
	},
	{
		startMs: 62980,
		endMs: 68560,
		text: 'ma se ascoltate attentamente, tra questi vicoli\nrisuona ancora l\'eco dei Passi Solenni',
	},
	{
		startMs: 68560,
		endMs: 73340,
		text: 'e il suono delle campane che annunciavano\nl\'arrivo del potere spirituale.',
	},
];

export const msToFrame = (ms: number, fps = 30): number =>
	Math.round((ms / 1000) * fps);
