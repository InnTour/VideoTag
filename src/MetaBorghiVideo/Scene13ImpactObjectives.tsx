import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, IMPACT_DIMENSIONS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { GridBackground } from "./components/GridBackground";
import { GlowOrb } from "./components/GlowOrb";

export const Scene13ImpactObjectives: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

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

	const quadrants = [
		{ x: width * 0.25, y: height * 0.35, delay: 1.5 * fps },
		{ x: width * 0.75, y: height * 0.35, delay: 2 * fps },
		{ x: width * 0.25, y: height * 0.7, delay: 2.5 * fps },
		{ x: width * 0.75, y: height * 0.7, delay: 3 * fps },
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground />

			<AbsoluteFill style={{ padding: "50px 60px" }}>
				<SectionTitle
					title="Obiettivi e Impatto Atteso"
					subtitle="Creazione di valore misurabile e sostenibile su quattro dimensioni chiave"
				/>
			</AbsoluteFill>

			{/* 4 Quadrants */}
			{IMPACT_DIMENSIONS.map((dimension, i) => {
				const quadrantSpring = spring({
					frame: Math.max(0, frame - Math.round(quadrants[i].delay)),
					fps,
					config: SPRING_CONFIGS.smooth,
					durationInFrames: Math.round(1 * fps),
				});

				return (
					<div key={i}>
						<GlowOrb
							x={quadrants[i].x}
							y={quadrants[i].y}
							size={280}
							color={dimension.color}
							speed={0.01 + i * 0.003}
						/>
						<div
							style={{
								position: "absolute",
								left: quadrants[i].x,
								top: quadrants[i].y,
								transform: "translate(-50%, -50%)",
								width: 420,
								opacity: quadrantSpring,
							}}
						>
							<div
								style={{
									backgroundColor: COLORS.bgCard,
									padding: "24px 28px",
									borderRadius: 18,
									borderTop: `4px solid ${dimension.color}`,
									boxShadow: `0 8px 40px ${dimension.color}30`,
								}}
							>
								<h3
									style={{
										fontFamily: montserratFont,
										fontWeight: 700,
										fontSize: 22,
										color: dimension.color,
										margin: "0 0 16px 0",
									}}
								>
									{dimension.title}
								</h3>
								<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
									{dimension.points.map((point, j) => (
										<div
											key={j}
											style={{
												display: "flex",
												alignItems: "flex-start",
												gap: 10,
											}}
										>
											<div
												style={{
													width: 6,
													height: 6,
													borderRadius: "50%",
													backgroundColor: dimension.color,
													marginTop: 6,
													flexShrink: 0,
												}}
											/>
											<span
												style={{
													fontFamily: interFont,
													fontSize: 15,
													color: COLORS.textGray,
													lineHeight: 1.5,
												}}
											>
												{point}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				);
			})}

			{/* Cross lines */}
			<svg
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					pointerEvents: "none",
				}}
			>
				<line
					x1="50%"
					y1="20%"
					x2="50%"
					y2="90%"
					stroke={COLORS.techBlue}
					strokeWidth={1}
					opacity={interpolate(frame, [5 * fps, 5.5 * fps], [0, 0.15], {
						extrapolateLeft: "clamp",
						extrapolateRight: "clamp",
					})}
				/>
				<line
					x1="10%"
					y1="52.5%"
					x2="90%"
					y2="52.5%"
					stroke={COLORS.techBlue}
					strokeWidth={1}
					opacity={interpolate(frame, [5 * fps, 5.5 * fps], [0, 0.15], {
						extrapolateLeft: "clamp",
						extrapolateRight: "clamp",
					})}
				/>
			</svg>
		</AbsoluteFill>
	);
};
