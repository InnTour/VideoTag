import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadLato} from '@remotion/google-fonts/Lato';
import {COLORS} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

const {fontFamily: playfairFamily} = loadPlayfair();
const {fontFamily: latoFamily} = loadLato();

// SEQ 03 — PORTALE (25–35s · 10 secondi)
// Interno della cattedrale — tre navate, luce, incenso
// image_a807ba56: interno B&W con luce dal cupolino, clero in processione tra le navate
// Tono mistico: la luce dall'alto come presenza divina

export const Sequence03Portale: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.5)], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.5), durationInFrames], [1, 0], {extrapolateLeft: 'clamp', easing: Easing.out(Easing.quad)});
	const opacity = Math.min(fadeIn, fadeOut);

	// Luce dall'alto — effetto "raggio divino" che cresce lentamente
	const lucePulse = Math.sin(frame / (fps * 1.2)) * 0.08 + 0.22;

	// Parola chiave: "RIFUGIO" — emerge lentamente come un'eco
	const parola = 'RIFUGIO';
	const parolaProgress = interpolate(frame, [Math.round(1 * fps), Math.round(3.5 * fps)], [0, parola.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Pannelli dato: 1 navata → 3 navate
	const nava1Spr = spring({frame: Math.max(0, frame - Math.round(1 * fps)), fps, config: {damping: 200}});
	const nava1Op  = interpolate(nava1Spr, [0, 1], [0, 1]);

	const nava2Spr = spring({frame: Math.max(0, frame - Math.round(2.5 * fps)), fps, config: {damping: 200}});
	const nava2Op  = interpolate(nava2Spr, [0, 1], [0, 1]);

	const nava3Spr = spring({frame: Math.max(0, frame - Math.round(4 * fps)), fps, config: {damping: 200}});
	const nava3Op  = interpolate(nava3Spr, [0, 1], [0, 1]);

	// Anno 1709 — compila in basso
	const annoSpr = spring({frame: Math.max(0, frame - Math.round(2 * fps)), fps, config: {damping: 200}});
	const annoOp  = interpolate(annoSpr, [0, 1], [0, 1]);

	const navate = [
		{label: 'Navata originale', year: '1709', color: COLORS.oroSacro, op: nava1Op},
		{label: 'Prima ampliazione', year: 'XVIII sec.', color: COLORS.oroChiaro, op: nava2Op},
		{label: 'Struttura attuale', year: '3 navate', color: COLORS.avorio, op: nava3Op},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* Interno a tre navate — B&W con toni caldi dorati */}
			<KenBurnsImage
				src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_a807ba56-a624-43c6-890b-d62e04ee8b48.png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 25%"
			/>

			{/* Overlay scuro — interno è B&W, aggiungiamo calore dorato */}
			<AbsoluteFill style={{
				background: 'linear-gradient(108deg, rgba(12,9,4,0.25) 0%, rgba(12,9,4,0.12) 45%, rgba(12,9,4,0.72) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(12,9,4,0.55) 0%, transparent 20%, transparent 60%, rgba(12,9,4,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Tonalità calda dorata sulla foto B&W — come luce delle candele */}
			<AbsoluteFill style={{
				background: `rgba(180,120,20,0.14)`,
				mixBlendMode: 'multiply',
				pointerEvents: 'none',
			}} />

			{/* Raggio di luce dall'alto — effetto cupolino */}
			<div style={{
				position: 'absolute',
				top: 0,
				left: '50%',
				transform: 'translateX(-50%)',
				width: 320,
				height: '55%',
				background: `radial-gradient(ellipse at 50% 0%, ${COLORS.oroChiaro}${Math.round(lucePulse * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.22} />
			<ScanLines opacity={0.018} />

			{/* Parola RIFUGIO — grande, ghost tipografico, centro-sinistra */}
			<div style={{
				position: 'absolute',
				top: '50%',
				left: 60,
				transform: 'translateY(-50%)',
				fontFamily: playfairFamily,
				fontSize: 120,
				fontWeight: 700,
				color: COLORS.oroSacro,
				opacity: 0.14,
				letterSpacing: '0.08em',
				lineHeight: 1,
				pointerEvents: 'none',
				userSelect: 'none',
			}}>
				{parola.slice(0, Math.ceil(parolaProgress))}
			</div>

			{/* Pannelli navate — destra */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-end', paddingRight: 72, flexDirection: 'column', gap: 14}}>
				<h2 style={{
					fontFamily: playfairFamily,
					fontSize: 50,
					fontWeight: 700,
					color: COLORS.avorio,
					margin: '0 0 10px',
					textShadow: '0 2px 14px rgba(12,9,4,0.98)',
					textAlign: 'right',
				}}>
					L'Interno
				</h2>
				{navate.map((n, i) => (
					<div key={i} style={{
						opacity: n.op,
						display: 'flex', alignItems: 'center', gap: 14,
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderRight: `3px solid ${n.color}`,
						borderRadius: 8,
						padding: '12px 20px',
						backdropFilter: 'blur(18px)',
						minWidth: 360,
					}}>
						<div style={{flex: 1}}>
							<p style={{fontFamily: latoFamily, fontSize: 16, color: n.color, margin: '0 0 3px', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'right'}}>{n.label}</p>
							<p style={{fontFamily: playfairFamily, fontSize: 30, color: COLORS.avorio, margin: 0, textAlign: 'right', fontWeight: 700}}>{n.year}</p>
						</div>
					</div>
				))}

				{/* Anno 1709 */}
				<div style={{
					opacity: annoOp,
					background: `linear-gradient(135deg, ${COLORS.oroSacro}22, ${COLORS.glassScuro})`,
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 6,
					padding: '8px 18px',
					backdropFilter: 'blur(14px)',
				}}>
					<p style={{fontFamily: playfairFamily, fontSize: 16, fontStyle: 'italic', color: COLORS.oroSacro, margin: 0, textAlign: 'right'}}>
						"…con la posa del portale in marmo rosso screziato, che ancora oggi ammiriamo."
					</p>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
