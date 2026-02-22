import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {latoFont, COLORS, SUBTITLES_PLACEHOLDER, msToFrame} from '../constants';

export const SubtitleBar: React.FC = () => {
	const frame = useCurrentFrame();

	const active = SUBTITLES_PLACEHOLDER.find((sub) => {
		const s = msToFrame(sub.startMs);
		const e = msToFrame(sub.endMs);
		return frame >= s && frame < e;
	});

	if (!active) return null;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'flex-end',
				alignItems: 'center',
				paddingBottom: 56,
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					background: 'rgba(8,8,16,0.82)',
					backdropFilter: 'blur(12px)',
					borderBottom: `2px solid ${COLORS.verdeInnTour}`,
					borderTop: `1px solid rgba(255,255,255,0.08)`,
					paddingLeft: 52,
					paddingRight: 52,
					paddingTop: 14,
					paddingBottom: 14,
					maxWidth: '86%',
					textAlign: 'center',
				}}
			>
				<p
					style={{
						fontFamily: latoFont,
						fontSize: 27,
						fontWeight: 700,
						color: COLORS.biancaCalce,
						margin: 0,
						lineHeight: 1.5,
						letterSpacing: '0.01em',
					}}
				>
					{active.text}
				</p>
			</div>
		</AbsoluteFill>
	);
};
