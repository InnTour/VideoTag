import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, GOVERNANCE_STAKES, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { GridBackground } from "./components/GridBackground";

export const Scene09GovernanceTransition: React.FC = () => {
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

	const radius = 100;
	const center = { x: 200, y: 200 };

	// Calculate arc paths
	const createArc = (percentage: number, startAngle: number) => {
		const angle = (percentage / 100) * 360;
		const endAngle = startAngle + angle;
		const start = polarToCartesian(center.x, center.y, radius, startAngle);
		const end = polarToCartesian(center.x, center.y, radius, endAngle);
		const largeArc = angle > 180 ? 1 : 0;
		return {
			d: `M ${center.x} ${center.y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`,
			endAngle,
		};
	};

	function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians),
		};
	}

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
				<SectionTitle
					title="Evoluzione della Sovranità Territoriale"
					subtitle="Transizione graduale dal controllo tecnico alla sovranità territoriale"
				/>

				<div
					style={{
						display: "flex",
						gap: 100,
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{/* Year 1 Pie */}
					{[{ year: "Anno 1", key: "yearOne" as const, delay: 1.5 * fps }, { year: "Anno 5+", key: "yearFive" as const, delay: 3 * fps }].map((yearData, yearIdx) => {
						let currentAngle = 0;
						return (
							<div key={yearIdx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
								<h3
									style={{
										fontFamily: montserratFont,
										fontWeight: 700,
										fontSize: 28,
										color: yearIdx === 0 ? COLORS.danger : COLORS.natureGreen,
										margin: 0,
									}}
								>
									{yearData.year}
								</h3>

								<svg width="400" height="400" viewBox="0 0 400 400">
									{GOVERNANCE_STAKES.map((stake, i) => {
										const percentage = stake[yearData.key];
										const arc = createArc(percentage, currentAngle);
										currentAngle = arc.endAngle;

										const sliceProgress = interpolate(
											frame,
											[Math.round(yearData.delay) + i * 15, Math.round(yearData.delay) + i * 15 + 40],
											[0, 1],
											{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
										);

										return (
											<path
												key={i}
												d={arc.d}
												fill={stake.color}
												opacity={sliceProgress * 0.85}
												stroke={COLORS.bgDark}
												strokeWidth={2}
											/>
										);
									})}
								</svg>

								{/* Legend */}
								<div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
									{GOVERNANCE_STAKES.map((stake, i) => {
										const legendOpacity = interpolate(
											frame,
											[Math.round(yearData.delay) + i * 15 + 20, Math.round(yearData.delay) + i * 15 + 35],
											[0, 1],
											{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
										);
										return (
											<div
												key={i}
												style={{
													display: "flex",
													alignItems: "center",
													gap: 10,
													opacity: legendOpacity,
												}}
											>
												<div
													style={{
														width: 16,
														height: 16,
														borderRadius: 3,
														backgroundColor: stake.color,
													}}
												/>
												<span
													style={{
														fontFamily: interFont,
														fontSize: 14,
														color: COLORS.textGray,
														flex: 1,
													}}
												>
													{stake.stakeholder}
												</span>
												<span
													style={{
														fontFamily: montserratFont,
														fontWeight: 700,
														fontSize: 16,
														color: stake.color,
													}}
												>
													{stake[yearData.key]}%
												</span>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				{/* Arrow between charts */}
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<svg width="150" height="80" viewBox="0 0 150 80">
						<path
							d="M10 40 L110 40 M110 40 L95 30 M110 40 L95 50"
							fill="none"
							stroke={COLORS.natureGreen}
							strokeWidth={3}
							strokeLinecap="round"
							opacity={interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							})}
						/>
					</svg>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
