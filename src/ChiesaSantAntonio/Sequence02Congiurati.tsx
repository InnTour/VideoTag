import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 02 — CONGIURATI (8–27s · 19 secondi)
// I tre principi — Francesco Coppola, Antonio San Severino, Giovanni Caracciolo
// image_eb64892f: due nobili in velluto rosso/verde nella chiesa (layer 1)
// image_cc45b20b: nobile che bisbiglia con candela — la clandestinità (cross-dissolve)

export const Sequence02Congiurati: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.4), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Cross-dissolve: due principi → nobile con candela
	const dissolveStart = Math.round(10 * fps);
	const dissolveEnd   = Math.round(12.5 * fps);
	const dissolve = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Candela pulse
	const fuocoPulse = Math.sin(frame / (fps * 0.22)) * 0.08 + 0.92;

	// Tre schede dei congiurati — appaiono in sequenza
	const p1Spr = spring({frame: Math.max(0, frame - Math.round(0.5 * fps)), fps, config: {damping: 180}});
	const p1Op  = interpolate(p1Spr, [0, 1], [0, 1]);
	const p1Y   = interpolate(p1Spr, [0, 1], [25, 0]);

	const p2Spr = spring({frame: Math.max(0, frame - Math.round(3 * fps)), fps, config: {damping: 180}});
	const p2Op  = interpolate(p2Spr, [0, 1], [0, 1]);
	const p2Y   = interpolate(p2Spr, [0, 1], [25, 0]);

	const p3Spr = spring({frame: Math.max(0, frame - Math.round(5.5 * fps)), fps, config: {damping: 180}});
	const p3Op  = interpolate(p3Spr, [0, 1], [0, 1]);
	const p3Y   = interpolate(p3Spr, [0, 1], [25, 0]);

	const congiurati = [
		{nome: 'Francesco Coppola', titolo: 'Principe di Sarno', op: p1Op, y: p1Y},
		{nome: 'Antonio San Severino', titolo: 'Principe di Salerno', op: p2Op, y: p2Y},
		{nome: 'Giovanni Caracciolo', titolo: 'Duca di Melfi', op: p3Op, y: p3Y},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Due principi in velluto */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_eb64892f-e908-4618-89b0-20e0f27d355f.png"
					motion="zoom-in"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 30%"
				/>
			</div>

			{/* LAYER 2: Nobile con candela — clandestinità */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_cc45b20b-033e-48ab-b384-1d7874d3969b.png"
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 25%"
				/>
			</div>

			{/* Overlay bitonale */}
			<AbsoluteFill style={{
				background: 'linear-gradient(100deg, rgba(3,2,1,0.88) 0%, rgba(3,2,1,0.55) 40%, rgba(3,2,1,0.15) 65%, rgba(3,2,1,0.08) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.55) 0%, transparent 18%, transparent 72%, rgba(3,2,1,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Aura torce */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 62% 48%, rgba(200,132,26,${fuocoPulse * 0.18}) 0%, transparent 52%)`,
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.20} />
			<ScanLines opacity={0.022} />

			{/* Titolo sequenza */}
			<div style={{position: 'absolute', top: 44, left: 64}}>
				<div style={{
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorderRed}`,
					borderRadius: 4, padding: '7px 20px',
					backdropFilter: 'blur(14px)',
				}}>
					<span style={{fontFamily: latoFont, fontSize: 12, color: COLORS.rossoTradimento, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700}}>
						I Congiurati · Regno di Napoli
					</span>
				</div>
			</div>

			{/* Schede congiurati — colonna sinistra */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 64, flexDirection: 'column', gap: 14}}>

				<h2 style={{
					fontFamily: playfairFont,
					fontSize: 50,
					fontWeight: 700,
					color: COLORS.avorio,
					margin: '0 0 8px',
					textShadow: '0 2px 18px rgba(3,2,1,0.99)',
				}}>
					I Nobili del Complotto
				</h2>

				{congiurati.map((c, i) => (
					<div key={i} style={{
						opacity: c.op,
						transform: `translateY(${c.y}px)`,
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderLeft: `3px solid ${COLORS.oroTorcia}`,
						borderRadius: 8,
						padding: '12px 20px',
						backdropFilter: 'blur(18px)',
						minWidth: 420,
					}}>
						<p style={{fontFamily: playfairFont, fontSize: 22, fontWeight: 700, color: COLORS.avorio, margin: 0, lineHeight: 1.2}}>{c.nome}</p>
						<p style={{fontFamily: latoFont, fontSize: 12, color: COLORS.oroTorcia, margin: '4px 0 0', letterSpacing: '0.14em', textTransform: 'uppercase'}}>{c.titolo}</p>
					</div>
				))}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
