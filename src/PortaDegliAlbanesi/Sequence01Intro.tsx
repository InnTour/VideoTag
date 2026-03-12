import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, playfairFont, latoFont} from './constants';
import {KenBurnsImage} from './components/KenBurnsImage';
import {ScanLines} from './components/ScanLines';
import {ParticleField} from './components/ParticleField';

export const Sequence01Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fadeIn  = interpolate(frame, [0, fps * 0.7], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const opacity = Math.min(fadeIn, fadeOut);

	// Glitch all'inizio — effetto cinematografico d'apertura
	const glitch = frame < 2 ? 0.2 : frame < 4 ? 0.9 : frame < 5 ? 0.5 : 1;

	// Titolo dal basso, ampio e lento
	const titleSpr = spring({frame: Math.max(0, frame - Math.round(0.5 * fps)), fps, config: {damping: 110, stiffness: 80}, durationInFrames: Math.round(1.4 * fps)});
	const titleY   = interpolate(titleSpr, [0, 1], [100, 0]);
	const titleOp  = interpolate(titleSpr, [0, 1], [0, 1]);

	// Sottotitolo
	const subSpr = spring({frame: Math.max(0, frame - Math.round(1.8 * fps)), fps, config: {damping: 160}, durationInFrames: Math.round(0.8 * fps)});
	const subOp  = interpolate(subSpr, [0, 1], [0, 1]);

	// Linea dorata che si estende verso destra
	const lineW = interpolate(frame, [Math.round(1.6 * fps), Math.round(3 * fps)], [0, 440], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Particella dorata — polvere medievale
	const dustOp = interpolate(frame, [0, Math.round(1 * fps)], [0, 0.45], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity: opacity * glitch, backgroundColor: COLORS.bgScuro}}>
			{/* SFONDO: arco in pietra dorata su roccia — zoom-in lentissimo verso l'arco */}
			<KenBurnsImage
				src="images/TAG A1.07 - PORTA DEGLI ALBANESI/download.png"
				motion="zoom-in"
				intensity={0.08}
				overlayOpacity={0}
				objectPosition="50% 45%"
			/>

			{/* Overlay: gradiente dal basso scuro (testo) al centro trasparente */}
			<AbsoluteFill style={{
				background: 'linear-gradient(180deg, rgba(8,6,10,0.65) 0%, rgba(8,6,10,0.10) 35%, rgba(8,6,10,0.05) 55%, rgba(8,6,10,0.85) 100%)',
				pointerEvents: 'none',
			}} />
			{/* Gradiente laterale sx per testo */}
			<AbsoluteFill style={{
				background: 'linear-gradient(90deg, rgba(8,6,10,0.96) 0%, rgba(8,6,10,0.80) 28%, rgba(8,6,10,0.30) 52%, transparent 70%)',
				pointerEvents: 'none',
			}} />

			{/* Particelle dorate — polvere di pietra antica */}
			<ParticleField opacity={dustOp} />
			<ScanLines opacity={0.018} />

			{/* === BADGE SEZIONE — in alto ===  */}
			<div style={{position: 'absolute', top: 50, left: 60, display: 'flex', alignItems: 'center', gap: 14, opacity: subOp}}>
				<div style={{width: 4, height: 30, background: `linear-gradient(180deg, ${COLORS.oroBrillante}, ${COLORS.pietraDorata})`, borderRadius: 2}} />
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.oroBrillante, letterSpacing: '0.18em', textTransform: 'uppercase'}}>
					Architettura e Monumenti
				</span>
				<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo}}>· A1.07</span>
			</div>

			{/* === TESTO PRINCIPALE === */}
			<div style={{position: 'absolute', left: 60, bottom: 140, maxWidth: 740}}>
				{/* Tag geografico */}
				<p style={{
					fontFamily: latoFont, fontSize: 16, fontWeight: 400,
					color: COLORS.azureInnTour, letterSpacing: '0.22em',
					textTransform: 'uppercase', margin: 0, marginBottom: 16,
					opacity: subOp,
				}}>
					Lacedonia · Cinta Muraria · Versante Nord-Est
				</p>

				{/* Titolo a due righe — grande e pesante */}
				<h1 style={{
					fontFamily: playfairFont, fontSize: 102, fontWeight: 700,
					color: COLORS.biancaCalce, margin: 0, lineHeight: 0.95,
					opacity: titleOp, transform: `translateY(${titleY}px)`,
					textShadow: `0 4px 30px rgba(8,6,10,0.95), 0 0 60px rgba(8,6,10,0.6)`,
				}}>
					Porta degli
					<br />
					<span style={{color: COLORS.oroBrillante, fontStyle: 'italic'}}>Albanesi</span>
				</h1>

				{/* Linea dorata + punto luce */}
				<div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 26, marginBottom: 20}}>
					<div style={{
						width: lineW, height: 2,
						background: `linear-gradient(90deg, ${COLORS.oroBrillante}, ${COLORS.pietraDorata}44)`,
						boxShadow: `0 0 10px ${COLORS.oroBrillante}66`,
					}} />
					{lineW > 60 && <div style={{width: 7, height: 7, borderRadius: '50%', backgroundColor: COLORS.oroBrillante, boxShadow: `0 0 16px ${COLORS.oroBrillante}`}} />}
				</div>

				{/* Sottotitolo — porta orientale */}
				<p style={{
					fontFamily: latoFont, fontSize: 26, fontWeight: 300,
					color: COLORS.biancaCalce, margin: 0, lineHeight: 1.65,
					opacity: subOp, letterSpacing: '0.05em',
					textShadow: '0 1px 12px rgba(8,6,10,0.8)',
				}}>
					La soglia orientale della cittadella medievale,
					<br />dedicata a San Nicola di Bari.
				</p>
			</div>

			{/* InnTour bottom */}
			<div style={{position: 'absolute', bottom: 42, right: 60, opacity: subOp * 0.5, display: 'flex', alignItems: 'center', gap: 10}}>
				<span style={{fontFamily: latoFont, fontSize: 16, fontWeight: 700, color: COLORS.verdeInnTour, letterSpacing: '0.12em'}}>INNTOUR</span>
				<span style={{fontFamily: latoFont, fontSize: 16, color: COLORS.grigioCaldo}}>· Narratore Digitale di Lacedonia</span>
			</div>
		</AbsoluteFill>
	);
};
