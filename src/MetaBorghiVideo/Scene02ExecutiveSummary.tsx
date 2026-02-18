import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { interFont, COLORS, KEY_STATS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { StatCard } from "./components/StatCard";
import { GridBackground } from "./components/GridBackground";
import { GlowOrb } from "./components/GlowOrb";

export const Scene02ExecutiveSummary: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	const entryFade = interpolate(frame, [0, 0.5 * fps], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const exitFade = interpolate(
		frame,
		[durationInFrames - 0.5 * fps, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);
	const sceneOpacity = Math.min(entryFade, exitFade);

	// Description text word-by-word reveal
	const descriptionWords = "La prima OTA verticale end-to-end dedicata esclusivamente alle aree interne italiane".split(" ");
	const descWordStart = Math.round(1.2 * fps);

	// OTA features
	const features = [
		"Discovery Immersiva",
		"Booking Completo",
		"Marketplace Locale",
		"Governance DAO",
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground lineOpacity={0.08} />
			<GlowOrb x={960} y={300} size={500} color={COLORS.techBlue} speed={0.01} />

			<AbsoluteFill
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "60px 100px",
					gap: 30,
				}}
			>
				<SectionTitle title="Sintesi Esecutiva" accentColor={COLORS.techBlue} />

				{/* Description */}
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: 8,
						maxWidth: 900,
						marginTop: 10,
					}}
				>
					{descriptionWords.map((word, i) => {
						const wordOpacity = interpolate(
							frame,
							[descWordStart + i * 3, descWordStart + i * 3 + 6],
							[0, 1],
							{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
						);
						return (
							<span
								key={i}
								style={{
									fontFamily: interFont,
									fontWeight: 400,
									fontSize: 24,
									color: COLORS.textWhite,
									opacity: wordOpacity,
								}}
							>
								{word}
							</span>
						);
					})}
				</div>

				{/* Features row */}
				<div
					style={{
						display: "flex",
						gap: 24,
						marginTop: 10,
					}}
				>
					{features.map((feat, i) => {
						const featSpring = spring({
							frame: Math.max(0, frame - Math.round(2.2 * fps) - i * 8),
							fps,
							config: SPRING_CONFIGS.smooth,
							durationInFrames: Math.round(0.8 * fps),
						});
						return (
							<div
								key={i}
								style={{
									padding: "8px 20px",
									borderRadius: 20,
									border: `1px solid ${COLORS.techBlue}40`,
									backgroundColor: `${COLORS.techBlue}10`,
									opacity: featSpring,
									transform: `scale(${0.8 + featSpring * 0.2})`,
								}}
							>
								<span
									style={{
										fontFamily: interFont,
										fontWeight: 500,
										fontSize: 15,
										color: COLORS.techBlueBright,
									}}
								>
									{feat}
								</span>
							</div>
						);
					})}
				</div>

				{/* Stats row */}
				<div
					style={{
						display: "flex",
						gap: 30,
						marginTop: 30,
					}}
				>
					{KEY_STATS.map((stat, i) => (
						<StatCard
							key={i}
							stat={stat}
							delay={Math.round(3 * fps) + i * 15}
							color={
								i === 0
									? COLORS.techBlue
									: i === 1
										? COLORS.natureGreen
										: i === 2
											? COLORS.heritageGold
											: COLORS.accent
							}
						/>
					))}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
