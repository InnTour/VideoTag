import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	interpolate,
} from "remotion";
import { montserratFont, interFont, COLORS, SPRING_CONFIGS, seededRandom } from "./constants";
import { SectionTitle } from "./components/SectionTitle";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { GridBackground } from "./components/GridBackground";

export const Scene03StrategicContext: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

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

	// Split screen slide-in
	const leftSlide = spring({
		frame: Math.max(0, frame - Math.round(0.8 * fps)),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1.2 * fps),
	});
	const rightSlide = spring({
		frame: Math.max(0, frame - Math.round(1 * fps)),
		fps,
		config: SPRING_CONFIGS.smooth,
		durationInFrames: Math.round(1.2 * fps),
	});

	// Warning badges
	const badgeDelay = Math.round(4 * fps);
	const badge1Spring = spring({
		frame: Math.max(0, frame - badgeDelay),
		fps,
		config: SPRING_CONFIGS.bouncy,
		durationInFrames: Math.round(1 * fps),
	});
	const badge2Spring = spring({
		frame: Math.max(0, frame - badgeDelay - 12),
		fps,
		config: SPRING_CONFIGS.bouncy,
		durationInFrames: Math.round(1 * fps),
	});

	// Italy map dots
	const dotCount = 80;
	const dotStart = Math.round(1.5 * fps);
	const dotDuration = Math.round(2.5 * fps);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bgDark,
				opacity: sceneOpacity,
			}}
		>
			<GridBackground lineOpacity={0.06} />

			<AbsoluteFill
				style={{
					padding: "50px 60px",
					display: "flex",
					flexDirection: "column",
					gap: 40,
				}}
			>
				<SectionTitle title="Il Contesto Strategico" subtitle="La Sfida delle Aree Interne" />

				<div style={{ display: "flex", gap: 40, flex: 1 }}>
					{/* Left: Demographic Crisis */}
					<div
						style={{
							flex: 1,
							backgroundColor: COLORS.bgCard,
							borderRadius: 20,
							padding: 40,
							borderTop: `4px solid ${COLORS.danger}`,
							transform: `translateX(${(1 - leftSlide) * -100}px)`,
							opacity: leftSlide,
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								marginBottom: 20,
							}}
						>
							<div
								style={{
									width: 50,
									height: 50,
									borderRadius: "50%",
									backgroundColor: `${COLORS.danger}20`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<span style={{ fontSize: 28 }}>⚠️</span>
							</div>
							<h3
								style={{
									fontFamily: montserratFont,
									fontWeight: 700,
									fontSize: 26,
									color: COLORS.textWhite,
									margin: 0,
								}}
							>
								Crisi Demografica
							</h3>
						</div>

						<div style={{ marginBottom: 30 }}>
							<AnimatedCounter
								value={2200}
								startFrame={dotStart}
								duration={90}
								fontSize={72}
								color={COLORS.danger}
							/>
							<p
								style={{
									fontFamily: interFont,
									fontSize: 16,
									color: COLORS.textGray,
									margin: "8px 0 0 0",
								}}
							>
								Comuni a rischio spopolamento
							</p>
						</div>

						{/* Italy map with dots */}
						<div
							style={{
								position: "relative",
								width: "100%",
								height: 200,
								backgroundColor: `${COLORS.danger}08`,
								borderRadius: 12,
								overflow: "hidden",
							}}
						>
							{Array.from({ length: dotCount }).map((_, i) => {
								const x = seededRandom(i * 3.7) * 100;
								const y = seededRandom(i * 7.3) * 100;
								const dotOpacity = interpolate(
									frame,
									[dotStart + i * (dotDuration / dotCount), dotStart + i * (dotDuration / dotCount) + 12],
									[0, 1],
									{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
								);
								return (
									<div
										key={i}
										style={{
											position: "absolute",
											left: `${x}%`,
											top: `${y}%`,
											width: 4,
											height: 4,
											borderRadius: "50%",
											backgroundColor: COLORS.danger,
											opacity: dotOpacity * 0.7,
										}}
									/>
								);
							})}
						</div>
					</div>

					{/* Right: Digital Fragmentation */}
					<div
						style={{
							flex: 1,
							backgroundColor: COLORS.bgCard,
							borderRadius: 20,
							padding: 40,
							borderTop: `4px solid ${COLORS.techBlue}`,
							transform: `translateX(${(1 - rightSlide) * 100}px)`,
							opacity: rightSlide,
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								marginBottom: 20,
							}}
						>
							<div
								style={{
									width: 50,
									height: 50,
									borderRadius: "50%",
									backgroundColor: `${COLORS.techBlue}20`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<span style={{ fontSize: 28 }}>🔌</span>
							</div>
							<h3
								style={{
									fontFamily: montserratFont,
									fontWeight: 700,
									fontSize: 26,
									color: COLORS.textWhite,
									margin: 0,
								}}
							>
								Frammentazione Digitale
							</h3>
						</div>

						<div style={{ marginBottom: 30 }}>
							<AnimatedCounter
								value={87}
								startFrame={dotStart}
								duration={90}
								suffix="%"
								fontSize={72}
								color={COLORS.techBlue}
							/>
							<p
								style={{
									fontFamily: interFont,
									fontSize: 16,
									color: COLORS.textGray,
									margin: "8px 0 0 0",
								}}
							>
								Comuni senza presenza digitale strutturata
							</p>
						</div>

						{/* Fragmented grid */}
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(10, 1fr)",
								gap: 6,
								height: 200,
							}}
						>
							{Array.from({ length: 50 }).map((_, i) => {
								const cellOpacity = interpolate(
									frame,
									[dotStart + seededRandom(i * 5.1) * dotDuration, dotStart + seededRandom(i * 5.1) * dotDuration + 15],
									[0, 1],
									{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
								);
								const isActive = seededRandom(i * 11.3) > 0.87;
								return (
									<div
										key={i}
										style={{
											backgroundColor: isActive ? COLORS.techBlue : `${COLORS.textMuted}20`,
											borderRadius: 2,
											opacity: cellOpacity * (isActive ? 0.9 : 0.2),
										}}
									/>
								);
							})}
						</div>
					</div>
				</div>

				{/* Warning badges */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: 40,
					}}
				>
					<div
						style={{
							padding: "16px 40px",
							borderRadius: 12,
							backgroundColor: `${COLORS.danger}20`,
							border: `2px solid ${COLORS.danger}`,
							opacity: badge1Spring,
							transform: `scale(${0.8 + badge1Spring * 0.2})`,
						}}
					>
						<span
							style={{
								fontFamily: interFont,
								fontWeight: 600,
								fontSize: 18,
								color: COLORS.danger,
							}}
						>
							Commissioni OTA: 15-30%
						</span>
					</div>
					<div
						style={{
							padding: "16px 40px",
							borderRadius: 12,
							backgroundColor: `${COLORS.warning}20`,
							border: `2px solid ${COLORS.warning}`,
							opacity: badge2Spring,
							transform: `scale(${0.8 + badge2Spring * 0.2})`,
						}}
					>
						<span
							style={{
								fontFamily: interFont,
								fontWeight: 600,
								fontSize: 18,
								color: COLORS.warning,
							}}
						>
							50% abbandona la prenotazione
						</span>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
