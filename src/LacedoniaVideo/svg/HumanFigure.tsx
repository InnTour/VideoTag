import React from 'react';

type Pose = 'standing' | 'arms-raised' | 'hunched' | 'holding-book' | 'mother-child';

export const HumanFigure: React.FC<{
	pose?: Pose;
	color?: string;
	height?: number;
	flipX?: boolean;
	hatStyle?: 'none' | 'contadino' | 'woman';
}> = ({
	pose = 'standing',
	color = '#3c2415',
	height = 120,
	flipX = false,
	hatStyle = 'none',
}) => {
	const scale = height / 120;
	const transform = flipX
		? `scale(${-scale}, ${scale}) translate(-60, 0)`
		: `scale(${scale})`;

	return (
		<svg
			width={60 * scale}
			height={height}
			viewBox="0 0 60 120"
			style={{display: 'block', overflow: 'visible'}}
		>
			<g transform={transform}>
				{/* Head */}
				<circle cx={30} cy={14} r={10} fill={color} />

				{/* Hat */}
				{hatStyle === 'contadino' && (
					<>
						<ellipse cx={30} cy={7} rx={14} ry={3} fill={color} />
						<rect x={24} y={2} width={12} height={6} rx={2} fill={color} />
					</>
				)}
				{hatStyle === 'woman' && (
					<ellipse cx={30} cy={8} rx={12} ry={5} fill={color} />
				)}

				{/* Body and limbs based on pose */}
				{pose === 'standing' && (
					<>
						<rect x={24} y={24} width={12} height={35} rx={4} fill={color} />
						{/* Arms */}
						<line x1={24} y1={30} x2={14} y2={52} stroke={color} strokeWidth={5} strokeLinecap="round" />
						<line x1={36} y1={30} x2={46} y2={52} stroke={color} strokeWidth={5} strokeLinecap="round" />
						{/* Legs */}
						<line x1={27} y1={58} x2={22} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						<line x1={33} y1={58} x2={38} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						{/* Feet */}
						<ellipse cx={20} cy={92} rx={6} ry={3} fill={color} />
						<ellipse cx={40} cy={92} rx={6} ry={3} fill={color} />
					</>
				)}

				{pose === 'arms-raised' && (
					<>
						<rect x={24} y={24} width={12} height={35} rx={4} fill={color} />
						{/* Arms raised up */}
						<line x1={24} y1={30} x2={10} y2={12} stroke={color} strokeWidth={5} strokeLinecap="round" />
						<line x1={36} y1={30} x2={50} y2={12} stroke={color} strokeWidth={5} strokeLinecap="round" />
						{/* Legs */}
						<line x1={27} y1={58} x2={20} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						<line x1={33} y1={58} x2={40} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						<ellipse cx={18} cy={92} rx={6} ry={3} fill={color} />
						<ellipse cx={42} cy={92} rx={6} ry={3} fill={color} />
					</>
				)}

				{pose === 'hunched' && (
					<>
						{/* Hunched body */}
						<path d="M24,24 Q20,40 22,58 L38,58 Q40,40 36,24 Z" fill={color} />
						{/* Arms down */}
						<line x1={22} y1={35} x2={12} y2={55} stroke={color} strokeWidth={5} strokeLinecap="round" />
						<line x1={38} y1={35} x2={48} y2={55} stroke={color} strokeWidth={5} strokeLinecap="round" />
						{/* Bundle on back */}
						<ellipse cx={38} cy={28} rx={12} ry={10} fill={color} opacity={0.7} />
						{/* Legs */}
						<line x1={26} y1={58} x2={22} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						<line x1={34} y1={58} x2={38} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						<ellipse cx={20} cy={92} rx={6} ry={3} fill={color} />
						<ellipse cx={40} cy={92} rx={6} ry={3} fill={color} />
					</>
				)}

				{pose === 'holding-book' && (
					<>
						<rect x={24} y={24} width={12} height={35} rx={4} fill={color} />
						{/* Left arm down */}
						<line x1={24} y1={30} x2={14} y2={52} stroke={color} strokeWidth={5} strokeLinecap="round" />
						{/* Right arm holding book up */}
						<line x1={36} y1={30} x2={44} y2={18} stroke={color} strokeWidth={5} strokeLinecap="round" />
						{/* Book */}
						<rect x={40} y={6} width={14} height={10} rx={1} fill="#cfb53b" />
						<line x1={47} y1={6} x2={47} y2={16} stroke={color} strokeWidth={1} />
						{/* Legs */}
						<line x1={27} y1={58} x2={22} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						<line x1={33} y1={58} x2={38} y2={90} stroke={color} strokeWidth={6} strokeLinecap="round" />
						<ellipse cx={20} cy={92} rx={6} ry={3} fill={color} />
						<ellipse cx={40} cy={92} rx={6} ry={3} fill={color} />
					</>
				)}

				{pose === 'mother-child' && (
					<>
						{/* Mother body */}
						<path d="M22,24 L20,58 L40,58 L38,24 Z" fill={color} />
						{/* Skirt/dress */}
						<path d="M18,50 L16,90 L44,90 L42,50 Z" fill={color} />
						{/* Arms - holding child */}
						<line x1={22} y1={30} x2={14} y2={45} stroke={color} strokeWidth={5} strokeLinecap="round" />
						<line x1={38} y1={30} x2={46} y2={45} stroke={color} strokeWidth={5} strokeLinecap="round" />
						{/* Child (small figure next to mother) */}
						<circle cx={48} cy={58} r={6} fill={color} />
						<rect x={44} y={64} width={8} height={18} rx={3} fill={color} />
						<line x1={45} y1={82} x2={43} y2={92} stroke={color} strokeWidth={4} strokeLinecap="round" />
						<line x1={51} y1={82} x2={53} y2={92} stroke={color} strokeWidth={4} strokeLinecap="round" />
						<ellipse cx={14} cy={92} rx={6} ry={3} fill={color} />
						<ellipse cx={42} cy={92} rx={6} ry={3} fill={color} />
					</>
				)}
			</g>
		</svg>
	);
};
