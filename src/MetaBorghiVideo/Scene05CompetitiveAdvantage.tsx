import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, COMPARISON_DATA, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { ComparisonRow } from "./components/ComparisonRow";
import { GridBackground } from "./components/GridBackground";

export const Scene05CompetitiveAdvantage: React.FC = () => {
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

	// Table header
	const headerDelay = Math.round(1 * fps);
	const headerSpring = spring({
		frame: Math.max(0, frame - headerDelay),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(0.8 * fps),
	});

	// Summary badge
	const summaryDelay = Math.round(5.5 * fps);
	const summarySpring = spring({
		frame: Math.max(0, frame - summaryDelay),
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
					padding: "50px 60px",
					display: "flex",
					flexDirection: "column",
					gap: 30,
				}}
			>
				<SectionTitle title="Vantaggio Competitivo" subtitle="MetaBorghi vs OTA Tradizionali" />

				{/* Table header */}
				<div
					style={{
						display: "flex",
						gap: 0,
						marginTop: 20,
						opacity: headerSpring,
					}}
				>
					<div
						style={{
							flex: "0 0 340px",
							padding: "12px 20px",
							fontFamily: montserratFont,
							fontWeight: 700,
							fontSize: 14,
							color: COLORS.textGray,
							letterSpacing: 2,
							textTransform: "uppercase",
						}}
					>
						Caratteristica
					</div>
					<div
						style={{
							flex: 1,
							padding: "12px 20px",
							fontFamily: montserratFont,
							fontWeight: 700,
							fontSize: 14,
							color: COLORS.textGray,
							letterSpacing: 2,
							textTransform: "uppercase",
							textAlign: "center",
							backgroundColor: `${COLORS.danger}08`,
						}}
					>
						OTA Tradizionali
					</div>
					<div
						style={{
							flex: 1,
							padding: "12px 20px",
							fontFamily: montserratFont,
							fontWeight: 700,
							fontSize: 14,
							color: COLORS.textWhite,
							letterSpacing: 2,
							textTransform: "uppercase",
							textAlign: "center",
							backgroundColor: `${COLORS.natureGreen}15`,
						}}
					>
						MetaBorghi
					</div>
				</div>

				{/* Comparison rows */}
				<div style={{ display: "flex", flexDirection: "column" }}>
					{COMPARISON_DATA.map((item, i) => (
						<ComparisonRow
							key={i}
							feature={item.feature}
							metaborghi={item.metaborghi}
							traditional={item.traditional}
							delay={Math.round(1.5 * fps) + i * 20}
						/>
					))}
				</div>

				{/* Summary badge */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: 10,
					}}
				>
					<div
						style={{
							padding: "16px 50px",
							borderRadius: 40,
							background: `linear-gradient(135deg, ${COLORS.natureGreen}, ${COLORS.techBlue})`,
							opacity: summarySpring,
							transform: `scale(${0.85 + summarySpring * 0.15})`,
							boxShadow: `0 8px 32px ${COLORS.natureGreen}40`,
						}}
					>
						<span
							style={{
								fontFamily: montserratFont,
								fontWeight: 800,
								fontSize: 22,
								color: COLORS.textWhite,
								letterSpacing: 1,
							}}
						>
							✓ MetaBorghi Vince su Tutti i Fronti
						</span>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
