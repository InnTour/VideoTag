import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, IMAGES, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 02 — I CONGIURATI (500 frame · ~17s)
// I tre nobili più potenti del Regno di Napoli si riuniscono nella chiesa
// IMAGES.congiurati1: due nobili in velluto — layer 1
// IMAGES.congiurati2: nobile con candela che bisbiglia a un frate — cross-dissolve layer 2
// Nomi corretti dalla narrazione: Pirro del Balzo · Antonello Sanseverino · Giovanni Caracciolo

export const Sequence02Congiurati: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.4), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Cross-dissolve: congiurati1 (0–300f layer1) → congiurati2 (150–500f layer2)
	const dissolveStart = 150;
	const dissolveEnd   = 300;
	const dissolve = interpolate(
		frame,
		[dissolveStart, dissolveEnd],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Candela pulse — tremore della luce nella notte
	const fuocoPulse = Math.sin(frame / (fps * 0.22)) * 0.08 + 0.92;

	// Ghost "CONGIURA" — filigrana verticale in rosso
	const ghostProg = interpolate(frame, [Math.round(3 * fps), Math.round(6 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Titolo sequenza
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.3 * fps)), fps, config: {damping: 160}});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [30, 0]);

	// Tre schede dei congiurati — spring in cascata con offset 60f (~2s)
	const p1Spr = spring({frame: Math.max(0, frame - Math.round(1.0 * fps)), fps, config: {damping: 180}});
	const p1Op  = interpolate(p1Spr, [0, 1], [0, 1]);
	const p1Y   = interpolate(p1Spr, [0, 1], [22, 0]);

	const p2Spr = spring({frame: Math.max(0, frame - Math.round(3.0 * fps)), fps, config: {damping: 180}});
	const p2Op  = interpolate(p2Spr, [0, 1], [0, 1]);
	const p2Y   = interpolate(p2Spr, [0, 1], [22, 0]);

	const p3Spr = spring({frame: Math.max(0, frame - Math.round(5.0 * fps)), fps, config: {damping: 180}});
	const p3Op  = interpolate(p3Spr, [0, 1], [0, 1]);
	const p3Y   = interpolate(p3Spr, [0, 1], [22, 0]);

	const congiurati = [
		{nome: 'Pirro del Balzo', titolo: 'Signore di Lacedonia', op: p1Op, y: p1Y},
		{nome: 'Antonello Sanseverino', titolo: 'Principe di Salerno', op: p2Op, y: p2Y},
		{nome: 'Giovanni Caracciolo', titolo: 'Duca di Melfi', op: p3Op, y: p3Y},
	];

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Due principi in velluto rosso/verde */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
				<KenBurnsImage
					src={IMAGES.congiurati1}
					motion="zoom-in"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 30%"
				/>
			</div>

			{/* LAYER 2: Nobile con candela — clandestinità */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
				<KenBurnsImage
					src={IMAGES.congiurati2}
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 25%"
				/>
			</div>

			{/* Overlay bitonale — sinistra scura per testo, destra trasparente */}
			<AbsoluteFill style={{
				background: 'linear-gradient(100deg, rgba(3,2,1,0.90) 0%, rgba(3,2,1,0.60) 38%, rgba(3,2,1,0.20) 62%, rgba(3,2,1,0.08) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.55) 0%, transparent 18%, transparent 72%, rgba(3,2,1,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Overlay candele caldo */}
			<AbsoluteFill style={{
				background: `rgba(120,60,10,${0.14 * fuocoPulse})`,
				mixBlendMode: 'overlay',
				pointerEvents: 'none',
			}} />

			{/* Aura torce */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 65% 48%, rgba(200,132,26,${fuocoPulse * 0.18}) 0%, transparent 52%)`,
				pointerEvents: 'none',
			}} />

			{/* Ghost "CONGIURA" verticale in rossoTradimento */}
			<div style={{
				position: 'absolute',
				top: '10%',
				right: 72,
				opacity: ghostProg * 0.06,
				pointerEvents: 'none',
				userSelect: 'none',
				transform: 'rotate(90deg)',
				transformOrigin: 'right top',
			}}>
				<span style={{
					fontFamily: playfairFont,
					fontSize: 110,
					fontWeight: 700,
					color: COLORS.rossoTradimento,
					letterSpacing: '0.08em',
				}}>
					CONGIURA
				</span>
			</div>

			<ParticleField opacity={0.20} />
			<ScanLines opacity={0.022} />

			{/* Badge sequenza — top left */}
			<div style={{
				position: 'absolute',
				top: 44,
				left: 64,
				opacity: titleOp,
			}}>
				<div style={{
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorderRed}`,
					borderLeft: `3px solid ${COLORS.rossoTradimento}`,
					borderRadius: 4,
					padding: '7px 20px',
					backdropFilter: 'blur(14px)',
				}}>
					<span style={{
						fontFamily: latoFont,
						fontSize: 16,
						color: COLORS.rossoTradimento,
						letterSpacing: '0.18em',
						textTransform: 'uppercase',
						fontWeight: 700,
					}}>
						I Congiurati · Regno di Napoli · 1486
					</span>
				</div>
			</div>

			{/* Titolo + Cards congiurati — colonna sinistra */}
			<AbsoluteFill style={{
				justifyContent: 'center',
				alignItems: 'flex-start',
				paddingLeft: 64,
				flexDirection: 'column',
				gap: 14,
			}}>
				<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
					<h2 style={{
						fontFamily: playfairFont,
						fontSize: 96,
						fontWeight: 700,
						color: COLORS.oroChiaro,
						margin: '0 0 6px',
						textShadow: '0 2px 18px rgba(3,2,1,0.99)',
						lineHeight: 1.05,
					}}>
						I Tre Congiurati
					</h2>
				</div>

				{congiurati.map((c, i) => (
					<div key={i} style={{
						opacity: c.op,
						transform: `translateY(${c.y}px)`,
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderLeft: `3px solid ${COLORS.oroTorcia}`,
						borderRadius: 8,
						padding: '13px 22px',
						backdropFilter: 'blur(18px)',
						minWidth: 440,
					}}>
						<p style={{
							fontFamily: playfairFont,
							fontSize: 30,
							fontWeight: 700,
							color: COLORS.avorio,
							margin: 0,
							lineHeight: 1.2,
						}}>
							{c.nome}
						</p>
						<p style={{
							fontFamily: latoFont,
							fontSize: 17,
							color: COLORS.oroTorcia,
							margin: '5px 0 0',
							letterSpacing: '0.14em',
							textTransform: 'uppercase',
						}}>
							{c.titolo}
						</p>
					</div>
				))}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
