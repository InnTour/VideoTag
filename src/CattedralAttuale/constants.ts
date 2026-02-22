import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

// === PALETTE CROMATICA ===
// Tema: oro irpino + pietra calcarea + luce sacra
// La concattedrale — calore, solennità, luce spirituale
export const COLORS = {
	bgScuro:       '#0C0904',
	bgNero:        '#060402',
	oroSacro:      '#D4A843',   // oro caldo — fede e storia
	oroAntico:     '#A07828',   // oro scuro — solennità
	oroChiaro:     '#F0C868',   // oro luminoso — la luce nell'abside
	pietraCalce:   '#E8DEC8',   // pietra calcarea — la materia della cattedrale
	avorio:        '#F5F0E6',   // bianco avorio — la luce filtrata
	rossoPorporato:'#8B1A2A',   // porpora vescovile
	verdePietra:   '#4A6040',   // muschio sulla pietra
	azzurroCielo:  '#7BA8C8',   // il cielo irpino dietro la torre
	glassScuro:    'rgba(12,9,4,0.82)',
	glassBorder:   'rgba(212,168,67,0.22)',
	glassBorderLight: 'rgba(240,200,104,0.15)',
	// Alias per ParticleField
	neonBlue:      '#D4A843',   // remap: particelle dorate
	oroIrpino:     '#D4A843',
	verdeInnTour:  '#2ECC71',
	azureInnTour:  '#3498DB',
};

// === TIMING SEQUENZE (secondi · audio 74.92s) ===
// Audio reale: 74.92s → 2248 frame @30fps
//
//   00:00–00:08  INTRO       La cattedrale al tramonto — hook visivo
//   00:08–00:25  FONDAZIONE  1696 · vescovo La Morea · 13 anni di lavori
//   00:25–00:35  PORTALE     Interno a tre navate · la luce · il rifugio
//   00:35–00:50  SAN NICOLA  Patrono dal 1456 · processione notturna
//   00:50–01:14  CAMPANE     Le iscrizioni romane · l'eco dei secoli · outro

export const SEQUENCES = {
	INTRO:      {start:  0,    duration:  8,     label: 'Intro'},
	FONDAZIONE: {start:  8,    duration: 17,     label: 'La Fondazione'},
	PORTALE:    {start: 25,    duration: 10,     label: 'Il Portale'},
	SAN_NICOLA: {start: 35,    duration: 15,     label: 'San Nicola'},
	CAMPANE:    {start: 50,    duration: 24.92,  label: 'Le Campane'},
};

// === SOTTOTITOLI (dal trascritto Whisper, ms precisi) ===
export const SUBTITLES: {startMs: number; endMs: number; text: string}[] = [
	{
		startMs: 0,
		endMs: 5000,
		text: 'Davanti a noi si erge la maestosa concattedrale di Santa Maria Sunta,',
	},
	{
		startMs: 5000,
		endMs: 9000,
		text: 'il cuore pulsante di Lacedonia da oltre tre secoli.',
	},
	{
		startMs: 9000,
		endMs: 11760,
		text: 'Siamo nel 1696.',
	},
	{
		startMs: 11760,
		endMs: 14840,
		text: 'Il vescovo Giovanni Battista La Morea',
	},
	{
		startMs: 14840,
		endMs: 17760,
		text: 'osserva le rovine della Chiesa di Sant\'Antonio,',
	},
	{
		startMs: 17760,
		endMs: 21480,
		text: 'luogo dove un tempo fu giurata la congiura dei baroni,',
	},
	{
		startMs: 21480,
		endMs: 24520,
		text: 'e decide di edificarvi la nuova cattedrale.',
	},
	{
		startMs: 24520,
		endMs: 27120,
		text: 'I lavori durarono tredici anni,',
	},
	{
		startMs: 27120,
		endMs: 29760,
		text: 'concludendosi nel 1709',
	},
	{
		startMs: 29760,
		endMs: 34760,
		text: 'con la posa del portale in marmo rosso screziato,\nche ancora oggi ammiriamo.',
	},
	{
		startMs: 34760,
		endMs: 38120,
		text: 'Questa struttura non è solo un monumento,',
	},
	{
		startMs: 38120,
		endMs: 44360,
		text: 'è il rifugio spirituale della comunità,\nposta sotto la protezione di San Nicola di Bari,',
	},
	{
		startMs: 44360,
		endMs: 49560,
		text: 'patrono della città,\nsin dal terremoto del 1456.',
	},
	{
		startMs: 49560,
		endMs: 55040,
		text: 'Sebbene nata a navata unica,\nfu ampliata nel tempo fino alle attuali tre,',
	},
	{
		startMs: 55040,
		endMs: 60480,
		text: 'riflettendo l\'importanza della sede vescovile lacedoniese\nnel Regno di Napoli.',
	},
	{
		startMs: 60480,
		endMs: 66680,
		text: 'Chiudete gli occhi\ne immaginate il profumo dell\'incenso che sale verso le volte,',
	},
	{
		startMs: 66680,
		endMs: 74920,
		text: 'accompagnato dal suono delle campane che, da secoli,\nannunciano fede e speranza a generazioni di lacedonesi.',
	},
];

export const msToFrame = (ms: number, fps = 30): number =>
	Math.round((ms / 1000) * fps);
