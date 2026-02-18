import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { interFont, COLORS, SPRING_CONFIGS } from "../constants";
import type { StatItem } from "../types";

export const StatCard: React.FC<{
	stat: StatItem;
	delay: number;
	color?: string;
	counterStart?: number;
}> = ({
	stat,
	delay,
	color = COLORS.techBlue,
	counterStart,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const cardSpring = spring({
		frame: Math.max(0, frame - delay),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1 * fps),
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 8,
				padding: "24px 32px",
				backgroundColor: COLORS.bgCard,
				borderRadius: 16,
				borderTop: `3px solid ${color}`,
				opacity: cardSpring,
				transform: `translateY(${(1 - cardSpring) * 40}px) scale(${0.8 + cardSpring * 0.2})`,
				minWidth: 200,
			}}
		>
			<AnimatedCounter
				value={stat.value}
				startFrame={counterStart ?? delay + 10}
				duration={75}
				prefix={stat.prefix}
				suffix={stat.suffix}
				fontSize={56}
				color={color}
			/>
			<span
				style={{
					fontFamily: interFont,
					fontWeight: 500,
					fontSize: 14,
					color: COLORS.textGray,
					letterSpacing: 2,
					textTransform: "uppercase",
				}}
			>
				{stat.label}
			</span>
		</div>
	);
};
