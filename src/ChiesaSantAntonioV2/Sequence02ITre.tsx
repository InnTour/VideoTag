import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {COLORS, playfairFont, latoFont, TESTI_STORICI} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ManuscriptFrame} from './components/ManuscriptFrame';
import {CandleParticles} from './components/CandleParticles';

// SEQUENZA 02 — "I Tre"
// I tre baroni entrano nell'inquadratura — tre ritratti come in un trittico medievale.
// Ogni nome appare come voce di un registro araldico.

export const Sequence02ITre: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const candleFlicker = noise2D('candle-s2', frame / fps * 1.1, 0.3) * 0.03;

	// Cross-dissolve tra le due immagini dei congiurati
	const dissolveStart = Math.round(10 * fps);
	const dissolveEnd   = Math.round(13 * fps);
	const dissolveProgress = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Entrata sequenziale dei tre ritratti
	const card1Enter = interpolate(frame, [6, 14], [0, 1], {extrapolateRight: 'clamp'});
	const card2Enter = interpolate(frame, [10, 18], [0, 1], {extrapolateRight: 'clamp'});
	const card3Enter = interpolate(frame, [14, 22], [0, 1], {extrapolateRight: 'clamp'});

	const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	});

	const cospiratori = TESTI_STORICI.cospiratori;

	return (
		<AbsoluteFill style={{background: COLORS.bgSepia, opacity: fadeOut}}>
			{/* Layer 1: due nobili in velluto */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolveProgress}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/download (1).png"
					motion="pan-right"
					intensity={0.04}
					overlayOpacity={0.50 + candleFlicker}
					overlayColor={COLORS.bgSepia}
				/>
			</div>

			{/* Layer 2: nobile con candela e frate */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolveProgress}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/download (2).png"
					motion="zoom-in"
					intensity={0.04}
					overlayOpacity={0.52}
					overlayColor={COLORS.bgSepia}
				/>
			</div>

			{/* Vignette */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse 65% 60% at 50% 50%, transparent 0%, rgba(14,11,5,0.82) 100%)`,
				pointerEvents: 'none',
			}} />

			{/* Cornice miniata */}
			<ManuscriptFrame opacity={0.7} />

			{/* Particelle */}
			<CandleParticles opacity={0.22} />

			{/* Intestazione sezione */}
			<AbsoluteFill style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start',
				paddingTop: 72,
			}}>
				<div style={{
					fontFamily: latoFont,
					fontSize: 13,
					fontWeight: 300,
					letterSpacing: '0.35em',
					color: COLORS.oroLiturgico,
					textTransform: 'uppercase',
					marginBottom: 10,
					opacity: interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'}),
				}}>
					I Congiurati
				</div>
				<div style={{
					width: 120,
					height: 1,
					background: `linear-gradient(90deg, transparent, ${COLORS.oroLiturgico}, transparent)`,
					opacity: 0.5,
				}} />
			</AbsoluteFill>

			{/* Tre ritratti araldici — fondo */}
			<AbsoluteFill style={{
				display: 'flex',
				alignItems: 'flex-end',
				justifyContent: 'center',
				paddingBottom: 90,
				gap: 40,
			}}>
				{cospiratori.map((c, idx) => {
					const enterProgress = [card1Enter, card2Enter, card3Enter][idx];
					return (
						<div key={idx} style={{
							opacity: enterProgress,
							transform: `translateY(${(1 - enterProgress) * 24}px)`,
							background: COLORS.brunoPergamena,
							border: `1px solid ${COLORS.bordoMiniato}`,
							borderTop: `3px solid ${COLORS.oroLiturgico}`,
							backdropFilter: 'blur(14px)',
							padding: '20px 28px',
							minWidth: 280,
							textAlign: 'center',
						}}>
							{/* Numero romano */}
							<div style={{
								fontFamily: playfairFont,
								fontSize: 13,
								color: COLORS.oroLiturgico,
								letterSpacing: '0.2em',
								marginBottom: 8,
								opacity: 0.7,
							}}>
								{['I', 'II', 'III'][idx]}
							</div>
							{/* Nome */}
							<div style={{
								fontFamily: playfairFont,
								fontSize: 22,
								fontStyle: 'italic',
								color: COLORS.avorioCarta,
								lineHeight: 1.3,
								textShadow: '0 1px 6px rgba(0,0,0,0.8)',
							}}>
								{c.nome}
							</div>
							{/* Titolo */}
							<div style={{
								fontFamily: latoFont,
								fontSize: 13,
								fontWeight: 300,
								color: COLORS.oroPallido,
								letterSpacing: '0.12em',
								marginTop: 6,
							}}>
								{c.titolo}
							</div>
						</div>
					);
				})}
			</AbsoluteFill>

			{/* Light leak laterale sinistra */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse 25% 40% at 3% 50%, rgba(200,132,26,${0.06 + candleFlicker}) 0%, transparent 100%)`,
				pointerEvents: 'none',
			}} />
		</AbsoluteFill>
	);
};
