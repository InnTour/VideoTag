import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { COLORS, FOUR_PILLARS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { PillarCard } from "./components/PillarCard";
import { GridBackground } from "./components/GridBackground";
import { GlowOrb } from "./components/GlowOrb";

export const Scene04Solution: React.FC = () => {
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

	// Connection lines between cards
	const lineDelay = Math.round(3.5 * fps);
	const lineProgress = interpolate(
		frame,
		[lineDelay, lineDelay + Math.round(1.5 * fps)],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	// Center badge
	const badgeDelay = Math.round(5 * fps);
	const badgeSpring = spring({
		frame: Math.max(0, frame - badgeDelay),
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
			<GlowOrb x={960} y={540} size={600} color={COLORS.techBlue} speed={0.012} />

			<AbsoluteFill
				style={{
					padding: "50px 80px",
					display: "flex",
					flexDirection: "column",
					gap: 50,
				}}
			>
				<SectionTitle title="La Soluzione MetaBorghi" accentColor={COLORS.heritageGold} />

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 40,
						flex: 1,
						alignItems: "center",
						position: "relative",
					}}
				>
					{/* Connection lines */}
					<svg
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							pointerEvents: "none",
							opacity: lineProgress,
						}}
					>
						{/* Horizontal line */}
						<line
							x1="50%"
							y1="25%"
							x2="50%"
							y2="75%"
							stroke={COLORS.techBlue}
							strokeWidth={2}
							strokeDasharray={lineProgress * 1000}
							opacity={0.3}
						/>
						{/* Vertical line */}
						<line
							x1="25%"
							y1="50%"
							x2="75%"
							y2="50%"
							stroke={COLORS.techBlue}
							strokeWidth={2}
							strokeDasharray={lineProgress * 1000}
							opacity={0.3}
						/>
					</svg>

					{/* 4 Pillars in 2x2 grid */}
					{FOUR_PILLARS.map((pillar, i) => (
						<PillarCard
							key={i}
							title={pillar.title}
							subtitle={pillar.subtitle}
							accentColor={pillar.color}
							delay={Math.round(1.5 * fps) + i * 20}
							width={420}
						/>
					))}

					{/* Center badge */}
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: `translate(-50%, -50%) scale(${badgeSpring})`,
							opacity: badgeSpring,
							width: 140,
							height: 140,
							borderRadius: "50%",
							background: `linear-gradient(135deg, ${COLORS.techBlue}, ${COLORS.heritageGold})`,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: `0 0 40px ${COLORS.techBlueGlow}`,
							border: `3px solid ${COLORS.bgDark}`,
						}}
					>
						<span
							style={{
								fontSize: 48,
								marginBottom: 4,
							}}
						>
							🏛️
						</span>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
