import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ManuscriptFrame} from './components/ManuscriptFrame';
import {CandleParticles} from './components/CandleParticles';

// SEQUENZA 04 — "La Penna"
// Il notaio scrive l'atto. Estetica: il documento come reperto storico.
// Una riga di testo che si scrive progressivamente — come se la penna fosse ancora in movimento.

export const Sequence04LaPenna: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const candleFlicker = noise2D('penna-flick', frame / fps * 1.2, 0.2) * 0.04;

	// Scratching effect: il suono della penna che scrive
	const scratchOpacity = 0.05 + noise2D('scratch', frame / fps * 8, 0) * 0.04;

	// Linee di testo che appaiono progressivamente (simulazione scrittura)
	const righe = [
		'Anno Domini MCCCCLXXXVI, die X mensis Septembris',
		'In ecclesia Sancti Antonii Abbatis, oppidum Lacedonia',
		'Coram testibus infrascriptis ad hoc specialiter vocatis',
		'Franciscus Coppola, Antonius de Sancto Severino,',
		'Joannes Caracciolo — omnes iurant in anima sua...',
	];

	const lineEnter = (lineIdx: number) =>
		interpolate(frame, [
			Math.round((4 + lineIdx * 2.2) * fps),
			Math.round((6 + lineIdx * 2.2) * fps),
		], [0, 1], {extrapolateRight: 'clamp'});

	const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{background: COLORS.bgSepia, opacity: fadeOut}}>
			{/* Immagine: nobili al tavolo con mappe */}
			<KenBurnsImage
				src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_51f5aa45-ec39-472d-a2d8-f4aa061fcf2f.png"
				motion="pan-left"
				intensity={0.04}
				overlayOpacity={0.55 + candleFlicker}
				overlayColor={COLORS.bgSepia}
			/>

			{/* Vignette */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse 65% 60% at 50% 50%, transparent 0%, rgba(14,11,5,0.88) 100%)`,
				pointerEvents: 'none',
			}} />

			{/* Texture carta antica (noise visivo leggero) */}
			<AbsoluteFill style={{
				opacity: scratchOpacity * 3,
				background: `repeating-linear-gradient(
					0deg,
					transparent,
					transparent 3px,
					rgba(212,168,67,0.04) 3px,
					rgba(212,168,67,0.04) 4px
				)`,
				pointerEvents: 'none',
			}} />

			{/* Gradiente sx per area documento */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(14,11,5,0.80) 0%, rgba(14,11,5,0.50) 55%, transparent 100%)',
				pointerEvents: 'none',
			}} />

			{/* Cornice miniata */}
			<ManuscriptFrame opacity={0.75} />

			{/* Particelle */}
			<CandleParticles opacity={0.20} />

			{/* Intestazione */}
			<AbsoluteFill style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				paddingTop: 68,
				paddingLeft: 100,
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
					L'Atto Notarile
				</div>
			</AbsoluteFill>

			{/* Documento: righe in latino che si scrivono */}
			<AbsoluteFill style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				paddingLeft: 100,
				paddingRight: 600,
			}}>
				{/* Titolo documento */}
				<div style={{
					fontFamily: playfairFont,
					fontSize: 18,
					color: COLORS.oroLiturgico,
					letterSpacing: '0.12em',
					textTransform: 'uppercase',
					marginBottom: 24,
					opacity: interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'}),
				}}>
					Instrumentum Coniurationis
				</div>

				{/* Righe del documento in latino */}
				{righe.map((riga, i) => (
					<div
						key={i}
						style={{
							fontFamily: 'Georgia, serif',
							fontSize: 19,
							fontStyle: i === 0 ? 'normal' : 'italic',
							color: i === 0 ? COLORS.oroPallido : COLORS.avorioCarta,
							lineHeight: 1.9,
							letterSpacing: '0.03em',
							opacity: lineEnter(i),
							transform: `translateX(${(1 - lineEnter(i)) * -12}px)`,
							textShadow: '0 1px 8px rgba(0,0,0,0.9)',
						}}
					>
						{riga}
					</div>
				))}

				{/* Indicatore penna in movimento */}
				<div style={{
					width: 2,
					height: 24,
					background: COLORS.oroMiniato,
					marginTop: 8,
					opacity: interpolate(frame, [
						Math.round(4 * fps),
						Math.round(4 * fps + 2),
						Math.round((4 + righe.length * 2.2) * fps),
						Math.round((4 + righe.length * 2.2 + 3) * fps),
					], [0, 1, 1, 0], {extrapolateRight: 'clamp'}) * (Math.sin(frame * 0.5) > 0 ? 1 : 0),
				}} />
			</AbsoluteFill>

			{/* Card destra: il peso della storia */}
			<AbsoluteFill style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				paddingRight: 80,
			}}>
				<div style={{
					opacity: interpolate(frame, [Math.round(14 * fps), Math.round(17 * fps)], [0, 1], {
						extrapolateRight: 'clamp',
					}),
					background: COLORS.brunoPergamena,
					border: `1px solid ${COLORS.bordoMiniato}`,
					borderTop: `3px solid ${COLORS.rossoMinio}`,
					backdropFilter: 'blur(16px)',
					padding: '22px 30px',
					maxWidth: 260,
					textAlign: 'center',
				}}>
					<div style={{
						fontFamily: playfairFont,
						fontSize: 48,
						color: COLORS.rossoMinio,
						lineHeight: 1,
						marginBottom: 8,
					}}>
						1486
					</div>
					<div style={{
						fontFamily: latoFont,
						fontSize: 13,
						color: COLORS.avorioCarta,
						lineHeight: 1.5,
						letterSpacing: '0.08em',
					}}>
						La congiura contro<br />Ferdinando d'Aragona
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
