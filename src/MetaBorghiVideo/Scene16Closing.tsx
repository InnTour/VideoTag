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

export const Scene16Closing: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	const entryFade = interpolate(frame, [0, 0.8 * fps], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const exitFade = interpolate(
		frame,
		[durationInFrames - 1.5 * fps, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);
	const sceneOpacity = Math.min(entryFade, exitFade);

	// Logo + title spring
	const logoSpring = spring({
		frame,
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1.5 * fps),
	});

	// Divider line
	const lineWidth = interpolate(
		frame,
		[1.5 * fps, 2.5 * fps],
		[0, 300],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	// Tagline
	const taglineOpacity = interpolate(
		frame,
		[2 * fps, 3 * fps],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	// Contact info
	const contactOpacity = interpolate(
		frame,
		[3 * fps, 4 * fps],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	// Team info
	const teamOpacity = interpolate(
		frame,
		[4 * fps, 5 * fps],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground lineOpacity={0.06} />
			<ParticleField count={60} color={COLORS.heritageGold} speed={0.15} opacity={0.25} />
			<ParticleField count={40} color={COLORS.techBlueBright} speed={0.2} opacity={0.2} />
			<GlowOrb x={400} y={300} size={450} color={COLORS.techBlue} speed={0.012} />
			<GlowOrb x={1520} y={780} size={400} color={COLORS.heritageGold} speed={0.015} />

			{/* Vignette overlay */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					background: "radial-gradient(circle at center, transparent 30%, rgba(10,14,26,0.5) 100%)",
					pointerEvents: "none",
				}}
			/>

			<AbsoluteFill
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 24,
					padding: "0 100px",
				}}
			>
				{/* Logo + Title */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 20,
						opacity: logoSpring,
						transform: `scale(${logoSpring})`,
					}}
				>
					{/* Logo circle */}
					<div
						style={{
							width: 100,
							height: 100,
							borderRadius: "50%",
							background: `linear-gradient(135deg, ${COLORS.techBlue}, ${COLORS.heritageGold})`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: `0 0 50px ${COLORS.techBlueGlow}`,
						}}
					>
						<span
							style={{
								fontFamily: montserratFont,
								fontWeight: 800,
								fontSize: 42,
								color: COLORS.textWhite,
							}}
						>
							MB
						</span>
					</div>

					<h1
						style={{
							fontFamily: montserratFont,
							fontWeight: 800,
							fontSize: 64,
							color: COLORS.textWhite,
							letterSpacing: 12,
							margin: 0,
							textShadow: `0 0 30px ${COLORS.techBlueGlow}`,
						}}
					>
						METABORGHI
					</h1>
				</div>

				{/* Divider line */}
				<div
					style={{
						width: lineWidth,
						height: 3,
						background: `linear-gradient(90deg, transparent, ${COLORS.heritageGold}, transparent)`,
						borderRadius: 2,
					}}
				/>

				{/* Tagline */}
				<p
					style={{
						fontFamily: interFont,
						fontWeight: 300,
						fontSize: 26,
						color: COLORS.heritageGold,
						fontStyle: "italic",
						margin: "10px 0",
						opacity: taglineOpacity,
						textAlign: "center",
					}}
				>
					"Dal Territorio, per il Territorio"
				</p>

				{/* Contact info */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 12,
						marginTop: 20,
						opacity: contactOpacity,
					}}
				>
					<div
						style={{
							fontFamily: interFont,
							fontSize: 18,
							color: COLORS.textWhite,
						}}
					>
						<span style={{ color: COLORS.techBlueBright, fontWeight: 600 }}>www.metaborghi.it</span>
						{" • "}
						<span style={{ color: COLORS.natureGreen, fontWeight: 600 }}>www.inntour.it</span>
					</div>
					<div
						style={{
							fontFamily: interFont,
							fontSize: 16,
							color: COLORS.textGray,
						}}
					>
						📧 inntoursrl@gmail.com
						{" • "}
						📞 +39 347 0765612
					</div>
				</div>

				{/* Team info */}
				<div
					style={{
						marginTop: 30,
						padding: "16px 40px",
						borderRadius: 30,
						border: `1px solid ${COLORS.textMuted}40`,
						backgroundColor: `${COLORS.bgCard}80`,
						opacity: teamOpacity,
					}}
				>
					<span
						style={{
							fontFamily: interFont,
							fontSize: 14,
							color: COLORS.textMuted,
							letterSpacing: 3,
						}}
					>
						INNOVAZIONE DIGITALE PER LE AREE INTERNE
					</span>
				</div>

				{/* Footer */}
				<div
					style={{
						position: "absolute",
						bottom: 40,
						fontFamily: interFont,
						fontSize: 12,
						color: COLORS.textMuted,
						opacity: teamOpacity,
					}}
				>
					© 2026 InnTour S.R.L. - Via Tribuni, 83046 Lacedonia (AV) - P.IVA: IT03105390649
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
