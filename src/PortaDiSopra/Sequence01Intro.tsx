import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.8], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Titolo — appare come una domanda sospesa
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.8 * fps)), fps, config: {damping: 120, stiffness: 70}, durationInFrames: Math.round(1.5 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [70, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	const subSpr = spring({frame: Math.max(0, frame - Math.round(2 * fps)), fps, config: {damping: 160}, durationInFrames: Math.round(0.8 * fps)});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	// Linea dorata
	const lineW = interpolate(frame, [Math.round(1.8 * fps), Math.round(3.2 * fps)], [0, 380], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Vecchio che cammina nel vicolo — piano B&W desaturato: è il presente, il vuoto
	// Sovrapposizione: la foto dell'anziano come sfondo desolato, poi il portale ornato emerge
	const portalReveal = interpolate(frame, [Math.round(3.5 * fps), Math.round(6 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// "COSA MANCA?" — le parole appaiono una alla volta
	const domandaStr = 'COSA MANCA?';
	const domandaLen = Math.round(
		interpolate(frame, [Math.round(1.2 * fps), Math.round(2.8 * fps)], [0, domandaStr.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
	);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Vicolo oggi — l'anziano che cammina dove c'era la porta */}
			<div style={{position: 'absolute', inset: 0, opacity: 1}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_8dd5a117-6c61-4c4b-b210-30f8bcffedbe.png"
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 40%"
				/>
				{/* Desatura la foto col presente — B&W + seppia leggera */}
				<AbsoluteFill style={{
					background: 'radial-gradient(ellipse at 50% 50%, rgba(8,8,8,0.1) 0%, rgba(8,8,8,0.0) 60%)',
					mixBlendMode: 'multiply',
					pointerEvents: 'none',
				}} />
			</div>

			{/* LAYER 2: Il portale gotico ornato — emerge come un fantasma dal passato */}
			<div style={{position: 'absolute', inset: 0, opacity: portalReveal * 0.55}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_23e4c71c-d560-42a7-ad2c-009da43cded7.png"
					motion="zoom-out"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 30%"
				/>
			</div>

			{/* Overlay tonale — scuro ai bordi, centro quasi pulito */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,8,8,0.80) 0%, rgba(8,8,8,0.30) 30%, rgba(8,8,8,0.20) 55%, rgba(8,8,8,0.88) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.70) 28%, rgba(8,8,8,0.20) 55%, rgba(8,8,8,0.85) 100%)',
				pointerEvents: 'none',
			}} />

			<ScanLines opacity={0.030} />

			{/* === BADGE SEZIONE — in alto === */}
			<div style={{position: 'absolute', top: 50, left: 60, display: 'flex', alignItems: 'center', gap: 14, opacity: subOp}}>
				<div style={{width: 4, height: 30, background: `linear-gradient(180deg, ${COLORS.oroMemoria}, ${COLORS.oroAntico})`, borderRadius: 2}} />
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroMemoria, letterSpacing: '0.18em', textTransform: 'uppercase'}}>
					Architettura e Monumenti
				</span>
				<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigio60}}>· A1.10</span>
			</div>

			{/* Badge "(DEMOLITA)" — piccolo, discreto, drammatico */}
			<div style={{
				position: 'absolute', top: 50, right: 60,
				opacity: subOp,
				background: 'rgba(8,8,8,0.82)',
				border: `1px solid ${COLORS.grigio40}`,
				borderRadius: 4, padding: '5px 16px',
			}}>
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.grigio60, letterSpacing: '0.2em', textTransform: 'uppercase'}}>demolita · 1851</span>
			</div>

			{/* === TESTO PRINCIPALE === */}
			<div style={{position: 'absolute', left: 60, bottom: 130, maxWidth: 760}}>

				{/* "COSA MANCA?" — domanda rivelata lettera per lettera */}
				<p style={{
					fontFamily: latoFont, fontSize: 27, fontWeight: 700,
					color: COLORS.oroMemoria, letterSpacing: '0.28em',
					textTransform: 'uppercase', margin: 0, marginBottom: 14,
					opacity: domandaLen > 0 ? 1 : 0,
					textShadow: `0 0 20px ${COLORS.oroMemoria}55`,
				}}>
					{domandaStr.slice(0, domandaLen)}
				</p>

				{/* Titolo */}
				<h1 style={{
					fontFamily: playfairFont, fontSize: 100, fontWeight: 700,
					color: COLORS.biancaCalce, margin: 0, lineHeight: 0.95,
					opacity: titleOp, transform: `translateY(${titleY}px)`,
					textShadow: '0 4px 30px rgba(8,8,8,0.98), 0 0 60px rgba(8,8,8,0.7)',
				}}>
					Porta di Sopra
					<br />
					<span style={{color: COLORS.oroMemoria, fontStyle: 'italic', fontSize: 70}}>del Messere</span>
				</h1>

				{/* Linea dorata */}
				<div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 26, marginBottom: 20}}>
					<div style={{
						width: lineW, height: 1.5,
						background: `linear-gradient(90deg, ${COLORS.oroMemoria}, ${COLORS.oroAntico}44)`,
						boxShadow: `0 0 8px ${COLORS.oroMemoria}55`,
					}} />
					{lineW > 60 && <div style={{width: 7, height: 7, borderRadius: '50%', backgroundColor: COLORS.oroMemoria, boxShadow: `0 0 14px ${COLORS.oroMemoria}`}} />}
				</div>

				{/* Sottotitolo */}
				<p style={{
					fontFamily: latoFont, fontSize: 26, fontWeight: 300,
					color: COLORS.grigio90, margin: 0, lineHeight: 1.65,
					opacity: subOp, letterSpacing: '0.04em',
					textShadow: '0 1px 12px rgba(8,8,8,0.9)',
				}}>
					La più monumentale delle quattro porte medievali.<br />
					Abbattuta. Ma non dimenticata.
				</p>
			</div>
		</AbsoluteFill>
	);
};
