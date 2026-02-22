import React from 'react';
import {COLORS} from '../constants';

export const TownSilhouette: React.FC<{
	width?: number;
	height?: number;
	color?: string;
	showDetails?: boolean;
}> = ({
	width = 800,
	height = 300,
	color = COLORS.textDark,
	showDetails = true,
}) => {
	const w = width;
	const h = height;
	const baseY = h * 0.95;

	return (
		<svg
			width={w}
			height={h}
			viewBox={`0 0 ${w} ${h}`}
			style={{display: 'block'}}
		>
			{/* Hill base */}
			<ellipse
				cx={w * 0.5}
				cy={baseY + 20}
				rx={w * 0.55}
				ry={h * 0.18}
				fill={color}
				opacity={0.4}
			/>

			{/* Buildings cluster - left side */}
			<rect
				x={w * 0.15}
				y={baseY - h * 0.3}
				width={w * 0.06}
				height={h * 0.3}
				fill={color}
			/>
			<rect
				x={w * 0.22}
				y={baseY - h * 0.38}
				width={w * 0.07}
				height={h * 0.38}
				fill={color}
			/>
			<rect
				x={w * 0.3}
				y={baseY - h * 0.25}
				width={w * 0.05}
				height={h * 0.25}
				fill={color}
			/>

			{/* Church / Bell tower - center */}
			<rect
				x={w * 0.44}
				y={baseY - h * 0.55}
				width={w * 0.04}
				height={h * 0.55}
				fill={color}
			/>
			{/* Bell tower top - triangular */}
			<polygon
				points={`${w * 0.43},${baseY - h * 0.55} ${w * 0.46},${baseY - h * 0.68} ${w * 0.49},${baseY - h * 0.55}`}
				fill={color}
			/>
			{/* Cross on top */}
			{showDetails && (
				<>
					<line
						x1={w * 0.46}
						y1={baseY - h * 0.68}
						x2={w * 0.46}
						y2={baseY - h * 0.75}
						stroke={color}
						strokeWidth={2}
					/>
					<line
						x1={w * 0.445}
						y1={baseY - h * 0.72}
						x2={w * 0.475}
						y2={baseY - h * 0.72}
						stroke={color}
						strokeWidth={2}
					/>
				</>
			)}

			{/* Church body */}
			<rect
				x={w * 0.38}
				y={baseY - h * 0.4}
				width={w * 0.12}
				height={h * 0.4}
				fill={color}
			/>

			{/* Buildings cluster - right side */}
			<rect
				x={w * 0.52}
				y={baseY - h * 0.32}
				width={w * 0.06}
				height={h * 0.32}
				fill={color}
			/>
			<rect
				x={w * 0.59}
				y={baseY - h * 0.42}
				width={w * 0.08}
				height={h * 0.42}
				fill={color}
			/>
			<rect
				x={w * 0.68}
				y={baseY - h * 0.28}
				width={w * 0.05}
				height={h * 0.28}
				fill={color}
			/>
			<rect
				x={w * 0.74}
				y={baseY - h * 0.35}
				width={w * 0.07}
				height={h * 0.35}
				fill={color}
			/>

			{/* Small houses */}
			<rect
				x={w * 0.08}
				y={baseY - h * 0.18}
				width={w * 0.05}
				height={h * 0.18}
				fill={color}
			/>
			<rect
				x={w * 0.82}
				y={baseY - h * 0.2}
				width={w * 0.06}
				height={h * 0.2}
				fill={color}
			/>

			{/* Window details */}
			{showDetails && (
				<>
					<rect x={w * 0.24} y={baseY - h * 0.32} width={3} height={4} fill={COLORS.amber} opacity={0.6} />
					<rect x={w * 0.26} y={baseY - h * 0.32} width={3} height={4} fill={COLORS.amber} opacity={0.6} />
					<rect x={w * 0.61} y={baseY - h * 0.36} width={3} height={4} fill={COLORS.amber} opacity={0.6} />
					<rect x={w * 0.64} y={baseY - h * 0.36} width={3} height={4} fill={COLORS.amber} opacity={0.6} />
					<rect x={w * 0.76} y={baseY - h * 0.28} width={3} height={4} fill={COLORS.amber} opacity={0.6} />
				</>
			)}
		</svg>
	);
};
