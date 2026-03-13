import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {SEQUENCES} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Maestosa} from './Sequence02Maestosa';
import {Sequence03Passaggio} from './Sequence03Passaggio';
import {Sequence04Demolita} from './Sequence04Demolita';
import {Sequence05Eco} from './Sequence05Eco';

/*
 * TAG A1.10 — "Porta di Sopra (Demolita)"
 * Sezione: Architettura e Monumenti
 * Voce: Leda · ITA
 *
 * Durata: 73.34 secondi / 2200 frame @ 30fps
 *
 * NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora
 */

export const PortaDiSopra: React.FC = () => {
	const toFrames = (s: number) => Math.round(s * 30);

	return (
		<AbsoluteFill style={{backgroundColor: '#030303'}}>
			{/* === AUDIO NARRAZIONE === */}
			<Audio
				src={staticFile('audio/TAG_A1.10_PORTA_DI_SOPRA_Iapetus_ITA.mp3')}
				startFrom={0}
				volume={1}
			/>
			<Audio src={staticFile('music/malinconico-archi.mp3')} volume={0.14} loop />

			{/* SEQ 01 — INTRO · 0–8s */}
			<Sequence from={toFrames(SEQUENCES.INTRO.start)} durationInFrames={toFrames(SEQUENCES.INTRO.duration)}>
				<Sequence01Intro />
			</Sequence>

			{/* SEQ 02 — MAESTOSA · 8–28s */}
			<Sequence from={toFrames(SEQUENCES.MAESTOSA.start)} durationInFrames={toFrames(SEQUENCES.MAESTOSA.duration)}>
				<Sequence02Maestosa />
			</Sequence>

			{/* SEQ 03 — PASSAGGIO · 28–42s */}
			<Sequence from={toFrames(SEQUENCES.PASSAGGIO.start)} durationInFrames={toFrames(SEQUENCES.PASSAGGIO.duration)}>
				<Sequence03Passaggio />
			</Sequence>

			{/* SEQ 04 — DEMOLITA · 42–63s */}
			<Sequence from={toFrames(SEQUENCES.DEMOLITA.start)} durationInFrames={toFrames(SEQUENCES.DEMOLITA.duration)}>
				<Sequence04Demolita />
			</Sequence>

			{/* SEQ 05 — ECO · 63–73.34s */}
			<Sequence from={toFrames(SEQUENCES.ECO.start)} durationInFrames={toFrames(SEQUENCES.ECO.duration)}>
				<Sequence05Eco />
			</Sequence>
		</AbsoluteFill>
	);
};
