import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../constants';

interface PortaSVGProps {
	buried?: boolean; // mostra la porta come se fosse sepolta (piano stradale visibile)
	width?: number;
	height?: number;
}

export const PortaSVG: React.FC<PortaSVGProps> = ({
	buried = false,
	width = 700,
	height = 900,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	// Ken Burns virtuale: leggero zoom-in progressivo
	const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.07], {
		extrapolateRight: 'clamp',
	});

	const stone1 = COLORS.pietraAntica;  // #8B7355
	const stone2 = '#7a6245';
	const stone3 = '#9e8468';
	const wood = '#3c2415';
	const woodLight = '#5a3820';
	const gold = COLORS.oroIrpino;      // #D4A843
	const mortar = '#c4b89a';

	// Pattern mattoni (corso di pietra)
	const brickRows = [
		{y: 600, offset: 0},
		{y: 640, offset: 70},
		{y: 680, offset: 0},
		{y: 720, offset: 70},
		{y: 760, offset: 0},
		{y: 800, offset: 70},
		{y: 840, offset: 0},
	];

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 700 900"
			style={{
				transform: `scale(${scale})`,
				transformOrigin: 'center center',
				filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.6))',
			}}
		>
			<defs>
				{/* Gradiente sfondo pietra */}
				<linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor={stone3} />
					<stop offset="50%" stopColor={stone1} />
					<stop offset="100%" stopColor={stone2} />
				</linearGradient>
				{/* Gradiente battenti */}
				<linearGradient id="doorGradL" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor={wood} />
					<stop offset="100%" stopColor={woodLight} />
				</linearGradient>
				<linearGradient id="doorGradR" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor={woodLight} />
					<stop offset="100%" stopColor={wood} />
				</linearGradient>
				{/* Clip per nascondere parte sepolta */}
				{buried && (
					<clipPath id="aboveGround">
						<rect x="0" y="0" width="700" height="680" />
					</clipPath>
				)}
			</defs>

			{/* === MURO DI PIETRA === */}
			{/* Corpo principale muro */}
			<rect x={0} y={200} width={700} height={700} fill="url(#wallGrad)" />

			{/* Corsi di pietra (texture manuale) */}
			{brickRows.map((row, idx) => (
				<g key={idx}>
					{[0, 1, 2, 3, 4, 5, 6].map((col) => (
						<rect
							key={col}
							x={col * 100 + row.offset - 100}
							y={row.y}
							width={94}
							height={34}
							fill={idx % 2 === 0 ? stone1 : stone2}
							stroke={mortar}
							strokeWidth={2}
							rx={2}
						/>
					))}
				</g>
			))}

			{/* === ARCATA DELLA PORTA === */}
			{/* Arco a tutto sesto - riempimento */}
			<path
				d="M 170 580 L 170 380 Q 170 220, 350 220 Q 530 220, 530 380 L 530 580 Z"
				fill={COLORS.bgScuro}
			/>
			{/* Arco - bordo pietra (voussoir) */}
			<path
				d="M 155 585 L 155 378 Q 155 205, 350 205 Q 545 205, 545 378 L 545 585"
				fill="none"
				stroke={stone3}
				strokeWidth={30}
			/>
			<path
				d="M 170 580 L 170 380 Q 170 220, 350 220 Q 530 220, 530 380 L 530 580"
				fill="none"
				stroke={stone1}
				strokeWidth={20}
			/>
			{/* Conci dell'arco (pietre a cuneo) */}
			{Array.from({length: 9}).map((_, i) => {
				const angle = Math.PI + (i * Math.PI) / 8;
				const r = 180;
				return (
					<line
						key={i}
						x1={350 + (r - 30) * Math.cos(angle)}
						y1={380 + (r - 30) * Math.sin(angle)}
						x2={350 + (r + 10) * Math.cos(angle)}
						y2={380 + (r + 10) * Math.sin(angle)}
						stroke={mortar}
						strokeWidth={3}
					/>
				);
			})}

			{/* === CHIAVE DI VOLTA CON STELLA === */}
			{/* Blocco chiave */}
			<ellipse cx={350} cy={213} rx={38} ry={22} fill={stone3} stroke={mortar} strokeWidth={2} />
			{/* Stella a 6 punte (Stella di Davide / stella araldica medievale) */}
			<g transform="translate(350, 213)">
				<polygon
					points="0,-14 8,-4 18,-4 10,4 14,14 0,7 -14,14 -10,4 -18,-4 -8,-4"
					fill={gold}
					stroke={COLORS.terraBruciata}
					strokeWidth={1}
				/>
				<circle cx={0} cy={0} r={4} fill={COLORS.bgScuro} />
			</g>

			{/* === BATTENTI IN LEGNO === */}
			{/* Battente sinistro */}
			<g clipPath={buried ? 'url(#aboveGround)' : undefined}>
				<rect x={178} y={380} width={163} height={200} fill="url(#doorGradL)" rx={3} />
				{/* Tavole verticali */}
				{[0, 1, 2].map((i) => (
					<line
						key={i}
						x1={178 + i * 54}
						y1={380}
						x2={178 + i * 54}
						y2={580}
						stroke={wood}
						strokeWidth={3}
						opacity={0.6}
					/>
				))}
				{/* Traverse orizzontali sx */}
				{[420, 480, 540].map((y) => (
					<line key={y} x1={178} y1={y} x2={341} y2={y} stroke={wood} strokeWidth={6} opacity={0.5} />
				))}
				{/* Borchie sx */}
				{[200, 250, 300].map((x) =>
					[410, 470, 530].map((y) => (
						<circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill={COLORS.oroIrpino} opacity={0.8} />
					)),
				)}

				{/* Battente destro */}
				<rect x={359} y={380} width={163} height={200} fill="url(#doorGradR)" rx={3} />
				{[0, 1, 2].map((i) => (
					<line
						key={i}
						x1={413 + i * 54}
						y1={380}
						x2={413 + i * 54}
						y2={580}
						stroke={wood}
						strokeWidth={3}
						opacity={0.6}
					/>
				))}
				{[420, 480, 540].map((y) => (
					<line key={y} x1={359} y1={y} x2={522} y2={y} stroke={wood} strokeWidth={6} opacity={0.5} />
				))}
				{[400, 450, 500].map((x) =>
					[410, 470, 530].map((y) => (
						<circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill={COLORS.oroIrpino} opacity={0.8} />
					)),
				)}
			</g>

			{/* === SOGLIA E GRADINO === */}
			<rect x={150} y={578} width={400} height={20} fill={stone3} stroke={mortar} strokeWidth={1} rx={2} />
			<rect x={130} y={596} width={440} height={14} fill={stone2} stroke={mortar} strokeWidth={1} rx={1} />

			{/* === LIVELLO STRADALE ATTUALE (se buried) === */}
			{buried && (
				<>
					{/* Terra/asfalto che copre la porta */}
					<rect x={0} y={680} width={700} height={220} fill="#4a4038" />
					{/* Texture asfalto */}
					{Array.from({length: 12}).map((_, i) => (
						<line
							key={i}
							x1={0}
							y1={690 + i * 18}
							x2={700}
							y2={690 + i * 18}
							stroke="#3a3028"
							strokeWidth={1}
							opacity={0.5}
						/>
					))}
					{/* Etichetta livello stradale */}
					<rect x={0} y={680} width={700} height={4} fill={COLORS.oroIrpino} opacity={0.7} />
					<text
						x={350}
						y={730}
						textAnchor="middle"
						fontSize={22}
						fontWeight="bold"
						fill={COLORS.biancaCalce}
						opacity={0.9}
						style={{fontFamily: 'sans-serif'}}
					>
						LIVELLO STRADALE ATTUALE
					</text>
				</>
			)}

			{/* Vignette scuro ai bordi */}
			<defs>
				<radialGradient id="vignette" cx="50%" cy="50%" r="70%">
					<stop offset="60%" stopColor="transparent" />
					<stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
				</radialGradient>
			</defs>
			<rect x={0} y={0} width={700} height={900} fill="url(#vignette)" />
		</svg>
	);
};
