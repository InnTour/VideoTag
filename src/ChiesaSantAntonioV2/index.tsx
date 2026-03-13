import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {SEQUENCES} from './constants';
import {Sequence01Notte} from './Sequence01Notte';
import {Sequence02ITre} from './Sequence02ITre';
import {Sequence03LOstia} from './Sequence03LOstia';
import {Sequence04LaPenna} from './Sequence04LaPenna';
import {Sequence05IlSilenzio} from './Sequence05IlSilenzio';

// NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora

const TRANSITION_DUR = 30;

export const ChiesaSantAntonioV2: React.FC = () => {
	const {fps} = useVideoConfig();
	const springT = springTiming({config: {damping: 200}, durationInFrames: TRANSITION_DUR});
	const toFrames = (s: number) => Math.round(s * fps);

	return (
		<AbsoluteFill>
			<Audio
				src={staticFile('audio/TAG_A2.03_CHIESA_SANTANTONIO_Leda_ITA.mp3')}
				startFrom={0}
				volume={(f) => interpolate(f, [0, 30], [0, 1], {extrapolateRight: 'clamp'})}
			/>
			<Audio
				src={staticFile('music/drammatico-thriller.mp3')}
				volume={(f) => interpolate(f, [0, fps], [0, 0.18], {extrapolateRight: 'clamp'})}
				loop
			/>

			<TransitionSeries>
				{/* SEQUENZA 01 — La Notte (0–8s) */}
				<TransitionSeries.Sequence durationInFrames={toFrames(SEQUENCES.NOTTE.duration)} premountFor={30}>
					<Sequence01Notte />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQUENZA 02 — I Tre (8–27s) */}
				<TransitionSeries.Sequence durationInFrames={toFrames(SEQUENCES.I_TRE.duration)} premountFor={30}>
					<Sequence02ITre />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQUENZA 03 — L'Ostia (27–45s) */}
				<TransitionSeries.Sequence durationInFrames={toFrames(SEQUENCES.L_OSTIA.duration)} premountFor={30}>
					<Sequence03LOstia />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQUENZA 04 — La Penna (45–63s) */}
				<TransitionSeries.Sequence durationInFrames={toFrames(SEQUENCES.LA_PENNA.duration)} premountFor={30}>
					<Sequence04LaPenna />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQUENZA 05 — Il Silenzio (63–79.34s) */}
				<TransitionSeries.Sequence durationInFrames={toFrames(SEQUENCES.IL_SILENZIO.duration)} premountFor={30}>
					<Sequence05IlSilenzio />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};
