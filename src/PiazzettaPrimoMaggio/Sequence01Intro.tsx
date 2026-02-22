import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.6], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Titolo dal basso
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.6 * fps)), fps, config: {damping: 120}, durationInFrames: Math.round(1.2 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [80, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Sottotitolo
	const subSpr = spring({frame: Math.max(0, frame - Math.round(1.6 * fps)), fps, config: {damping: 160}, durationInFrames: Math.round(0.8 * fps)});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	// Badge "1° MAGGIO" che pulsa
	const pulseBadge = 1 + 0.04 * Math.sin(frame * 0.12);

	// Linea orizzontale che si estende
	const lineW = interpolate(frame, [Math.round(1.4 * fps), Math.round(2.8 * fps)], [0, 380], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* SFONDO: contadini nella piazzetta al tramonto — pan lento da sinistra verso destra */}
			<KenBurnsImage
				src="images/TAG A1.06 - PIAZZETTA PRIMO MAGGIO/image_9592a387-dacb-4106-b6d6-367a62f89a2d.png"
				motion="pan-right"
				intensity={0.06}
				overlayOpacity={0}
				objectPosition="center 25%"
			/>

			{/* Overlay bitonale: scuro a sinistra per il testo, graduale verso destra */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(6,6,14,0.97) 0%, rgba(6,6,14,0.88) 30%, rgba(6,6,14,0.50) 55%, rgba(6,6,14,0.10) 80%)',
				pointerEvents: 'none',
			}} />
			{/* Vignette verticale top/bottom */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(6,6,14,0.70) 0%, transparent 22%, transparent 70%, rgba(6,6,14,0.80) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Particelle calde (colori autunnali/dorati) */}
			<ParticleField opacity={0.4} />
			<ScanLines opacity={0.022} />

			{/* === BADGE SEZIONE — in alto a sinistra === */}
			<div style={{position: 'absolute', top: 50, left: 60, display: 'flex', alignItems: 'center', gap: 14, opacity: subOp}}>
				<div style={{width: 4, height: 32, backgroundColor: COLORS.rossoBandiera, borderRadius: 2, boxShadow: `0 0 10px ${COLORS.rossoBandiera}88`}} />
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.rossoBandiera, letterSpacing: '0.18em', textTransform: 'uppercase'}}>
					Architettura e Monumenti
				</span>
				<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo, letterSpacing: '0.1em'}}>· A1.06</span>
			</div>

			{/* === TESTO PRINCIPALE — sinistra === */}
			<div style={{position: 'absolute', left: 60, top: '50%', transform: 'translateY(-52%)', maxWidth: 680}}>

				{/* Soprattitolo */}
				<p style={{
					fontFamily: latoFont, fontSize: 16, fontWeight: 400,
					color: COLORS.oroIrpino, letterSpacing: '0.22em',
					textTransform: 'uppercase', margin: 0, marginBottom: 18,
					opacity: subOp,
				}}>
					Lacedonia · Memoria Civile
				</p>

				{/* Titolo principale */}
				<h1 style={{
					fontFamily: playfairFont, fontSize: 82, fontWeight: 700,
					color: COLORS.biancaCalce, margin: 0, lineHeight: 1.0,
					opacity: titleOp, transform: `translateY(${titleY}px)`,
					textShadow: `0 0 50px rgba(6,6,14,0.9), 0 2px 20px rgba(6,6,14,0.8)`,
				}}>
					Piazzetta
					<br />
					<span style={{color: COLORS.oroIrpino, fontStyle: 'italic'}}>Primo Maggio</span>
				</h1>

				{/* Linea decorativa */}
				<div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 28, marginBottom: 22}}>
					<div style={{
						width: lineW, height: 2,
						background: `linear-gradient(90deg, ${COLORS.rossoBandiera}, ${COLORS.oroIrpino})`,
						boxShadow: `0 0 8px ${COLORS.oroIrpino}66`,
					}} />
					{lineW > 80 && (
						<div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.oroIrpino, boxShadow: `0 0 14px ${COLORS.oroIrpino}`}} />
					)}
				</div>

				{/* Sottotitolo */}
				<p style={{
					fontFamily: latoFont, fontSize: 26, fontWeight: 300,
					color: COLORS.biancaCalce, margin: 0,
					opacity: subOp, letterSpacing: '0.05em', lineHeight: 1.65,
					textShadow: '0 1px 10px rgba(6,6,14,0.7)',
				}}>
					Un balcone sulla storia irpina,
					<br />dove la pietra e la lotta si incontrano.
				</p>
			</div>

			{/* === BADGE "1° MAGGIO" — destra, sovrapposto alla foto === */}
			<div style={{
				position: 'absolute', right: 80, top: '50%', transform: `translateY(-50%) scale(${pulseBadge})`,
				opacity: subOp,
				textAlign: 'center',
				background: 'rgba(6,6,14,0.80)',
				border: `2px solid ${COLORS.rossoBandiera}`,
				borderRadius: 10,
				padding: '16px 32px',
				backdropFilter: 'blur(16px)',
				boxShadow: `0 0 30px ${COLORS.rossoBandiera}44`,
			}}>
				<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.rossoBandiera, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0}}>Festa del</p>
				<p style={{fontFamily: playfairFont, fontSize: 58, fontWeight: 700, color: COLORS.oroIrpino, margin: 0, lineHeight: 1, textShadow: `0 0 20px ${COLORS.oroIrpino}88`}}>1°</p>
				<p style={{fontFamily: playfairFont, fontSize: 40, fontWeight: 700, color: COLORS.oroIrpino, margin: 0, letterSpacing: '0.05em'}}>MAGGIO</p>
				<div style={{width: '100%', height: 1.5, backgroundColor: COLORS.oroIrpino, opacity: 0.4, marginTop: 10, marginBottom: 8}} />
				<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0}}>Lacedonia</p>
			</div>

			{/* InnTour bottom */}
			<div style={{position: 'absolute', bottom: 42, left: 60, opacity: subOp * 0.5, display: 'flex', alignItems: 'center', gap: 10}}>
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.12em'}}>INNTOUR</span>
				<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo}}>· Cicerone Digitale di Lacedonia</span>
			</div>
		</AbsoluteFill>
	);
};
