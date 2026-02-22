import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {SEQUENCES} from './constants';
import {Sequence01Notte} from './Sequence01Notte';
import {Sequence02ITre} from './Sequence02ITre';
import {Sequence03LOstia} from './Sequence03LOstia';
import {Sequence04LaPenna} from './Sequence04LaPenna';
import {Sequence05IlSilenzio} from './Sequence05IlSilenzio';

// NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora

export const ChiesaSantAntonioV2: React.FC = () => {
	const toFrames = (s: number) => Math.round(s * 30);

	return (
		<AbsoluteFill>
			<Audio
				src={staticFile('audio/TAG_A2.03_CHIESA_SANTANTONIO_Leda_ITA.mp3')}
				startFrom={0}
				volume={1}
			/>

			{/* SEQUENZA 01 — La Notte (0–8s) */}
			<Sequence
				from={toFrames(SEQUENCES.NOTTE.start)}
				durationInFrames={toFrames(SEQUENCES.NOTTE.duration)}
			>
				<Sequence01Notte />
			</Sequence>

			{/* SEQUENZA 02 — I Tre (8–27s) */}
			<Sequence
				from={toFrames(SEQUENCES.I_TRE.start)}
				durationInFrames={toFrames(SEQUENCES.I_TRE.duration)}
			>
				<Sequence02ITre />
			</Sequence>

			{/* SEQUENZA 03 — L'Ostia (27–45s) */}
			<Sequence
				from={toFrames(SEQUENCES.L_OSTIA.start)}
				durationInFrames={toFrames(SEQUENCES.L_OSTIA.duration)}
			>
				<Sequence03LOstia />
			</Sequence>

			{/* SEQUENZA 04 — La Penna (45–63s) */}
			<Sequence
				from={toFrames(SEQUENCES.LA_PENNA.start)}
				durationInFrames={toFrames(SEQUENCES.LA_PENNA.duration)}
			>
				<Sequence04LaPenna />
			</Sequence>

			{/* SEQUENZA 05 — Il Silenzio (63–79.34s) */}
			<Sequence
				from={toFrames(SEQUENCES.IL_SILENZIO.start)}
				durationInFrames={toFrames(SEQUENCES.IL_SILENZIO.duration)}
			>
				<Sequence05IlSilenzio />
			</Sequence>
		</AbsoluteFill>
	);
};
