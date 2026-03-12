import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence05Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.6, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const logoSpr   = spring({frame, fps, config: {damping: 180}, durationInFrames: Math.round(0.7 * fps)});
	const logoOp    = interpolate(logoSpr, [0, 1], [0, 1]);



	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* Circolarità: la figura che apre la porta verso la luce — bookend con Seq04 */}
			<KenBurnsImage
				src="images/TAG A1.07 - PORTA DEGLI ALBANESI/download (5).png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 42%"
			/>

			<AbsoluteFill style={{backgroundColor: 'rgba(8,6,10,0.75)', pointerEvents: 'none'}} />
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 48%, transparent 15%, rgba(8,6,10,0.55) 70%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.28} />
			<ScanLines opacity={0.016} />

			{/* Loghi */}
		<div style={{
			position: 'absolute',
			bottom: 60,
			left: 0,
			right: 0,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 48,
			opacity: logoOp,
		}}>
			<Img src={staticFile('lacedonia-logo.png')} style={{ height: 96, objectFit: 'contain' }} />
			<div style={{ width: 1, height: 72, background: '#666666' }} />
			<Img src={staticFile('logo-inntour.png')} style={{ height: 80, objectFit: 'contain' }} />
		</div>
		</AbsoluteFill>
	);
};