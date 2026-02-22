import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const GlowOrb: React.FC<{
	x: number;
	y: number;
	size?: number;
	color?: string;
	speed?: number;
}> = ({
	x,
	y,
	size = 300,
	color = "#00a8ff",
	speed = 0.02,
}) => {
	const frame = useCurrentFrame();
	const pulse = interpolate(
		Math.sin(frame * speed),
		[-1, 1],
		[0.3, 0.6],
	);
	const drift = Math.sin(frame * speed * 0.7) * 15;

	return (
		<div
			style={{
				position: "absolute",
				left: x - size / 2 + drift,
				top: y - size / 2,
				width: size,
				height: size,
				borderRadius: "50%",
				background: `radial-gradient(circle, ${color}${Math.round(pulse * 40).toString(16).padStart(2, "0")}, transparent 70%)`,
				pointerEvents: "none",
			}}
		/>
	);
};
