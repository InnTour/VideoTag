import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 04 — ATTO (45–63s · 18 secondi)
// Il notaio redige l'atto alla luce delle torce — i testimoni in silenzio
// image_51f5aa45: nobili attorno al tavolo con mappe e candele (il conclave)
// Questa sequenza è il peso storico: la decisione scritta, il destino del Mezzogiorno

export const Sequence04Atto: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.5), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Tremolio penna che scrive — progress counter
	const attoProgress = interpolate(frame, [Math.round(2 * fps), Math.round(8 * fps)], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Candela pulse
	const fuocoPulse = Math.sin(frame / (fps * 0.28)) * 0.07 + 0.93;

	// Parola "DESTINO" come filigrana
	const destinoProg = interpolate(frame, [Math.round(4 * fps), Math.round(7 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const c1Spr = spring({frame: Math.max(0, frame - Math.round(0.5 * fps)), fps, config: {damping: 180}});
	const c1Op  = interpolate(c1Spr, [0, 1], [0, 1]);

	const c2Spr = spring({frame: Math.max(0, frame - Math.round(3 * fps)), fps, config: {damping: 180}});
	const c2Op  = interpolate(c2Spr, [0, 1], [0, 1]);

	const c3Spr = spring({frame: Math.max(0, frame - Math.round(6 * fps)), fps, config: {damping: 180}});
	const c3Op  = interpolate(c3Spr, [0, 1], [0, 1]);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* Il conclave attorno al tavolo con mappe */}
			<KenBurnsImage
				src="images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/image_51f5aa45-ec39-472d-a2d8-f4aa061fcf2f.png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 35%"
			/>

			{/* Overlay */}
			<AbsoluteFill style={{
				background: 'linear-gradient(108deg, rgba(3,2,1,0.88) 0%, rgba(3,2,1,0.55) 40%, rgba(3,2,1,0.18) 65%, rgba(3,2,1,0.10) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,2,1,0.55) 0%, transparent 18%, transparent 72%, rgba(3,2,1,0.92) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Aura gialla delle candele sul tavolo */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 55% 50%, rgba(200,132,26,${fuocoPulse * 0.20}) 0%, transparent 48%)`,
				pointerEvents: 'none',
			}} />

			{/* "DESTINO" ghost tipografico */}
			<div style={{
				position: 'absolute',
				bottom: 130,
				left: 0, right: 0,
				display: 'flex', justifyContent: 'flex-end',
				paddingRight: 60,
				opacity: destinoProg * 0.12,
				pointerEvents: 'none', userSelect: 'none',
			}}>
				<span style={{
					fontFamily: playfairFont,
					fontSize: 110,
					fontWeight: 700,
					color: COLORS.rossoTradimento,
					letterSpacing: '0.06em',
				}}>
					DESTINO
				</span>
			</div>

			<ParticleField opacity={0.18} />
			<ScanLines opacity={0.020} />

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
					L'Atto Notarile
				</h2>

				{/* Barra progress "atto scritto" */}
				<div style={{
					opacity: c1Op,
					width: 460,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 8, padding: '12px 20px',
					backdropFilter: 'blur(18px)',
				}}>
					<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
						<span style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroTorcia, letterSpacing: '0.14em', textTransform: 'uppercase'}}>Atto in redazione</span>
						<span style={{fontFamily: playfairFont, fontSize: 20, fontWeight: 700, color: COLORS.oroTorcia}}>{Math.round(attoProgress)}%</span>
					</div>
					<div style={{height: 4, background: 'rgba(200,132,26,0.18)', borderRadius: 2}}>
						<div style={{height: '100%', width: `${attoProgress}%`, background: `linear-gradient(90deg, ${COLORS.oroTorcia}, ${COLORS.oroChiaro})`, borderRadius: 2, transition: 'width 0.1s'}} />
					</div>
				</div>

				<div style={{opacity: c2Op}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderLeft: `3px solid ${COLORS.oroAntico}`,
						borderRadius: 8, padding: '13px 20px',
						backdropFilter: 'blur(18px)',
						maxWidth: 480,
					}}>
						<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroAntico, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>I testimoni</p>
						<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
							Osservano in silenzio — consapevoli che questo foglio potrebbe costargli la vita
						</p>
					</div>
				</div>

				<div style={{opacity: c3Op}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorderRed}`,
						borderLeft: `3px solid ${COLORS.rossoTradimento}`,
						borderRadius: 8, padding: '13px 20px',
						backdropFilter: 'blur(18px)',
						maxWidth: 480,
					}}>
						<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.rossoTradimento, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>La posta in gioco</p>
						<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
							Questo giuramento <em style={{color: COLORS.oroTorcia}}>cambierà la storia del Regno</em> — e la sorte di chi lo ha firmato
						</p>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
