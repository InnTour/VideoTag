import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {latoFont, playfairFont, COLORS} from '../constants';

interface FactCardProps {
	label: string;
	value: string;
	sublabel?: string;
	accentColor?: string;
	delay?: number; // frame di ritardo per animazione
}

export const FactCard: React.FC<FactCardProps> = ({
	label,
	value,
	sublabel,
	accentColor = COLORS.oroIrpino,
	delay = 0,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const cardSpring = spring({
		frame: Math.max(0, frame - delay),
		fps,
		config: {damping: 160, stiffness: 120},
		durationInFrames: Math.round(1 * fps),
	});

	const translateY = interpolate(cardSpring, [0, 1], [40, 0]);
	const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

	return (
		<div
			style={{
				opacity,
				transform: `translateY(${translateY}px)`,
				display: 'inline-block',
			}}
		>
			<div
				style={{
					backgroundColor: 'rgba(26, 18, 8, 0.88)',
					border: `2px solid ${accentColor}`,
					borderLeft: `6px solid ${accentColor}`,
					borderRadius: 8,
					padding: '18px 32px',
					minWidth: 260,
					textAlign: 'center',
				}}
			>
				{/* Label */}
				<p
					style={{
						fontFamily: latoFont,
						fontSize: 14,
						fontWeight: 700,
						color: accentColor,
						letterSpacing: '0.15em',
						textTransform: 'uppercase',
						margin: 0,
						marginBottom: 6,
					}}
				>
					{label}
				</p>
				{/* Valore principale */}
				<p
					style={{
						fontFamily: playfairFont,
						fontSize: 52,
						fontWeight: 700,
						color: COLORS.biancaCalce,
						margin: 0,
						lineHeight: 1.1,
					}}
				>
					{value}
				</p>
				{/* Sublabel opzionale */}
				{sublabel && (
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 16,
							fontWeight: 300,
							color: COLORS.grigioCaldo,
							margin: 0,
							marginTop: 6,
							letterSpacing: '0.05em',
						}}
					>
						{sublabel}
					</p>
				)}
			</div>
		</div>
	);
};
