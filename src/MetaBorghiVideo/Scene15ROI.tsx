import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { GridBackground } from "./components/GridBackground";
import { GlowOrb } from "./components/GlowOrb";

export const Scene15ROI: React.FC = () => {
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

	// ROI multiplier
	const roiSpring = spring({
		frame: Math.max(0, frame - Math.round(1.5 * fps)),
		fps,
		config: SPRING_CONFIGS.bouncy,
		durationInFrames: Math.round(1.5 * fps),
	});

	// Contribution table
	const contributions = [
		{ size: "Comuni < 1.500 ab.", amount: 6000, color: COLORS.techBlue },
		{ size: "Comuni 1.500-5.000 ab.", amount: 8000, color: COLORS.natureGreen },
		{ size: "Comuni > 5.000 ab.", amount: 10000, color: COLORS.heritageGold },
	];

	// Bar chart years
	const years = [1, 2, 3, 4, 5];
	const barChartDelay = Math.round(3.5 * fps);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground />
			<GlowOrb x={960} y={540} size={600} color={COLORS.heritageGold} speed={0.01} />

			<AbsoluteFill
				style={{
					padding: "50px 80px",
					display: "flex",
					flexDirection: "column",
					gap: 30,
				}}
			>
				<SectionTitle
					title="Impegno Economico e ROI"
					subtitle="Sostenibilità finanziaria e ritorno sull'investimento garantito"
				/>

				<div
					style={{
						display: "flex",
						gap: 60,
						flex: 1,
						alignItems: "center",
					}}
				>
					{/* Left: ROI Multiplier */}
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 20,
						}}
					>
						<div
							style={{
								opacity: roiSpring,
								transform: `scale(${roiSpring})`,
							}}
						>
							<div
								style={{
									fontFamily: interFont,
									fontSize: 16,
									color: COLORS.textGray,
									letterSpacing: 3,
									marginBottom: 12,
									textTransform: "uppercase",
									textAlign: "center",
								}}
							>
								Moltiplicatore
							</div>
							<div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
								<AnimatedCounter
									value={3.86}
									startFrame={Math.round(1.5 * fps)}
									duration={90}
									decimals={2}
									fontSize={96}
									color={COLORS.heritageGold}
								/>
								<span
									style={{
										fontFamily: montserratFont,
										fontWeight: 700,
										fontSize: 48,
										color: COLORS.heritageGold,
									}}
								>
									x
								</span>
							</div>
							<div
								style={{
									fontFamily: interFont,
									fontSize: 15,
									color: COLORS.textGray,
									textAlign: "center",
									marginTop: 12,
									maxWidth: 360,
								}}
							>
								Ogni 1€ investito dall'Ente genera 3,86€ di valore diretto sul territorio
							</div>
						</div>

						{/* Contribution table */}
						<div
							style={{
								marginTop: 30,
								width: "100%",
								maxWidth: 450,
							}}
						>
							<div
								style={{
									fontFamily: montserratFont,
									fontWeight: 700,
									fontSize: 14,
									color: COLORS.textGray,
									letterSpacing: 2,
									marginBottom: 14,
									textTransform: "uppercase",
								}}
							>
								Contribuzione Annuale
							</div>
							{contributions.map((contrib, i) => {
								const rowOpacity = interpolate(
									frame,
									[2.5 * fps + i * 15, 2.5 * fps + i * 15 + 20],
									[0, 1],
									{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
								);
								return (
									<div
										key={i}
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											padding: "12px 16px",
											backgroundColor: COLORS.bgCard,
											borderRadius: 8,
											marginBottom: 8,
											opacity: rowOpacity,
											borderLeft: `4px solid ${contrib.color}`,
										}}
									>
										<span
											style={{
												fontFamily: interFont,
												fontSize: 15,
												color: COLORS.textWhite,
											}}
										>
											{contrib.size}
										</span>
										<span
											style={{
												fontFamily: montserratFont,
												fontWeight: 700,
												fontSize: 18,
												color: contrib.color,
											}}
										>
											€{contrib.amount.toLocaleString("it-IT")}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Right: Bar chart (5 years) */}
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							gap: 16,
						}}
					>
						<div
							style={{
								fontFamily: montserratFont,
								fontWeight: 700,
								fontSize: 18,
								color: COLORS.textWhite,
								letterSpacing: 1,
								marginBottom: 10,
							}}
						>
							Crescita Valore Generato (5 Anni)
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "flex-end",
								gap: 20,
								height: 280,
							}}
						>
							{years.map((year, i) => {
								const barHeight = 40 + i * 60;
								const barProgress = interpolate(
									frame,
									[barChartDelay + i * 15, barChartDelay + i * 15 + 50],
									[0, 1],
									{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
								);
								return (
									<div
										key={i}
										style={{
											flex: 1,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: 10,
										}}
									>
										<div
											style={{
												width: "100%",
												height: barHeight * barProgress,
												background: `linear-gradient(180deg, ${COLORS.heritageGold}, ${COLORS.techBlue})`,
												borderRadius: "8px 8px 0 0",
												boxShadow: `0 0 20px ${COLORS.heritageGold}40`,
											}}
										/>
										<span
											style={{
												fontFamily: montserratFont,
												fontWeight: 700,
												fontSize: 16,
												color: COLORS.textWhite,
											}}
										>
											Anno {year}
										</span>
									</div>
								);
							})}
						</div>

						{/* 5-year badge */}
						<div
							style={{
								marginTop: 20,
								padding: "14px 28px",
								borderRadius: 30,
								border: `2px solid ${COLORS.natureGreen}`,
								backgroundColor: `${COLORS.natureGreen}15`,
								textAlign: "center",
								opacity: interpolate(frame, [5.5 * fps, 6 * fps], [0, 1], {
									extrapolateLeft: "clamp",
									extrapolateRight: "clamp",
								}),
							}}
						>
							<span
								style={{
									fontFamily: montserratFont,
									fontWeight: 700,
									fontSize: 16,
									color: COLORS.natureGreen,
									letterSpacing: 2,
								}}
							>
								Impegno Pluriennale (5 Anni)
							</span>
						</div>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
