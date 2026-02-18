import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 03 — GIURAMENTO (27–45s · 18 secondi)
// Il momento sacrilego: l'ostia consacrata, le mani sui Vangeli
// image_68cbb35c: prete con ostia, fedeli inginocchiati (layer 1)
// image_3d85aafc: mani illuminate sui Vangeli (cross-dissolve — il giuramento)

export const Sequence03Giuramento: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.4), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Cross-dissolve: prete con ostia → mani sui Vangeli
	// La transizione avviene quando i baroni si alzano (~8s locali)
	const dissolveStart = Math.round(7.5 * fps);
	const dissolveEnd   = Math.round(10 * fps);
	const dissolve = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Luce sacra dall'ostia — pulse lento
	const ostiaGlow = Math.sin(frame / (fps * 0.8)) * 0.06 + 0.94;

	// Parola "GIURANO" che emerge drammaticamente
	const gProg = interpolate(frame, [Math.round(8 * fps), Math.round(11 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Flash bianco al momento cruciale — il sollevamento dell'ostia (a ~7s locali)
	const flashFrame = Math.round(7 * fps);
	const flashOp = frame >= flashFrame && frame < flashFrame + 6
		? interpolate(frame - flashFrame, [0, 3, 6], [0, 0.35, 0])
		: 0;

	// Cards narrative
	const c1Spr = spring({frame: Math.max(0, frame - Math.round(1 * fps)), fps, config: {damping: 180}});
	const c1Op  = interpolate(c1Spr, [0, 1], [0, 1]);

	const c2Spr = spring({frame: Math.max(0, frame - Math.round(3.5 * fps)), fps, config: {damping: 180}});
	const c2Op  = interpolate(c2Spr, [0, 1], [0, 1]);

	const citaSpr = spring({frame: Math.max(0, frame - Math.round(8 * fps)), fps, config: {damping: 200}});
	const citaOp  = interpolate(citaSpr, [0, 1], [0, 1]);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Prete con ostia consacrata */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_68cbb35c-52d0-499b-8584-185162a14643.png"
					motion="zoom-in"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 28%"
				/>
			</div>

			{/* LAYER 2: Mani sui Vangeli — il giuramento */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_3d85aafc-f542-4920-9c29-6d58b1b0ac81.png"
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center center"
				/>
			</div>

			{/* Overlay */}
			<AbsoluteFill style={{
				background: 'linear-gradient(103deg, rgba(3,2,1,0.85) 0%, rgba(3,2,1,0.50) 42%, rgba(3,2,1,0.18) 62%, rgba(3,2,1,0.08) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.55) 0%, transparent 18%, transparent 72%, rgba(3,2,1,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Luce sacra pulsante (ostia) */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 60% 35%, rgba(248,244,236,${ostiaGlow * 0.12 * (1 - dissolve)}) 0%, transparent 38%)`,
				pointerEvents: 'none',
			}} />

			{/* Flash al momento dell'elevazione */}
			{flashOp > 0 && (
				<AbsoluteFill style={{backgroundColor: `rgba(248,244,236,${flashOp})`, pointerEvents: 'none'}} />
			)}

			{/* Testo "GIURANO" — emerge su layer Vangeli */}
			<div style={{
				position: 'absolute',
				top: '42%',
				left: 0, right: 0,
				display: 'flex', justifyContent: 'center',
				opacity: gProg * 0.15,
				pointerEvents: 'none',
				userSelect: 'none',
			}}>
				<span style={{
					fontFamily: playfairFont,
					fontSize: 160,
					fontWeight: 700,
					color: COLORS.rossoTradimento,
					letterSpacing: '0.08em',
					lineHeight: 1,
				}}>
					GIURANO
				</span>
			</div>

			<ParticleField opacity={0.18} />
			<ScanLines opacity={0.022} />

			{/* Cards — sinistra */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 64, flexDirection: 'column', gap: 16}}>

				<h2 style={{
					fontFamily: playfairFont,
					fontSize: 52,
					fontWeight: 700,
					color: COLORS.avorio,
					margin: '0 0 6px',
					textShadow: '0 2px 18px rgba(3,2,1,0.99)',
				}}>
					Il Giuramento
				</h2>

				<div style={{opacity: c1Op}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderLeft: `3px solid ${COLORS.oroTorcia}`,
						borderRadius: 8, padding: '13px 20px',
						backdropFilter: 'blur(18px)',
						maxWidth: 480,
					}}>
						<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroTorcia, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>Pietro Guglielmone · Il prete</p>
						<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
							Celebra la messa con <em style={{color: COLORS.oroChiaro}}>mani tremanti</em> — sa cosa sta per accadere con l'ostia consacrata
						</p>
					</div>
				</div>

				<div style={{opacity: c2Op}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorderRed}`,
						borderLeft: `3px solid ${COLORS.rossoTradimento}`,
						borderRadius: 8, padding: '13px 20px',
						backdropFilter: 'blur(18px)',
						maxWidth: 480,
					}}>
						<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.rossoTradimento, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>Il Momento Cruciale</p>
						<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
							I baroni posano le mani sui Vangeli — un giuramento sul sacro,<br />un atto irrevocabile davanti a Dio
						</p>
					</div>
				</div>

				{/* La citazione del giuramento */}
				<div style={{opacity: citaOp}}>
					<div style={{
						background: 'rgba(3,2,1,0.90)',
						border: `1px solid ${COLORS.glassBorderRed}`,
						borderLeft: `4px solid ${COLORS.rossoTradimento}`,
						borderRadius: 8, padding: '14px 22px',
						backdropFilter: 'blur(18px)',
						maxWidth: 540,
					}}>
						<p style={{fontFamily: playfairFont, fontSize: 17, fontStyle: 'italic', color: COLORS.oroTorcia, margin: 0, lineHeight: 1.6}}>
							"Con tutti i nostri beni ci impegniamo<br />a rovesciare Ferdinando d'Aragona e suo figlio Alfonso."
						</p>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
