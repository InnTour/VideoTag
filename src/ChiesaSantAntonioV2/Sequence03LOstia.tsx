import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {COLORS, playfairFont, latoFont, TESTI_STORICI} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ManuscriptFrame} from './components/ManuscriptFrame';
import {CandleParticles} from './components/CandleParticles';

// SEQUENZA 03 — "L'Ostia"
// Il momento sacrilego — il cuore teologico della scena.
// Estetica: icona sacra illuminata dall'interno, non thriller.
// L'ostia appare su fondo scuro come una reliquia — poi le mani sui Vangeli.

export const Sequence03LOstia: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const candleFlicker = noise2D('ostia-flick', frame / fps * 0.9, 0.7) * 0.05;

	// Cross-dissolve: prete con ostia → mani sui Vangeli
	const dissolveStart = Math.round(8 * fps);
	const dissolveEnd   = Math.round(11.5 * fps);
	const dissolveProgress = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Aureola luminosa sull'ostia (solo layer 1)
	const aureolaPulse = 0.15 + Math.sin(frame / fps * 0.8) * 0.06 + candleFlicker;

	// Il giuramento — testo che appare lettera per lettera
	const giuramentoText = TESTI_STORICI.giuramento;
	const textReveal = interpolate(frame, [Math.round(12 * fps), Math.round(16 * fps)], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const textChars = Math.floor(textReveal * giuramentoText.length);

	const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{background: COLORS.bgSepia, opacity: fadeOut}}>
			{/* Layer 1: prete con ostia consacrata */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolveProgress}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/download (3).png"
					motion="zoom-in"
					intensity={0.035}
					overlayOpacity={0.45 + candleFlicker}
					overlayColor={COLORS.bgSepia}
					objectPosition="center 30%"
				/>
				{/* Aureola luminosa centrata sull'ostia */}
				<AbsoluteFill style={{
					background: `radial-gradient(ellipse 28% 22% at 50% 38%, rgba(248,244,236,${aureolaPulse}) 0%, rgba(212,168,67,${aureolaPulse * 0.4}) 40%, transparent 70%)`,
					pointerEvents: 'none',
				}} />
			</div>

			{/* Layer 2: mani illuminate sui Vangeli */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolveProgress}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/download (4).png"
					motion="zoom-out"
					intensity={0.04}
					overlayOpacity={0.40}
					overlayColor={COLORS.bgSepia}
					objectPosition="center 55%"
				/>
			</div>

			{/* Vignette */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, rgba(14,11,5,0.85) 100%)`,
				pointerEvents: 'none',
			}} />

			{/* Gradiente superiore per testi */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(14,11,5,0.70) 0%, transparent 35%)',
				pointerEvents: 'none',
			}} />

			{/* Cornice miniata */}
			<ManuscriptFrame opacity={0.65} />

			{/* Particelle */}
			<CandleParticles opacity={0.25} />

			{/* Intestazione */}
			<AbsoluteFill style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: 68,
			}}>
				<div style={{
					fontFamily: latoFont,
					fontSize: 13,
					fontWeight: 300,
					letterSpacing: '0.35em',
					color: COLORS.oroLiturgico,
					textTransform: 'uppercase',
					opacity: interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'}),
				}}>
					Il Giuramento
				</div>
			</AbsoluteFill>

			{/* Citazione del giuramento */}
			<AbsoluteFill style={{
				display: 'flex',
				alignItems: 'flex-end',
				justifyContent: 'center',
				paddingBottom: 100,
			}}>
				<div style={{
					maxWidth: 820,
					opacity: textReveal,
					transform: `translateY(${(1 - textReveal) * 16}px)`,
					textAlign: 'center',
				}}>
					{/* Virgolette di apertura decorative */}
					<div style={{
						fontFamily: playfairFont,
						fontSize: 72,
						color: COLORS.oroLiturgico,
						lineHeight: 0.5,
						marginBottom: 8,
						opacity: 0.5,
					}}>"</div>

					{/* Il testo del giuramento */}
					<div style={{
						fontFamily: 'Georgia, serif',
						fontSize: 26,
						fontStyle: 'italic',
						color: COLORS.avorioCarta,
						lineHeight: 1.7,
						textShadow: '0 2px 12px rgba(0,0,0,0.95)',
						letterSpacing: '0.02em',
						background: 'rgba(14,11,5,0.72)',
						backdropFilter: 'blur(14px)',
						border: `1px solid ${COLORS.bordoMiniato}`,
						borderLeft: `4px solid ${COLORS.oroLiturgico}`,
						padding: '18px 28px',
					}}>
						{giuramentoText.replace(/^"|"$/g, '').slice(0, textChars)}
					</div>

					{/* Prete */}
					<div style={{
						fontFamily: latoFont,
						fontSize: 13,
						fontWeight: 300,
						color: COLORS.oroPallido,
						letterSpacing: '0.20em',
						textTransform: 'uppercase',
						marginTop: 14,
						opacity: interpolate(frame, [Math.round(15 * fps), Math.round(17 * fps)], [0, 1], {
							extrapolateRight: 'clamp',
						}),
					}}>
						Celebrato da {TESTI_STORICI.prete}
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
