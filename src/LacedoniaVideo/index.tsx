import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {SCENES} from './constants';
import {Scene01Piazza} from './Scene01Piazza';
import {Scene02Bust} from './Scene02Bust';
import {Scene03Telegram} from './Scene03Telegram';
import {Scene04School} from './Scene04School';
import {Scene05Lighthouse} from './Scene05Lighthouse';
import {Scene06Celebration} from './Scene06Celebration';
import {Scene07Transformation} from './Scene07Transformation';
import {Scene08Closing} from './Scene08Closing';

/*
 * Lacedonia - Piazza De Sanctis (TAG A1.01)
 *
 * 50-second video (1500 frames @ 30fps) illustrating the history of
 * Lacedonia and Francesco De Sanctis through 8 animated scenes.
 *
 * Scene 1: Establishing shot - the town of Lacedonia at sunset
 * Scene 2: The bronze bust of De Sanctis
 * Scene 3: The telegram of August 2, 1878
 * Scene 4: The school institution
 * Scene 5: Lighthouse of culture metaphor
 * Scene 6: Peasants celebrating in the piazza
 * Scene 7: Transformation - from hardship to dignity
 * Scene 8: Closing card
 */

export const LacedoniaVideo: React.FC = () => {
	const {fps} = useVideoConfig();

	const scenes = [
		{key: 'piazza', timing: SCENES.PIAZZA, Component: Scene01Piazza},
		{key: 'bust', timing: SCENES.BUST, Component: Scene02Bust},
		{key: 'telegram', timing: SCENES.TELEGRAM, Component: Scene03Telegram},
		{key: 'school', timing: SCENES.SCHOOL, Component: Scene04School},
		{key: 'lighthouse', timing: SCENES.LIGHTHOUSE, Component: Scene05Lighthouse},
		{key: 'celebration', timing: SCENES.CELEBRATION, Component: Scene06Celebration},
		{key: 'transformation', timing: SCENES.TRANSFORMATION, Component: Scene07Transformation},
		{key: 'closing', timing: SCENES.CLOSING, Component: Scene08Closing},
	];

	return (
		<AbsoluteFill style={{backgroundColor: '#1a1410'}}>
			{scenes.map(({key, timing, Component}) => (
				<Sequence
					key={key}
					from={Math.round(timing.start * fps)}
					durationInFrames={Math.round(timing.duration * fps)}
					premountFor={Math.round(0.5 * fps)}
				>
					<Component />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
