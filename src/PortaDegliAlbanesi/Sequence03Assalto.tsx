import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence03Assalto: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Data "30 GENNAIO 1682" — rivelazione progressiva lettera per lettera
	const dataStr = '30 GENNAIO 1682';
	const dataLetters = Math.round(
		interpolate(frame, [Math.round(0.4 * fps), Math.round(2.2 * fps)], [0, dataStr.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
	);

	// Counter banditi 0→80
	const banditiProgress = interpolate(frame, [Math.round(2 * fps), Math.round(4.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const banditiVal = Math.round(banditiProgress * 80);

	// Flash dramatico all'inizio (evoca l'assalto)
	const flashOp = interpolate(frame, [0, 2], [0.6, 0], {extrapolateRight: 'clamp'});

	// Vescovo card appare dopo
	const vescovoSpr = spring({frame: Math.max(0, frame - Math.round(6 * fps)), fps, config: {damping: 150}, durationInFrames: Math.round(0.8 * fps)});
	const vescovoOp  = interpolate(vescovoSpr, [0, 1], [0, 1]);
	const vescovoY   = interpolate(vescovoSpr, [0, 1], [30, 0]);

	// Giovanni Botta appare tardi
	const bottaSpr = spring({frame: Math.max(0, frame - Math.round(11 * fps)), fps, config: {damping: 160}, durationInFrames: Math.round(0.9 * fps)});
	const bottaOp  = interpolate(bottaSpr, [0, 1], [0, 1]);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* SFONDO: mercante con mulo — interpretato qui come il capobanda/albanese che entra dalla porta */}
			<KenBurnsImage
				src="images/TAG A1.07 - PORTA DEGLI ALBANESI/download (3).png"
				motion="pan-left"
				intensity={0.055}
				overlayOpacity={0}
				objectPosition="55% 35%"
			/>

			{/* Overlay più scuro e drammatico — notte del '600 */}
			<AbsoluteFill style={{
				background: 'linear-gradient(135deg, rgba(8,6,10,0.98) 0%, rgba(20,8,8,0.92) 25%, rgba(8,6,10,0.55) 55%, rgba(8,6,10,0.12) 80%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,6,10,0.80) 0%, transparent 25%, transparent 60%, rgba(8,6,10,0.92) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Tono rosso drammatico per l'assalto */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 75% 40%, rgba(139,26,26,0.12) 0%, transparent 55%)',
				pointerEvents: 'none',
			}} />

			{/* Flash bianco all'inizio */}
			<AbsoluteFill style={{backgroundColor: `rgba(255,255,255,${flashOp})`, pointerEvents: 'none'}} />

			<ParticleField opacity={0.28} />
			<ScanLines opacity={0.022} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', padding: '0 60px', alignItems: 'center', gap: 52}}>

				{/* SINISTRA */}
				<div style={{flex: 1.2, display: 'flex', flexDirection: 'column', gap: 20}}>

					{/* Label */}
					<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
						<div style={{width: 4, height: 34, backgroundColor: COLORS.rossoBanditi, borderRadius: 2, boxShadow: `0 0 12px ${COLORS.rossoBanditi}88`}} />
						<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.rossoBanditi, letterSpacing: '0.20em', textTransform: 'uppercase'}}>La Cronaca · Evento Drammatico</span>
					</div>

					{/* Data rivelazione progressiva */}
					<p style={{
						fontFamily: playfairFont, fontSize: 44, fontWeight: 700,
						color: COLORS.oroBrillante, margin: 0, letterSpacing: '0.08em',
						textShadow: `0 0 20px ${COLORS.oroBrillante}66`,
					}}>
						{dataStr.slice(0, dataLetters)}
						<span style={{opacity: 0.25, color: COLORS.grigioCaldo}}>{'▌'.repeat(dataLetters < dataStr.length ? 1 : 0)}</span>
					</p>

					{/* Titolo assalto */}
					<h2 style={{
						fontFamily: playfairFont, fontSize: 58, fontWeight: 700,
						color: COLORS.biancaCalce, margin: 0, lineHeight: 1.0,
						textShadow: '0 2px 20px rgba(8,6,10,0.95)',
					}}>
						80 banditi
						<br /><span style={{color: COLORS.rossoBanditi, fontStyle: 'italic'}}>all'assalto del borgo</span>
					</h2>

					{/* Counter banditi */}
					{banditiProgress > 0 && (
						<div style={{
							display: 'inline-flex', alignItems: 'baseline', gap: 12,
							background: 'rgba(8,6,10,0.86)',
							border: `1px solid ${COLORS.rossoBanditi}44`,
							borderRadius: 8, padding: '12px 24px',
							backdropFilter: 'blur(16px)',
							alignSelf: 'flex-start',
						}}>
							<span style={{
								fontFamily: playfairFont, fontSize: 96, fontWeight: 700,
								color: COLORS.rossoBanditi,
								textShadow: `0 0 30px ${COLORS.rossoBanditi}88`,
								lineHeight: 1,
							}}>
								{banditiVal}
							</span>
							<div>
								<p style={{fontFamily: latoFont, fontSize: 18, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>banditi armati</p>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0}}>entrano dalla Porta degli Albanesi</p>
							</div>
						</div>
					)}
				</div>

				{/* DESTRA */}
				<div style={{flex: 0.85, display: 'flex', flexDirection: 'column', gap: 18}}>

					{/* Card vescovo */}
					<div style={{
						opacity: vescovoOp, transform: `translateY(${vescovoY}px)`,
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.oroBrillante}44`,
						borderRadius: 10, padding: '18px 22px',
						backdropFilter: 'blur(18px)',
					}}>
						<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroBrillante, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, marginBottom: 10}}>La vittima</p>
						<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
							<span style={{fontSize: 34}}>✝️</span>
							<div>
								<p style={{fontFamily: playfairFont, fontSize: 28, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>Vescovo Benedetto Bartoli</p>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, marginTop: 3}}>Sequestrato per ottenerne il riscatto</p>
							</div>
						</div>
					</div>

					{/* Card Giovanni Botta */}
					<div style={{
						opacity: bottaOp,
						transform: `translateY(${interpolate(bottaOp, [0, 1], [20, 0])}px)`,
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.rossoBanditi}55`,
						borderLeft: `4px solid ${COLORS.rossoBanditi}`,
						borderRadius: '0 10px 10px 0', padding: '16px 20px',
						backdropFilter: 'blur(18px)',
					}}>
						<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.rossoBanditi, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, marginBottom: 8}}>Il capobanda</p>
						<p style={{fontFamily: playfairFont, fontSize: 30, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>Giovanni Botta</p>
						<p style={{fontFamily: latoFont, fontSize: 17, fontWeight: 400, fontStyle: 'italic', color: COLORS.oroBrillante, margin: 0, marginTop: 4}}>"detto l'Albanese"</p>
						<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, marginTop: 6, lineHeight: 1.5}}>
							Secondo alcune fonti, fu lui a guidare
							l'incursione del 1682.
						</p>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
