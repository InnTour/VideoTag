import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

// SEQ 05 — CAMPANE / OUTRO (50–74.92s · ~25 secondi)
// Le iscrizioni romane, la sede vescovile nel Regno di Napoli, l'incenso, le campane
// image_dd305ad1: iscrizioni latine illustrate — la stratificazione della memoria (layer apertura)
// image_bda67ca2: campanile al mattino, cielo blu — circolarità bookend con Intro/Seq01
// Outro completo: logo InnTour + citazione conclusiva

export const Sequence05Campane: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, Math.round(fps * 0.6)], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - Math.round(fps * 0.9), durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Cross-dissolve: iscrizioni romane → campanile bookend
	// A ~9s locali (274 frame) transizione al campanile
	const dissolveStart = Math.round(8.5 * fps);
	const dissolveEnd   = Math.round(11 * fps);
	const dissolve = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Campana beats — 3 pulsazioni che simulano il suono delle campane
	const campanaBeats = [
		Math.round(13 * fps),
		Math.round(15.5 * fps),
		Math.round(18 * fps),
	];
	const campanaPulse = campanaBeats.reduce((acc, beat) => {
		const dist = Math.abs(frame - beat);
		if (dist < Math.round(0.7 * fps)) {
			const bp = 1 - dist / Math.round(0.7 * fps);
			return Math.max(acc, bp * 0.05);
		}
		return acc;
	}, 0);
	const scaleUniv = 1 + campanaPulse;

	// Logo e claim
	const logoSpr  = spring({frame: Math.max(0, frame - Math.round(12 * fps)), fps, config: {damping: 200}});
	const logoOp   = interpolate(logoSpr, [0, 1], [0, 1]);
	const logoScale= interpolate(logoSpr, [0, 1], [0.78, 1]);

	const subSpr = spring({frame: Math.max(0, frame - Math.round(13 * fps)), fps, config: {damping: 200}});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	// Citazione finale
	const citaSpr = spring({frame: Math.max(0, frame - Math.round(15 * fps)), fps, config: {damping: 200}});
	const citaOp  = interpolate(citaSpr, [0, 1], [0, 1]);

	// Cards informative (prima della transizione al logo)
	const card1Spr = spring({frame: Math.max(0, frame - Math.round(1 * fps)), fps, config: {damping: 180}});
	const card1Op  = interpolate(card1Spr, [0, 1], [0, 1]);

	const card2Spr = spring({frame: Math.max(0, frame - Math.round(3 * fps)), fps, config: {damping: 180}});
	const card2Op  = interpolate(card2Spr, [0, 1], [0, 1]);

	const lineW = interpolate(frame, [Math.round(12.5 * fps), Math.round(14 * fps)], [0, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Iscrizioni romane — memoria stratificata */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_dd305ad1-8cd2-4fc8-bb7e-0a7d6f853b8b.png"
					motion="pan-left"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center center"
				/>
			</div>

			{/* LAYER 2: Campanile bookend — circolarità con bda67ca2 della Seq01 */}
			<div style={{position: 'absolute', inset: 0, opacity: dissolve}}>
				<KenBurnsImage
					src="images/TAG A2.01 - CATTEDRALE ATTUALE/image_bda67ca2-c055-4112-bb41-f6a3a4f795bd.png"
					motion="zoom-out"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 30%"
				/>
			</div>

			{/* Overlay */}
			<AbsoluteFill style={{
				background: 'linear-gradient(105deg, rgba(12,9,4,0.88) 0%, rgba(12,9,4,0.55) 42%, rgba(12,9,4,0.20) 68%, rgba(12,9,4,0.30) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(12,9,4,0.60) 0%, transparent 18%, transparent 68%, rgba(12,9,4,0.95) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Overlay caldo dorato sulle iscrizioni */}
			<AbsoluteFill style={{
				background: `rgba(160,100,10,${0.12 * (1 - dissolve)})`,
				mixBlendMode: 'overlay',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.25} />
			<ScanLines opacity={0.020} />

			{/* PRIMA METÀ: informazioni sul ruolo nel Regno di Napoli + iscrizioni */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 72, flexDirection: 'column', gap: 16}}>

				{/* Titolo */}
				<h2 style={{
					fontFamily: playfairFont,
					fontSize: 46,
					fontWeight: 700,
					color: COLORS.avorio,
					margin: '0 0 8px',
					textShadow: '0 2px 16px rgba(12,9,4,0.98)',
					opacity: 1 - dissolve * 2 > 0 ? 1 - dissolve * 2 : 0,
				}}>
					La Sede Vescovile
				</h2>

				<div style={{opacity: card1Op * (1 - dissolve * 2 > 0 ? 1 - dissolve * 2 : 0)}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderLeft: `3px solid ${COLORS.oroSacro}`,
						borderRadius: 8, padding: '14px 20px',
						backdropFilter: 'blur(18px)',
						maxWidth: 500,
					}}>
						<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroSacro, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>L'importanza storica</p>
						<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
							La sede vescovile lacedoniese era riconosciuta nel <em style={{color: COLORS.oroChiaro}}>Regno di Napoli</em> — da 1 navata alle attuali 3, crescendo con la sua autorità
						</p>
					</div>
				</div>

				<div style={{opacity: card2Op * (1 - dissolve * 2 > 0 ? 1 - dissolve * 2 : 0)}}>
					<div style={{
						background: COLORS.glassScuro,
						border: `1px solid ${COLORS.glassBorder}`,
						borderLeft: `3px solid ${COLORS.azzurroCielo}`,
						borderRadius: 8, padding: '14px 20px',
						backdropFilter: 'blur(18px)',
						maxWidth: 500,
					}}>
						<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.azzurroCielo, margin: '0 0 4px', letterSpacing: '0.14em', textTransform: 'uppercase'}}>Le iscrizioni romane</p>
						<p style={{fontFamily: playfairFont, fontSize: 20, color: COLORS.avorio, margin: 0, lineHeight: 1.4}}>
							Frammenti epigrafici romani reimpiegati nelle mura — strati di tempo sovrapposti, <em style={{color: COLORS.oroSacro}}>Roma sotto il sacro medievale</em>
						</p>
					</div>
				</div>
			</AbsoluteFill>

			{/* SECONDO FASE: logo e claim (dopo la transizione al campanile) */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 14}}>
				<div style={{transform: `scale(${scaleUniv})`}}>
					<div style={{opacity: logoOp, transform: `scale(${logoScale})`}}>
						<div style={{
							background: 'rgba(12,9,4,0.90)',
							border: `1.5px solid ${COLORS.glassBorder}`,
							borderRadius: 10, padding: '10px 36px',
							backdropFilter: 'blur(20px)',
							display: 'flex', alignItems: 'center', justifyContent: 'center',
						}}>
							<Img src={staticFile('Logo facicon.png')} style={{height: 54, width: 'auto', objectFit: 'contain'}} />
						</div>
					</div>
				</div>

				<p style={{
					fontFamily: playfairFont, fontSize: 24, fontWeight: 700,
					color: COLORS.avorio, margin: 0, letterSpacing: '0.04em',
					opacity: subOp, textAlign: 'center',
					textShadow: '0 2px 12px rgba(12,9,4,0.9)',
				}}>
					Comune di Lacedonia
				</p>
				<p style={{
					fontFamily: latoFont, fontSize: 13, fontWeight: 300,
					color: COLORS.oroSacro, margin: 0, letterSpacing: '0.16em',
					textTransform: 'uppercase', opacity: subOp,
				}}>
					Cicerone Digitale · Virtual Tour
				</p>

				{/* Linea oro */}
				<div style={{
					width: lineW, height: 1,
					background: `linear-gradient(90deg, transparent, ${COLORS.oroSacro}, transparent)`,
					boxShadow: `0 0 10px ${COLORS.oroSacro}55`,
				}} />

				{/* Citazione conclusiva */}
				<p style={{
					fontFamily: playfairFont, fontSize: 17, fontStyle: 'italic',
					color: COLORS.oroSacro, margin: 0, opacity: citaOp * 0.82,
					textAlign: 'center', maxWidth: 680,
					textShadow: '0 1px 8px rgba(12,9,4,0.9)',
					lineHeight: 1.55,
				}}>
					"…il suono delle campane che, da secoli,<br />annunciano fede e speranza a generazioni di lacedonesi."
				</p>

				<div style={{
					display: 'flex', alignItems: 'center', gap: 8,
					opacity: subOp * 0.72,
					background: 'rgba(12,9,4,0.82)',
					border: `1px solid ${COLORS.glassBorderLight}`,
					borderRadius: 4, padding: '5px 18px',
					backdropFilter: 'blur(12px)',
				}}>
					<div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.oroSacro, boxShadow: `0 0 7px ${COLORS.oroSacro}`}} />
					<span style={{fontFamily: latoFont, fontSize: 11, color: COLORS.oroSacro, letterSpacing: '0.14em'}}>
						A2.01 · Cattedrale Attuale · Architettura e Monumenti
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
