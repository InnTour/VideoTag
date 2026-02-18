import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 01 — INTRO (0–8s)
// La notte del 10 settembre 1486 — hook cinematografico
// image_0312fcac: nobili in abiti scuri con torce nella chiesa
// Apertura: buio totale → rivelazione lenta

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Apertura dal nero — come il sipario che si alza
	const fadeIn  = interpolate(frame, [0, Math.round(fps * 1.2)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.4), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Data "10 SETTEMBRE 1486" — appare lettera per lettera
	const dataStr = '10 SETTEMBRE 1486';
	const dataProgress = interpolate(frame, [Math.round(0.8 * fps), Math.round(3.5 * fps)], [0, dataStr.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Titolo principale
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(1.0 * fps)), fps, config: {damping: 140}});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [50, 0]);

	// Location badge
	const locSpr = spring({frame: Math.max(0, frame - Math.round(2.0 * fps)), fps, config: {damping: 180}});
	const locOp  = interpolate(locSpr, [0, 1], [0, 1]);

	// Pulse del fuoco — simula il tremore delle candele
	const fuocoPulse = Math.sin(frame / (fps * 0.25)) * 0.06 + 0.94;

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* I nobili nella chiesa alla luce delle torce */}
			<KenBurnsImage
				src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_0312fcac-c625-4312-9ce2-3f95a674877a.png"
				motion="zoom-in"
				intensity={0.06}
				overlayOpacity={0}
				objectPosition="center 30%"
			/>

			{/* Overlay molto scuro — la notte, il segreto */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.78) 0%, rgba(3,2,1,0.42) 35%, rgba(3,2,1,0.35) 65%, rgba(3,2,1,0.90) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Vignette laterale */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(3,2,1,0.65) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Aura delle torce — calore dal centro */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 50% 42%, rgba(200,132,26,${0.18 * fuocoPulse}) 0%, transparent 55%)`,
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.18} />
			<ScanLines opacity={0.025} />

			{/* Data — rivelazione lettera per lettera */}
			<div style={{
				position: 'absolute',
				top: 50,
				left: 0, right: 0,
				display: 'flex', justifyContent: 'center',
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
						fontSize: 13,
						color: COLORS.oroTorcia,
						letterSpacing: '0.22em',
						textTransform: 'uppercase',
						fontWeight: 700,
					}}>
						{dataStr.slice(0, Math.ceil(dataProgress))}
					</span>
				</div>
			</div>

			{/* Titolo — centro schermo */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 16}}>
				<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center'}}>
					<h1 style={{
						fontFamily: playfairFont,
						fontSize: 88,
						fontWeight: 700,
						color: COLORS.avorio,
						margin: 0,
						lineHeight: 1.0,
						textShadow: `0 4px 32px rgba(3,2,1,0.99), 0 0 80px ${COLORS.oroTorcia}33`,
						letterSpacing: '-0.01em',
					}}>
						La Congiura
					</h1>
					<h2 style={{
						fontFamily: playfairFont,
						fontSize: 38,
						fontWeight: 400,
						fontStyle: 'italic',
						color: COLORS.oroTorcia,
						margin: '8px 0 0',
						textShadow: '0 2px 16px rgba(3,2,1,0.98)',
					}}>
						dei Baroni
					</h2>
				</div>

				<div style={{
					width: 0,
					height: 0,
					borderLeft: '8px solid transparent',
					borderRight: '8px solid transparent',
					borderTop: `12px solid ${COLORS.oroTorcia}`,
					opacity: locOp,
				}} />

				<div style={{opacity: locOp}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderRadius: 4,
						padding: '7px 20px',
						backdropFilter: 'blur(14px)',
						textAlign: 'center',
					}}>
						<p style={{fontFamily: latoFont, fontSize: 13, color: COLORS.grigioPietra, margin: 0, letterSpacing: '0.16em', textTransform: 'uppercase'}}>
							Chiesa di Sant'Antonio Abate · Lacedonia
						</p>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
