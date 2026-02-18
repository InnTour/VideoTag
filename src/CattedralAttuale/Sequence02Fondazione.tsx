import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 02 — FONDAZIONE (8–25s · 17 secondi)
// 1696 — vescovo Giovanni Battista La Morea
// Rovine della Chiesa di Sant'Antonio → congiura dei baroni → nuova cattedrale
// image_aa8f2c75: vescovo/nobile romano con pergamena (layer 1)
// image_ae9aa339: vescovo entra in cattedrale, fedeli inginocchiati (cross-dissolve)

export const Sequence02Fondazione: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.5)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.5), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Cross-dissolve: vescovo con pergamena → vescovo entra in cattedrale
	// Transizione a 9s locali (metà sequenza ~270 frame)
	const dissolveStart = Math.round(8.5 * fps);
	const dissolveEnd   = Math.round(10.5 * fps);
	const dissolve = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Anno 1696 — reveal lettera per lettera
	const anno = '1696';
	const annoProgress = interpolate(frame, [Math.round(0.4 * fps), Math.round(2.2 * fps)], [0, anno.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const annoVisible = anno.slice(0, Math.ceil(annoProgress));

	// Cards storiche
	const card1Spr = spring({frame: Math.max(0, frame - Math.round(1.5 * fps)), fps, config: {damping: 180}});
	const card1Op  = interpolate(card1Spr, [0, 1], [0, 1]);
	const card1Y   = interpolate(card1Spr, [0, 1], [30, 0]);

	const card2Spr = spring({frame: Math.max(0, frame - Math.round(3.5 * fps)), fps, config: {damping: 180}});
	const card2Op  = interpolate(card2Spr, [0, 1], [0, 1]);
	const card2Y   = interpolate(card2Spr, [0, 1], [30, 0]);

	const card3Spr = spring({frame: Math.max(0, frame - Math.round(5.5 * fps)), fps, config: {damping: 180}});
	const card3Op  = interpolate(card3Spr, [0, 1], [0, 1]);
	const card3Y   = interpolate(card3Spr, [0, 1], [30, 0]);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* LAYER 1: Vescovo con pergamena */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_aa8f2c75-2401-439c-8567-f1b4d9767dd5.png"
					motion="pan-left"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="65% center"
				/>
			</div>

			{/* LAYER 2: Vescovo entra in cattedrale (cross-dissolve) */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_ae9aa339-17ca-4f0b-a938-df1b255e028d.png"
					motion="zoom-in"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 30%"
				/>
			</div>

			{/* Overlay bitonale: sinistra scura per testo, destra trasparente per foto */}
			<AbsoluteFill style={{
				background: 'linear-gradient(100deg, rgba(12,9,4,0.90) 0%, rgba(12,9,4,0.62) 38%, rgba(12,9,4,0.20) 62%, rgba(12,9,4,0.10) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(12,9,4,0.65) 0%, transparent 15%, transparent 75%, rgba(12,9,4,0.88) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Overlay porpora vescovile — tono cromatico */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 75% 50%, ${COLORS.rossoPorporato}18 0%, transparent 55%)`,
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.20} />
			<ScanLines opacity={0.020} />

			{/* Anno in grandi caratteri — top right */}
			<div style={{
				position: 'absolute', top: 42, right: 68,
				fontFamily: playfairFont,
				fontSize: 120,
				fontWeight: 700,
				color: COLORS.oroSacro,
				opacity: 0.22,
				lineHeight: 1,
				letterSpacing: '-0.02em',
				textShadow: `0 0 60px ${COLORS.oroSacro}44`,
				pointerEvents: 'none',
				userSelect: 'none',
			}}>
				{annoVisible}
			</div>

			{/* Cards storiche — colonna sinistra */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 72, flexDirection: 'column', gap: 18}}>

				{/* Titolo sequenza */}
				<h2 style={{
					fontFamily: playfairFont,
					fontSize: 52,
					fontWeight: 700,
					color: COLORS.avorio,
					margin: '0 0 6px',
					lineHeight: 1.1,
					textShadow: '0 2px 18px rgba(12,9,4,0.98)',
				}}>
					La Fondazione
				</h2>

				{/* Card 1: vescovo */}
				<div style={{
					opacity: card1Op, transform: `translateY(${card1Y}px)`,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderLeft: `3px solid ${COLORS.oroSacro}`,
					borderRadius: 8,
					padding: '14px 20px',
					backdropFilter: 'blur(18px)',
					maxWidth: 460,
				}}>
					<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroSacro, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>1696 · Il Vescovo</p>
					<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
						Giovanni Battista La Morea osserva le rovine della Chiesa di Sant'Antonio — luogo della <em style={{color: COLORS.oroChiaro}}>congiura dei baroni</em>
					</p>
				</div>

				{/* Card 2: costruzione */}
				<div style={{
					opacity: card2Op, transform: `translateY(${card2Y}px)`,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorder}`,
					borderLeft: `3px solid ${COLORS.oroChiaro}`,
					borderRadius: 8,
					padding: '14px 20px',
					backdropFilter: 'blur(18px)',
					maxWidth: 460,
				}}>
					<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroChiaro, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>1696–1709 · La Costruzione</p>
					<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
						Tredici anni di lavori · il portale in <em style={{color: COLORS.oroSacro}}>marmo rosso screziato</em> che ancora oggi ammiriamo
					</p>
				</div>

				{/* Card 3: la storia precedente */}
				<div style={{
					opacity: card3Op, transform: `translateY(${card3Y}px)`,
					background: COLORS.glassScuro,
					border: `1px solid ${COLORS.glassBorderLight}`,
					borderLeft: `3px solid ${COLORS.rossoPorporato}`,
					borderRadius: 8,
					padding: '14px 20px',
					backdropFilter: 'blur(18px)',
					maxWidth: 460,
				}}>
					<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.pietraCalce, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>Strati di storia</p>
					<p style={{fontFamily: playfairFont, fontSize: 19, color: COLORS.pietraCalce, margin: 0, lineHeight: 1.4}}>
						Sulle rovine di Sant'Antonio · sul terreno della congiura · nasce il cuore spirituale della città
					</p>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
