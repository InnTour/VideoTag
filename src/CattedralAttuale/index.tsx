import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {SEQUENCES} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Fondazione} from './Sequence02Fondazione';
import {Sequence03Portale} from './Sequence03Portale';
import {Sequence04SanNicola} from './Sequence04SanNicola';
import {Sequence05Campane} from './Sequence05Campane';

/*
 * TAG A2.01 — "Cattedrale Attuale (Concattedrale di Santa Maria Sunta)"
 * Sezione: Architettura e Monumenti
 * Voce: Iapetus · ITA
 *
 * Durata: 74.92 secondi / 2248 frame @ 30fps
 *
 * NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora
 */

const TRANSITION_DUR = 30;

export const CattedralAttuale: React.FC = () => {
	const {fps} = useVideoConfig();
	const springT = springTiming({config: {damping: 200}, durationInFrames: TRANSITION_DUR});

	// Convert seconds to frames using fps from useVideoConfig
	const toFrames = (s: number) => Math.round(s * fps);

	return (
		<AbsoluteFill style={{backgroundColor: '#0A0906'}}>
			{/* === AUDIO NARRAZIONE === */}
			<Audio
				src={staticFile('audio/TAG_A2.01_CATTEDRALE_ATTUALE_Iapetus_ITA(1).mp3')}
				startFrom={0}
				volume={(f) => interpolate(f, [0, 30], [0, 1], {extrapolateRight: 'clamp'})}
			/>
			<Audio
				src={staticFile('music/sacro-contemplativo.mp3')}
				volume={(f) => interpolate(f, [0, fps], [0, 0.18], {extrapolateRight: 'clamp'})}
				loop
			/>

			<TransitionSeries>
				{/* SEQ 01 — INTRO · 0–8s */}
				<TransitionSeries.Sequence
					durationInFrames={toFrames(SEQUENCES.INTRO.duration)}
					premountFor={30}
				>
					<Sequence01Intro />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQ 02 — FONDAZIONE · 8–25s */}
				<TransitionSeries.Sequence
					durationInFrames={toFrames(SEQUENCES.FONDAZIONE.duration)}
					premountFor={30}
				>
					<Sequence02Fondazione />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQ 03 — PORTALE · 25–35s */}
				<TransitionSeries.Sequence
					durationInFrames={toFrames(SEQUENCES.PORTALE.duration)}
					premountFor={30}
				>
					<Sequence03Portale />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQ 04 — SAN NICOLA · 35–50s */}
				<TransitionSeries.Sequence
					durationInFrames={toFrames(SEQUENCES.SAN_NICOLA.duration)}
					premountFor={30}
				>
					<Sequence04SanNicola />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={springT} />

				{/* SEQ 05 — CAMPANE · 50–74.92s */}
				<TransitionSeries.Sequence
					durationInFrames={toFrames(SEQUENCES.CAMPANE.duration)}
					premountFor={30}
				>
					<Sequence05Campane />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};
