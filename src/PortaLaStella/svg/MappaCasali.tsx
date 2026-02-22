import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, latoFont} from '../constants';

export const MappaCasali: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Lacedonia appare per prima
	const lacedoniaSpring = spring({
		frame,
		fps,
		config: {damping: 180},
		durationInFrames: Math.round(0.8 * fps),
	});

	// Rocchetta appare dopo 0.8s
	const rocchettaSpring = spring({
		frame: Math.max(0, frame - Math.round(0.8 * fps)),
		fps,
		config: {damping: 180},
		durationInFrames: Math.round(0.8 * fps),
	});

	// La linea di connessione appare per ultima
	const lineProgress = interpolate(
		frame,
		[Math.round(1.6 * fps), Math.round(2.4 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Label "CASALE" appare con freccia
	const labelOpacity = interpolate(
		frame,
		[Math.round(2.4 * fps), Math.round(3 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<svg width={700} height={280} viewBox="0 0 700 280">
			{/* Sfondo semitrasparente */}
			<rect x={0} y={0} width={700} height={280} fill="rgba(26,18,8,0.85)" rx={12} />

			{/* === LACEDONIA (principale, a sinistra) === */}
			<g opacity={lacedoniaSpring}>
				{/* Cerchio principale */}
				<circle cx={180} cy={140} r={70} fill={COLORS.oroIrpino} opacity={0.15} stroke={COLORS.oroIrpino} strokeWidth={2} />
				<circle cx={180} cy={140} r={52} fill={COLORS.oroIrpino} opacity={0.25} />
				{/* Icona torre/castello stilizzata */}
				<rect x={164} y={116} width={32} height={40} fill={COLORS.oroIrpino} rx={2} />
				<rect x={158} y={108} width={10} height={16} fill={COLORS.oroIrpino} rx={1} />
				<rect x={186} y={108} width={10} height={16} fill={COLORS.oroIrpino} rx={1} />
				{/* Etichetta */}
				<text x={180} y={228} textAnchor="middle" fontFamily={latoFont} fontSize={20} fontWeight="700" fill={COLORS.oroIrpino} letterSpacing={2}>
					LACEDONIA
				</text>
				<text x={180} y={250} textAnchor="middle" fontFamily={latoFont} fontSize={13} fontWeight="400" fill={COLORS.biancaCalce} opacity={0.7}>
					Sede della Giurisdizione
				</text>
			</g>

			{/* === LINEA DI CONNESSIONE === */}
			<line
				x1={252}
				y1={140}
				x2={252 + lineProgress * 196}
				y2={140}
				stroke={COLORS.oroIrpino}
				strokeWidth={2}
				strokeDasharray="8 4"
				opacity={0.7}
			/>
			{/* Freccia */}
			{lineProgress > 0.95 && (
				<polygon
					points={`448,134 458,140 448,146`}
					fill={COLORS.oroIrpino}
					opacity={0.8}
				/>
			)}
			{/* Label "dipendenza" sulla linea */}
			<text
				x={350}
				y={128}
				textAnchor="middle"
				fontFamily={latoFont}
				fontSize={12}
				fill={COLORS.grigioCaldo}
				opacity={lineProgress}
			>
				giurisdizione medievale
			</text>

			{/* === ROCCHETTA (casale, a destra) === */}
			<g opacity={rocchettaSpring}>
				<circle cx={520} cy={140} r={50} fill={COLORS.pietraAntica} opacity={0.15} stroke={COLORS.pietraAntica} strokeWidth={2} />
				<circle cx={520} cy={140} r={36} fill={COLORS.pietraAntica} opacity={0.25} />
				{/* Icona più piccola */}
				<rect x={508} y={122} width={24} height={30} fill={COLORS.pietraAntica} rx={2} />
				<rect x={504} y={116} width={8} height={12} fill={COLORS.pietraAntica} rx={1} />
				<rect x={520} y={116} width={8} height={12} fill={COLORS.pietraAntica} rx={1} />
				{/* Label */}
				<text x={520} y={218} textAnchor="middle" fontFamily={latoFont} fontSize={18} fontWeight="700" fill={COLORS.pietraAntica} letterSpacing={2}>
					ROCCHETTA
				</text>
				{/* Badge CASALE */}
				<rect x={468} y={230} width={106} height={26} fill={COLORS.terraBruciata} rx={4} opacity={labelOpacity} />
				<text x={521} y={248} textAnchor="middle" fontFamily={latoFont} fontSize={13} fontWeight="700" fill={COLORS.biancaCalce} opacity={labelOpacity} letterSpacing={2}>
					CASALE
				</text>
			</g>
		</svg>
	);
};
