import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, poppinsFont, COLORS, SPRING_CONFIGS } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { GridBackground } from "./components/GridBackground";
import { GlowOrb } from "./components/GlowOrb";

export const Scene07TokenEconomy: React.FC = () => {
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

	// Token animations
	const token1Spring = spring({
		frame: Math.max(0, frame - Math.round(1.2 * fps)),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1.2 * fps),
	});
	const token2Spring = spring({
		frame: Math.max(0, frame - Math.round(2.2 * fps)),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1.2 * fps),
	});

	// 3D coin rotation effect
	const coinRotation1 = Math.sin((frame * 0.04) + 0) * 0.6;
	const coinRotation2 = Math.sin((frame * 0.04) + Math.PI) * 0.6;

	// Connection arrow
	const arrowProgress = interpolate(
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
			<GridBackground />
			<GlowOrb x={480} y={540} size={400} color={COLORS.techBlue} speed={0.015} />
			<GlowOrb x={1440} y={540} size={400} color={COLORS.accent} speed={0.018} />

			<AbsoluteFill
				style={{
					padding: "50px 80px",
					display: "flex",
					flexDirection: "column",
					gap: 40,
				}}
			>
				<SectionTitle title="Token Economy" subtitle="Sistema Dual-Token per Utilità e Governance" />

				<div
					style={{
						display: "flex",
						gap: 80,
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
					}}
				>
					{/* $BORGO Token */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 20,
							opacity: token1Spring,
							transform: `translateX(${(1 - token1Spring) * -60}px)`,
						}}
					>
						{/* Coin */}
						<div
							style={{
								width: 180,
								height: 180,
								borderRadius: "50%",
								background: `linear-gradient(135deg, ${COLORS.techBlue}, ${COLORS.heritageGold})`,
								border: `6px solid ${COLORS.heritageGold}`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								transform: `perspective(400px) rotateY(${coinRotation1 * 30}deg) scaleX(${1 + coinRotation1 * 0.2})`,
								boxShadow: `0 0 50px ${COLORS.techBlueGlow}, inset 0 0 30px rgba(255,255,255,0.2)`,
							}}
						>
							<span
								style={{
									fontFamily: poppinsFont,
									fontWeight: 700,
									fontSize: 36,
									color: COLORS.textWhite,
									textShadow: "0 2px 8px rgba(0,0,0,0.4)",
								}}
							>
								$BORGO
							</span>
						</div>

						{/* Details */}
						<div
							style={{
								backgroundColor: COLORS.bgCard,
								padding: "20px 28px",
								borderRadius: 16,
								borderTop: `3px solid ${COLORS.techBlue}`,
								minWidth: 360,
							}}
						>
							<h3
								style={{
									fontFamily: montserratFont,
									fontWeight: 700,
									fontSize: 20,
									color: COLORS.techBlue,
									margin: "0 0 12px 0",
									letterSpacing: 2,
								}}
							>
								UTILITÀ ECONOMICA
							</h3>
							<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
								{[
									"💰 Potere d'Acquisto (prodotti, hotel, esperienze)",
									"⏱️ Circolazione Rapida (scadenza 24 mesi)",
									"🎁 Bonus Bundle (+5-12% valore extra)",
								].map((text, i) => (
									<p
										key={i}
										style={{
											fontFamily: interFont,
											fontSize: 15,
											color: COLORS.textGray,
											margin: 0,
										}}
									>
										{text}
									</p>
								))}
							</div>
						</div>
					</div>

					{/* Arrow */}
					<div style={{ opacity: arrowProgress }}>
						<svg width="120" height="80" viewBox="0 0 120 80">
							<defs>
								<linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stopColor={COLORS.techBlue} />
									<stop offset="100%" stopColor={COLORS.accent} />
								</linearGradient>
							</defs>
							<path
								d="M10 40 L90 40 M90 40 L75 30 M90 40 L75 50"
								fill="none"
								stroke="url(#arrowGradient)"
								strokeWidth={3}
								strokeLinecap="round"
								strokeDasharray={arrowProgress * 200}
							/>
						</svg>
					</div>

					{/* $BORGO-GOV Token */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 20,
							opacity: token2Spring,
							transform: `translateX(${(1 - token2Spring) * 60}px)`,
						}}
					>
						{/* Coin */}
						<div
							style={{
								width: 180,
								height: 180,
								borderRadius: "50%",
								background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.techBlue})`,
								border: `6px solid ${COLORS.textGray}`,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								transform: `perspective(400px) rotateY(${coinRotation2 * 30}deg) scaleX(${1 + coinRotation2 * 0.2})`,
								boxShadow: `0 0 50px ${COLORS.accent}80, inset 0 0 30px rgba(255,255,255,0.2)`,
							}}
						>
							<span
								style={{
									fontFamily: poppinsFont,
									fontWeight: 700,
									fontSize: 24,
									color: COLORS.textWhite,
									textShadow: "0 2px 8px rgba(0,0,0,0.4)",
								}}
							>
								$BORGO
							</span>
							<span
								style={{
									fontFamily: poppinsFont,
									fontWeight: 700,
									fontSize: 24,
									color: COLORS.textWhite,
									textShadow: "0 2px 8px rgba(0,0,0,0.4)",
								}}
							>
								-GOV
							</span>
						</div>

						{/* Details */}
						<div
							style={{
								backgroundColor: COLORS.bgCard,
								padding: "20px 28px",
								borderRadius: 16,
								borderTop: `3px solid ${COLORS.accent}`,
								minWidth: 360,
							}}
						>
							<h3
								style={{
									fontFamily: montserratFont,
									fontWeight: 700,
									fontSize: 20,
									color: COLORS.accent,
									margin: "0 0 12px 0",
									letterSpacing: 2,
								}}
							>
								PARTECIPAZIONE ATTIVA
							</h3>
							<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
								{[
									"🏆 Meritocratico (si ottiene partecipando)",
									"🗳️ Diritto di Voto (decisioni DAO)",
									"🔒 No Speculazione (non convertibile in Euro)",
								].map((text, i) => (
									<p
										key={i}
										style={{
											fontFamily: interFont,
											fontSize: 15,
											color: COLORS.textGray,
											margin: 0,
										}}
									>
										{text}
									</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
