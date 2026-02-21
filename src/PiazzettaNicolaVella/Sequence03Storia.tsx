import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {ParticleField} from './components/ParticleField';
import {ScanLines} from './components/ScanLines';
import {KenBurnsImage} from './components/KenBurnsImage';

// Timeline orizzontale con dati REALI dal testo Whisper
const TimelineItem: React.FC<{year: string; label: string; detail: string; index: number; isHighlight?: boolean}> = ({year, label, detail, index, isHighlight}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const delay = Math.round(index * 0.85 * fps);
	const s = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 150}, durationInFrames: Math.round(0.7 * fps)});
	const op = interpolate(s, [0, 1], [0, 1]);
	const scl = interpolate(s, [0, 1], [0.6, 1]);
	const accent = isHighlight ? COLORS.oroIrpino : COLORS.neonBlue;

	return (
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, opacity: op, transform: `scale(${scl})`}}>
			<div style={{background: isHighlight ? `rgba(212,168,67,0.25)` : 'rgba(0,212,255,0.15)', border: `1.5px solid ${accent}`, borderRadius: 6, padding: '6px 14px', marginBottom: 10}}>
				<span style={{fontFamily: playfairFont, fontSize: 22, fontWeight: 700, color: accent}}>{year}</span>
			</div>
			<div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: accent, boxShadow: `0 0 12px ${accent}`, marginBottom: 8}} />
			<p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, textAlign: 'center', letterSpacing: '0.04em', lineHeight: 1.3}}>{label}</p>
			<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0, marginTop: 4, textAlign: 'center', lineHeight: 1.4}}>{detail}</p>
		</div>
	);
};

// Dati REALI dal testo Whisper
const events = [
	{year: '1944-45', label: 'Fine della Guerra', detail: 'L\'Italia si libera dal fascismo', isHighlight: false},
	{year: '1946', label: 'Prima elezione', detail: 'Vella sindaco con coalizione di sinistra', isHighlight: true},
	{year: '1946-50', label: 'Il mandato', detail: 'Acqua, terre, riscatto contadino', isHighlight: false},
	{year: 'Oggi', label: 'La Piazzetta', detail: 'Porta il suo nome per sempre', isHighlight: false},
];

// Schede sfide del dopoguerra
const SfidaCard: React.FC<{icon: string; label: string; desc: string; delay: number}> = ({icon, label, desc, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 160}, durationInFrames: Math.round(0.6 * fps)});
	const op = interpolate(s, [0, 1], [0, 1]);
	const y = interpolate(s, [0, 1], [20, 0]);

	return (
		<div style={{opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'center', gap: 12,
			background: 'rgba(5,5,15,0.78)',
			border: `1px solid ${COLORS.glassBorder}`,
			borderRadius: 8, padding: '10px 16px',
			backdropFilter: 'blur(16px)',
		}}>
			<span style={{fontSize: 22}}>{icon}</span>
			<div>
				<p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 700, color: COLORS.oroIrpino, margin: 0}}>{label}</p>
				<p style={{fontFamily: latoFont, fontSize: 11, fontWeight: 300, color: COLORS.grigioCaldo, margin: 0}}>{desc}</p>
			</div>
		</div>
	);
};

const sfide = [
	{icon: '💧', label: 'Lotta per l\'acqua', desc: 'Infrastrutture idriche per il borgo', delay: 0},
	{icon: '🌾', label: 'Quotizzazione delle terre', desc: 'Terre incolte assegnate ai contadini', delay: 12},
	{icon: '✊', label: 'Riscatto sociale', desc: 'Dignità e diritti per i lavoratori', delay: 24},
];

export const Sequence03Storia: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpring = spring({frame, fps, config: {damping: 160}, durationInFrames: Math.round(0.8 * fps)});
	const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
	const titleOp = interpolate(titleSpring, [0, 1], [0, 1]);

	const lineW = interpolate(frame, [Math.round(0.5 * fps), Math.round(2.5 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Sfide appaiono nella seconda metà
	const sfideTrigger = Math.round(4.5 * fps);

	// Cross-dissolve: prima immagine (folla con bandiere) → seconda (marcia contadina)
	// Le due immagini si alternano a metà sequenza (8.5s)
	const crossDissolveProgress = interpolate(frame, [Math.round(7 * fps), Math.round(9 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* === SFONDO FOTOGRAFICO LAYER 1 — Folla con bandiere e falci (0:00→0:09) ===
			 *  Immagine: image_0ba1c98b (contadini in marcia con bandiere)
			 *  Occupa l'intera scena, poi si dissolve nella seconda immagine
			 */}
			<div style={{position: 'absolute', inset: 0, opacity: 1 - crossDissolveProgress}}>
				<KenBurnsImage
					src="images/TAG A1.05 - PIAZZETTA NICOLA VELLA/image_0ba1c98b-9c5b-4c5b-8210-8d38f8b6af49.png"
					motion="zoom-in"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 25%"
				/>
			</div>

			{/* === SFONDO FOTOGRAFICO LAYER 2 — Marcia contadina (0:09→fine) ===
			 *  Immagine: image_a9776721 (colonna di contadini nella campagna irpina)
			 */}
			<div style={{position: 'absolute', inset: 0, opacity: crossDissolveProgress}}>
				<KenBurnsImage
					src="images/TAG A1.05 - PIAZZETTA NICOLA VELLA/image_a9776721-50c1-49c8-8ef6-ba1f5bb0aad2.png"
					motion="pan-left"
					intensity={0.05}
					overlayOpacity={0}
					objectPosition="center 35%"
				/>
			</div>

			{/* Overlay scuro per leggibilità — più pesante verso i lati */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(5,5,15,0.95) 0%, rgba(5,5,15,0.70) 35%, rgba(5,5,15,0.20) 55%, rgba(5,5,15,0.65) 100%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(5,5,15,0.65) 0%, transparent 25%, transparent 55%, rgba(5,5,15,0.85) 100%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.25} />
			<ScanLines opacity={0.025} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', padding: '0 72px', gap: 64, alignItems: 'center'}}>
				{/* === COLONNA SINISTRA: Timeline + Titolo === */}
				<div style={{flex: 1.2, display: 'flex', flexDirection: 'column', gap: 36}}>
					{/* Titolo */}
					<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
						<div style={{display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12}}>
							<div style={{width: 32, height: 1.5, background: `linear-gradient(90deg, transparent, ${COLORS.neonBlue})`}} />
							<span style={{fontFamily: latoFont, fontSize: 11, fontWeight: 700, color: COLORS.neonBlue, letterSpacing: '0.2em', textTransform: 'uppercase'}}>Il Mandato</span>
						</div>
						<h2 style={{fontFamily: playfairFont, fontSize: 52, fontWeight: 700, color: COLORS.biancaCalce, margin: 0, lineHeight: 1.1, textShadow: '0 2px 12px rgba(5,5,15,0.9)'}}>
							Lacedonia,<br />
							<span style={{color: COLORS.oroIrpino}}>anni cruciali</span>
						</h2>
					</div>

					{/* Timeline */}
					<div style={{position: 'relative'}}>
						<div style={{position: 'absolute', top: 34, left: '4%', right: '4%', height: 1.5,
							background: `linear-gradient(90deg, ${COLORS.oroIrpino}00, ${COLORS.oroIrpino} 15%, ${COLORS.oroIrpino} 85%, ${COLORS.oroIrpino}00)`,
							transform: `scaleX(${lineW})`, transformOrigin: 'left'}} />
						<div style={{display: 'flex', justifyContent: 'space-between', padding: '0 4%', gap: 8}}>
							{events.map((ev, i) => (
								<TimelineItem key={ev.year} {...ev} index={i} />
							))}
						</div>
					</div>
				</div>

				{/* === COLONNA DESTRA: Sfide del dopoguerra === */}
				<div style={{flex: 0.9, display: 'flex', flexDirection: 'column', gap: 16}}>
					<p style={{
						fontFamily: latoFont, fontSize: 12, fontWeight: 700,
						color: COLORS.grigioCaldo, letterSpacing: '0.18em',
						textTransform: 'uppercase', margin: 0, marginBottom: 4,
						opacity: interpolate(frame, [sfideTrigger, sfideTrigger + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
					}}>
						Le sfide del dopoguerra
					</p>
					{sfide.map((s) => (
						<SfidaCard key={s.label} {...s} delay={sfideTrigger + s.delay} />
					))}

					{/* Citazione reale dal testo */}
					<div style={{
						marginTop: 12,
						borderLeft: `3px solid ${COLORS.oroIrpino}`,
						paddingLeft: 18,
						background: 'rgba(5,5,15,0.72)',
						borderRadius: '0 6px 6px 0',
						padding: '10px 18px',
						backdropFilter: 'blur(12px)',
						opacity: interpolate(frame, [sfideTrigger + 50, sfideTrigger + 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
					}}>
						<p style={{fontFamily: playfairFont, fontSize: 17, fontStyle: 'italic', color: COLORS.biancaCalce, margin: 0, lineHeight: 1.6}}>
							"La lotta per l'acqua,
							<br />la quotizzazione delle terre incolte
							<br />e il riscatto sociale dei contadini."
						</p>
						<p style={{fontFamily: latoFont, fontSize: 11, color: COLORS.grigioCaldo, margin: 0, marginTop: 8}}>
							Dal testo del Cicerone Digitale · A1.05
						</p>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
