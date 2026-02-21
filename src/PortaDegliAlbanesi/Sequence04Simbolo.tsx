import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence04Simbolo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpr = spring({frame, fps, config: {damping: 140}, durationInFrames: Math.round(0.9 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [55, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Parola "ACCOGLIENZA" che si illumina
	const parolaProgress = interpolate(frame, [Math.round(3 * fps), Math.round(5.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Cross-dissolve: porta al tramonto → figura che apre la porta verso la luce
	const crossProgress = interpolate(frame, [Math.round(10 * fps), Math.round(14 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Cards "incontro tra culture" appaiono in sequenza
	const card1Op = interpolate(frame, [Math.round(1.5 * fps), Math.round(3 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const card2Op = interpolate(frame, [Math.round(3 * fps), Math.round(4.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const card3Op = interpolate(frame, [Math.round(5 * fps), Math.round(6.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* LAYER 1: Porta al tramonto sui colli irpini — la soglia aperta sul mondo */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.07 - PORTA DEGLI ALBANESI/image_95f44ccd-d9e4-47a0-a226-186997220275.png"
					motion="zoom-in"
					intensity={0.06}
					overlayOpacity={0}
					objectPosition="center 45%"
				/>
			</div>

			{/* LAYER 2: Figura che apre la porta verso la luce — climax emotivo */}
			<div style={{position: 'absolute', inset: 0, opacity: crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.07 - PORTA DEGLI ALBANESI/image_d30e338b-ff02-4a95-94c2-7d5b8bdbf3fc.png"
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 40%"
				/>
			</div>

			{/* Overlay luminoso — tramonto / luce che filtra */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(8,6,10,0.97) 0%, rgba(8,6,10,0.84) 30%, rgba(8,6,10,0.35) 56%, rgba(8,6,10,0.08) 78%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,6,10,0.60) 0%, transparent 22%, transparent 62%, rgba(8,6,10,0.88) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Luce dorata che filtra dalla porta */}
			<AbsoluteFill style={{
				background: `radial-gradient(ellipse at 70% 45%, rgba(200,168,75,0.10) 0%, transparent 50%)`,
				pointerEvents: 'none',
				opacity: crossProgress,
			}} />

			<ParticleField opacity={0.35} />
			<ScanLines opacity={0.018} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 56}}>

				{/* SINISTRA */}
				<div style={{flex: 1.2, display: 'flex', flexDirection: 'column', gap: 18}}>

					<div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: titleOp}}>
						<div style={{width: 22, height: 2, background: `linear-gradient(90deg, ${COLORS.oroBrillante}, transparent)`}} />
						<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroBrillante, letterSpacing: '0.20em', textTransform: 'uppercase'}}>Oggi · Il Significato</span>
					</div>

					<h2 style={{
						fontFamily: playfairFont, fontSize: 56, fontWeight: 700,
						color: COLORS.biancaCalce, margin: 0, lineHeight: 1.0,
						opacity: titleOp, transform: `translateY(${titleY}px)`,
						textShadow: '0 2px 18px rgba(8,6,10,0.95)',
					}}>
						Simbolo dell'incontro
						<br /><span style={{color: COLORS.oroBrillante}}>tra culture</span>
					</h2>

					{/* Parola ACCOGLIENZA */}
					<h1 style={{
						fontFamily: playfairFont, fontSize: 86, fontWeight: 700,
						color: COLORS.verdeInnTour, margin: 0, lineHeight: 0.9,
						opacity: parolaProgress,
						transform: `translateY(${interpolate(parolaProgress, [0, 1], [40, 0])}px)`,
						textShadow: `0 0 50px ${COLORS.verdeInnTour}${Math.round(parolaProgress * 170).toString(16).padStart(2, '0')}, 0 2px 20px rgba(8,6,10,0.8)`,
					}}>
						ACCOGLIENZA
					</h1>

					{/* Claim finale */}
					<p style={{
						fontFamily: latoFont, fontSize: 22, fontWeight: 300,
						color: COLORS.biancaCalce, margin: 0,
						lineHeight: 1.7, opacity: parolaProgress,
						maxWidth: 440,
						textShadow: '0 1px 10px rgba(8,6,10,0.8)',
					}}>
						Lacedonia ha sempre saputo accogliere
						<br />nuovi popoli, trasformando l'incontro
						<br />in identità condivisa.
					</p>
				</div>

				{/* DESTRA: Tre pillole dell'eredità */}
				<div style={{flex: 0.8, display: 'flex', flexDirection: 'column', gap: 16}}>
					<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.grigioCaldo, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, marginBottom: 4, opacity: card1Op}}>
						L'eredità di questa porta
					</p>

					{[
						{icon: '🗺️', titolo: 'Crocevia di popoli', testo: 'Albanesi, Sanniti, Normanni — tutti hanno attraversato questa soglia', op: card1Op, accent: COLORS.oroBrillante},
						{icon: '🏛️', titolo: 'Memoria viva', testo: 'Il nome "Albanesi" risuona ancora oggi nel tessuto del borgo', op: card2Op, accent: COLORS.azureInnTour},
						{icon: '🚪', titolo: 'Soglia aperta', testo: 'Non solo varco fisico, ma simbolo di apertura culturale nei secoli', op: card3Op, accent: COLORS.verdeInnTour},
					].map(({icon, titolo, testo, op, accent}) => (
						<div key={titolo} style={{
							opacity: op,
							transform: `translateX(${interpolate(op, [0, 1], [30, 0])}px)`,
							background: COLORS.glassScuro,
							border: `1px solid ${accent}44`,
							borderLeft: `4px solid ${accent}`,
							borderRadius: '0 8px 8px 0',
							padding: '12px 18px',
							display: 'flex', alignItems: 'flex-start', gap: 14,
							backdropFilter: 'blur(16px)',
						}}>
							<span style={{fontSize: 27, flexShrink: 0}}>{icon}</span>
							<div>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: accent, margin: 0, marginBottom: 3}}>{titolo}</p>
								<p style={{fontFamily: latoFont, fontSize: 16, fontWeight: 300, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.5}}>{testo}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};
