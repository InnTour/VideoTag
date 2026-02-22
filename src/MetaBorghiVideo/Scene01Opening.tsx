import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, SPRING_CONFIGS } from "./constants";
import { ParticleField } from "./components/ParticleField";
import { GridBackground } from "./components/GridBackground";
import { GlowOrb } from "./components/GlowOrb";

export const Scene01Opening: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Entry/exit fades
	const entryFade = interpolate(frame, [0, 0.8 * fps], [0, 1], {
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

	// Logo spring
	const logoSpring = spring({
		frame,
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1.5 * fps),
	});

	// Title letter spacing animation
	const titleSpring = spring({
		frame: Math.max(0, frame - Math.round(0.8 * fps)),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1 * fps),
	});
	const letterSpacing = interpolate(titleSpring, [0, 1], [40, 14]);

	// Tagline
	const taglineSpring = spring({
		frame: Math.max(0, frame - Math.round(1.8 * fps)),
		fps,
		config: SPRING_CONFIGS.gentle,
		durationInFrames: Math.round(1 * fps),
	});

	// InnTour credit
	const creditOpacity = interpolate(
		frame,
		[3.5 * fps, 4.2 * fps],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	// Animated gradient line under title
	const lineWidth = interpolate(
		frame,
		[1.5 * fps, 2.5 * fps],
		[0, 300],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground />
			<ParticleField count={50} color={COLORS.techBlueBright} speed={0.2} opacity={0.3} />
			<GlowOrb x={300} y={400} size={400} color={COLORS.techBlue} speed={0.015} />
			<GlowOrb x={1600} y={600} size={350} color={COLORS.heritageGold} speed={0.02} />

			<AbsoluteFill
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 20,
				}}
			>
				{/* Logo circle */}
				<div
					style={{
						width: 120,
						height: 120,
						borderRadius: "50%",
						background: `linear-gradient(135deg, ${COLORS.techBlue}, ${COLORS.heritageGold})`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						opacity: logoSpring,
						transform: `scale(${logoSpring})`,
						boxShadow: `0 0 60px ${COLORS.techBlueGlow}`,
					}}
				>
					<span
						style={{
							fontFamily: montserratFont,
							fontWeight: 800,
							fontSize: 48,
							color: COLORS.textWhite,
						}}
					>
						MB
					</span>
				</div>

				{/* Title */}
				<h1
					style={{
						fontFamily: montserratFont,
						fontWeight: 800,
						fontSize: 82,
						color: COLORS.textWhite,
						letterSpacing: letterSpacing,
						margin: 0,
						opacity: titleSpring,
						textShadow: `0 0 40px ${COLORS.techBlueGlow}`,
					}}
				>
					METABORGHI
				</h1>

				{/* Accent line */}
				<div
					style={{
						width: lineWidth,
						height: 3,
						background: `linear-gradient(90deg, transparent, ${COLORS.techBlue}, transparent)`,
						borderRadius: 2,
					}}
				/>

				{/* Subtitle */}
				<p
					style={{
						fontFamily: interFont,
						fontWeight: 400,
						fontSize: 24,
						color: COLORS.textGray,
						margin: 0,
						textAlign: "center",
						maxWidth: 700,
						opacity: taglineSpring,
						transform: `translateY(${(1 - taglineSpring) * 20}px)`,
					}}
				>
					Ecosistema Integrato per la Rigenerazione Digitale
					<br />
					delle Aree Interne Italiane
				</p>

				{/* Tagline */}
				<p
					style={{
						fontFamily: interFont,
						fontWeight: 300,
						fontSize: 20,
						color: COLORS.heritageGold,
						fontStyle: "italic",
						margin: "10px 0 0 0",
						opacity: taglineSpring,
						transform: `translateY(${(1 - taglineSpring) * 15}px)`,
					}}
				>
					"Il ponte tra la memoria storica e le opportunità del futuro"
				</p>

				{/* Credit */}
				<div
					style={{
						marginTop: 40,
						padding: "10px 32px",
						borderRadius: 30,
						border: `1px solid ${COLORS.textMuted}`,
						opacity: creditOpacity,
					}}
				>
					<span
						style={{
							fontFamily: interFont,
							fontWeight: 400,
							fontSize: 15,
							color: COLORS.textMuted,
							letterSpacing: 4,
							textTransform: "uppercase",
						}}
					>
						UN PROGETTO DI{" "}
					</span>
					<span
						style={{
							fontFamily: montserratFont,
							fontWeight: 700,
							fontSize: 15,
							color: COLORS.textWhite,
						}}
					>
						InnTour S.r.l.
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
