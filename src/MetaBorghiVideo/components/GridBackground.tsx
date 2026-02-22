import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { AbsoluteFill } from "remotion";

export const GridBackground: React.FC<{
	lineColor?: string;
	lineOpacity?: number;
	spacing?: number;
}> = ({
	lineColor = "#1e3a5f",
	lineOpacity = 0.15,
	spacing = 60,
}) => {
	const frame = useCurrentFrame();
	const pulse = interpolate(
		Math.sin(frame * 0.03),
		[-1, 1],
		[lineOpacity * 0.6, lineOpacity],
	);

	return (
		<AbsoluteFill style={{ pointerEvents: "none" }}>
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern
						id="grid"
						width={spacing}
						height={spacing}
						patternUnits="userSpaceOnUse"
					>
						<path
							d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
							fill="none"
							stroke={lineColor}
							strokeWidth={0.5}
							opacity={pulse}
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
		</AbsoluteFill>
	);
};
