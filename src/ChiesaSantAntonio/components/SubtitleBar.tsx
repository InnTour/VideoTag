import {useCurrentFrame, useVideoConfig} from 'remotion';
import {SUBTITLES, msToFrame, COLORS, latoFont} from '../constants';

export const SubtitleBar: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const active = SUBTITLES.find(
		(s) => frame >= msToFrame(s.startMs, fps) && frame < msToFrame(s.endMs, fps),
	);

	if (!active) return null;

	return (
		<div style={{
			position: 'absolute',
			bottom: 56,
			left: '50%',
			transform: 'translateX(-50%)',
			maxWidth: 1300,
			width: '90%',
			textAlign: 'center',
			padding: '10px 28px',
			background: 'rgba(10,7,4,0.92)',
			borderRadius: 6,
			borderBottom: `3px solid ${COLORS.oroTorcia}`,
		}}>
			<p style={{
				fontFamily: latoFont,
				fontSize: 26,
				fontWeight: 700,
				color: COLORS.avorio,
				margin: 0,
				lineHeight: 1.45,
				textShadow: '0 1px 6px rgba(0,0,0,0.98)',
				whiteSpace: 'pre-line',
			}}>
				{active.text}
			</p>
		</div>
	);
};
