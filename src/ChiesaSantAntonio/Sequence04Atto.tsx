import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, IMAGES, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 04 — L'ATTO NOTARILE (460 frame · ~15s)
// Il notaio Battista de Laquedonia redige l'atto ufficiale alla luce delle torce
// IMAGES.atto: nobili attorno al tavolo con mappe e candele — pan-left
// Narrazione: "Il notaio Battista de Laquedonia redige l'atto ufficiale che segna
//              l'inizio della Congiura dei Baroni."

export const Sequence04Atto: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.5), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Progress bar "Atto in redazione..." animata da frame 60 a frame 360 (0→100%)
	const attoProgress = interpolate(frame, [60, 360], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Candela pulse — luci sul tavolo dei nobili
	const fuocoPulse = Math.sin(frame / (fps * 0.28)) * 0.07 + 0.93;

	// Ghost "DESTINO" verticale in avorio
	const destinoProg = interpolate(frame, [Math.round(4 * fps), Math.round(7 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Titolo sequenza
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.3 * fps)), fps, config: {damping: 160}});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [28, 0]);

	// Card Battista de Laquedonia
	const c1Spr = spring({frame: Math.max(0, frame - Math.round(0.5 * fps)), fps, config: {damping: 180}});
	const c1Op  = interpolate(c1Spr, [0, 1], [0, 1]);

	// Card collegamento storico
	const c2Spr = spring({frame: Math.max(0, frame - Math.round(5 * fps)), fps, config: {damping: 180}});
	const c2Op  = interpolate(c2Spr, [0, 1], [0, 1]);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* Il conclave attorno al tavolo con mappe e candele */}
			<KenBurnsImage
				src={IMAGES.atto}
				motion="pan-left"
				intensity={0.05}
				overlayOpacity={0}
				objectPosition="center 35%"
			/>

			{/* Overlay bitonale — sinistra scura per testo */}
			<AbsoluteFill style={{
				background: 'linear-gradient(108deg, rgba(3,2,1,0.90) 0%, rgba(3,2,1,0.58) 40%, rgba(3,2,1,0.18) 65%, rgba(3,2,1,0.10) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.55) 0%, transparent 18%, transparent 72%, rgba(3,2,1,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Overlay caldo: rgba(140,80,10, 0.18) */}
			<AbsoluteFill style={{
				background: `rgba(140,80,10,${0.18 * fuocoPulse})`,
				mixBlendMode: 'overlay',
				pointerEvents: 'none',
			}} />

			{/* Aura gialla delle candele sul tavolo */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 58% 50%, rgba(200,132,26,${fuocoPulse * 0.20}) 0%, transparent 48%)`,
				pointerEvents: 'none',
			}} />

			{/* Ghost "DESTINO" verticale in avorio */}
			<div style={{
				position: 'absolute',
				bottom: 100,
				right: 72,
				opacity: destinoProg * 0.07,
				pointerEvents: 'none',
				userSelect: 'none',
				transform: 'rotate(90deg)',
				transformOrigin: 'right bottom',
			}}>
				<span style={{
					fontFamily: playfairFont,
					fontSize: 110,
					fontWeight: 700,
					color: COLORS.avorio,
					letterSpacing: '0.06em',
				}}>
					DESTINO
				</span>
			</div>

			<ParticleField opacity={0.18} />
			<ScanLines opacity={0.020} />

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
					borderLeft: `3px solid ${COLORS.oroAntico}`,
					borderRadius: 4,
					padding: '7px 20px',
					backdropFilter: 'blur(14px)',
				}}>
					<span style={{
						fontFamily: latoFont,
						fontSize: 16,
						color: COLORS.oroAntico,
						letterSpacing: '0.18em',
						textTransform: 'uppercase',
						fontWeight: 700,
					}}>
						L'Atto Notarile · Lacedonia · 11 Settembre 1486
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
						fontSize: 96,
						fontWeight: 700,
						color: COLORS.avorio,
						margin: '0 0 6px',
						textShadow: '0 2px 18px rgba(3,2,1,0.99)',
						lineHeight: 1.05,
					}}>
						L'Atto Notarile
					</h2>
				</div>

				{/* Card principale: Battista de Laquedonia */}
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
							Battista de Laquedonia · Il notaio
						</p>
						<p style={{
							fontFamily: playfairFont,
							fontSize: 28,
							color: COLORS.avorio,
							margin: 0,
							lineHeight: 1.45,
						}}>
							Redige l'atto ufficiale alla luce delle torce —<br />
							<em style={{color: COLORS.oroChiaro}}>l'inizio della Congiura dei Baroni</em>
						</p>
					</div>
				</div>

				{/* Progress bar "Atto in redazione..." (da frame 60 a frame 360) */}
				<div style={{
					opacity: c1Op,
					width: 500,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 8,
					padding: '14px 22px',
					backdropFilter: 'blur(18px)',
				}}>
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 10,
					}}>
						<span style={{
							fontFamily: latoFont,
							fontSize: 17,
							color: COLORS.oroTorcia,
							letterSpacing: '0.14em',
							textTransform: 'uppercase',
						}}>
							Atto in redazione...
						</span>
						<span style={{
							fontFamily: playfairFont,
							fontSize: 28,
							fontWeight: 700,
							color: COLORS.oroTorcia,
						}}>
							{Math.round(attoProgress)}%
						</span>
					</div>
					<div style={{height: 4, background: 'rgba(200,132,26,0.20)', borderRadius: 2}}>
						<div style={{
							height: '100%',
							width: `${attoProgress}%`,
							background: `linear-gradient(90deg, ${COLORS.oroTorcia}, ${COLORS.oroChiaro})`,
							borderRadius: 2,
						}} />
					</div>
				</div>

				{/* Card collegamento storico */}
				<div style={{opacity: c2Op}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorderRed}`,
						borderLeft: `3px solid ${COLORS.rossoTradimento}`,
						borderRadius: 8,
						padding: '13px 22px',
						backdropFilter: 'blur(18px)',
						maxWidth: 520,
					}}>
						<p style={{
							fontFamily: latoFont,
							fontSize: 17,
							color: COLORS.rossoTradimento,
							margin: '0 0 4px',
							letterSpacing: '0.14em',
							textTransform: 'uppercase',
						}}>
							Il patto di sangue
						</p>
						<p style={{
							fontFamily: playfairFont,
							fontSize: 26,
							color: COLORS.avorio,
							margin: 0,
							lineHeight: 1.45,
						}}>
							Questo patto cambierà per sempre{' '}
							<em style={{color: COLORS.oroTorcia}}>la storia del Mezzogiorno</em>
						</p>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
