import {
	AbsoluteFill,
	interpolate,
	spring,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {FactCard} from './components/FactCard';
import {MappaCasali} from './svg/MappaCasali';

// Stemma stilizzato degli Orsini (con animazione drawing)
const StemmaOrsini: React.FC<{progress: number}> = ({progress}) => {
	const gold = COLORS.oroIrpino;
	const stone = COLORS.pietraAntica;

	// Disegno progressivo dello scudo
	const pathLen = 600;
	const dashOffset = pathLen * (1 - progress);

	return (
		<svg width={220} height={280} viewBox="0 0 220 280">
			{/* Scudo gotico */}
			<path
				d="M 20 20 L 200 20 L 200 180 Q 200 240, 110 265 Q 20 240, 20 180 Z"
				fill={`${stone}33`}
				stroke={gold}
				strokeWidth={3}
				strokeDasharray={pathLen}
				strokeDashoffset={dashOffset}
			/>
			{/* Fascia orizzontale (Orsini) */}
			<rect
				x={20}
				y={100}
				width={180}
				height={50}
				fill={gold}
				opacity={progress > 0.5 ? (progress - 0.5) * 2 : 0}
			/>
			{/* Rosa araldica Orsini */}
			{progress > 0.6 && (
				<g transform="translate(110, 125)" opacity={(progress - 0.6) * 2.5}>
					{[0, 60, 120, 180, 240, 300].map((angle, i) => (
						<ellipse
							key={i}
							cx={Math.cos((angle * Math.PI) / 180) * 16}
							cy={Math.sin((angle * Math.PI) / 180) * 16}
							rx={10}
							ry={7}
							fill="#fff"
							transform={`rotate(${angle}, ${Math.cos((angle * Math.PI) / 180) * 16}, ${Math.sin((angle * Math.PI) / 180) * 16})`}
						/>
					))}
					<circle cx={0} cy={0} r={8} fill={gold} />
				</g>
			)}
			{/* Etichetta */}
			<text
				x={110}
				y={272}
				textAnchor="middle"
				fontFamily={latoFont}
				fontSize={13}
				fontWeight="700"
				fill={gold}
				opacity={progress}
				letterSpacing={3}
			>
				PRINCIPI ORSINI
			</text>
		</svg>
	);
};

export const Sequence02Storia: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Fade in/out sequenza
	const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp',
	});
	const opacity = Math.min(fadeIn, fadeOut);

	// --- SOTTO-SEQUENZA 1: FactCard anno 1456 (frame 0 → 4s) ---
	const phase1End = Math.round(4 * fps);
	// --- SOTTO-SEQUENZA 2: Stemma Orsini (frame 4s → 10s) ---
	const phase2End = Math.round(10 * fps);
	// --- SOTTO-SEQUENZA 3: Sant'Antonio + Mappa casali (frame 10s → fine) ---

	// Progress stemma (disegno progressivo)
	const stemmaProgress = interpolate(
		frame,
		[phase1End, phase1End + Math.round(2.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Opacità delle tre fasi
	const phase1Op = interpolate(frame, [0, fps * 0.4, phase1End - fps * 0.4, phase1End], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const phase2Op = interpolate(frame, [phase1End, phase1End + fps * 0.4, phase2End - fps * 0.4, phase2End], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const phase3Op = interpolate(frame, [phase2End, phase2End + fps * 0.4], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Testo "Sant'Antonio Abate" — lettera per lettera
	const santAntonioText = "Sant'Antonio Abate";
	const charsRevealed = Math.floor(
		interpolate(
			frame,
			[phase2End + Math.round(0.3 * fps), phase2End + Math.round(2 * fps)],
			[0, santAntonioText.length],
			{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
		),
	);

	// Mappa casali
	const mapSpring = spring({
		frame: Math.max(0, frame - (phase2End + Math.round(3.5 * fps))),
		fps,
		config: {damping: 200},
		durationInFrames: Math.round(0.8 * fps),
	});
	const mapY = interpolate(mapSpring, [0, 1], [40, 0]);
	const mapOpacity = interpolate(mapSpring, [0, 1], [0, 1]);

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgScuro}}>
			{/* Sfondo texture pietra */}
			<AbsoluteFill
				style={{
					background: `
						radial-gradient(ellipse at 20% 50%, ${COLORS.terraBruciata}22 0%, transparent 55%),
						linear-gradient(160deg, #1a1208 0%, ${COLORS.bgPietra} 50%, #2e1a0c 100%)
					`,
				}}
			/>

			{/* === FASE 1: ANNO DEL SISMA === */}
			<AbsoluteFill
				style={{
					opacity: phase1Op,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 32,
				}}
			>
				{/* Testo contestuale */}
				<p
					style={{
						fontFamily: latoFont,
						fontSize: 22,
						fontWeight: 300,
						color: COLORS.biancaCalce,
						textAlign: 'center',
						margin: 0,
						letterSpacing: '0.08em',
						opacity: phase1Op,
					}}
				>
					uno dei quattro accessi della cinta muraria
				</p>
				<FactCard
					label="Anno del Sisma"
					value="1456"
					sublabel="Terremoto devastante · Principi Orsini"
					accentColor={COLORS.terraBruciata}
					delay={Math.round(0.4 * fps)}
				/>
				<FactCard
					label="Accessi della Cinta Muraria"
					value="4"
					sublabel="Porte medievali della Cittadella"
					accentColor={COLORS.oroIrpino}
					delay={Math.round(1.2 * fps)}
				/>
			</AbsoluteFill>

			{/* === FASE 2: STEMMA ORSINI === */}
			<AbsoluteFill
				style={{
					opacity: phase2Op,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					gap: 80,
				}}
			>
				{/* Stemma */}
				<StemmaOrsini progress={stemmaProgress} />

				{/* Testo affiancato */}
				<div style={{maxWidth: 480}}>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 14,
							fontWeight: 700,
							color: COLORS.verdeInnTour,
							letterSpacing: '0.15em',
							textTransform: 'uppercase',
							margin: 0,
							marginBottom: 12,
						}}
					>
						Committenti
					</p>
					<h2
						style={{
							fontFamily: playfairFont,
							fontSize: 52,
							fontWeight: 700,
							color: COLORS.oroIrpino,
							margin: 0,
							marginBottom: 16,
							lineHeight: 1.1,
						}}
					>
						Principi
						<br />
						Orsini
					</h2>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 20,
							fontWeight: 300,
							color: COLORS.biancaCalce,
							margin: 0,
							lineHeight: 1.6,
							opacity: stemmaProgress,
						}}
					>
						Dopo il devastante sisma del 1456,
						<br />
						vollero la ricostruzione della cinta muraria
						<br />
						a protezione della Cittadella.
					</p>
				</div>
			</AbsoluteFill>

			{/* === FASE 3: SANT'ANTONIO + MAPPA === */}
			<AbsoluteFill
				style={{
					opacity: phase3Op,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 48,
				}}
			>
				{/* Titolo Sant'Antonio — Typography-led */}
				<div style={{textAlign: 'center'}}>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 15,
							fontWeight: 700,
							color: COLORS.grigioCaldo,
							letterSpacing: '0.18em',
							textTransform: 'uppercase',
							margin: 0,
							marginBottom: 12,
						}}
					>
						Dedicata a
					</p>
					<h2
						style={{
							fontFamily: playfairFont,
							fontSize: 68,
							fontWeight: 700,
							fontStyle: 'italic',
							color: COLORS.oroIrpino,
							margin: 0,
							textShadow: `0 0 40px ${COLORS.oroIrpino}44`,
						}}
					>
						{santAntonioText.slice(0, charsRevealed)}
						<span style={{opacity: 0.15}}>{santAntonioText.slice(charsRevealed)}</span>
					</h2>
					<p
						style={{
							fontFamily: latoFont,
							fontSize: 18,
							fontWeight: 300,
							color: COLORS.biancaCalce,
							margin: 0,
							marginTop: 10,
							letterSpacing: '0.1em',
							opacity: charsRevealed / santAntonioText.length,
						}}
					>
						Patrono di Rocchetta · oggi Rocchetta Sant'Antonio (FG)
					</p>
				</div>

				{/* Mappa Casali */}
				<div
					style={{
						opacity: mapOpacity,
						transform: `translateY(${mapY}px)`,
					}}
				>
					<Sequence from={Math.round((phase2End + 3.5 * fps))} durationInFrames={durationInFrames}>
						<MappaCasali />
					</Sequence>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
