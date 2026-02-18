import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {COLORS, playfairFont, latoFont, TESTI_STORICI} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ManuscriptFrame} from './components/ManuscriptFrame';
import {CandleParticles} from './components/CandleParticles';

// SEQUENZA 01 — "La Notte"
// Apertura solenne: come l'incipit di un codice miniato.
// L'immagine si rivela lentamente, la data appare come un'iscrizione in pietra.
// Nessun flash — solo la gravità del silenzio prima della tempesta.

export const Sequence01Notte: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Fade-in globale della sequenza
	const fadeIn = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

	// Noise organico per tremolìo luce candela (perlin noise)
	const candleFlicker = noise2D('candle', frame / fps, 0) * 0.04;
	const candleFlicker2 = noise2D('candle2', frame / fps * 1.3, 0.5) * 0.03;

	// Rivelazione della data: lettera per lettera ma lentissima (effetto iscrizione)
	const dataText = TESTI_STORICI.data; // '10 Settembre 1486'
	const dataReveal = interpolate(frame, [12, durationInFrames - 4], [0, 1], {extrapolateRight: 'clamp'});
	const dataChars = Math.floor(dataReveal * dataText.length);

	// Vignette pesante — stile dagherrotipo
	const vignetteStrength = 0.75 + candleFlicker;

	return (
		<AbsoluteFill style={{background: COLORS.bgPergamena, opacity: fadeIn}}>
			{/* Immagine hero: nobili nella chiesa con torce */}
			<KenBurnsImage
				src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_0312fcac.png"
				motion="zoom-out"
				intensity={0.05}
				overlayOpacity={0.55 + candleFlicker2}
				overlayColor={COLORS.bgSepia}
			/>

			{/* Vignette radiale pesante */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, ${COLORS.bgSepia} ${Math.round(vignetteStrength * 100)}%)`,
				pointerEvents: 'none',
			}} />

			{/* Overlay tonale seppia */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(26,18,8,0.6) 0%, transparent 40%, transparent 60%, rgba(10,7,4,0.75) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Cornice codice miniato */}
			<ManuscriptFrame startFrame={6} opacity={0.85} />

			{/* Particelle scintille di candela */}
			<CandleParticles opacity={0.30} />

			{/* DATA — iscrizione lapidaria */}
			<AbsoluteFill style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}>
				{/* Ornamento superiore */}
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: 16,
					marginBottom: 28,
					opacity: interpolate(frame, [10, 22], [0, 1], {extrapolateRight: 'clamp'}),
				}}>
					<div style={{width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.oroLiturgico})`}} />
					<div style={{
						width: 8, height: 8,
						background: COLORS.oroLiturgico,
						transform: 'rotate(45deg)',
					}} />
					<div style={{width: 80, height: 1, background: `linear-gradient(90deg, ${COLORS.oroLiturgico}, transparent)`}} />
				</div>

				{/* Data — come un'iscrizione su pergamena */}
				<div style={{
					fontFamily: playfairFont,
					fontSize: 56,
					color: COLORS.avorioCarta,
					letterSpacing: '0.18em',
					textTransform: 'uppercase',
					textShadow: `0 0 40px rgba(212,168,67,0.5), 0 2px 8px rgba(0,0,0,0.9)`,
					opacity: interpolate(frame, [12, 24], [0, 1], {extrapolateRight: 'clamp'}),
				}}>
					{dataText.slice(0, dataChars)}
					{dataChars < dataText.length && (
						<span style={{opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0, color: COLORS.oroLiturgico}}>|</span>
					)}
				</div>

				{/* Luogo — sottotitolo in minuscolo elegante */}
				<div style={{
					fontFamily: latoFont,
					fontSize: 20,
					fontWeight: 300,
					color: COLORS.oroPallido,
					letterSpacing: '0.22em',
					textTransform: 'uppercase',
					marginTop: 18,
					opacity: interpolate(frame, [20, 32], [0, 1], {extrapolateRight: 'clamp'}),
				}}>
					{TESTI_STORICI.luogo}
				</div>

				{/* Separatore finale */}
				<div style={{
					width: interpolate(frame, [28, durationInFrames], [0, 200], {extrapolateRight: 'clamp'}),
					height: 1,
					background: COLORS.oroLiturgico,
					marginTop: 28,
					opacity: 0.6,
				}} />
			</AbsoluteFill>

			{/* Light leaks corner — simulazione pellicola antica */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse 30% 25% at 8% 8%, rgba(212,168,67,${0.08 + candleFlicker}) 0%, transparent 100%)`,
				pointerEvents: 'none',
			}} />
		</AbsoluteFill>
	);
};
