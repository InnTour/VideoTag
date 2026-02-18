import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

// === PALETTE CROMATICA ===
// Tema: notte, torce, cospirazione — il dramma al massimo
// Nero profondo + oro delle candele + rosso porpora del tradimento
export const COLORS = {
	bgNero:        '#030201',
	bgScuro:       '#0A0704',
	oroTorcia:     '#C8841A',   // arancione-oro delle torce
	oroAntico:     '#B8922A',   // oro caldo medievale
	oroChiaro:     '#E8B840',   // oro brillante — la luce delle candele
	rossoTradimento: '#8B1A1A', // rosso sangue — il giuramento sacrilego
	rossoVelluto:  '#6B1010',   // rosso scuro — i costumi nobiliari
	avorio:        '#F0E8D8',   // pergamena, l'atto notarile
	grigioPietra:  '#8A8078',   // le mura della chiesa
	biancoOstia:   '#F8F4EC',   // la purezza dell'ostia
	glassScuro:    'rgba(10,7,4,0.85)',
	glassBorder:   'rgba(200,132,26,0.25)',
	glassBorderRed: 'rgba(139,26,26,0.35)',
	// Alias per ParticleField
	neonBlue:      '#C8841A',   // remap: particelle oro-torcia
	oroIrpino:     '#C8841A',
	verdeInnTour:  '#2ECC71',
	azureInnTour:  '#3498DB',
};

// === TIMING SEQUENZE (secondi · audio 79.34s) ===
// Audio reale: 79.34s → 2380 frame @30fps
//
//   00:00–00:08  INTRO       La notte del 10 settembre 1486 — hook
//   00:08–00:27  CONGIURATI  I tre principi · le ombre · la cospirazione
//   00:27–00:45  GIURAMENTO  L'ostia · i Vangeli · il giuramento sacro
//   00:45–01:03  ATTO        Il notaio · i testimoni · l'atto scritto
//   01:03–01:19  EPILOGO     La città dorme ignara · outro InnTour

export const SEQUENCES = {
	INTRO:      {start:  0,    duration:  8,     label: 'Intro'},
	CONGIURATI: {start:  8,    duration: 19,     label: 'I Congiurati'},
	GIURAMENTO: {start: 27,    duration: 18,     label: 'Il Giuramento'},
	ATTO:       {start: 45,    duration: 18,     label: "L'Atto"},
	EPILOGO:    {start: 63,    duration: 16.34,  label: 'Epilogo'},
};

// === SOTTOTITOLI (dal trascritto Whisper) ===
export const SUBTITLES: {startMs: number; endMs: number; text: string}[] = [
	{startMs: 0,     endMs: 5240,  text: 'È la notte del 10 settembre 1486.'},
	{startMs: 5240,  endMs: 8720,  text: 'Siamo nella Chiesa di Sant\'Antonio Abate.'},
	{startMs: 8720,  endMs: 13920, text: 'Le candele tremolano, gettando ombre inquietanti sulle pareti.'},
	{startMs: 13920, endMs: 17560, text: 'Entrano i nobili più potenti del Regno di Napoli.'},
	{startMs: 17560, endMs: 20520, text: 'Francesco Coppola, Principe di Sarno.'},
	{startMs: 20520, endMs: 24160, text: 'Antonio San Severino, Principe di Salerno.'},
	{startMs: 24160, endMs: 27600, text: 'Giovanni Caracciolo, Duca di Melfi.'},
	{startMs: 27600, endMs: 33280, text: 'Il prete Pietro Guglielmone celebra la messa con mani tremanti.'},
	{startMs: 33280, endMs: 35600, text: 'Arriva il momento cruciale.'},
	{startMs: 35600, endMs: 38920, text: 'Il sacerdote solleva l\'ostia consacrata.'},
	{startMs: 38920, endMs: 44160, text: 'Tutti i baroni si alzano, posano le mani sui Vangeli e giurano.'},
	{startMs: 44160, endMs: 51480, text: '"Con tutti i nostri beni ci impegniamo\na rovesciare Ferdinando d\'Aragona e suo figlio Alfonso."'},
	{startMs: 51480, endMs: 55840, text: 'Il notaio redige l\'atto alla luce fioca delle torce.'},
	{startMs: 55840, endMs: 58600, text: 'I testimoni osservano in silenzio.'},
	{startMs: 58600, endMs: 62760, text: 'Questo giuramento cambierà la storia del Regno.'},
	{startMs: 62760, endMs: 69680, text: 'La congiura è nata qui, in questa Chiesa,\nin questa notte carica di tensione e destino.'},
	{startMs: 69680, endMs: 79340, text: 'Fuori nelle tenebre, ignari del complotto, i cittadini dormono,\nmentre si decide il futuro del Mezzogiorno.'},
];

export const msToFrame = (ms: number, fps = 30): number =>
	Math.round((ms / 1000) * fps);
