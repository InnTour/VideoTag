import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence03Marcia: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpr = spring({frame, fps, config: {damping: 130}, durationInFrames: Math.round(0.8 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [60, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Counter 400 contadini
	const counterProgress = interpolate(frame, [Math.round(1.5 * fps), Math.round(4 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const counterVal = Math.round(counterProgress * 400);

	// Quote "Bandiera Rossa" appare tardi
	const quoteSpr = spring({frame: Math.max(0, frame - Math.round(8 * fps)), fps, config: {damping: 180}, durationInFrames: Math.round(1 * fps)});
	const quoteOp  = interpolate(quoteSpr, [0, 1], [0, 1]);

	// Cross-dissolve tra la folla "Pane e Lavoro" → la marcia con bandiere rosse
	const crossProgress = interpolate(frame, [Math.round(9 * fps), Math.round(12 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Mese "MARZO 1950" che si svela lettera per lettera
	const annoStr = 'MARZO  1950';
	const annoLetters = Math.round(interpolate(frame, [Math.round(0.8 * fps), Math.round(2.2 * fps)], [0, annoStr.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* LAYER 1: Folla "Pane e Lavoro" nella piazzetta */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.06 - PIAZZETTA PRIMO MAGGIO/image_0587f294-69e4-4a84-8e09-527e00877d7d.png"
					motion="zoom-in"
					intensity={0.07}
					overlayOpacity={0}
					objectPosition="center 20%"
				/>
			</div>

			{/* LAYER 2: Colonna con bandiere rosse — la marcia verso Chiancarelle */}
			<div style={{position: 'absolute', inset: 0, opacity: crossProgress}}>
				<KenBurnsImage
					src="images/TAG A1.06 - PIAZZETTA PRIMO MAGGIO/image_9db3a61d-54a2-4157-b796-cfac145351dd.png"
					motion="pan-left"
					intensity={0.06}
					overlayOpacity={0}
					objectPosition="center 30%"
				/>
			</div>

			{/* Overlay scenografico: gradiente caldo rossastro (evoca la lotta) */}
			<AbsoluteFill style={{
				background: 'linear-gradient(135deg, rgba(6,6,14,0.97) 0%, rgba(20,6,6,0.88) 30%, rgba(6,6,14,0.40) 60%, rgba(6,6,14,0.05) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(6,6,14,0.75) 0%, transparent 22%, transparent 60%, rgba(6,6,14,0.88) 100%)',
				pointerEvents: 'none',
			}} />

			{/* Particelle rosse/oro — evocano la marcia */}
			<ParticleField opacity={0.35} />
			<ScanLines opacity={0.025} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', padding: '0 60px', alignItems: 'center', gap: 56}}>
				{/* COLONNA SINISTRA */}
				<div style={{flex: 1.2, display: 'flex', flexDirection: 'column', gap: 22}}>

					{/* Data — rivelazione progressiva */}
					<div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: titleOp}}>
						<div style={{width: 4, height: 36, backgroundColor: COLORS.rossoBandiera, borderRadius: 2, boxShadow: `0 0 12px ${COLORS.rossoBandiera}88`}} />
						<p style={{
							fontFamily: playfairFont, fontSize: 28, fontWeight: 700,
							color: COLORS.oroIrpino, margin: 0,
							letterSpacing: '0.12em',
							textShadow: `0 0 20px ${COLORS.oroIrpino}66`,
						}}>
							{annoStr.slice(0, annoLetters)}
							<span style={{opacity: 0.3}}>{'_'.repeat(Math.max(0, annoStr.length - annoLetters))}</span>
						</p>
					</div>

					{/* Titolo */}
					<h2 style={{
						fontFamily: playfairFont, fontSize: 64, fontWeight: 700,
						color: COLORS.biancaCalce, margin: 0, lineHeight: 1.0,
						opacity: titleOp, transform: `translateY(${titleY}px)`,
						textShadow: '0 2px 20px rgba(6,6,14,0.95)',
					}}>
						La marcia che
						<br /><span style={{color: COLORS.rossoBandiera, fontStyle: 'italic'}}>cambiò tutto</span>
					</h2>

					{/* Contatore contadini */}
					{counterProgress > 0 && (
						<div style={{
							display: 'inline-flex', alignItems: 'baseline', gap: 10,
							background: 'rgba(6,6,14,0.85)',
							border: `1px solid ${COLORS.rossoBandiera}44`,
							borderRadius: 8, padding: '12px 24px',
							backdropFilter: 'blur(16px)',
							alignSelf: 'flex-start',
						}}>
							<span style={{
								fontFamily: playfairFont, fontSize: 68, fontWeight: 700,
								color: COLORS.rossoBandiera,
								textShadow: `0 0 30px ${COLORS.rossoBandiera}88`,
								lineHeight: 1,
							}}>
								{counterVal > 0 ? `+${counterVal}` : ''}
							</span>
							<div>
								<p style={{fontFamily: latoFont, fontSize: 15, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>contadini</p>
								<p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0}}>uomini e donne con le zappe</p>
							</div>
						</div>
					)}

					{/* Destinazione */}
					<div style={{
						opacity: interpolate(frame, [Math.round(4 * fps), Math.round(5.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						display: 'flex', alignItems: 'center', gap: 14,
					}}>
						<div style={{width: 3, height: '100%', minHeight: 40, backgroundColor: COLORS.oroIrpino, borderRadius: 2}} />
						<div style={{
							background: 'rgba(6,6,14,0.80)',
							border: `1px solid ${COLORS.glassBorder}`,
							borderRadius: 7, padding: '10px 20px',
							backdropFilter: 'blur(14px)',
						}}>
							<p style={{fontFamily: latoFont, fontSize: 12, fontWeight: 700, color: COLORS.oroIrpino, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0}}>Destinazione</p>
							<p style={{fontFamily: playfairFont, fontSize: 26, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>Contrada Chiancarelle</p>
							<p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0}}>Occupazione dei latifondi</p>
						</div>
					</div>
				</div>

				{/* COLONNA DESTRA: Citazione + info lotta */}
				<div style={{flex: 0.85, display: 'flex', flexDirection: 'column', gap: 20}}>

					{/* Quote "Bandiera Rossa" */}
					<div style={{
						opacity: quoteOp,
						transform: `translateY(${interpolate(quoteOp, [0, 1], [30, 0])}px)`,
						borderLeft: `4px solid ${COLORS.rossoBandiera}`,
						padding: '14px 20px',
						background: 'rgba(6,6,14,0.84)',
						borderRadius: '0 8px 8px 0',
						backdropFilter: 'blur(16px)',
						boxShadow: `inset 0 0 30px rgba(204,34,34,0.08)`,
					}}>
						<p style={{fontFamily: latoFont, fontSize: 12, fontWeight: 700, color: COLORS.rossoBandiera, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, marginBottom: 8}}>Al canto di</p>
						<p style={{fontFamily: playfairFont, fontSize: 32, fontWeight: 700, fontStyle: 'italic', color: COLORS.oroIrpino, margin: 0, lineHeight: 1.2}}>
							"Bandiera Rossa"
						</p>
						<p style={{fontFamily: latoFont, fontSize: 15, fontWeight: 300, color: COLORS.biancaCalce, margin: 0, marginTop: 10, lineHeight: 1.6}}>
							sfidarono un sistema dove i braccianti
							<br />erano trattati come asini dai galantuomini,
							<br />privi di diritti e di dignità.
						</p>
					</div>

					{/* Info lotta */}
					<div style={{
						opacity: interpolate(frame, [Math.round(11 * fps), Math.round(13 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						display: 'flex', flexDirection: 'column', gap: 10,
					}}>
						{[
							{icon: '🌾', testo: 'Terra → da latifondo a proprietà'},
							{icon: '💧', testo: 'Acqua → diritto negato, poi conquistato'},
							{icon: '✊', testo: 'Dignità → da braccianti a cittadini'},
						].map(({icon, testo}) => (
							<div key={testo} style={{
								display: 'flex', alignItems: 'center', gap: 12,
								background: 'rgba(6,6,14,0.76)',
								border: `1px solid ${COLORS.glassBorder}`,
								borderRadius: 7, padding: '10px 16px',
								backdropFilter: 'blur(12px)',
							}}>
								<span style={{fontSize: 20}}>{icon}</span>
								<p style={{fontFamily: latoFont, fontSize: 15, fontWeight: 400, color: COLORS.biancaCalce, margin: 0}}>{testo}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
