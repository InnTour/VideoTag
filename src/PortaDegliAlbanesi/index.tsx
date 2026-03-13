import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import {SEQUENCES} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Albanesi} from './Sequence02Albanesi';
import {Sequence03Assalto} from './Sequence03Assalto';
import {Sequence04Simbolo} from './Sequence04Simbolo';
import {Sequence05Outro} from './Sequence05Outro';

/*
 * TAG A1.07 — "Porta degli Albanesi"
 * Sezione: Architettura e Monumenti
 * Voce: Iapetus · ITA
 *
 * Durata: 65.57 secondi / 1967 frame @ 30fps
 *
 * Sequenze:
 *   01 INTRO      0:00 → 0:08  — Porta orientale, San Nicola di Bari
 *   02 ALBANESI   0:08 → 0:22  — Arbëreshë XV–XVII sec., stratificazione
 *   03 ASSALTO    0:22 → 0:38  — 30 gennaio 1682, 80 banditi, vescovo Bartoli
 *   04 SIMBOLO    0:38 → 1:02  — Giovanni Botta, incontro culture, accoglienza
 *   05 OUTRO      1:02 → 1:06  — Logo InnTour + circolarità
 *
 * NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora
 */

export const PortaDegliAlbanesi: React.FC = () => {
	const {fps} = useVideoConfig();

	const sequences = [
		{key: 'intro',    timing: SEQUENCES.INTRO,    Component: Sequence01Intro},
		{key: 'albanesi', timing: SEQUENCES.ALBANESI, Component: Sequence02Albanesi},
		{key: 'assalto',  timing: SEQUENCES.ASSALTO,  Component: Sequence03Assalto},
		{key: 'simbolo',  timing: SEQUENCES.SIMBOLO,  Component: Sequence04Simbolo},
		{key: 'outro',    timing: SEQUENCES.OUTRO,    Component: Sequence05Outro},
	];

	return (
		<AbsoluteFill style={{backgroundColor: '#08060a'}}>
			{/* === AUDIO — Voce Iapetus ITA · 65.57s === */}
			<Audio
				src={staticFile('audio/TAG_A1.07_PORTA_DEGLI_ALBANESI_Iapetus_ITA(1).mp3')}
				startFrom={0}
				volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: 'clamp' })}
			/>
			<Audio
				src={staticFile('music/epico-medievale.mp3')}
				volume={(f) => interpolate(f, [0, fps], [0, 0.20], { extrapolateRight: 'clamp' })}
				loop
			/>

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
