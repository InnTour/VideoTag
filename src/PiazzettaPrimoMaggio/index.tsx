import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {SEQUENCES} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Roccia} from './Sequence02Roccia';
import {Sequence03Marcia} from './Sequence03Marcia';
import {Sequence04Riscatto} from './Sequence04Riscatto';
import {Sequence05Outro} from './Sequence05Outro';

/*
 * TAG A1.06 — "Piazzetta Primo Maggio"
 * Sezione: Architettura e Monumenti
 * Voce: Leda · ITA
 *
 * Durata: 68.28 secondi / 2048 frame @ 30fps
 *
 * Sequenze:
 *   01 INTRO     0:00 → 0:07  — Piazzetta, balcone naturale
 *   02 ROCCIA    0:07 → 0:22  — Ignimbrite 1456, sisma 1980
 *   03 MARCIA    0:22 → 0:44  — 400 contadini, Chiancarelle, Bandiera Rossa
 *   04 RISCATTO  0:44 → 1:04  — Fine latifondo, proprietari, Istituto Magistrale
 *   05 OUTRO     1:04 → 1:08  — Logo InnTour + circolarità narrativa
 *
 * NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora
 */

export const PiazzettaPrimoMaggio: React.FC = () => {
	const {fps} = useVideoConfig();

	const sequences = [
		{key: 'intro',    timing: SEQUENCES.INTRO,    Component: Sequence01Intro},
		{key: 'roccia',   timing: SEQUENCES.ROCCIA,   Component: Sequence02Roccia},
		{key: 'marcia',   timing: SEQUENCES.MARCIA,   Component: Sequence03Marcia},
		{key: 'riscatto', timing: SEQUENCES.RISCATTO, Component: Sequence04Riscatto},
		{key: 'outro',    timing: SEQUENCES.OUTRO,    Component: Sequence05Outro},
	];

	return (
		<AbsoluteFill style={{backgroundColor: '#06060e'}}>
			{/* === AUDIO — Voce Leda ITA · 68.28s === */}
			<Audio
				src={staticFile('audio/TAG_A1.06_PIAZZETTA_PRIMO_MAGGIO_Leda_ITA(1).mp3')}
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
