import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';

export const {fontFamily: playfairFont} = loadPlayfair();
export const {fontFamily: latoFont} = loadLato();

// === PALETTE CROMATICA — v2: Affresco Sacro / Codice Miniato ===
// Estetica: pergamena invecchiata, ceri votivi, oro liturgico, seppia
// Niente thriller — solo la solennità di un momento che ha cambiato la storia
export const COLORS = {
	bgPergamena:   '#1A1208',   // sfondo: pelle di libro medievale
	bgSepia:       '#0E0B05',   // fondo scuro per le scene notturne
	oroLiturgico:  '#D4A843',   // oro delle icone sacre
	oroMiniato:    '#E8C060',   // oro brillante dei codici miniati
	oroPallido:    '#C8A060',   // oro anticato — per i testi secondari
	avorioCarta:   '#F5EDD8',   // pergamena chiara — testi principali
	sепia:         '#8B6040',   // seppia antica — bordi, decorazioni
	rossoMinio:    '#9B2020',   // rosso minio — il colore dell'inchiostro medievale
	verdeMalachite:'#2D5A3D',   // verde malachite — decoro miniatura
	brunoPergamena:'rgba(26,18,8,0.88)',   // glass scuro stile pergamena
	bordoMiniato:  'rgba(212,168,67,0.30)', // bordo oro sottile
	// Alias per ParticleField
	neonBlue:      '#D4A843',   // remap: particelle oro liturgico
	oroIrpino:     '#D4A843',
	verdeInnTour:  '#2ECC71',
	azureInnTour:  '#3498DB',
};

// === TIMING SEQUENZE (secondi · audio 79.34s) ===
// Struttura v2 — DIVERSA dalla v1:
//
//   00:00–00:08  NOTTE      La notte del 10 settembre — apertura iconica
//   00:08–00:27  I_TRE      I tre baroni · la cospirazione · le ombre
//   00:27–00:45  L_OSTIA    Il giuramento sull'ostia e sui Vangeli
//   00:45–01:03  LA_PENNA   Il notaio · l'atto scritto · i testimoni
//   01:03–01:19  IL_SILENZIO La città ignara · l'eco nella storia · outro
export const SEQUENCES = {
	NOTTE:      {start:  0,    duration:  8,     label: 'La Notte'},
	I_TRE:      {start:  8,    duration: 19,     label: 'I Tre'},
	L_OSTIA:    {start: 27,    duration: 18,     label: "L'Ostia"},
	LA_PENNA:   {start: 45,    duration: 18,     label: 'La Penna'},
	IL_SILENZIO:{start: 63,    duration: 16.34,  label: 'Il Silenzio'},
};

// === TESTI STORICI (da Whisper — per reference) ===
// Usati come contenuto delle card decorative nell'affresco
export const TESTI_STORICI = {
	data:      '10 Settembre 1486',
	luogo:     'Chiesa di Sant\'Antonio Abate · Lacedonia',
	cospiratori: [
		{nome: 'Francesco Coppola', titolo: 'Principe di Sarno'},
		{nome: 'Antonio San Severino', titolo: 'Principe di Salerno'},
		{nome: 'Giovanni Caracciolo', titolo: 'Duca di Melfi'},
	],
	prete:     'Pietro Guglielmone',
	obiettivo: 'Ferdinando d\'Aragona e suo figlio Alfonso',
	giuramento: '"Con tutti i nostri beni ci impegniamo\na rovesciare Ferdinando d\'Aragona."',
};
