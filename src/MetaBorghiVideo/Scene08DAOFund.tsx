import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, poppinsFont, COLORS, DAO_FUND_SOURCES, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { GridBackground } from "./components/GridBackground";

export const Scene08DAOFund: React.FC = () => {
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

	const total = DAO_FUND_SOURCES.reduce((sum, s) => sum + s.amount, 0);

	// Total badge
	const totalBadgeSpring = spring({
		frame: Math.max(0, frame - Math.round(5 * fps)),
		fps,
		config: SPRING_CONFIGS.bouncy,
		durationInFrames: Math.round(1 * fps),
	});

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
					title="Fondo DAO: 5 Fonti di Alimentazione"
					subtitle="Modello di sostenibilità diversificato (Proiezione 5 Anni)"
				/>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 20,
						flex: 1,
						justifyContent: "center",
					}}
				>
					{DAO_FUND_SOURCES.map((source, i) => {
						const barStart = Math.round(1.5 * fps) + i * 24;
						const barProgress = interpolate(
							frame,
							[barStart, barStart + 60],
							[0, 1],
							{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
						);
						const maxWidth = 900;
						const barWidth = barProgress * maxWidth * (source.amount / DAO_FUND_SOURCES[0].amount);

						return (
							<div
								key={i}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 20,
									opacity: barProgress,
								}}
							>
								{/* Label */}
								<div
									style={{
										flex: "0 0 220px",
										fontFamily: interFont,
										fontWeight: 600,
										fontSize: 17,
										color: COLORS.textWhite,
									}}
								>
									{source.label}
								</div>

								{/* Bar */}
								<div
									style={{
										flex: 1,
										height: 50,
										backgroundColor: COLORS.bgCard,
										borderRadius: 10,
										overflow: "hidden",
										position: "relative",
									}}
								>
									<div
										style={{
											position: "absolute",
											left: 0,
											top: 0,
											width: barWidth,
											height: "100%",
											background: `linear-gradient(90deg, ${source.color}, ${source.color}cc)`,
											borderRadius: 10,
											boxShadow: `0 0 20px ${source.color}60`,
										}}
									/>
									<div
										style={{
											position: "absolute",
											left: 16,
											top: "50%",
											transform: "translateY(-50%)",
											display: "flex",
											alignItems: "center",
											gap: 8,
										}}
									>
										<span
											style={{
												fontFamily: poppinsFont,
												fontWeight: 700,
												fontSize: 22,
												color: COLORS.textWhite,
												textShadow: "0 2px 4px rgba(0,0,0,0.5)",
											}}
										>
											€
										</span>
										<AnimatedCounter
											value={source.amount}
											startFrame={barStart}
											duration={60}
											fontSize={22}
											color={COLORS.textWhite}
										/>
									</div>
								</div>

								{/* Percentage */}
								<div
									style={{
										flex: "0 0 80px",
										fontFamily: poppinsFont,
										fontWeight: 600,
										fontSize: 18,
										color: source.color,
									}}
								>
									{Math.round((source.amount / total) * 100)}%
								</div>
							</div>
						);
					})}
				</div>

				{/* Total */}
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginTop: 10,
					}}
				>
					<div
						style={{
							padding: "20px 50px",
							borderRadius: 16,
							background: `linear-gradient(135deg, ${COLORS.heritageGold}, ${COLORS.techBlue})`,
							opacity: totalBadgeSpring,
							transform: `scale(${0.85 + totalBadgeSpring * 0.15})`,
							boxShadow: `0 8px 40px ${COLORS.heritageGold}60`,
							display: "flex",
							alignItems: "center",
							gap: 16,
						}}
					>
						<span
							style={{
								fontFamily: montserratFont,
								fontWeight: 800,
								fontSize: 18,
								color: COLORS.textWhite,
								letterSpacing: 2,
								textTransform: "uppercase",
							}}
						>
							Totale Fondo DAO
						</span>
						<div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
							<span
								style={{
									fontFamily: poppinsFont,
									fontWeight: 300,
									fontSize: 24,
									color: COLORS.textWhite,
								}}
							>
								€
							</span>
							<AnimatedCounter
								value={total}
								startFrame={Math.round(5 * fps)}
								duration={90}
								fontSize={36}
								color={COLORS.textWhite}
							/>
						</div>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
