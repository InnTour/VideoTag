import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 05 — EPILOGO (63–79.34s · ~16 secondi)
// La città dorme ignara del complotto — poi l'outro InnTour
// image_f7e33fa1: portale medievale di notte con figure incappucciate — la fuga nella notte
// Chiusura: "fuori nelle tenebre, i cittadini dormono, mentre si decide il futuro del Mezzogiorno"

export const Sequence05Epilogo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.6)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.8), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Logo e claim
	const logoSpr  = spring({frame: Math.max(0, frame - Math.round(5 * fps)), fps, config: {damping: 200}});
	const logoOp   = interpolate(logoSpr, [0, 1], [0, 1]);
	const logoScale= interpolate(logoSpr, [0, 1], [0.78, 1]);

	const subSpr = spring({frame: Math.max(0, frame - Math.round(6 * fps)), fps, config: {damping: 200}});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	const citaSpr = spring({frame: Math.max(0, frame - Math.round(8 * fps)), fps, config: {damping: 200}});
	const citaOp  = interpolate(citaSpr, [0, 1], [0, 1]);

	// Testo apertura — la città dorme
	const dormeProg = interpolate(frame, [Math.round(0.5 * fps), Math.round(3 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const lineW = interpolate(frame, [Math.round(5.5 * fps), Math.round(7 * fps)], [0, 280], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Candela fuori pulse — la luce nella notte
	const fuocoPulse = Math.sin(frame / (fps * 0.3)) * 0.07 + 0.93;

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* Portale medievale di notte — figure incappucciate in fuga */}
			<KenBurnsImage
				src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_f7e33fa1-398a-4b8d-b5a3-63921a36ff3a.png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 40%"
			/>

			{/* Overlay molto scuro — la notte profonda */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 48%, rgba(3,2,1,0.70) 0%, rgba(3,2,1,0.45) 40%, rgba(3,2,1,0.22) 70%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.80) 0%, transparent 20%, transparent 65%, rgba(3,2,1,0.96) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Aura delle luci nel portale */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 50% 55%, rgba(200,132,26,${fuocoPulse * 0.20}) 0%, transparent 38%)`,
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.22} />
			<ScanLines opacity={0.025} />

			{/* Testo apertura — la città dorme */}
			<div style={{
				position: 'absolute',
				top: 50,
				left: 0, right: 0,
				display: 'flex', justifyContent: 'center',
				opacity: dormeProg,
			}}>
				<div style={{
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4, padding: '8px 28px',
					backdropFilter: 'blur(14px)',
					textAlign: 'center',
				}}>
					<p style={{fontFamily: playfairFont, fontSize: 16, fontStyle: 'italic', color: COLORS.oroTorcia, margin: 0}}>
						"Fuori nelle tenebre, i cittadini dormono…"
					</p>
				</div>
			</div>

			{/* Outro centrato */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 14}}>
				<div style={{opacity: logoOp, transform: `scale(${logoScale})`}}>
					<div style={{
						background: 'rgba(3,2,1,0.92)',
						border: `1.5px solid ${COLORS.glassBorder}`,
						borderRadius: 10, padding: '10px 36px',
						backdropFilter: 'blur(20px)',
						display: 'flex', alignItems: 'center', justifyContent: 'center',
					}}>
						<Img src={staticFile('Logo facicon.png')} style={{height: 54, width: 'auto', objectFit: 'contain'}} />
					</div>
				</div>

				<p style={{
					fontFamily: playfairFont, fontSize: 24, fontWeight: 700,
					color: COLORS.avorio, margin: 0,
					opacity: subOp, textAlign: 'center',
					textShadow: '0 2px 12px rgba(3,2,1,0.95)',
				}}>
					Comune di Lacedonia
				</p>
				<p style={{
					fontFamily: latoFont, fontSize: 13, fontWeight: 300,
					color: COLORS.oroTorcia, margin: 0, letterSpacing: '0.16em',
					textTransform: 'uppercase', opacity: subOp,
				}}>
					Cicerone Digitale · Virtual Tour
				</p>

				<div style={{
					width: lineW, height: 1,
					background: `linear-gradient(90deg, transparent, ${COLORS.oroTorcia}, transparent)`,
					boxShadow: `0 0 10px ${COLORS.oroTorcia}55`,
				}} />

				<p style={{
					fontFamily: playfairFont, fontSize: 16, fontStyle: 'italic',
					color: COLORS.oroTorcia, margin: 0, opacity: citaOp * 0.80,
					textAlign: 'center', maxWidth: 700,
					lineHeight: 1.6,
				}}>
					"…mentre si decide il futuro del Mezzogiorno."
				</p>

				<div style={{
					display: 'flex', alignItems: 'center', gap: 8,
					opacity: subOp * 0.72,
					background: 'rgba(3,2,1,0.82)',
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4, padding: '5px 18px',
					backdropFilter: 'blur(12px)',
				}}>
					<div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.oroTorcia, boxShadow: `0 0 7px ${COLORS.oroTorcia}`}} />
					<span style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroTorcia, letterSpacing: '0.14em'}}>
						A2.03 · Chiesa di Sant'Antonio · Architettura e Monumenti
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
