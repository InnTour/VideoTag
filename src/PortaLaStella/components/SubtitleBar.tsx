import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {latoFont, COLORS, SUBTITLES_ITA, msToFrame} from '../constants';

export const SubtitleBar: React.FC = () => {
	const frame = useCurrentFrame();

	const active = SUBTITLES_ITA.find((sub) => {
		const startFrame = msToFrame(sub.startMs);
		const endFrame = msToFrame(sub.endMs);
		return frame >= startFrame && frame < endFrame;
	});

	if (!active) return null;

	const lines = active.text.split('\n');

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'flex-end',
				alignItems: 'center',
				paddingBottom: 60,
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.78)',
					borderBottom: `3px solid ${COLORS.verdeInnTour}`,
					paddingLeft: 48,
					paddingRight: 48,
					paddingTop: 14,
					paddingBottom: 14,
					maxWidth: '88%',
					textAlign: 'center',
				}}
			>
				{lines.map((line, i) => (
					<p
						key={i}
						style={{
							fontFamily: latoFont,
							fontSize: 26,
							fontWeight: 700,
							color: COLORS.biancaCalce,
							margin: 0,
							lineHeight: 1.45,
						}}
					>
						{line}
					</p>
				))}
			</div>
		</AbsoluteFill>
	);
};
