import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, IMAGES, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 01 — INTRO (240 frame · ~8s)
// La notte dell'11 settembre 1486 — hook cinematografico
// IMAGES.nobili: nobili in abiti scuri con torce nella chiesa
// Flash drammatico iniziale + ghost anno 1486

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Flash drammatico di apertura (frame < 5): buio → bianco → buio
	const flashOp = interpolate(
		frame,
		[0, 2, 5],
		[0, 0.30, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Fade globale
	const fadeIn  = interpolate(frame, [0, Math.round(fps * 1.0)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.4), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Badge "Sezione A2" appare presto
	const badgeSpr = spring({frame: Math.max(0, frame - Math.round(0.4 * fps)), fps, config: {damping: 180}});
	const badgeOp  = interpolate(badgeSpr, [0, 1], [0, 1]);

	// Data "11 SETTEMBRE 1486" — appare lettera per lettera
	const dataStr = '11 SETTEMBRE 1486';
	const dataProgress = interpolate(
		frame,
		[Math.round(0.6 * fps), Math.round(3.2 * fps)],
		[0, dataStr.length],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Titolo principale
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.9 * fps)), fps, config: {damping: 140}});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [48, 0]);

	// Sottotitolo
	const subSpr = spring({frame: Math.max(0, frame - Math.round(1.8 * fps)), fps, config: {damping: 180}});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	// Ghost anno "1486" — filigrana verticale
	const ghostProg = interpolate(frame, [Math.round(1.5 * fps), Math.round(3.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Pulse del fuoco — simula il tremore delle candele
	const fuocoPulse = Math.sin(frame / (fps * 0.25)) * 0.06 + 0.94;

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* I nobili nella chiesa alla luce delle torce */}
			<KenBurnsImage
				src={IMAGES.nobili}
				motion="zoom-in"
				intensity={0.06}
				overlayOpacity={0}
				objectPosition="center 30%"
			/>

			{/* Overlay molto scuro — la notte, il segreto */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.80) 0%, rgba(3,2,1,0.42) 35%, rgba(3,2,1,0.35) 65%, rgba(3,2,1,0.92) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Vignette radiale */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(3,2,1,0.68) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Aura delle torce — calore dal centro */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 50% 42%, rgba(200,132,26,${0.18 * fuocoPulse}) 0%, transparent 55%)`,
				pointerEvents: 'none',
			}} />

			{/* Flash bianco drammatico di apertura */}
			{flashOp > 0 && (
				<AbsoluteFill style={{backgroundColor: `rgba(255,255,255,${flashOp})`, pointerEvents: 'none'}} />
			)}

			<ParticleField opacity={0.18} />
			<ScanLines opacity={0.025} />

			{/* Ghost anno "1486" — grande, ruotato, trasparente */}
			<div style={{
				position: 'absolute',
				top: '18%',
				right: 80,
				opacity: ghostProg * 0.07,
				pointerEvents: 'none',
				userSelect: 'none',
				transform: 'rotate(90deg)',
				transformOrigin: 'right center',
			}}>
				<span style={{
					fontFamily: playfairFont,
					fontSize: 200,
					fontWeight: 700,
					color: COLORS.oroTorcia,
					letterSpacing: '0.04em',
					lineHeight: 1,
				}}>
					1486
				</span>
			</div>

			{/* Badge "Sezione A2" — top left */}
			<div style={{
				position: 'absolute',
				top: 48,
				left: 64,
				opacity: badgeOp,
			}}>
				<div style={{
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderLeft: `3px solid ${COLORS.oroTorcia}`,
					borderRadius: 4,
					padding: '7px 22px',
					backdropFilter: 'blur(14px)',
				}}>
					<span style={{
						fontFamily: latoFont,
						fontSize: 16,
						color: COLORS.oroTorcia,
						letterSpacing: '0.20em',
						textTransform: 'uppercase',
						fontWeight: 700,
					}}>
						Sezione A2 · Architettura e Monumenti
					</span>
				</div>
			</div>

			{/* Data lettera per lettera — top center */}
			<div style={{
				position: 'absolute',
				top: 52,
				left: 0,
				right: 0,
				display: 'flex',
				justifyContent: 'center',
			}}>
				<div style={{
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4,
					padding: '8px 28px',
					backdropFilter: 'blur(12px)',
				}}>
					<span style={{
						fontFamily: latoFont,
						fontSize: 17,
						color: COLORS.oroTorcia,
						letterSpacing: '0.22em',
						textTransform: 'uppercase',
						fontWeight: 700,
					}}>
						{dataStr.slice(0, Math.ceil(dataProgress))}
					</span>
				</div>
			</div>

			{/* Titolo + sottotitolo — centro schermo */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 18}}>
				<div style={{
					opacity: titleOp,
					transform: `translateY(${titleY}px)`,
					textAlign: 'center',
					padding: '0 80px',
				}}>
					<h1 style={{
						fontFamily: playfairFont,
						fontSize: 102,
						fontWeight: 700,
						color: COLORS.avorio,
						margin: 0,
						lineHeight: 1.05,
						textShadow: `0 4px 32px rgba(3,2,1,0.99), 0 0 80px ${COLORS.oroTorcia}33`,
						letterSpacing: '-0.01em',
					}}>
						La Notte della Congiura
					</h1>
				</div>

				<div style={{opacity: subOp, textAlign: 'center'}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderRadius: 4,
						padding: '9px 28px',
						backdropFilter: 'blur(14px)',
					}}>
						<p style={{
							fontFamily: latoFont,
							fontSize: 28,
							fontWeight: 300,
							color: COLORS.avorio,
							margin: 0,
							letterSpacing: '0.06em',
						}}>
							11 Settembre 1486 · Chiesa di Sant'Antonio · Lacedonia
						</p>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
