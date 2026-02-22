import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
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
	const logoScale = interpolate(logoSpr, [0, 1], [0.75, 1]);
	const logoOp    = interpolate(logoSpr, [0, 1], [0, 1]);

	const subSpr = spring({frame: Math.max(0, frame - Math.round(0.6 * fps)), fps, config: {damping: 200}, durationInFrames: Math.round(0.6 * fps)});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	const lineW  = interpolate(frame, [Math.round(0.4 * fps), Math.round(1.4 * fps)], [0, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const pulse  = 1 + 0.018 * Math.sin(frame * 0.11);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* Circolarità: la figura che apre la porta verso la luce — bookend con Seq04 */}
			<KenBurnsImage
				src="images/TAG A1.07 - PORTA DEGLI ALBANESI/image_d30e338b-ff02-4a95-94c2-7d5b8bdbf3fc.png"
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

			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 18}}>

				{/* Logo InnTour reale */}
				<div style={{opacity: logoOp, transform: `scale(${logoScale * pulse})`}}>
					<div style={{
						background: 'rgba(8,6,10,0.86)',
						border: `1.5px solid ${COLORS.verdeInnTour}55`,
						borderRadius: 10,
						padding: '10px 34px',
						backdropFilter: 'blur(20px)',
						display: 'flex', alignItems: 'center', justifyContent: 'center',
					}}>
						<Img
							src={staticFile('logo-inntour.png')}
							style={{height: 54, width: 'auto', objectFit: 'contain'}}
						/>
					</div>
				</div>
				{/* Logo Comune di Lacedonia */}
				<div style={{opacity: logoOp, transform: `scale(${logoScale})`, marginTop: 4}}>
					<div style={{
						border: `1px solid ${COLORS.oroIrpino || COLORS.oroSacro || '#D4A843'}44`,
						borderRadius: 8,
						padding: '10px 32px',
						background: 'rgba(6,6,14,0.72)',
						backdropFilter: 'blur(16px)',
						display: 'flex', alignItems: 'center', justifyContent: 'center',
					}}>
						<Img src={staticFile('lacedonia-logo.png')} style={{height: 48, width: 'auto', objectFit: 'contain'}} />
					</div>
				</div>

				{/* Linea neon dorata */}
				<div style={{
					width: lineW, height: 1.5,
					background: `linear-gradient(90deg, transparent, ${COLORS.oroBrillante}, transparent)`,
					boxShadow: `0 0 8px ${COLORS.oroBrillante}66`,
				}} />

				<p style={{
					fontFamily: playfairFont, fontSize: 28, fontWeight: 400,
					color: COLORS.biancaCalce, margin: 0,
					letterSpacing: '0.06em', opacity: subOp, textAlign: 'center',
					textShadow: '0 2px 10px rgba(8,6,10,0.8)',
				}}>
					Comune di Lacedonia
				</p>
				<p style={{
					fontFamily: latoFont, fontSize: 16, fontWeight: 300,
					color: COLORS.grigioCaldo, margin: 0,
					letterSpacing: '0.14em', textTransform: 'uppercase', opacity: subOp,
				}}>
					Cicerone Digitale · Virtual Tour
				</p>

				<div style={{width: 1, height: 26, backgroundColor: COLORS.glassBorder, opacity: subOp}} />

				<div style={{
					display: 'flex', alignItems: 'center', gap: 8,
					opacity: subOp * 0.7,
					background: 'rgba(8,6,10,0.80)',
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4, padding: '5px 18px',
					backdropFilter: 'blur(12px)',
				}}>
					<div style={{width: 7, height: 7, borderRadius: '50%', backgroundColor: COLORS.oroBrillante, boxShadow: `0 0 8px ${COLORS.oroBrillante}`}} />
					<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo, letterSpacing: '0.14em'}}>
						A1.07 · Porta degli Albanesi · Architettura e Monumenti
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
