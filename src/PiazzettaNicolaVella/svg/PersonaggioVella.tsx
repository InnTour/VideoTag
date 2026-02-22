import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../constants';

// Silhouette stilizzata di Nicola Vella — intellettuale/patriota dell'800
// Stile: linea minimalista con dettagli storici (redingote, papillon, baffi)
// Estetica: outline luminoso su sfondo scuro, effetto ologramma

interface PersonaggioProps {
	scale?: number;
	glowIntensity?: number;
}

export const PersonaggioVella: React.FC<PersonaggioProps> = ({
	scale = 1,
	glowIntensity = 1,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Breath animation — leggero respiro ciclico
	const breathCycle = Math.sin(frame * 0.04) * 2;

	// Reveal progressivo: il personaggio si materializza dal basso
	const revealSpring = spring({
		frame,
		fps,
		config: {damping: 120, stiffness: 80},
		durationInFrames: Math.round(1.5 * fps),
	});
	const revealY = interpolate(revealSpring, [0, 1], [60, 0]);
	const revealOpacity = interpolate(revealSpring, [0, 1], [0, 1]);

	// Glitch leggero (1 volta ogni ~3s)
	const glitchFrame = frame % 90;
	const glitchOffset = glitchFrame < 2 ? 3 : 0;
	const glitchOpacity = glitchFrame < 2 ? 0.6 : 1;

	const gold = COLORS.oroIrpino;
	const glow = `drop-shadow(0 0 ${8 * glowIntensity}px ${gold}) drop-shadow(0 0 ${20 * glowIntensity}px ${gold}44)`;

	return (
		<div
			style={{
				opacity: revealOpacity,
				transform: `translateY(${revealY + breathCycle}px) scale(${scale})`,
				transformOrigin: 'bottom center',
				filter: glow,
				position: 'relative',
			}}
		>
			<svg
				width={320}
				height={600}
				viewBox="0 0 320 600"
				style={{
					transform: `translateX(${glitchOffset}px)`,
					opacity: glitchOpacity,
				}}
			>
				<defs>
					<linearGradient id="personGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={gold} stopOpacity={0.95} />
						<stop offset="60%" stopColor={gold} stopOpacity={0.75} />
						<stop offset="100%" stopColor={gold} stopOpacity={0.1} />
					</linearGradient>
					<linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={gold} stopOpacity={0.08} />
						<stop offset="100%" stopColor={gold} stopOpacity={0.02} />
					</linearGradient>
				</defs>

				{/* === TESTA === */}
				{/* Cranio */}
				<ellipse cx={160} cy={72} rx={44} ry={52} fill="url(#bodyFill)" stroke="url(#personGrad)" strokeWidth={1.8} />
				{/* Capelli / fronte alta */}
				<path d="M 120 50 Q 160 30 200 50" fill="none" stroke="url(#personGrad)" strokeWidth={1.5} />
				{/* Baffi */}
				<path d="M 142 90 Q 160 96 178 90" fill="none" stroke="url(#personGrad)" strokeWidth={2} />
				{/* Occhi */}
				<ellipse cx={147} cy={78} rx={5} ry={3.5} fill={gold} opacity={0.7} />
				<ellipse cx={173} cy={78} rx={5} ry={3.5} fill={gold} opacity={0.7} />
				{/* Naso */}
				<path d="M 158 82 L 155 92 L 165 92" fill="none" stroke={gold} strokeWidth={1.2} opacity={0.6} />

				{/* === COLLETTO / CRAVATTA === */}
				{/* Papillon */}
				<path d="M 148 124 L 155 132 L 148 140 L 155 136 L 160 140 L 165 136 L 172 140 L 165 132 L 172 124 L 160 130 Z"
					fill={gold} opacity={0.5} />
				{/* Colletto camicia */}
				<path d="M 140 118 L 148 124 M 180 118 L 172 124" stroke="url(#personGrad)" strokeWidth={1.5} fill="none" />

				{/* === CORPO / REDINGOTE === */}
				{/* Torso principale */}
				<path
					d="M 110 120 L 95 280 L 95 420 L 225 420 L 225 280 L 210 120 Z"
					fill="url(#bodyFill)"
					stroke="url(#personGrad)"
					strokeWidth={1.6}
				/>
				{/* Risvolti redingote (V aperta) */}
				<path d="M 160 120 L 130 180 L 115 280" stroke="url(#personGrad)" strokeWidth={1.4} fill="none" />
				<path d="M 160 120 L 190 180 L 205 280" stroke="url(#personGrad)" strokeWidth={1.4} fill="none" />
				{/* Bottoni centrali */}
				{[200, 240, 280, 320].map((y, i) => (
					<circle key={i} cx={160} cy={y} r={4} fill={gold} opacity={0.4} />
				))}
				{/* Tasche */}
				<rect x={118} y={310} width={32} height={16} rx={2} fill="none" stroke="url(#personGrad)" strokeWidth={1} />
				<rect x={170} y={310} width={32} height={16} rx={2} fill="none" stroke="url(#personGrad)" strokeWidth={1} />

				{/* === BRACCIA === */}
				{/* Braccio sinistro — leggermente aperto */}
				<path d="M 110 140 L 72 260 L 82 350" fill="none" stroke="url(#personGrad)" strokeWidth={12} strokeLinecap="round" />
				<path d="M 110 140 L 72 260 L 82 350" fill="none" stroke="url(#bodyFill)" strokeWidth={10} strokeLinecap="round" />
				{/* Mano sinistra con libro/documento */}
				<rect x={60} y={345} width={38} height={28} rx={3} fill="url(#bodyFill)" stroke="url(#personGrad)" strokeWidth={1.4} />
				{[352, 358, 364].map((y, i) => (
					<line key={i} x1={65} y1={y} x2={93} y2={y} stroke={gold} strokeWidth={0.8} opacity={0.5} />
				))}

				{/* Braccio destro — chiuso */}
				<path d="M 210 140 L 245 250 L 238 340" fill="none" stroke="url(#personGrad)" strokeWidth={12} strokeLinecap="round" />
				<path d="M 210 140 L 245 250 L 238 340" fill="none" stroke="url(#bodyFill)" strokeWidth={10} strokeLinecap="round" />
				{/* Mano destra con bastone */}
				<line x1={238} y1={340} x2={248} y2={420} stroke="url(#personGrad)" strokeWidth={3} />
				<ellipse cx={248} cy={424} rx={6} ry={4} fill={gold} opacity={0.5} />

				{/* === GAMBE === */}
				{/* Gamba sinistra */}
				<path d="M 120 418 L 112 520 L 105 598" fill="none" stroke="url(#personGrad)" strokeWidth={14} strokeLinecap="round" />
				<path d="M 120 418 L 112 520 L 105 598" fill="none" stroke="url(#bodyFill)" strokeWidth={12} strokeLinecap="round" />
				{/* Gamba destra */}
				<path d="M 200 418 L 205 520 L 212 598" fill="none" stroke="url(#personGrad)" strokeWidth={14} strokeLinecap="round" />
				<path d="M 200 418 L 205 520 L 212 598" fill="none" stroke="url(#bodyFill)" strokeWidth={12} strokeLinecap="round" />
				{/* Scarpe */}
				<ellipse cx={102} cy={598} rx={20} ry={6} fill={gold} opacity={0.35} />
				<ellipse cx={215} cy={598} rx={20} ry={6} fill={gold} opacity={0.35} />

				{/* === EFFETTO OLOGRAMMA === */}
				{/* Linee di scan orizzontali sul corpo */}
				{Array.from({length: 8}).map((_, i) => {
					const scanY = 120 + i * 60 + (frame * 1.5) % 60;
					if (scanY > 600) return null;
					return (
						<line key={i} x1={95} y1={scanY} x2={225} y2={scanY}
							stroke={gold} strokeWidth={0.5} opacity={0.12} />
					);
				})}

				{/* Base ologramma (cerchio luminoso ai piedi) */}
				<ellipse cx={160} cy={598} rx={90} ry={12}
					fill="none" stroke={gold} strokeWidth={1} opacity={0.3} />
				<ellipse cx={160} cy={598} rx={55} ry={7}
					fill={gold} opacity={0.08} />
			</svg>
		</div>
	);
};
