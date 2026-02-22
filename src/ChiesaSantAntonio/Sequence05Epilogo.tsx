import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, IMAGES, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 05 — EPILOGO + OUTRO (820 frame · ~27s)
// Prima metà (~400f): Il borgo ignaro · IMAGES.epilogo zoom-out · card + ghost "SANGUE"
// Seconda metà (~420f): iris SVG che si chiude · loghi InnTour + Comune · label A2.03
// IMAGES.epilogo: portale medievale di notte con figure incappucciate
// Narrazione finale: "…un patto di sangue che cambierà per sempre la storia del Mezzogiorno."

// Iris SVG mask — cerchio che si restringe, rivelando il nero attorno all'immagine
// mask-id="iris-mask-csa" (unico per questa clip)
const IRIS_SPLIT = 400; // frame locale in cui inizia l'iris
const IRIS_DUR   = 120; // durata chiusura iris (frame)

export const Sequence05Epilogo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// --- FASE 1: EPILOGO (0–400f) ---

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.5)], [0, 1], {extrapolateRight: 'clamp'});
	const opacity = Math.min(fadeIn, 1);

	// Candela pulse — la notte fuori dalla chiesa
	const fuocoPulse = Math.sin(frame / (fps * 0.3)) * 0.07 + 0.93;

	// Testo "Il Borgo Ignaro" — fade-up all'inizio
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.4 * fps)), fps, config: {damping: 160}});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [30, 0]);

	// Card principale — appare presto
	const cardSpr = spring({frame: Math.max(0, frame - Math.round(1.2 * fps)), fps, config: {damping: 180}});
	const cardOp  = interpolate(cardSpr, [0, 1], [0, 1]);

	// Ghost "SANGUE" — filigrana rosso scuro
	const sangProg = interpolate(frame, [Math.round(3 * fps), Math.round(6 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Fade-out del contenuto di testo prima dell'iris
	const textFadeOut = interpolate(frame, [IRIS_SPLIT - 30, IRIS_SPLIT], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// --- FASE 2: IRIS + OUTRO (400–820f) ---

	// Iris: cerchio che si restringe da pieno schermo a raggio 0
	const irisProgress = interpolate(
		frame,
		[IRIS_SPLIT, IRIS_SPLIT + IRIS_DUR],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	// Raggio iris: parte da 960 (metà diagonale 1920×1080) → 0
	const irisRadius = interpolate(irisProgress, [0, 1], [960, 0]);

	// Overlay scuro crescente sulla foto durante l'iris
	const darkOverlay = interpolate(frame, [IRIS_SPLIT, IRIS_SPLIT + IRIS_DUR + 20], [0, 0.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Loghi e claim — appaiono dopo la chiusura dell'iris
	const logoDelay = IRIS_SPLIT + IRIS_DUR + 10;

	const logoSpr   = spring({frame: Math.max(0, frame - logoDelay), fps, config: {damping: 200}});
	const logoOp    = interpolate(logoSpr, [0, 1], [0, 1]);
	const logoScale = interpolate(logoSpr, [0, 1], [0.80, 1]);

	const subSpr = spring({frame: Math.max(0, frame - (logoDelay + 15)), fps, config: {damping: 200}});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	const citaSpr = spring({frame: Math.max(0, frame - (logoDelay + 30)), fps, config: {damping: 200}});
	const citaOp  = interpolate(citaSpr, [0, 1], [0, 1]);

	const labelSpr = spring({frame: Math.max(0, frame - (logoDelay + 50)), fps, config: {damping: 200}});
	const labelOp  = interpolate(labelSpr, [0, 1], [0, 1]);

	// Linea oro animata
	const lineW = interpolate(
		frame,
		[logoDelay + 35, logoDelay + 70],
		[0, 300],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Fade out globale finale
	const globalFadeOut = interpolate(
		frame,
		[durationInFrames - Math.round(fps * 0.8), durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp'},
	);

	return (
		<AbsoluteFill style={{opacity: opacity * globalFadeOut, backgroundColor: COLORS.bgNero}}>
			{/* Portale medievale di notte — zoom-out progressivo */}
			<KenBurnsImage
				src={IMAGES.epilogo}
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 40%"
			/>

			{/* Overlay molto scuro — la notte profonda */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.82) 0%, transparent 20%, transparent 65%, rgba(3,2,1,0.96) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 48%, rgba(3,2,1,0.65) 0%, rgba(3,2,1,0.38) 45%, rgba(3,2,1,0.18) 70%)',
				pointerEvents: 'none',
			}} />

			{/* Aura delle luci nel portale — tremore delle torce */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 50% 55%, rgba(200,132,26,${fuocoPulse * 0.18}) 0%, transparent 38%)`,
				pointerEvents: 'none',
			}} />

			{/* Overlay scuro crescente durante l'iris */}
			{darkOverlay > 0 && (
				<AbsoluteFill style={{
					backgroundColor: `rgba(3,2,1,${darkOverlay})`,
					pointerEvents: 'none',
				}} />
			)}

			{/* === SVG IRIS MASK === */}
			{irisProgress > 0 && irisProgress < 1 && (
				<svg
					width={1920}
					height={1080}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						pointerEvents: 'none',
					}}
				>
					<defs>
						<mask id="iris-mask-csa">
							{/* Bianco = visibile, nero = mascherato */}
							<rect x={0} y={0} width={1920} height={1080} fill="white" />
							<circle cx={960} cy={540} r={Math.max(0, irisRadius)} fill="black" />
						</mask>
					</defs>
					{/* Rettangolo nero che copre tutto tranne il cerchio (iris che si chiude) */}
					<rect
						x={0} y={0}
						width={1920} height={1080}
						fill="black"
						mask="url(#iris-mask-csa)"
					/>
				</svg>
			)}

			<ParticleField opacity={0.22} />
			<ScanLines opacity={0.025} />

			{/* ===== FASE 1: CONTENUTO EPILOGO (visibile solo prima dell'iris) ===== */}
			<div style={{
				position: 'absolute',
				inset: 0,
				opacity: textFadeOut,
				pointerEvents: 'none',
			}}>
				{/* Badge top */}
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
							Epilogo · Lacedonia · Notte dell'11 Settembre 1486
						</span>
					</div>
				</div>

				{/* Ghost "SANGUE" — filigrana rosso scuro centrata */}
				<div style={{
					position: 'absolute',
					top: '35%',
					left: 0,
					right: 0,
					display: 'flex',
					justifyContent: 'center',
					opacity: sangProg * 0.06,
					userSelect: 'none',
				}}>
					<span style={{
						fontFamily: playfairFont,
						fontSize: 120,
						fontWeight: 700,
						color: COLORS.rossoTradimento,
						letterSpacing: '0.06em',
					}}>
						SANGUE
					</span>
				</div>

				{/* Titolo + card — basso schermo */}
				<div style={{
					position: 'absolute',
					bottom: 120,
					left: 64,
					right: 64,
					display: 'flex',
					flexDirection: 'column',
					gap: 16,
				}}>
					<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
						<h2 style={{
							fontFamily: playfairFont,
							fontSize: 102,
							fontWeight: 700,
							color: COLORS.avorio,
							margin: 0,
							lineHeight: 1.05,
							textShadow: '0 2px 18px rgba(3,2,1,0.99)',
						}}>
							Il Borgo Ignaro
						</h2>
					</div>

					<div style={{opacity: cardOp}}>
						<div style={{
							background: 'rgba(3,2,1,0.88)',
							border: `1px solid ${COLORS.glassBorderRed}`,
							borderLeft: `4px solid ${COLORS.rossoTradimento}`,
							borderRadius: 8,
							padding: '16px 24px',
							backdropFilter: 'blur(20px)',
							maxWidth: 900,
						}}>
							<p style={{
								fontFamily: playfairFont,
								fontSize: 28,
								color: COLORS.avorio,
								margin: 0,
								lineHeight: 1.55,
							}}>
								Mentre il borgo dorme ignaro, tra queste mura si compie{' '}
								<em style={{color: COLORS.oroTorcia}}>un patto di sangue</em>{' '}
								che cambierà per sempre la storia del Mezzogiorno.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* ===== FASE 2: OUTRO CON LOGHI (visibile dopo l'iris) ===== */}
			<AbsoluteFill style={{
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 14,
				opacity: irisProgress >= 1 ? 1 : 0,
			}}>
				{/* Logo InnTour */}
				<div style={{
					opacity: logoOp,
					transform: `scale(${logoScale})`,
				}}>
					<div style={{
						background: 'rgba(3,2,1,0.92)',
						border: `1.5px solid ${COLORS.glassBorder}`,
						borderRadius: 10,
						padding: '12px 40px',
						backdropFilter: 'blur(20px)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<Img
							src={staticFile(IMAGES.logoInnTour)}
							style={{height: 60, width: 'auto', objectFit: 'contain'}}
						/>
					</div>
				</div>

				{/* Logo Comune di Lacedonia */}
				<div style={{
					opacity: logoOp,
					transform: `scale(${logoScale})`,
					marginTop: 4,
				}}>
					<div style={{
						background: 'rgba(6,6,14,0.75)',
						border: `1px solid ${COLORS.oroTorcia}44`,
						borderRadius: 8,
						padding: '10px 34px',
						backdropFilter: 'blur(16px)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<Img
							src={staticFile(IMAGES.logoComune)}
							style={{height: 48, width: 'auto', objectFit: 'contain'}}
						/>
					</div>
				</div>

				<p style={{
					fontFamily: playfairFont,
					fontSize: 30,
					fontWeight: 700,
					color: COLORS.avorio,
					margin: 0,
					opacity: subOp,
					textAlign: 'center',
					textShadow: '0 2px 12px rgba(3,2,1,0.95)',
				}}>
					Comune di Lacedonia
				</p>

				<p style={{
					fontFamily: latoFont,
					fontSize: 17,
					fontWeight: 300,
					color: COLORS.oroTorcia,
					margin: 0,
					letterSpacing: '0.16em',
					textTransform: 'uppercase',
					opacity: subOp,
				}}>
					Cicerone Digitale · Virtual Tour
				</p>

				{/* Linea oro animata */}
				<div style={{
					width: lineW,
					height: 1,
					background: `linear-gradient(90deg, transparent, ${COLORS.oroTorcia}, transparent)`,
					boxShadow: `0 0 10px ${COLORS.oroTorcia}55`,
				}} />

				{/* Citazione chiusura */}
				<p style={{
					fontFamily: playfairFont,
					fontSize: 22,
					fontStyle: 'italic',
					color: COLORS.oroTorcia,
					margin: 0,
					opacity: citaOp * 0.80,
					textAlign: 'center',
					maxWidth: 760,
					lineHeight: 1.6,
				}}>
					"Mentre il borgo dorme ignaro, si decide il futuro del Mezzogiorno."
				</p>

				{/* Label identificativa */}
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					opacity: labelOp * 0.75,
					background: 'rgba(3,2,1,0.82)',
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4,
					padding: '6px 20px',
					backdropFilter: 'blur(12px)',
				}}>
					<div style={{
						width: 6,
						height: 6,
						borderRadius: '50%',
						backgroundColor: COLORS.oroTorcia,
						boxShadow: `0 0 7px ${COLORS.oroTorcia}`,
					}} />
					<span style={{
						fontFamily: latoFont,
						fontSize: 16,
						color: COLORS.oroTorcia,
						letterSpacing: '0.14em',
					}}>
						A2.03 · Chiesa di Sant'Antonio · Architettura e Monumenti
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
