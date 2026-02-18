import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, PNRR_MISSIONS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { GridBackground } from "./components/GridBackground";

export const Scene12PNRRAlignment: React.FC = () => {
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

	// Central badge
	const centerDelay = Math.round(1 * fps);
	const centerSpring = spring({
		frame: Math.max(0, frame - centerDelay),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1 * fps),
	});

	const positions = [
		{ x: -280, y: -180 },
		{ x: 280, y: -180 },
		{ x: -280, y: 180 },
		{ x: 280, y: 180 },
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground />

			<AbsoluteFill
				style={{
					padding: "50px 60px",
					display: "flex",
					flexDirection: "column",
					gap: 30,
				}}
			>
				<SectionTitle title="Allineamento PNRR" subtitle="Piano Nazionale di Ripresa e Resilienza" />

				<div
					style={{
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
					}}
				>
					{/* Central PNRR badge */}
					<div
						style={{
							width: 180,
							height: 180,
							borderRadius: "50%",
							background: `linear-gradient(135deg, ${COLORS.techBlue}, ${COLORS.heritageGold})`,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 10,
							opacity: centerSpring,
							transform: `scale(${centerSpring})`,
							boxShadow: `0 0 60px ${COLORS.techBlueGlow}`,
							border: `4px solid ${COLORS.bgDark}`,
						}}
					>
						<span
							style={{
								fontFamily: montserratFont,
								fontWeight: 800,
								fontSize: 32,
								color: COLORS.textWhite,
								letterSpacing: 2,
							}}
						>
							PNRR
						</span>
						<span
							style={{
								fontFamily: interFont,
								fontSize: 13,
								color: COLORS.textWhite,
								opacity: 0.9,
							}}
						>
							Italia 2026
						</span>
					</div>

					{/* 4 Mission badges */}
					{PNRR_MISSIONS.map((mission, i) => {
						const badgeDelay = Math.round(2 * fps) + i * 20;
						const badgeSpring = spring({
							frame: Math.max(0, frame - badgeDelay),
							fps,
							config: SPRING_CONFIGS.smooth,
							durationInFrames: Math.round(1 * fps),
						});

						const lineProgress = interpolate(
							frame,
							[badgeDelay - 10, badgeDelay + 20],
							[0, 1],
							{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
						);

						const pos = positions[i];
						const angle = Math.atan2(pos.y, pos.x);
						const lineLength = Math.sqrt(pos.x ** 2 + pos.y ** 2) - 90;

						return (
							<div key={i} style={{ position: "absolute", left: "50%", top: "50%" }}>
								{/* Connection line */}
								<div
									style={{
										position: "absolute",
										width: lineLength * lineProgress,
										height: 2,
										backgroundColor: mission.color,
										transformOrigin: "0 50%",
										transform: `rotate(${angle}rad)`,
										opacity: 0.4,
									}}
								/>

								{/* Mission badge */}
								<div
									style={{
										position: "absolute",
										left: pos.x,
										top: pos.y,
										transform: "translate(-50%, -50%)",
										width: 280,
										backgroundColor: COLORS.bgCard,
										padding: "20px 24px",
										borderRadius: 16,
										borderTop: `4px solid ${mission.color}`,
										opacity: badgeSpring,
										boxShadow: `0 8px 32px ${mission.color}30`,
									}}
								>
									<div
										style={{
											fontFamily: montserratFont,
											fontWeight: 800,
											fontSize: 14,
											color: mission.color,
											letterSpacing: 2,
											marginBottom: 8,
										}}
									>
										{mission.code}
									</div>
									<div
										style={{
											fontFamily: montserratFont,
											fontWeight: 700,
											fontSize: 17,
											color: COLORS.textWhite,
											marginBottom: 8,
										}}
									>
										{mission.title}
									</div>
									<div
										style={{
											fontFamily: interFont,
											fontSize: 14,
											color: COLORS.textGray,
											lineHeight: 1.3,
										}}
									>
										{mission.description}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
