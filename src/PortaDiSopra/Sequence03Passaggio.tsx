import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence03Passaggio: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	const titleSpr = spring({frame, fps, config: {damping: 145}, durationInFrames: Math.round(0.9 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [55, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Le figure storiche che "entrano" — appaiono in successione
	const figure = [
		{ruolo: 'Vescovi', periodo: 'dal 1059', desc: 'Prelati che governarono la diocesi per secoli', delay: Math.round(1.5 * fps), icon: '✝️'},
		{ruolo: 'Principi', periodo: 'periodo normanno-svevo', desc: 'Signori feudali e rappresentanti del potere civile', delay: Math.round(3 * fps), icon: '⚜️'},
		{ruolo: 'Pellegrini', periodo: 'secoli XIII–XIX', desc: 'Viaggiatori e fedeli in cammino verso la diocesi', delay: Math.round(4.5 * fps), icon: '🚶'},
	];

	// Photo-montage processione — il fantasma che attraversa la porta
	const fantasmaProgress = interpolate(frame, [Math.round(2 * fps), Math.round(5 * fps)], [0, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Le mani con le fotografie compaiono come layer visivo nella seconda metà
	const maniProgress = interpolate(frame, [Math.round(7 * fps), Math.round(10 * fps)], [0, 0.45], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity, backgroundColor: COLORS.bgNero}}>
			{/* SFONDO: Arco classico con colonne — il passaggio */}
			<div style={{position: 'absolute', inset: 0}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_584fd135-8e4f-4934-bd08-fc98acfe49f9.png"
					motion="zoom-in"
					intensity={0.055}
					overlayOpacity={0}
					objectPosition="center 35%"
				/>
			</div>

			{/* LAYER: Processione — fantasma del passato che "rientra" nella porta */}
			<div style={{position: 'absolute', inset: 0, opacity: fantasmaProgress}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_6f08e18f-3878-4749-8685-60fc88dd014d.png"
					motion="pan-left"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 35%"
				/>
			</div>

			{/* LAYER: Mani con foto d'epoca — la memoria materiale */}
			<div style={{position: 'absolute', inset: 0, opacity: maniProgress}}>
				<KenBurnsImage
					src="images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/image_8baeb7ed-ea6e-4f8b-a138-0b5afc21a210.png"
					motion="zoom-out"
					intensity={0.04}
					overlayOpacity={0}
					objectPosition="center 60%"
				/>
			</div>

			{/* Overlay più scuro — aumenta il senso di solennità */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.88) 32%, rgba(8,8,8,0.50) 58%, rgba(8,8,8,0.15) 82%)',
				pointerEvents: 'none',
			}} />
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,8,8,0.72) 0%, transparent 25%, transparent 60%, rgba(8,8,8,0.85) 100%)',
				pointerEvents: 'none',
			}} />

			<ParticleField opacity={0.15} />
			<ScanLines opacity={0.030} />

			{/* === LAYOUT === */}
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px', gap: 56}}>

				{/* SINISTRA */}
				<div style={{flex: 1.2, display: 'flex', flexDirection: 'column', gap: 20}}>

					<div style={{opacity: titleOp, transform: `translateY(${titleY}px)`}}>
						<div style={{display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
							<div style={{width: 28, height: 2, background: `linear-gradient(90deg, ${COLORS.oroMemoria}, transparent)`}} />
							<span style={{fontFamily: latoFont, fontSize: 12, fontWeight: 700, color: COLORS.oroMemoria, letterSpacing: '0.20em', textTransform: 'uppercase'}}>Il Passaggio · Decine di Secoli</span>
						</div>
						<h2 style={{
							fontFamily: playfairFont, fontSize: 58, fontWeight: 700,
							color: COLORS.biancaCalce, margin: 0, lineHeight: 1.0,
							textShadow: '0 2px 20px rgba(8,8,8,0.98)',
						}}>
							Chi ha attraversato
							<br /><span style={{color: COLORS.oroMemoria}}>questa soglia</span>
						</h2>
					</div>

					{/* Figure storiche */}
					<div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
						{figure.map(({ruolo, periodo, desc, delay, icon}) => {
							const s  = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 145}, durationInFrames: Math.round(0.7 * fps)});
							const op = interpolate(s, [0, 1], [0, 1]);
							const x  = interpolate(s, [0, 1], [-40, 0]);
							return (
								<div key={ruolo} style={{
									opacity: op, transform: `translateX(${x}px)`,
									display: 'flex', alignItems: 'center', gap: 16,
									background: 'rgba(8,8,8,0.85)',
									border: `1px solid ${COLORS.oroMemoria}33`,
									borderRadius: 8, padding: '12px 18px',
									backdropFilter: 'blur(16px)',
								}}>
									<span style={{fontSize: 26, flexShrink: 0}}>{icon}</span>
									<div>
										<div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
											<p style={{fontFamily: playfairFont, fontSize: 22, fontWeight: 700, color: COLORS.biancaCalce, margin: 0}}>{ruolo}</p>
											<p style={{fontFamily: latoFont, fontSize: 12, color: COLORS.oroMemoria, margin: 0, letterSpacing: '0.08em'}}>{periodo}</p>
										</div>
										<p style={{fontFamily: latoFont, fontSize: 13, fontWeight: 300, color: COLORS.grigio60, margin: 0, marginTop: 2}}>{desc}</p>
									</div>
								</div>
							);
						})}
					</div>

					{/* Citazione solenne */}
					<div style={{
						opacity: interpolate(frame, [Math.round(7 * fps), Math.round(9 * fps)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						borderLeft: `3px solid ${COLORS.oroMemoria}`,
						padding: '12px 20px',
						background: 'rgba(8,8,8,0.80)',
						backdropFilter: 'blur(12px)',
						borderRadius: '0 6px 6px 0',
					}}>
						<p style={{fontFamily: playfairFont, fontSize: 20, fontStyle: 'italic', color: COLORS.grigio90, margin: 0, lineHeight: 1.6}}>
							"Portando con sé la sacralità
							<br />del loro ruolo."
						</p>
					</div>
				</div>

				<div style={{flex: 0.4}} />
			</div>
		</AbsoluteFill>
	);
};
