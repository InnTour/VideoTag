import React from 'react';
import {COLORS} from '../constants';

export const BookIcon: React.FC<{
	size?: number;
	color?: string;
	open?: boolean;
}> = ({size = 40, color = COLORS.bronze, open = true}) => {
	const s = size;
	return (
		<svg
			width={s}
			height={s * 0.7}
			viewBox="0 0 40 28"
			style={{display: 'block'}}
		>
			{open ? (
				<>
					{/* Left page */}
					<path
						d="M20,4 L4,2 L2,24 L20,26 Z"
						fill={COLORS.parchment}
						stroke={color}
						strokeWidth={1.5}
					/>
					{/* Right page */}
					<path
						d="M20,4 L36,2 L38,24 L20,26 Z"
						fill={COLORS.parchment}
						stroke={color}
						strokeWidth={1.5}
					/>
					{/* Spine */}
					<line
						x1={20}
						y1={4}
						x2={20}
						y2={26}
						stroke={color}
						strokeWidth={2}
					/>
					{/* Text lines on left page */}
					<line x1={8} y1={10} x2={17} y2={10} stroke={color} strokeWidth={0.5} opacity={0.4} />
					<line x1={8} y1={14} x2={16} y2={14} stroke={color} strokeWidth={0.5} opacity={0.4} />
					<line x1={8} y1={18} x2={17} y2={18} stroke={color} strokeWidth={0.5} opacity={0.4} />
					{/* Text lines on right page */}
					<line x1={23} y1={10} x2={33} y2={10} stroke={color} strokeWidth={0.5} opacity={0.4} />
					<line x1={23} y1={14} x2={32} y2={14} stroke={color} strokeWidth={0.5} opacity={0.4} />
					<line x1={23} y1={18} x2={33} y2={18} stroke={color} strokeWidth={0.5} opacity={0.4} />
				</>
			) : (
				<>
					{/* Closed book */}
					<rect
						x={8}
						y={4}
						width={24}
						height={20}
						rx={2}
						fill={color}
					/>
					<rect
						x={10}
						y={5}
						width={20}
						height={18}
						rx={1}
						fill={COLORS.parchment}
						opacity={0.3}
					/>
					{/* Spine */}
					<rect
						x={7}
						y={4}
						width={3}
						height={20}
						rx={1}
						fill={color}
					/>
				</>
			)}
		</svg>
	);
};
