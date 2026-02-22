import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {SEQUENCES} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Personaggio} from './Sequence02Personaggio';
import {Sequence03Storia} from './Sequence03Storia';
import {Sequence04Spazio} from './Sequence04Spazio';
import {Sequence05Outro} from './Sequence05Outro';

/*
 * TAG A1.05 — "Piazzetta Nicola Vella"
 * Sezione: Architettura e Monumenti
 * Voce: Leda · ITA
 *
 * Durata: 56.83 secondi / 1705 frame @ 30fps
 *
 * Sequenze:
 *   01 INTRO        0:00 → 0:08  — Titolo + Piazzetta SVG wireframe
 *   02 PERSONAGGIO  0:08 → 0:22  — Ologramma Nicola Vella + cards bio
 *   03 STORIA       0:22 → 0:40  — Timeline animata + citazione
 *   04 SPAZIO       0:40 → 0:50  — La piazzetta come "Soglia" + funzioni
 *   05 OUTRO        0:50 → 0:57  — Logo InnTour + Comune
 *
 * NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora
 */

export const PiazzettaNicolaVella: React.FC = () => {
	const {fps} = useVideoConfig();

	const sequences = [
		{key: 'intro',       timing: SEQUENCES.INTRO,       Component: Sequence01Intro},
		{key: 'personaggio', timing: SEQUENCES.PERSONAGGIO,  Component: Sequence02Personaggio},
		{key: 'storia',      timing: SEQUENCES.STORIA,       Component: Sequence03Storia},
		{key: 'spazio',      timing: SEQUENCES.SPAZIO,       Component: Sequence04Spazio},
		{key: 'outro',       timing: SEQUENCES.OUTRO,        Component: Sequence05Outro},
	];

	return (
		<AbsoluteFill style={{backgroundColor: '#080810'}}>
			{/* === AUDIO — Voce Iapetus ITA · 54.47s === */}
			<Audio
				src={staticFile('audio/TAG_A1.05_PIAZZETTA_NICOLA_VELLA_Iapetus_ITA.mp3')}
				volume={0.82}
				startFrom={0}
			/>

			{/* === SEQUENZE === */}
			{sequences.map(({key, timing, Component}) => (
				<Sequence
					key={key}
					from={Math.round(timing.start * fps)}
					durationInFrames={Math.round(timing.duration * fps)}
					premountFor={Math.round(0.4 * fps)}
				>
					<Component />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
