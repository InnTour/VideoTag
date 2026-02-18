import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {SEQUENCES} from './constants';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Storia} from './Sequence02Storia';
import {Sequence03Paradosso} from './Sequence03Paradosso';
import {Sequence04Risoluzione} from './Sequence04Risoluzione';

/*
 * TAG A1.02 — "Porta la Stella"
 * Sezione: Architettura e Monumenti
 *
 * Durata: 58.2 secondi / 1746 frame @ 30fps
 *
 * Sequenze:
 *   01 INTRO       0:00 → 0:10  — Aggancio visivo, titolo, localizzazione
 *   02 STORIA     0:10 → 0:30  — Orsini, 1456, Sant'Antonio, Casale di Rocchetta
 *   03 PARADOSSO  0:30 → 0:41  — Split-screen: porta sepolta vs originale
 *   04 RISOLUZIONE 0:41 → 0:58  — Recupero, soglia, itinerari, outro InnTour
 *
 * NOTE: Sottotitoli disabilitati — gestiti esternamente via Filmora
 */

export const PortaLaStella: React.FC = () => {
	const {fps} = useVideoConfig();

	const sequences = [
		{key: 'intro', timing: SEQUENCES.INTRO, Component: Sequence01Intro},
		{key: 'storia', timing: SEQUENCES.STORIA, Component: Sequence02Storia},
		{key: 'paradosso', timing: SEQUENCES.PARADOSSO, Component: Sequence03Paradosso},
		{key: 'risoluzione', timing: SEQUENCES.RISOLUZIONE, Component: Sequence04Risoluzione},
	];

	return (
		<AbsoluteFill style={{backgroundColor: '#0a0804'}}>
			{/* === AUDIO NARRAZIONE ===
			 *  Voce: Iapetus · Lingua: ITA · Volume: -6dBFS (normalizzato a 0.8)
			 */}
			<Audio
				src={staticFile('audio/TAG_A1.02_PORTA_LA_STELLA_ITA.mp3')}
				volume={0.8}
				startFrom={0}
			/>

			{/* === SEQUENZE VIDEO === */}
			{sequences.map(({key, timing, Component}) => (
				<Sequence
					key={key}
					from={Math.round(timing.start * fps)}
					durationInFrames={Math.round(timing.duration * fps)}
					premountFor={Math.round(0.5 * fps)}
				>
					<Component />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
