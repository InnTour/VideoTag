import React from 'react';
import {COLORS} from '../constants';

export const OrnamentalDivider: React.FC<{
	width?: number;
	color?: string;
}> = ({width = 400, color = COLORS.oldGold}) => {
	const w = width;
	const h = 30;
	const mid = w / 2;

	return (
		<svg
			width={w}
			height={h}
			viewBox={`0 0 ${w} ${h}`}
			style={{display: 'block'}}
		>
			{/* Center line */}
			<line
				x1={w * 0.15}
				y1={h / 2}
				x2={w * 0.85}
				y2={h / 2}
				stroke={color}
				strokeWidth={1.5}
			/>

			{/* Center diamond */}
			<polygon
				points={`${mid},${h / 2 - 6} ${mid + 6},${h / 2} ${mid},${h / 2 + 6} ${mid - 6},${h / 2}`}
				fill={color}
			/>

			{/* Left curl */}
			<path
				d={`M${w * 0.15},${h / 2} C${w * 0.1},${h / 2 - 10} ${w * 0.05},${h / 2 - 8} ${w * 0.06},${h / 2 + 2}`}
				fill="none"
				stroke={color}
				strokeWidth={1.5}
			/>
			<path
				d={`M${w * 0.15},${h / 2} C${w * 0.1},${h / 2 + 10} ${w * 0.05},${h / 2 + 8} ${w * 0.06},${h / 2 - 2}`}
				fill="none"
				stroke={color}
				strokeWidth={1.5}
			/>

			{/* Right curl */}
			<path
				d={`M${w * 0.85},${h / 2} C${w * 0.9},${h / 2 - 10} ${w * 0.95},${h / 2 - 8} ${w * 0.94},${h / 2 + 2}`}
				fill="none"
				stroke={color}
				strokeWidth={1.5}
			/>
			<path
				d={`M${w * 0.85},${h / 2} C${w * 0.9},${h / 2 + 10} ${w * 0.95},${h / 2 + 8} ${w * 0.94},${h / 2 - 2}`}
				fill="none"
				stroke={color}
				strokeWidth={1.5}
			/>

			{/* Small dots along line */}
			<circle cx={mid - w * 0.15} cy={h / 2} r={2} fill={color} />
			<circle cx={mid + w * 0.15} cy={h / 2} r={2} fill={color} />
			<circle cx={mid - w * 0.3} cy={h / 2} r={1.5} fill={color} />
			<circle cx={mid + w * 0.3} cy={h / 2} r={1.5} fill={color} />
		</svg>
	);
};
