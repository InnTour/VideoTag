import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {COLORS, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ManuscriptFrame} from './components/ManuscriptFrame';
import {CandleParticles} from './components/CandleParticles';

// SEQUENZA 05 — "Il Silenzio"
// Bookend narrativo: stesso portale di notte (image_f7e33fa1) — circolarità.
// La città dorme. Le campane di Lacedonia tacciono.
// Chiusura come colofone di un codice miniato: data, firma, silenzio.

export const Sequence05IlSilenzio: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const candleFlicker = noise2D('silenzio-flick', frame / fps * 0.7, 0.9) * 0.03;

	// Fade in sequenza
	const fadeIn = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

	// Testo finale — appare in due fasi
	const citazione1Enter = interpolate(frame, [Math.round(3 * fps), Math.round(7 * fps)], [0, 1], {extrapolateRight: 'clamp'});
	const citazione2Enter = interpolate(frame, [Math.round(7 * fps), Math.round(11 * fps)], [0, 1], {extrapolateRight: 'clamp'});

	// Logo InnTour
	const logoEnter = interpolate(frame, [Math.round(10 * fps), Math.round(13 * fps)], [0, 1], {extrapolateRight: 'clamp'});

	// Colofone — appare alla fine
	const colofoneEnter = interpolate(frame, [Math.round(9 * fps), Math.round(13 * fps)], [0, 1], {extrapolateRight: 'clamp'});

	// Campana beats (3 pulse — come chiusura del rito)
	const campanaBeats = [
		Math.round(2.0 * fps),
		Math.round(4.5 * fps),
		Math.round(6.8 * fps),
	];
	const campanaPulse = campanaBeats.reduce((acc, beatFrame) => {
		const dist = Math.abs(frame - beatFrame);
		if (dist < 12) return acc + interpolate(dist, [0, 12], [0.18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
		return acc;
	}, 0);

	return (
		<AbsoluteFill style={{background: COLORS.bgPergamena, opacity: fadeIn}}>
			{/* Portale medievale di notte — bookend con Seq01 tramite atmosfera */}
			<KenBurnsImage
				src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/download (6).png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0.60 + candleFlicker + campanaPulse}
				overlayColor={COLORS.bgSepia}
			/>

			{/* Vignette finale — più densa del solito (chiusura) */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse 55% 50% at 50% 50%, transparent 0%, rgba(10,7,4,0.92) 100%)`,
				pointerEvents: 'none',
			}} />

			{/* Gradiente completo superiore/inferiore */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(10,7,4,0.82) 0%, transparent 30%, transparent 65%, rgba(10,7,4,0.88) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Cornice miniata — al massimo della densità */}
			<ManuscriptFrame opacity={0.90} />

			{/* Particelle — ridotte al minimo per l'atmosfera di silenzio */}
			<CandleParticles opacity={0.15} />

			{/* Contenuto centrale */}
			<AbsoluteFill style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 0,
			}}>
				{/* Citazione 1 */}
				<div style={{
					fontFamily: 'Georgia, serif',
					fontSize: 26,
					fontStyle: 'italic',
					color: COLORS.avorioCarta,
					textAlign: 'center',
					maxWidth: 700,
					lineHeight: 1.7,
					textShadow: '0 2px 16px rgba(0,0,0,0.95)',
					opacity: citazione1Enter,
					transform: `translateY(${(1 - citazione1Enter) * 14}px)`,
					marginBottom: 12,
				}}>
					"Fuori nelle tenebre, i cittadini dormono —<br />
					ignari del complotto che si decide nel silenzio."
				</div>

				{/* Separatore ornamentale */}
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: 12,
					marginTop: 28,
					marginBottom: 28,
					opacity: citazione2Enter,
				}}>
					<div style={{width: 60, height: 1, background: COLORS.oroLiturgico, opacity: 0.5}} />
					<div style={{
						width: 8, height: 8,
						background: COLORS.oroLiturgico,
						transform: 'rotate(45deg)',
						opacity: 0.7,
					}} />
					<div style={{width: 60, height: 1, background: COLORS.oroLiturgico, opacity: 0.5}} />
				</div>

				{/* Citazione 2 — il collegamento con la Cattedrale */}
				<div style={{
					fontFamily: latoFont,
					fontSize: 17,
					fontWeight: 300,
					color: COLORS.oroPallido,
					textAlign: 'center',
					letterSpacing: '0.08em',
					maxWidth: 580,
					lineHeight: 1.6,
					opacity: citazione2Enter,
					transform: `translateY(${(1 - citazione2Enter) * 10}px)`,
				}}>
					Questa chiesa sparirà nel 1696<br />
					sostituita dalla Concattedrale di Santa Maria Sunta.<br />
					<span style={{color: COLORS.oroLiturgico, fontStyle: 'italic'}}>
						La pietra cambia. La storia rimane.
					</span>
				</div>
			</AbsoluteFill>

			{/* Colofone medievale — in basso al centro */}
			<AbsoluteFill style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-end',
				paddingBottom: 58,
			}}>
				<div style={{
					opacity: colofoneEnter,
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 10,
				}}>
					{/* Logo InnTour */}
					<Img
						src={staticFile('Logo facicon.png')}
						style={{
							width: 52,
							height: 52,
							objectFit: 'contain',
							opacity: logoEnter * 0.88,
							filter: 'brightness(1.1) saturate(0.8) sepia(0.3)',
						}}
					/>
					<div style={{
						fontFamily: latoFont,
						fontSize: 12,
						fontWeight: 300,
						color: COLORS.oroPallido,
						letterSpacing: '0.28em',
						textTransform: 'uppercase',
						opacity: 0.7,
					}}>
						InnTour · Cicerone Digitale di Lacedonia
					</div>
					{/* Versetto colofone */}
					<div style={{
						fontFamily: 'Georgia, serif',
						fontSize: 13,
						fontStyle: 'italic',
						color: COLORS.sепia,
						letterSpacing: '0.06em',
						marginTop: 4,
					}}>
						Expliciunt gesta noctis — Anno Domini MCCCCLXXXVI
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
