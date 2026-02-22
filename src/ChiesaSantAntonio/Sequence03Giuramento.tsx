import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, IMAGES, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 03 — IL GIURAMENTO (460 frame · ~15s)
// Il momento sacrilego: l'ostia consacrata, le mani sui Vangeli
// IMAGES.giuramento1: prete con ostia consacrata — layer 1
// IMAGES.giuramento2: mani illuminate sui Vangeli — cross-dissolve (frame 220–300)
// Narrazione: "il sacerdote Pietro Guglielmone solleva l'ostia consacrata e, in un silenzio
//              carico di tensione, i baroni posano le mani sui Vangeli"

export const Sequence03Giuramento: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.4), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Cross-dissolve: giuramento1 → giuramento2 (frame 220–300)
	const dissolve = interpolate(
		frame,
		[220, 300],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Luce sacra dall'ostia — pulse lento prima del dissolve
	const ostiaGlow = Math.sin(frame / (fps * 0.8)) * 0.06 + 0.94;

	// Flash bianco al momento dell'elevazione dell'ostia (frame 80–92): 0→0.35→0
	const flashFrame = 80;
	const flashOp = frame >= flashFrame && frame < flashFrame + 12
		? interpolate(frame - flashFrame, [0, 4, 12], [0, 0.35, 0])
		: 0;

	// Ghost "GIURANO" grande — emerge dopo il dissolve
	const gProg = interpolate(frame, [300, 360], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Titolo sequenza
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.3 * fps)), fps, config: {damping: 160}});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [28, 0]);

	// Card Pietro Guglielmone
	const c1Spr = spring({frame: Math.max(0, frame - Math.round(0.8 * fps)), fps, config: {damping: 180}});
	const c1Op  = interpolate(c1Spr, [0, 1], [0, 1]);

	// Citazione del giuramento
	const citaSpr = spring({frame: Math.max(0, frame - Math.round(8 * fps)), fps, config: {damping: 200}});
	const citaOp  = interpolate(citaSpr, [0, 1], [0, 1]);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Prete con ostia consacrata */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
				<KenBurnsImage
					src={IMAGES.giuramento1}
					motion="zoom-in"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 28%"
				/>
			</div>

			{/* LAYER 2: Mani sui Vangeli — il giuramento */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
				<KenBurnsImage
					src={IMAGES.giuramento2}
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center center"
				/>
			</div>

			{/* Overlay bitonale */}
			<AbsoluteFill style={{
				background: 'linear-gradient(103deg, rgba(3,2,1,0.88) 0%, rgba(3,2,1,0.52) 42%, rgba(3,2,1,0.18) 62%, rgba(3,2,1,0.08) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.55) 0%, transparent 18%, transparent 72%, rgba(3,2,1,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Luce sacra pulsante dal cupolino (ostia) */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 62% 32%, rgba(248,244,236,${ostiaGlow * 0.13 * (1 - dissolve)}) 0%, transparent 38%)`,
				pointerEvents: 'none',
			}} />

			{/* Flash bianco al momento dell'elevazione */}
			{flashOp > 0 && (
				<AbsoluteFill style={{backgroundColor: `rgba(248,244,236,${flashOp})`, pointerEvents: 'none'}} />
			)}

			{/* Ghost "GIURANO" — emerge su layer Vangeli dopo il dissolve */}
			<div style={{
				position: 'absolute',
				top: '38%',
				left: 0,
				right: 0,
				display: 'flex',
				justifyContent: 'center',
				opacity: gProg * 0.08,
				pointerEvents: 'none',
				userSelect: 'none',
			}}>
				<span style={{
					fontFamily: playfairFont,
					fontSize: 140,
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

			{/* Badge sequenza — top left */}
			<div style={{
				position: 'absolute',
				top: 44,
				left: 64,
				opacity: titleOp,
			}}>
				<div style={{
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderLeft: `3px solid ${COLORS.oroTorcia}`,
					borderRadius: 4,
					padding: '7px 20px',
					backdropFilter: 'blur(14px)',
				}}>
					<span style={{
						fontFamily: latoFont,
						fontSize: 16,
						color: COLORS.oroTorcia,
						letterSpacing: '0.18em',
						textTransform: 'uppercase',
						fontWeight: 700,
					}}>
						Il Giuramento · Chiesa di Sant'Antonio
					</span>
				</div>
			</div>

			{/* Cards — colonna sinistra */}
			<AbsoluteFill style={{
				justifyContent: 'center',
				alignItems: 'flex-start',
				paddingLeft: 64,
				flexDirection: 'column',
				gap: 18,
			}}>
				<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
					<h2 style={{
						fontFamily: playfairFont,
						fontSize: 102,
						fontWeight: 700,
						color: COLORS.avorio,
						margin: '0 0 6px',
						textShadow: '0 2px 18px rgba(3,2,1,0.99)',
						lineHeight: 1.05,
					}}>
						Il Giuramento
					</h2>
				</div>

				{/* Card Pietro Guglielmone */}
				<div style={{opacity: c1Op}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderLeft: `3px solid ${COLORS.oroTorcia}`,
						borderRadius: 8,
						padding: '14px 22px',
						backdropFilter: 'blur(20px)',
						maxWidth: 520,
					}}>
						<p style={{
							fontFamily: latoFont,
							fontSize: 17,
							color: COLORS.oroTorcia,
							margin: '0 0 6px',
							letterSpacing: '0.14em',
							textTransform: 'uppercase',
						}}>
							Pietro Guglielmone · Il sacerdote
						</p>
						<p style={{
							fontFamily: playfairFont,
							fontSize: 28,
							color: COLORS.avorio,
							margin: 0,
							lineHeight: 1.45,
						}}>
							Solleva l'ostia consacrata con{' '}
							<em style={{color: COLORS.oroChiaro}}>mani tremanti</em>{' '}
							— in un silenzio carico di tensione
						</p>
					</div>
				</div>

				{/* Citazione del giuramento */}
				<div style={{opacity: citaOp}}>
					<div style={{
						background: 'rgba(3,2,1,0.90)',
						border: `1px solid ${COLORS.glassBorderRed}`,
						borderLeft: `4px solid ${COLORS.oroTorcia}`,
						borderRadius: 8,
						padding: '16px 24px',
						backdropFilter: 'blur(18px)',
						maxWidth: 580,
					}}>
						<p style={{
							fontFamily: 'Georgia, serif',
							fontSize: 26,
							fontStyle: 'italic',
							color: COLORS.oroTorcia,
							margin: 0,
							lineHeight: 1.6,
						}}>
							"…di unire le proprie forze per rovesciare<br />
							re Ferrante d'Aragona."
						</p>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
