import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../constants';

// Piazzetta stilizzata in prospettiva isometrica — estetica blueprint/wireframe
export const PiazzettaSVG: React.FC<{revealProgress?: number}> = ({revealProgress = 1}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	// Pulsazione sottile delle linee (effetto energetico)
	const pulse = 0.7 + 0.3 * Math.sin(frame * 0.07);
	const strokeOpacity = revealProgress * pulse;

	const gold = COLORS.oroIrpino;
	const blue = COLORS.neonBlue;
	const green = COLORS.verdeInnTour;

	// Ken Burns virtuale: leggero zoom
	const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {extrapolateRight: 'clamp'});

	return (
		<svg
			width={860}
			height={580}
			viewBox="0 0 860 580"
			style={{transform: `scale(${zoom})`, transformOrigin: 'center center'}}
		>
			<defs>
				<linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={gold} stopOpacity={0.12} />
					<stop offset="100%" stopColor={gold} stopOpacity={0.03} />
				</linearGradient>
				<linearGradient id="wallGrad2" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor={blue} stopOpacity={0.1} />
					<stop offset="100%" stopColor={gold} stopOpacity={0.05} />
				</linearGradient>
				<filter id="glow2">
					<feGaussianBlur stdDeviation="3" result="coloredBlur" />
					<feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
				</filter>
			</defs>

			{/* === PAVIMENTAZIONE PIAZZETTA (prospettiva) === */}
			{/* Piano principale */}
			<polygon points="120,380 430,220 740,380 430,540"
				fill="url(#groundGrad)" stroke={gold} strokeWidth={1.5} opacity={revealProgress} />
			{/* Griglia mattonato */}
			{[0.2, 0.4, 0.6, 0.8].map((t, i) => {
				const lx1 = 120 + t * (430 - 120);
				const ly1 = 380 + t * (220 - 380);
				return (
					<g key={i} opacity={strokeOpacity * 0.5}>
						<line x1={lx1} y1={ly1} x2={lx1 + (740-430)*t} y2={ly1 + (380-220)*t} stroke={gold} strokeWidth={0.7} />
						<line x1={120+t*310} y1={380+t*(-160)} x2={740-t*310} y2={380+t*(-160+160-160)} stroke={gold} strokeWidth={0.7} />
					</g>
				);
			})}

			{/* === EDIFICIO STORICO SINISTRA === */}
			{/* Facciata */}
			<polygon points="70,160 220,80 220,380 70,380"
				fill="url(#wallGrad2)" stroke={blue} strokeWidth={1.4} opacity={strokeOpacity * 0.9} filter="url(#glow2)" />
			{/* Finestre */}
			{[[100, 130], [150, 130], [100, 200], [150, 200], [100, 270], [150, 270]].map(([x, y], i) => (
				<rect key={i} x={x} y={y} width={28} height={38} rx={2}
					fill={gold} opacity={strokeOpacity * 0.15} stroke={gold} strokeWidth={1} />
			))}
			{/* Portale */}
			<path d="M 128 380 L 128 310 Q 128 285, 145 285 Q 162 285, 162 310 L 162 380"
				fill={gold} opacity={strokeOpacity * 0.1} stroke={gold} strokeWidth={1.5} />
			{/* Cornicione */}
			<line x1={70} y1={170} x2={220} y2={90} stroke={blue} strokeWidth={2} opacity={strokeOpacity * 0.7} />

			{/* === EDIFICIO STORICO DESTRA === */}
			<polygon points="640,80 790,160 790,380 640,380"
				fill="url(#wallGrad2)" stroke={blue} strokeWidth={1.4} opacity={strokeOpacity * 0.9} filter="url(#glow2)" />
			{[[648, 130], [706, 130], [648, 200], [706, 200], [648, 270], [706, 270]].map(([x, y], i) => (
				<rect key={i} x={x} y={y} width={28} height={38} rx={2}
					fill={gold} opacity={strokeOpacity * 0.15} stroke={gold} strokeWidth={1} />
			))}
			<path d="M 658 380 L 658 310 Q 658 285, 675 285 Q 692 285, 692 310 L 692 380"
				fill={gold} opacity={strokeOpacity * 0.1} stroke={gold} strokeWidth={1.5} />

			{/* === MONUMENTO CENTRALE (targa/busto) === */}
			{/* Piedistallo */}
			<rect x={390} y={290} width={80} height={90} rx={4}
				fill="url(#wallGrad2)" stroke={gold} strokeWidth={2} opacity={strokeOpacity} filter="url(#glow2)" />
			{/* Targa */}
			<rect x={400} y={305} width={60} height={40} rx={2}
				fill={gold} opacity={strokeOpacity * 0.15} stroke={gold} strokeWidth={1} />
			{/* Testo targa */}
			<text x={430} y={320} textAnchor="middle" fontSize={7} fill={gold} opacity={strokeOpacity * 0.8}
				fontWeight="bold" letterSpacing={0.5}>NICOLA</text>
			<text x={430} y={332} textAnchor="middle" fontSize={7} fill={gold} opacity={strokeOpacity * 0.8}
				fontWeight="bold" letterSpacing={0.5}>VELLA</text>
			{/* Busto */}
			<ellipse cx={430} cy={280} rx={22} ry={28}
				fill="url(#wallGrad2)" stroke={gold} strokeWidth={1.5} opacity={strokeOpacity * 0.8} />
			<ellipse cx={430} cy={262} rx={13} ry={15}
				fill="none" stroke={gold} strokeWidth={1.2} opacity={strokeOpacity * 0.7} />

			{/* === LAMPIONI === */}
			{[[185, 310], [665, 310]].map(([x, y], i) => (
				<g key={i} opacity={strokeOpacity}>
					<line x1={x} y1={y} x2={x} y2={y + 80} stroke={gold} strokeWidth={2} />
					<circle cx={x} cy={y - 5} r={8} fill={gold} opacity={0.3} />
					<circle cx={x} cy={y - 5} r={4} fill={gold} opacity={0.8} />
					{/* Alone luminoso */}
					<circle cx={x} cy={y - 5} r={20} fill={gold} opacity={0.04} />
				</g>
			))}

			{/* === LINEE DI ENERGIA (effetto moderno) === */}
			{/* Raggiere dal centro verso gli angoli */}
			{[[120,380],[740,380],[430,220]].map(([tx, ty], i) => (
				<line key={i}
					x1={430} y1={380}
					x2={tx} y2={ty}
					stroke={green} strokeWidth={0.6}
					strokeDasharray={`${4 + i*2} ${8 + i*2}`}
					opacity={strokeOpacity * 0.25}
					strokeDashoffset={-(frame * 1.5)}
				/>
			))}

			{/* === OVERLAY NEON BORDI === */}
			<polygon points="120,380 430,220 740,380 430,540"
				fill="none" stroke={gold} strokeWidth={2} opacity={strokeOpacity * 0.8}
				filter="url(#glow2)" />
		</svg>
	);
};
