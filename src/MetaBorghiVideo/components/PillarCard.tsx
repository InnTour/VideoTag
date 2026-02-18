import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { montserratFont, interFont, COLORS, SPRING_CONFIGS } from "../constants";

export const PillarCard: React.FC<{
	title: string;
	subtitle: string;
	accentColor: string;
	delay: number;
	width?: number;
	features?: string[];
}> = ({
	title,
	subtitle,
	accentColor,
	delay,
	width = 400,
	features,
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
				gap: 10,
				padding: "24px 28px",
				backgroundColor: COLORS.bgCard,
				borderRadius: 14,
				borderLeft: `4px solid ${accentColor}`,
				opacity: cardSpring,
				transform: `translateY(${(1 - cardSpring) * 30}px)`,
				width,
			}}
		>
			<h3
				style={{
					fontFamily: montserratFont,
					fontWeight: 700,
					fontSize: 22,
					color: COLORS.textWhite,
					margin: 0,
				}}
			>
				{title}
			</h3>
			<p
				style={{
					fontFamily: interFont,
					fontWeight: 400,
					fontSize: 16,
					color: COLORS.textGray,
					margin: 0,
					lineHeight: 1.4,
				}}
			>
				{subtitle}
			</p>
			{features && (
				<div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
					{features.map((f, i) => (
						<div
							key={i}
							style={{
								fontFamily: interFont,
								fontWeight: 400,
								fontSize: 14,
								color: COLORS.textMuted,
								paddingLeft: 12,
								borderLeft: `2px solid ${accentColor}44`,
							}}
						>
							{f}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
