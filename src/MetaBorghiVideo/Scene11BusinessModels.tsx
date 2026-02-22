import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, BUSINESS_MODELS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { GridBackground } from "./components/GridBackground";

export const Scene11BusinessModels: React.FC = () => {
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
					title="Segmenti di Mercato & Modelli di Business"
					subtitle="Sostenibilità economica diversificata per creare valore condiviso"
				/>

				<div
					style={{
						display: "flex",
						gap: 40,
						flex: 1,
						alignItems: "stretch",
						justifyContent: "center",
					}}
				>
					{BUSINESS_MODELS.map((model, i) => {
						const cardDelay = Math.round(1.5 * fps) + i * 25;
						const cardSpring = spring({
							frame: Math.max(0, frame - cardDelay),
							fps,
							config: SPRING_CONFIGS.smooth,
							durationInFrames: Math.round(1.2 * fps),
						});

						return (
							<div
								key={i}
								style={{
									flex: 1,
									backgroundColor: COLORS.bgCard,
									borderRadius: 20,
									borderTop: `5px solid ${model.color}`,
									padding: "32px 24px",
									display: "flex",
									flexDirection: "column",
									gap: 20,
									opacity: cardSpring,
									transform: `translateY(${(1 - cardSpring) * 60}px)`,
									boxShadow: `0 0 40px ${model.color}20`,
								}}
							>
								{/* Icon */}
								<div
									style={{
										width: 70,
										height: 70,
										borderRadius: "50%",
										background: `linear-gradient(135deg, ${model.color}, ${model.color}cc)`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										marginBottom: 4,
										boxShadow: `0 8px 24px ${model.color}40`,
									}}
								>
									<span
										style={{
											fontFamily: montserratFont,
											fontWeight: 800,
											fontSize: 28,
											color: COLORS.textWhite,
										}}
									>
										{model.segment}
									</span>
								</div>

								{/* Label */}
								<div>
									<h3
										style={{
											fontFamily: montserratFont,
											fontWeight: 700,
											fontSize: 22,
											color: model.color,
											margin: 0,
										}}
									>
										{model.label}
									</h3>
								</div>

								{/* Features */}
								<div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
									{model.features.map((feature, j) => (
										<div
											key={j}
											style={{
												display: "flex",
												alignItems: "center",
												gap: 10,
											}}
										>
											<div
												style={{
													width: 6,
													height: 6,
													borderRadius: "50%",
													backgroundColor: model.color,
												}}
											/>
											<span
												style={{
													fontFamily: interFont,
													fontSize: 15,
													color: COLORS.textGray,
												}}
											>
												{feature}
											</span>
										</div>
									))}
								</div>

								{/* Revenue model */}
								<div
									style={{
										padding: "16px 20px",
										borderRadius: 12,
										backgroundColor: `${model.color}15`,
										border: `1px solid ${model.color}40`,
										marginTop: "auto",
									}}
								>
									<div
										style={{
											fontFamily: interFont,
											fontSize: 11,
											color: COLORS.textMuted,
											letterSpacing: 1.5,
											marginBottom: 6,
											textTransform: "uppercase",
										}}
									>
										{model.revenueLabel}
									</div>
									<div
										style={{
											fontFamily: montserratFont,
											fontWeight: 700,
											fontSize: 18,
											color: model.color,
										}}
									>
										{model.revenue}
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
