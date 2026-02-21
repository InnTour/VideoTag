import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence04Demolita: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// "1851" — numero che appare con peso
	const annoSpr = spring({frame: Math.max(0, frame - Math.round(0.5 * fps)), fps, config: {damping: 100, stiffness: 120}, durationInFrames: Math.round(0.8 * fps)});
	const annoScale = interpolate(annoSpr, [0, 1], [0.3, 1]);
	const annoOp    = interpolate(annoSpr, [0, 1], [0, 1]);

	// Titolo
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(1.2 * fps)), fps, config: {damping: 140}, durationInFrames: Math.round(0.9 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [40, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Mani con foto d'epoca — sfondo della memoria
	// Cross-dissolve verso anziano nel vicolo vuoto
	const crossProgress = interpolate(frame, [Math.round(9 * fps), Math.round(13 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Crepa visiva — effetto frattura nella pagina
	const crepaProg = interpolate(frame, [Math.round(0.2 * fps), Math.round(0.6 * fps)], [0, 1], {extrapolateRight: 'clamp'});

	// Info cards appaiono in sequenza
	const card1Op = interpolate(frame, [Math.round(3 * fps), Math.round(4.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const card2Op = interpolate(frame, [Math.round(5 * fps), Math.round(6.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const card3Op = interpolate(frame, [Math.round(7.5 * fps), Math.round(9 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Mani con fotografie d'epoca — la memoria materiale */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_8baeb7ed-ea6e-4f8b-a138-0b5afc21a210.png"
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 45%"
				/>
			</div>

			{/* LAYER 2: Anziano nel vicolo vuoto — il presente senza la porta */}
			<div style={{position: 'absolute', inset: 0, opacity: crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_a0d316e5-2d82-431f-bf48-5962f25e3a76.png"
					motion="zoom-out"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 40%"
				/>
			</div>

			{/* Overlay pesante — la morte di qualcosa di grande */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.90) 30%, rgba(8,8,8,0.50) 58%, rgba(8,8,8,0.15) 80%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,8,8,0.78) 0%, transparent 25%, transparent 60%, rgba(8,8,8,0.90) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Effetto "crepa" nella composizione — linea diagonale sottile */}
			<AbsoluteFill style={{pointerEvents: 'none', opacity: crepaProg * 0.4}}>
				<svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
					<line x1="520" y1="0" x2="720" y2="1080" stroke={COLORS.oroMemoria} strokeWidth="0.8" opacity="0.35" />
					<line x1="522" y1="0" x2="722" y2="1080" stroke={COLORS.oroMemoria} strokeWidth="0.3" opacity="0.15" />
				</svg>
			</AbsoluteFill>

			<ParticleField opacity={0.14} />
			<ScanLines opacity={0.032} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 52}}>

				{/* SINISTRA */}
				<div style={{flex: 1.2, display: 'flex', flexDirection: 'column', gap: 18}}>

					{/* Anno 1851 — grande e pesante come un verdetto */}
					<div style={{opacity: annoOp, transform: `scale(${annoScale})`, transformOrigin: 'left center'}}>
						<p style={{
							fontFamily: playfairFont, fontSize: 120, fontWeight: 700,
							color: COLORS.biancaCalce, margin: 0, lineHeight: 0.9,
							textShadow: '0 4px 30px rgba(8,8,8,0.99)',
							letterSpacing: '-0.02em',
						}}>
							1851
						</p>
					</div>

					{/* Titolo */}
					<h2 style={{
						fontFamily: playfairFont, fontSize: 60, fontWeight: 700,
						color: COLORS.biancaCalce, margin: 0, lineHeight: 1.05,
						opacity: titleOp, transform: `translateY(${titleY}px)`,
						textShadow: '0 2px 18px rgba(8,8,8,0.98)',
					}}>
						Il sindaco Franciosi
						<br /><span style={{color: COLORS.oroMemoria}}>ne ordina l'abbattimento</span>
					</h2>

					{/* Cards motivazione / contesto */}
					<div style={{display: 'flex', flexDirection: 'column', gap: 11, marginTop: 4}}>
						{[
							{label: 'Il motivo', valore: 'Struttura pericolante', detail: 'La porta gotica non era più sicura per i passanti', op: card1Op},
							{label: 'Il prezzo', valore: 'Memoria secolare perduta', detail: 'L\'antico varco gotico sacrificato alle necessità urbanistiche', op: card2Op},
							{label: 'Oggi', valore: 'Un vuoto nel tessuto urbano', detail: 'Un semplice passaggio sotto una palazzina moderna', op: card3Op},
						].map(({label, valore, detail, op}) => (
							<div key={label} style={{
								opacity: op,
								transform: `translateX(${interpolate(op, [0, 1], [-30, 0])}px)`,
								background: 'rgba(8,8,8,0.84)',
								border: `1px solid ${COLORS.oroMemoria}33`,
								borderLeft: `3px solid ${COLORS.oroMemoria}55`,
								borderRadius: '0 7px 7px 0',
								padding: '10px 18px',
								backdropFilter: 'blur(14px)',
							}}>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroMemoria, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, marginBottom: 3}}>{label}</p>
								<p style={{fontFamily: playfairFont, fontSize: 26, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>{valore}</p>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.grigio60, margin: 0, marginTop: 2}}>{detail}</p>
							</div>
						))}
					</div>
				</div>

				<div style={{flex: 0.4}} />
			</div>
		</AbsoluteFill>
	);
};
