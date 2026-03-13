/**
 * TAG A1.01 — Piazza De Sanctis
 * "Il Telegramma che Cambiò il Mezzogiorno"
 *
 * Durata: 141.92s · 4258 frame @30fps
 * Voce: Iapetus
 * Sottotitoli: @remotion/captions (riattivati per questa clip)
 * Audio ambiente: campane e voci visualizzati nella Seq04 · sottofondo civico
 *
 * Sequenze:
 *   s01=600 + s02=750 + s03=750 + s04=600 + s05=750 + s06=908 − 5×20 = 4258 ✓
 */
import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro }      from './Sequence01Intro';
import { Sequence02DeSanctis }  from './Sequence02DeSanctis';
import { Sequence03IlPerche }   from './Sequence03IlPerche';
import { Sequence04LaPiazza }   from './Sequence04LaPiazza';
import { Sequence05IlFaro }     from './Sequence05IlFaro';
import { Sequence06Aforisma }   from './Sequence06Aforisma';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

export const PiazzaDeSanctis: React.FC = () => {
  const springT = springTiming({ config: { damping: 200 }, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* ── Narrazione principale ─────────────────────────────────────────── */}
      <Audio src={staticFile(AUDIO.narrazione)} volume={1} />
      <Audio src={staticFile('music/orchestrale-elevato.mp3')} volume={0.16} loop />

      {/* ── Sequenze ─────────────────────────────────────────────────────── */}
      <TransitionSeries>
        {/* Seq01 — Intro · Busto bronzeo · 20s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s01}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq02 — De Sanctis · Il Telegramma · 25s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s02}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence02DeSanctis />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq03 — Il Perché · Morra · 25s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s03}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence03IlPerche />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq04 — La Piazza · Campane e voci · 20s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s04}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence04LaPiazza />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq05 — Il Faro · Contadini e Studenti · 25s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s05}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence05IlFaro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq06 — Aforisma · Outro · 30.27s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s06}>
          <Sequence06Aforisma />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
