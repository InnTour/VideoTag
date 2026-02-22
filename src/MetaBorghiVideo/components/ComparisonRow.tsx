import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { interFont, COLORS, SPRING_CONFIGS } from "../constants";

export const ComparisonRow: React.FC<{
	feature: string;
	metaborghi: string;
	traditional: string;
	delay: number;
}> = ({ feature, metaborghi, traditional, delay }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const rowSpring = spring({
		frame: Math.max(0, frame - delay),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1 * fps),
	});

	const slideX = interpolate(rowSpring, [0, 1], [-60, 0]);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 0,
				opacity: rowSpring,
				transform: `translateX(${slideX}px)`,
				backgroundColor: COLORS.bgCard,
				borderRadius: 10,
				overflow: "hidden",
				marginBottom: 6,
			}}
		>
			<div
				style={{
					flex: "0 0 340px",
					padding: "14px 20px",
					fontFamily: interFont,
					fontWeight: 600,
					fontSize: 17,
					color: COLORS.textWhite,
				}}
			>
				{feature}
			</div>
			<div
				style={{
					flex: 1,
					padding: "14px 20px",
					fontFamily: interFont,
					fontWeight: 500,
					fontSize: 16,
					color: COLORS.danger,
					textAlign: "center",
					backgroundColor: `${COLORS.danger}10`,
				}}
			>
				✗ {traditional}
			</div>
			<div
				style={{
					flex: 1,
					padding: "14px 20px",
					fontFamily: interFont,
					fontWeight: 600,
					fontSize: 16,
					color: COLORS.natureGreen,
					textAlign: "center",
					backgroundColor: `${COLORS.natureGreen}15`,
				}}
			>
				✓ {metaborghi}
			</div>
		</div>
	);
};
