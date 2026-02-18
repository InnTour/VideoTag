import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { montserratFont, interFont, COLORS, SPRING_CONFIGS } from "../constants";

export const SectionTitle: React.FC<{
	title: string;
	subtitle?: string;
	delay?: number;
	accentColor?: string;
}> = ({
	title,
	subtitle,
	delay = 15,
	accentColor = COLORS.techBlue,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const titleSpring = spring({
		frame: Math.max(0, frame - delay),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1 * fps),
	});

	const lineWidth = interpolate(
		frame,
		[delay + 5, delay + 35],
		[0, 200],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	const subtitleOpacity = interpolate(
		frame,
		[delay + 20, delay + 40],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 12,
				opacity: titleSpring,
				transform: `translateY(${(1 - titleSpring) * 20}px)`,
			}}
		>
			<h2
				style={{
					fontFamily: montserratFont,
					fontWeight: 800,
					fontSize: 42,
					color: COLORS.textWhite,
					letterSpacing: 6,
					textTransform: "uppercase",
					margin: 0,
				}}
			>
				{title}
			</h2>
			<div
				style={{
					width: lineWidth,
					height: 3,
					background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
					borderRadius: 2,
				}}
			/>
			{subtitle && (
				<p
					style={{
						fontFamily: interFont,
						fontWeight: 400,
						fontSize: 20,
						color: COLORS.textGray,
						margin: 0,
						opacity: subtitleOpacity,
					}}
				>
					{subtitle}
				</p>
			)}
		</div>
	);
};
