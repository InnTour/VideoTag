import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 01 — INTRO (0–8s)
// La concattedrale al tramonto dorato — colpo d'occhio immediato
// image_c51d34bc: cattedrale avvolta nella nebbia dorata (hero shot)
// Bookend: stessa composizione restituita nell'Outro

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.7)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.5), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Flash iniziale — come uno scatto fotografico che rivela la cattedrale
	const flashOp = frame < 4 ? interpolate(frame, [0, 4], [0.7, 0]) : 0;

	// Titolo principale: emerge dal basso
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.5 * fps)), fps, config: {damping: 160}, durationInFrames: Math.round(0.9 * fps)});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [40, 0]);

	// Sottotitolo: appare dopo il titolo
	const subSpr = spring({frame: Math.max(0, frame - Math.round(1.4 * fps)), fps, config: {damping: 180}});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	// Badge sezione in alto a sx
	const badgeSpr = spring({frame: Math.max(0, frame - Math.round(0.3 * fps)), fps, config: {damping: 200}});
	const badgeOp  = interpolate(badgeSpr, [0, 1], [0, 1]);
	const badgeX   = interpolate(badgeSpr, [0, 1], [-60, 0]);

	// Linea decorativa che si estende
	const lineW = interpolate(frame, [Math.round(1 * fps), Math.round(2.5 * fps)], [0, 360], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* HERO: cattedrale nella nebbia dorata */}
			<KenBurnsImage
				src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_c51d34bc-3ea3-464f-93b6-8104098d8058.png"
				motion="zoom-in"
				intensity={0.05}
				overlayOpacity={0}
				objectPosition="center 40%"
			/>

			{/* Overlay: gradiente laterale + vignette */}
			<AbsoluteFill style={{
				background: 'linear-gradient(105deg, rgba(12,9,4,0.88) 0%, rgba(12,9,4,0.55) 42%, rgba(12,9,4,0.18) 65%, rgba(12,9,4,0.32) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(12,9,4,0.75) 0%, transparent 18%, transparent 72%, rgba(12,9,4,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Flash apertura */}
			{flashOp > 0 && (
				<AbsoluteFill style={{backgroundColor: `rgba(240,200,104,${flashOp})`, pointerEvents: 'none'}} />
			)}

			<ParticleField opacity={0.28} />
			<ScanLines opacity={0.022} />

			{/* Badge sezione — top left */}
			<div style={{
				position: 'absolute', top: 44, left: 60,
				opacity: badgeOp, transform: `translateX(${badgeX}px)`,
				display: 'flex', alignItems: 'center', gap: 10,
				background: COLORS.glassScuro,
				border: `1px solid ${COLORS.glassBorder}`,
				borderRadius: 4, padding: '7px 18px',
				backdropFilter: 'blur(14px)',
			}}>
				<div style={{width: 7, height: 7, borderRadius: '50%', backgroundColor: COLORS.oroSacro, boxShadow: `0 0 8px ${COLORS.oroSacro}`}} />
				<span style={{fontFamily: latoFont, fontSize: 12, color: COLORS.oroSacro, letterSpacing: '0.16em', textTransform: 'uppercase'}}>
					Architettura & Monumenti
				</span>
			</div>

			{/* Testo principale — left center */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 80, flexDirection: 'column', gap: 12}}>
				<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
					<h1 style={{
						fontFamily: playfairFont,
						fontSize: 90,
						fontWeight: 700,
						color: COLORS.avorio,
						margin: 0,
						lineHeight: 1.0,
						textShadow: `0 3px 28px rgba(12,9,4,0.98), 0 0 60px ${COLORS.oroSacro}44`,
						letterSpacing: '-0.01em',
						maxWidth: 780,
					}}>
						Concattedrale<br />
						<span style={{color: COLORS.oroSacro, fontSize: 72}}>di Santa Maria Sunta</span>
					</h1>
				</div>

				{/* Linea oro */}
				<div style={{
					width: lineW, height: 2,
					background: `linear-gradient(90deg, ${COLORS.oroSacro}, ${COLORS.oroChiaro}88, transparent)`,
					boxShadow: `0 0 12px ${COLORS.oroSacro}66`,
				}} />

				<div style={{opacity: subOp, display: 'flex', flexDirection: 'column', gap: 6}}>
					<p style={{
						fontFamily: latoFont,
						fontSize: 22,
						fontWeight: 300,
						color: COLORS.pietraCalce,
						margin: 0,
						letterSpacing: '0.08em',
						textShadow: '0 2px 12px rgba(12,9,4,0.9)',
					}}>
						Lacedonia · Irpinia · dal 1709
					</p>
					<p style={{
						fontFamily: playfairFont,
						fontSize: 18,
						fontStyle: 'italic',
						color: COLORS.oroSacro,
						margin: 0,
						opacity: 0.80,
					}}>
						"il cuore pulsante di Lacedonia da oltre tre secoli"
					</p>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
