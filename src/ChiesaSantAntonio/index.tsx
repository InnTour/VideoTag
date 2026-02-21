import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {SEQ_DUR, COLORS, AUDIO} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Congiurati} from './Sequence02Congiurati';
import {Sequence03Giuramento} from './Sequence03Giuramento';
import {Sequence04Atto} from './Sequence04Atto';
import {Sequence05Epilogo} from './Sequence05Epilogo';

// TAG A2.03 — Chiesa di Sant'Antonio (Congiura dei Baroni)
// Audio: TAG_A2.03_CHIESA_SANTANTONIO_Leda_ITA.mp3 · 80s = 2400 frame @30fps

export const ChiesaSantAntonio: React.FC = () => {
	const fadeTiming = linearTiming({durationInFrames: SEQ_DUR.transition});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bgNero}}>
			<Audio src={staticFile(AUDIO)} startFrom={0} volume={1} />
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
					<Sequence01Intro />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

				<TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
					<Sequence02Congiurati />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

				<TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
					<Sequence03Giuramento />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

				<TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
					<Sequence04Atto />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

				<TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05}>
					<Sequence05Epilogo />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};
