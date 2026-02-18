import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, SIX_PILLARS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { PillarCard } from "./components/PillarCard";
import { GridBackground } from "./components/GridBackground";

export const Scene06PillarsOfInnovation: React.FC = () => {
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

	const groups = [
		{ key: "techAccessibility", data: SIX_PILLARS.techAccessibility, startFrame: 1.5 * fps },
		{ key: "qualityAuthenticity", data: SIX_PILLARS.qualityAuthenticity, startFrame: 3.5 * fps },
		{ key: "economyGovernance", data: SIX_PILLARS.economyGovernance, startFrame: 5.5 * fps },
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground lineOpacity={0.08} />

			<AbsoluteFill
				style={{
					padding: "50px 60px",
					display: "flex",
					flexDirection: "column",
					gap: 35,
				}}
			>
				<SectionTitle title="I 6 Pilastri dell'Innovazione" />

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 35,
						flex: 1,
						justifyContent: "center",
					}}
				>
					{groups.map((group, groupIdx) => {
						const labelSpring = spring({
							frame: Math.max(0, frame - Math.round(group.startFrame)),
							fps,
							config: SPRING_CONFIGS.smooth,
							durationInFrames: Math.round(0.8 * fps),
						});

						return (
							<div key={group.key} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
								{/* Group label */}
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: 12,
										opacity: labelSpring,
									}}
								>
									<div
										style={{
											width: 8,
											height: 8,
											borderRadius: "50%",
											backgroundColor: group.data.color,
											boxShadow: `0 0 20px ${group.data.color}`,
										}}
									/>
									<span
										style={{
											fontFamily: montserratFont,
											fontWeight: 700,
											fontSize: 18,
											color: group.data.color,
											letterSpacing: 3,
											textTransform: "uppercase",
										}}
									>
										{group.data.label}
									</span>
								</div>

								{/* Two pillars */}
								<div style={{ display: "flex", gap: 30 }}>
									{group.data.pillars.map((pillar, i) => (
										<PillarCard
											key={i}
											title={pillar.title}
											subtitle=""
											accentColor={group.data.color}
											delay={Math.round(group.startFrame) + 12 + i * 15}
											width={580}
											features={pillar.features}
										/>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
