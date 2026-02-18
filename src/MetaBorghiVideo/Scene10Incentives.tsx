import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, INCENTIVES_DATA, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { GridBackground } from "./components/GridBackground";

export const Scene10Incentives: React.FC = () => {
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
			<GridBackground lineOpacity={0.08} />

			<AbsoluteFill
				style={{
					padding: "50px 70px",
					display: "flex",
					flexDirection: "column",
					gap: 35,
				}}
			>
				<SectionTitle
					title="Incentivi e Circolarità del Valore"
					subtitle="Ecosistema premiante per accelerare l'adozione"
				/>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 26,
						flex: 1,
						alignItems: "center",
					}}
				>
					{INCENTIVES_DATA.map((incentive, i) => {
						const cardSpring = spring({
							frame: Math.max(0, frame - Math.round(1.5 * fps) - i * 15),
							fps,
							config: SPRING_CONFIGS.smooth,
							durationInFrames: Math.round(1 * fps),
						});

						const direction = i % 2 === 0 ? -1 : 1;

						return (
							<div
								key={i}
								style={{
									backgroundColor: COLORS.bgCard,
									padding: "24px 28px",
									borderRadius: 16,
									borderTop: `3px solid ${incentive.color}`,
									opacity: cardSpring,
									transform: `translateX(${(1 - cardSpring) * 40 * direction}px)`,
								}}
							>
								<h3
									style={{
										fontFamily: montserratFont,
										fontWeight: 700,
										fontSize: 20,
										color: COLORS.textWhite,
										margin: "0 0 6px 0",
									}}
								>
									{incentive.title}
								</h3>
								<div
									style={{
										fontFamily: montserratFont,
										fontWeight: 800,
										fontSize: 32,
										color: incentive.color,
										margin: "8px 0",
										letterSpacing: -1,
									}}
								>
									{incentive.value}
								</div>
								<p
									style={{
										fontFamily: interFont,
										fontSize: 15,
										color: COLORS.textGray,
										margin: 0,
										lineHeight: 1.4,
									}}
								>
									{incentive.description}
								</p>
							</div>
						);
					})}
				</div>

				{/* Fund badge */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							padding: "14px 40px",
							borderRadius: 30,
							border: `2px solid ${COLORS.heritageGold}`,
							backgroundColor: `${COLORS.heritageGold}15`,
							opacity: interpolate(frame, [5 * fps, 5.5 * fps], [0, 1], {
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
								color: COLORS.heritageGold,
								letterSpacing: 2,
							}}
						>
							FONDO BONUS 5 ANNI: €9.000
						</span>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
