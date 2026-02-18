import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { poppinsFont, COLORS } from "../constants";

export const AnimatedCounter: React.FC<{
	value: number;
	startFrame: number;
	duration?: number;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	fontSize?: number;
	color?: string;
}> = ({
	value,
	startFrame,
	duration = 60,
	prefix = "",
	suffix = "",
	decimals = 0,
	fontSize = 64,
	color = COLORS.textWhite,
}) => {
	const frame = useCurrentFrame();

	const current = interpolate(
		frame,
		[startFrame, startFrame + duration],
		[0, value],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	const display = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString("it-IT");

	return (
		<span
			style={{
				fontFamily: poppinsFont,
				fontWeight: 700,
				fontSize,
				color,
				letterSpacing: -1,
			}}
		>
			{prefix}
			{display}
			{suffix}
		</span>
	);
};
