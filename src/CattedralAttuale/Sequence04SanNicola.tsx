import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 04 — SAN NICOLA (35–50s · 15 secondi)
// San Nicola di Bari — patrono di Lacedonia dal 1456
// Processione notturna con torce — il momento più cinematografico della clip
// image_37057e69: processione notturna con torce e campanile illuminato (layer 1 → hero)
// image_91af5b3a: campanile al tramonto infuocato, figura solitaria (cross-dissolve al climax)

export const Sequence04SanNicola: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.5)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.6), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Cross-dissolve: processione notturna → tramonto infuocato
	// A ~9s locali → reveal del tramonto come climax
	const dissolveStart = Math.round(8 * fps);
	const dissolveEnd   = Math.round(10.5 * fps);
	const dissolve = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Anno "1456" — reveal drammatico
	const anno = '1456';
	const annoProgress = interpolate(frame, [Math.round(0.5 * fps), Math.round(2.5 * fps)], [0, anno.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Torce luminose — pulse come fiamme vive
	const torciaPulse = Math.sin(frame / (fps * 0.3)) * 0.12 + 0.88;

	// Cards
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.4 * fps)), fps, config: {damping: 160}});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [35, 0]);

	const card1Spr = spring({frame: Math.max(0, frame - Math.round(1.5 * fps)), fps, config: {damping: 180}});
	const card1Op  = interpolate(card1Spr, [0, 1], [0, 1]);

	const card2Spr = spring({frame: Math.max(0, frame - Math.round(3.5 * fps)), fps, config: {damping: 180}});
	const card2Op  = interpolate(card2Spr, [0, 1], [0, 1]);

	const card3Spr = spring({frame: Math.max(0, frame - Math.round(6 * fps)), fps, config: {damping: 180}});
	const card3Op  = interpolate(card3Spr, [0, 1], [0, 1]);

	// Glow arancione/oro — evoca le torce della processione
	const glowOp = interpolate(frame, [0, Math.round(2 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * (1 - dissolve * 0.4);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Processione notturna con torce */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_37057e69-c2d0-428e-8e44-8d9a47010e6d.png"
					motion="zoom-out"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 35%"
				/>
			</div>

			{/* LAYER 2: Campanile al tramonto infuocato */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_91af5b3a-935f-423b-ac1b-6b5929dd3497.png"
					motion="pan-right"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 40%"
				/>
			</div>

			{/* Overlay bitonale */}
			<AbsoluteFill style={{
				background: 'linear-gradient(102deg, rgba(12,9,4,0.88) 0%, rgba(12,9,4,0.55) 40%, rgba(12,9,4,0.15) 65%, rgba(12,9,4,0.08) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(12,9,4,0.55) 0%, transparent 18%, transparent 72%, rgba(12,9,4,0.90) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Glow arancione — aura delle torce */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 68% 55%, rgba(220,120,20,${glowOp * 0.22}) 0%, transparent 55%)`,
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.30} />
			<ScanLines opacity={0.022} />

			{/* Anno 1456 ghost */}
			<div style={{
				position: 'absolute', top: 38, right: 64,
				fontFamily: playfairFont,
				fontSize: 110,
				fontWeight: 700,
				color: COLORS.oroSacro,
				opacity: 0.18,
				lineHeight: 1,
				letterSpacing: '-0.02em',
				pointerEvents: 'none',
				userSelect: 'none',
			}}>
				{anno.slice(0, Math.ceil(annoProgress))}
			</div>

			{/* Icona torcia decorativa */}
			<div style={{
				position: 'absolute', top: 42, right: 68,
				opacity: torciaPulse * glowOp * 0.6,
				fontSize: 36,
				pointerEvents: 'none',
			}}>
				🕯️
			</div>

			{/* Cards — sinistra */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 72, flexDirection: 'column', gap: 16}}>

				<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
					<h2 style={{
						fontFamily: playfairFont,
						fontSize: 54,
						fontWeight: 700,
						color: COLORS.avorio,
						margin: 0,
						lineHeight: 1.05,
						textShadow: '0 3px 20px rgba(12,9,4,0.98)',
					}}>
						San Nicola di Bari
					</h2>
					<p style={{fontFamily: latoFont, fontSize: 15, color: COLORS.oroSacro, margin: '6px 0 0', letterSpacing: '0.14em', textTransform: 'uppercase'}}>
						Patrono di Lacedonia · dal 1456
					</p>
				</div>

				{/* Card 1: Il terremoto e il voto */}
				<div style={{
					opacity: card1Op,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderLeft: `3px solid ${COLORS.oroSacro}`,
					borderRadius: 8, padding: '13px 20px',
					backdropFilter: 'blur(18px)',
					maxWidth: 480,
				}}>
					<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroSacro, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>1456 · Il Voto</p>
					<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
						Dopo il terremoto del 1456, la comunità si pone sotto la protezione di San Nicola di Bari — patrono eterno della città
					</p>
				</div>

				{/* Card 2: Rifugio spirituale */}
				<div style={{
					opacity: card2Op,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderLeft: `3px solid ${COLORS.oroChiaro}`,
					borderRadius: 8, padding: '13px 20px',
					backdropFilter: 'blur(18px)',
					maxWidth: 480,
				}}>
					<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroChiaro, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>La Cattedrale</p>
					<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
						Non solo un monumento — il <em style={{color: COLORS.oroSacro}}>rifugio spirituale della comunità</em>, custodito dal patrono
					</p>
				</div>

				{/* Card 3: La processione — la vita del rito */}
				<div style={{
					opacity: card3Op,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorderLight}`,
					borderLeft: `3px solid rgba(220,140,30,0.7)`,
					borderRadius: 8, padding: '13px 20px',
					backdropFilter: 'blur(18px)',
					maxWidth: 480,
				}}>
					<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.pietraCalce, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>La Tradizione Viva</p>
					<p style={{fontFamily: playfairFont, fontSize: 19, color: COLORS.pietraCalce, margin: 0, lineHeight: 1.4}}>
						Ogni anno le torce illuminano la notte · la processione è il cuore del borgo · secoli di fede che non si spengono
					</p>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
