import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {SEQUENCES} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Congiurati} from './Sequence02Congiurati';
import {Sequence03Giuramento} from './Sequence03Giuramento';
import {Sequence04Atto} from './Sequence04Atto';
import {Sequence05Epilogo} from './Sequence05Epilogo';

export const ChiesaSantAntonio: React.FC = () => {
	const toFrames = (s: number) => Math.round(s * 30);

	return (
		<AbsoluteFill>
			{/* === AUDIO NARRAZIONE === */}
			<Audio
				src={staticFile('audio/TAG_A2.03_CHIESA_SANTANTONIO_Leda_ITA.mp3')}
				startFrom={0}
				volume={1}
			/>

			{/* SEQ 01 — INTRO · 0–8s · La notte del 10 settembre 1486 */}
			<Sequence from={toFrames(SEQUENCES.INTRO.start)} durationInFrames={toFrames(SEQUENCES.INTRO.duration)}>
				<Sequence01Intro />
			</Sequence>

			{/* SEQ 02 — CONGIURATI · 8–27s · I tre principi */}
			<Sequence from={toFrames(SEQUENCES.CONGIURATI.start)} durationInFrames={toFrames(SEQUENCES.CONGIURATI.duration)}>
				<Sequence02Congiurati />
			</Sequence>

			{/* SEQ 03 — GIURAMENTO · 27–45s · L'ostia e i Vangeli */}
			<Sequence from={toFrames(SEQUENCES.GIURAMENTO.start)} durationInFrames={toFrames(SEQUENCES.GIURAMENTO.duration)}>
				<Sequence03Giuramento />
			</Sequence>

			{/* SEQ 04 — ATTO · 45–63s · Il notaio, i testimoni */}
			<Sequence from={toFrames(SEQUENCES.ATTO.start)} durationInFrames={toFrames(SEQUENCES.ATTO.duration)}>
				<Sequence04Atto />
			</Sequence>

			{/* SEQ 05 — EPILOGO · 63–79.34s · La città dorme · outro */}
			<Sequence from={toFrames(SEQUENCES.EPILOGO.start)} durationInFrames={toFrames(SEQUENCES.EPILOGO.duration)}>
				<Sequence05Epilogo />
			</Sequence>

		</AbsoluteFill>
	);
};
