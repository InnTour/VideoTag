import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
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

export const CattedralAttuale: React.FC = () => {
	const toFrames = (s: number) => Math.round(s * 30);

	return (
		<AbsoluteFill style={{backgroundColor: '#0A0906'}}>
			{/* === AUDIO NARRAZIONE === */}
			<Audio
				src={staticFile('audio/TAG_A2.01_CATTEDRALE_ATTUALE_Iapetus_ITA(1).mp3')}
				startFrom={0}
				volume={1}
			/>

			{/* SEQ 01 — INTRO · 0–8s */}
			<Sequence from={toFrames(SEQUENCES.INTRO.start)} durationInFrames={toFrames(SEQUENCES.INTRO.duration)}>
				<Sequence01Intro />
			</Sequence>

			{/* SEQ 02 — FONDAZIONE · 8–25s */}
			<Sequence from={toFrames(SEQUENCES.FONDAZIONE.start)} durationInFrames={toFrames(SEQUENCES.FONDAZIONE.duration)}>
				<Sequence02Fondazione />
			</Sequence>

			{/* SEQ 03 — PORTALE · 25–35s */}
			<Sequence from={toFrames(SEQUENCES.PORTALE.start)} durationInFrames={toFrames(SEQUENCES.PORTALE.duration)}>
				<Sequence03Portale />
			</Sequence>

			{/* SEQ 04 — SAN NICOLA · 35–50s */}
			<Sequence from={toFrames(SEQUENCES.SAN_NICOLA.start)} durationInFrames={toFrames(SEQUENCES.SAN_NICOLA.duration)}>
				<Sequence04SanNicola />
			</Sequence>

			{/* SEQ 05 — CAMPANE · 50–74.92s */}
			<Sequence from={toFrames(SEQUENCES.CAMPANE.start)} durationInFrames={toFrames(SEQUENCES.CAMPANE.duration)}>
				<Sequence05Campane />
			</Sequence>
		</AbsoluteFill>
	);
};
