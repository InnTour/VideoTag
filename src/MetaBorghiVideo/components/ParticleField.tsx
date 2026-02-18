import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { AbsoluteFill } from "remotion";
import { seededRandom } from "../constants";

export const ParticleField: React.FC<{
	count?: number;
	color?: string;
	speed?: number;
	opacity?: number;
}> = ({
	count = 40,
	color = "#4dc9ff",
	speed = 0.3,
	opacity = 0.4,
}) => {
	const frame = useCurrentFrame();
	const { height, width } = useVideoConfig();

	const particles = Array.from({ length: count }, (_, i) => {
		const x = seededRandom(i * 3.7) * width;
		const baseY = seededRandom(i * 7.3) * height;
		const size = 1.5 + seededRandom(i * 11.1) * 3;
		const drift = Math.sin((frame * speed * 0.02) + seededRandom(i * 5.1) * Math.PI * 2) * 30;
		const yOffset = (frame * speed * 0.5 + seededRandom(i * 2.3) * 500) % (height + 100);
		const y = (baseY - yOffset + height + 100) % (height + 100) - 50;

		const fadeEdge = interpolate(
			y,
			[0, 80, height - 80, height],
			[0, 1, 1, 0],
			{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
		);

		return (
			<div
				key={i}
				style={{
					position: "absolute",
					left: x + drift,
					top: y,
					width: size,
					height: size,
					borderRadius: "50%",
					backgroundColor: color,
					opacity: opacity * fadeEdge * (0.3 + seededRandom(i * 13.7) * 0.7),
				}}
			/>
		);
	});

	return (
		<AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
			{particles}
		</AbsoluteFill>
	);
};
