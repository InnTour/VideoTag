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
	const logoScale = interpolate(logoSpr, [0, 1], [0.7, 1]);
	const logoOp    = interpolate(logoSpr, [0, 1], [0, 1]);

	const subSpr = spring({frame: Math.max(0, frame - Math.round(0.7 * fps)), fps, config: {damping: 200}, durationInFrames: Math.round(0.6 * fps)});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	const lineW = interpolate(frame, [Math.round(0.5 * fps), Math.round(1.4 * fps)], [0, 320], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Pulsazione del logo
	const pulse = 1 + 0.018 * Math.sin(frame * 0.11);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* SFONDO: ritorno alla piazzetta — circolarità con l'intro */}
			<KenBurnsImage
				src="images/TAG A1.06 - PIAZZETTA PRIMO MAGGIO/image_9592a387-dacb-4106-b6d6-367a62f89a2d.png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 25%"
			/>

			{/* Overlay scuro uniforme per far risaltare il centro */}
			<AbsoluteFill style={{backgroundColor: 'rgba(6,6,14,0.72)', pointerEvents: 'none'}} />
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 48%, rgba(6,6,14,0.10) 0%, rgba(6,6,14,0.55) 70%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.30} />
			<ScanLines opacity={0.018} />

			{/* Contenuto centrato */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 18}}>

				{/* Logo InnTour — immagine reale */}
				<div style={{opacity: logoOp, transform: `scale(${logoScale * pulse})`}}>
					<div style={{
						background: 'rgba(6,6,14,0.84)',
						border: `1.5px solid ${COLORS.verdeInnTour}55`,
						borderRadius: 10,
						padding: '10px 32px',
						backdropFilter: 'blur(20px)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
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

				{/* Linea neon */}
				<div style={{
					width: lineW, height: 1.5,
					background: `linear-gradient(90deg, transparent, ${COLORS.oroIrpino}, transparent)`,
					boxShadow: `0 0 8px ${COLORS.oroIrpino}66`,
				}} />

				{/* Comune */}
				<p style={{
					fontFamily: playfairFont, fontSize: 28, fontWeight: 400,
					color: COLORS.biancaCalce, margin: 0,
					letterSpacing: '0.06em', opacity: subOp, textAlign: 'center',
					textShadow: '0 2px 10px rgba(6,6,14,0.8)',
				}}>
					Comune di Lacedonia
				</p>
				<p style={{
					fontFamily: latoFont, fontSize: 16, fontWeight: 300,
					color: COLORS.grigioCaldo, margin: 0,
					letterSpacing: '0.14em', textTransform: 'uppercase',
					opacity: subOp,
				}}>
					Cicerone Digitale · Virtual Tour
				</p>

				{/* Divisore */}
				<div style={{width: 1, height: 28, backgroundColor: COLORS.glassBorder, opacity: subOp}} />

				{/* Tag A1.06 */}
				<div style={{
					display: 'flex', alignItems: 'center', gap: 8,
					opacity: subOp * 0.7,
					background: 'rgba(6,6,14,0.80)',
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4, padding: '5px 18px',
					backdropFilter: 'blur(12px)',
				}}>
					<div style={{width: 7, height: 7, borderRadius: '50%', backgroundColor: COLORS.rossoBandiera, boxShadow: `0 0 8px ${COLORS.rossoBandiera}`}} />
					<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo, letterSpacing: '0.14em'}}>
						A1.06 · Piazzetta Primo Maggio · Architettura e Monumenti
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
