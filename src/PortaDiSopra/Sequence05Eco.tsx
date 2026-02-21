import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence05Eco: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.6], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.8, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Layer fantasma della porta gotica — circolarità con Seq01
	const fantasmaOp = interpolate(frame, [Math.round(1 * fps), Math.round(3.5 * fps)], [0, 0.28], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Titolo della sequenza
	const titleSpr = spring({frame, fps, config: {damping: 180}, durationInFrames: Math.round(0.8 * fps)});
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);
	const titleY   = interpolate(titleSpr, [0, 1], [35, 0]);

	// "ECO" — parola che emerge lentamente, quasi un fantasma
	const ecoProgress = interpolate(frame, [Math.round(1.5 * fps), Math.round(4 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Pulse lento — come il battito di una campana
	const campanaBeats = [
		Math.round(3.5 * fps),
		Math.round(5.0 * fps),
		Math.round(6.5 * fps),
	];
	const campanaPulse = campanaBeats.reduce((acc, beat) => {
		const dist = Math.abs(frame - beat);
		if (dist < Math.round(0.8 * fps)) {
			const beatProgress = 1 - dist / Math.round(0.8 * fps);
			return Math.max(acc, beatProgress * 0.06);
		}
		return acc;
	}, 0);
	const scaleUniversale = 1 + campanaPulse;

	// Logo e claim finale
	const logoSpr   = spring({frame: Math.max(0, frame - Math.round(2 * fps)), fps, config: {damping: 200}, durationInFrames: Math.round(0.7 * fps)});
	const logoScale = interpolate(logoSpr, [0, 1], [0.75, 1]);
	const logoOp    = interpolate(logoSpr, [0, 1], [0, 1]);

	const subSpr = spring({frame: Math.max(0, frame - Math.round(2.8 * fps)), fps, config: {damping: 200}, durationInFrames: Math.round(0.6 * fps)});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	const lineW = interpolate(frame, [Math.round(2.6 * fps), Math.round(3.8 * fps)], [0, 280], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Citazione "ascoltate" — appare dopo l'eco
	const citazioneOp = interpolate(frame, [Math.round(4.5 * fps), Math.round(6 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* LAYER 1: Pittura — famiglia inginocchiata sotto arco di luce (sacralità perduta) */}
			<KenBurnsImage
				src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_d39c6922-9224-4436-81ae-84779e7ddbcd.png"
				motion="zoom-out"
				intensity={0.04}
				overlayOpacity={0}
				objectPosition="center 38%"
			/>

			{/* LAYER 2 (fantasma): Portale gotico ornato — circolarità bookend con Seq01 */}
			<div style={{position: 'absolute', inset: 0, opacity: fantasmaOp, mixBlendMode: 'screen'}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_23e4c71c.png"
					motion="zoom-in"
					intensity={0.03}
					overlayOpacity={0}
					objectPosition="center 35%"
				/>
			</div>

			{/* Overlay: molto scuro al centro per far emergere i loghi, trasparente sui bordi */}
			<AbsoluteFill style={{
				background: 'radial-gradient(ellipse at 50% 48%, rgba(3,3,3,0.82) 0%, rgba(3,3,3,0.55) 50%, rgba(3,3,3,0.20) 80%)',
				pointerEvents: 'none',
			}} />
			{/* Overlay top-bottom vignette */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(3,3,3,0.85) 0%, transparent 20%, transparent 70%, rgba(3,3,3,0.95) 100%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.22} />
			<ScanLines opacity={0.025} />

			{/* Layout centrato — signature dell'intero video */}
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 14}}>

				{/* Parola ECO — grande, quasi un fantasma tipografico */}
				<div style={{
					transform: `scale(${scaleUniversale})`,
					transition: 'transform 0.05s ease-out',
				}}>
					<h1 style={{
						fontFamily: playfairFont,
						fontSize: 148,
						fontWeight: 700,
						color: COLORS.oroMemoria,
						margin: 0,
						lineHeight: 0.85,
						opacity: ecoProgress * 0.35,
						letterSpacing: '0.12em',
						textAlign: 'center',
						textShadow: `0 0 80px ${COLORS.oroMemoria}${Math.round(ecoProgress * 80).toString(16).padStart(2, '0')}, 0 4px 40px rgba(3,3,3,0.9)`,
					}}>
						ECO
					</h1>
				</div>

				{/* Titolo: "Un Varco Nell'Eterno" */}
				<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center'}}>
					<h2 style={{
						fontFamily: playfairFont,
						fontSize: 54,
						fontWeight: 700,
						color: COLORS.biancaCalce,
						margin: 0,
						lineHeight: 1.1,
						textShadow: '0 2px 20px rgba(3,3,3,0.98)',
						letterSpacing: '-0.01em',
					}}>
						Un varco nell'eterno
					</h2>
					<p style={{
						fontFamily: latoFont,
						fontSize: 18,
						fontWeight: 300,
						color: COLORS.grigio60,
						margin: '6px 0 0',
						letterSpacing: '0.14em',
						textTransform: 'uppercase',
					}}>
						Porta di Sopra · del Messere · Demolita 1851
					</p>
				</div>

				{/* Linea neon dorata */}
				<div style={{
					width: lineW,
					height: 1,
					background: `linear-gradient(90deg, transparent, ${COLORS.oroMemoria}, transparent)`,
					boxShadow: `0 0 10px ${COLORS.oroMemoria}55`,
				}} />

				{/* Logo InnTour */}
				<div style={{opacity: logoOp, transform: `scale(${logoScale})`}}>
					<div style={{
						background: 'rgba(3,3,3,0.88)',
						border: `1.5px solid ${COLORS.oroMemoria}44`,
						borderRadius: 10,
						padding: '10px 34px',
						backdropFilter: 'blur(20px)',
						display: 'flex', alignItems: 'center', justifyContent: 'center',
					}}>
						<Img
							src={staticFile('logo-inntour.png')}
							style={{height: 52, width: 'auto', objectFit: 'contain'}}
						/>
					</div>
				</div>
				{/* Logo Comune di Lacedonia */}
				<div style={{opacity: logoOp, transform: `scale(${logoScale})`, marginTop: 4}}>
					<div style={{
						border: `1px solid ${COLORS.oroIrpino || COLORS.oroSacro || '#D4A843'}44`,
						borderRadius: 8,
						padding: '10px 32px',
						background: 'rgba(6,6,14,0.72)',
						backdropFilter: 'blur(16px)',
						display: 'flex', alignItems: 'center', justifyContent: 'center',
					}}>
						<Img src={staticFile('lacedonia-logo.png')} style={{height: 48, width: 'auto', objectFit: 'contain'}} />
					</div>
				</div>

				<p style={{
					fontFamily: playfairFont,
					fontSize: 27,
					fontWeight: 400,
					color: COLORS.biancaCalce,
					margin: 0,
					letterSpacing: '0.06em',
					opacity: subOp,
					textAlign: 'center',
					textShadow: '0 2px 10px rgba(3,3,3,0.85)',
				}}>
					Comune di Lacedonia
				</p>
				<p style={{
					fontFamily: latoFont,
					fontSize: 16,
					fontWeight: 300,
					color: COLORS.grigio60,
					margin: 0,
					letterSpacing: '0.14em',
					textTransform: 'uppercase',
					opacity: subOp,
				}}>
					Cicerone Digitale · Virtual Tour
				</p>

				<div style={{width: 1, height: 22, backgroundColor: COLORS.glassBorder, opacity: subOp}} />

				{/* Tag identificativo */}
				<div style={{
					display: 'flex', alignItems: 'center', gap: 8,
					opacity: subOp * 0.75,
					background: 'rgba(3,3,3,0.82)',
					border: `1px solid ${COLORS.glassBorder}`,
					borderRadius: 4,
					padding: '5px 18px',
					backdropFilter: 'blur(12px)',
				}}>
					<div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.oroMemoria, boxShadow: `0 0 7px ${COLORS.oroMemoria}`}} />
					<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigio60, letterSpacing: '0.14em'}}>
						A1.10 · Porta di Sopra (Demolita) · Architettura e Monumenti
					</span>
				</div>
			</AbsoluteFill>

			{/* Citazione fluttuante in basso — appare per ultima */}
			<div style={{
				position: 'absolute',
				bottom: 52,
				left: 0,
				right: 0,
				display: 'flex',
				justifyContent: 'center',
				opacity: citazioneOp,
				pointerEvents: 'none',
			}}>
				<p style={{
					fontFamily: playfairFont,
					fontSize: 19,
					fontStyle: 'italic',
					fontWeight: 400,
					color: COLORS.oroMemoria,
					margin: 0,
					letterSpacing: '0.04em',
					textAlign: 'center',
					textShadow: '0 1px 8px rgba(3,3,3,0.9)',
					maxWidth: 700,
					opacity: 0.75,
				}}>
					"…se ascoltate attentamente, tra questi vicoli risuona ancora l'eco dei passi solenni
					<br />e il suono delle campane che scandivano ogni passaggio."
				</p>
			</div>
		</AbsoluteFill>
	);
};
