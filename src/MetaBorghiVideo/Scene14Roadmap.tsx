import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, ROADMAP_PHASES, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { GridBackground } from "./components/GridBackground";

export const Scene14Roadmap: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width } = useVideoConfig();

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

	// Timeline baseline
	const baselineDelay = Math.round(1 * fps);
	const baselineProgress = interpolate(
		frame,
		[baselineDelay, baselineDelay + Math.round(0.8 * fps)],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	const nodeDelays = [1.5 * fps, 3 * fps, 4.5 * fps];
	const progressLineEnd = Math.round(6 * fps);

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
					padding: "50px 80px",
					display: "flex",
					flexDirection: "column",
					gap: 40,
				}}
			>
				<SectionTitle
					title="Partnership e Implementazione"
					subtitle="Roadmap operativa per la digitalizzazione del territorio"
				/>

				<div
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						position: "relative",
					}}
				>
					{/* Timeline baseline */}
					<div
						style={{
							position: "relative",
							height: 4,
							backgroundColor: COLORS.bgCard,
							borderRadius: 2,
							marginBottom: 100,
							width: `${baselineProgress * 100}%`,
						}}
					>
						{/* Progress line */}
						<div
							style={{
								position: "absolute",
								left: 0,
								top: 0,
								height: "100%",
								width: `${interpolate(frame, [nodeDelays[0], progressLineEnd], [0, 100], {
									extrapolateLeft: "clamp",
									extrapolateRight: "clamp",
								})}%`,
								background: `linear-gradient(90deg, ${COLORS.techBlue}, ${COLORS.heritageGold})`,
								borderRadius: 2,
								boxShadow: `0 0 20px ${COLORS.techBlueGlow}`,
							}}
						/>
					</div>

					{/* 3 Phase nodes */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							position: "relative",
							top: -100,
						}}
					>
						{ROADMAP_PHASES.map((phase, i) => {
							const nodeSpring = spring({
								frame: Math.max(0, frame - Math.round(nodeDelays[i])),
								fps,
								config: SPRING_CONFIGS.bouncy,
								durationInFrames: Math.round(1 * fps),
							});

							return (
								<div
									key={i}
									style={{
										flex: 1,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: 16,
										opacity: nodeSpring,
									}}
								>
									{/* Node circle */}
									<div
										style={{
											width: 50,
											height: 50,
											borderRadius: "50%",
											backgroundColor: phase.color,
											border: `4px solid ${COLORS.bgDark}`,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											boxShadow: `0 0 30px ${phase.color}60`,
											transform: `scale(${nodeSpring})`,
										}}
									>
										<span
											style={{
												fontFamily: montserratFont,
												fontWeight: 800,
												fontSize: 20,
												color: COLORS.textWhite,
											}}
										>
											{i + 1}
										</span>
									</div>

									{/* Phase card */}
									<div
										style={{
											backgroundColor: COLORS.bgCard,
											padding: "24px 20px",
											borderRadius: 14,
											borderTop: `3px solid ${phase.color}`,
											width: "100%",
											maxWidth: 320,
										}}
									>
										<div
											style={{
												fontFamily: montserratFont,
												fontWeight: 700,
												fontSize: 12,
												color: phase.color,
												letterSpacing: 2,
												marginBottom: 8,
											}}
										>
											{phase.period}
										</div>
										<h3
											style={{
												fontFamily: montserratFont,
												fontWeight: 700,
												fontSize: 19,
												color: COLORS.textWhite,
												margin: "0 0 14px 0",
											}}
										>
											{phase.title}
										</h3>
										<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
											{phase.items.map((item, j) => (
												<div
													key={j}
													style={{
														display: "flex",
														alignItems: "flex-start",
														gap: 8,
													}}
												>
													<div
														style={{
															width: 5,
															height: 5,
															borderRadius: "50%",
															backgroundColor: phase.color,
															marginTop: 5,
															flexShrink: 0,
														}}
													/>
													<span
														style={{
															fontFamily: interFont,
															fontSize: 14,
															color: COLORS.textGray,
															lineHeight: 1.4,
														}}
													>
														{item}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
