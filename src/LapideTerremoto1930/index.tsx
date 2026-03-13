import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02IlSisma } from './Sequence02IlSisma';
import { Sequence03ISalvati } from './Sequence03ISalvati';
import { Sequence04LaRicostruzione } from './Sequence04LaRicostruzione';
import { Sequence05LaSperanza } from './Sequence05LaSperanza';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ─────────────────────────────────────────────────────────────────────────
// TAG A4.09 — Lapide Terremoto 1930
// Voce: Iapetus · Durata: 66.06s · 1982 frame @30fps
// 350+440+380+400+492 − 4×20 = 2062 − 80 = 1982 ✓
// (voce Leda = 29.64s/889f — NON usare)
// ─────────────────────────────────────────────────────────────────────────

export const LapideTerremoto1930: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroNotte }}>
      {/* Audio narrazione — voce Iapetus · 66.06s */}
      <Audio src={staticFile(AUDIO)} />
      <Audio src={staticFile('music/sisma-teso.mp3')} volume={0.16} loop />

      <TransitionSeries>
        {/* Seq 01 — L'Alba del Dolore · lapide, 3:00, hook ~11.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 02 — Il Sisma · shake, macerie, 200 vittime ~14.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02IlSisma />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 03 — I Salvati · contadini nei campi, feriti, Cappella ~12.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03ISalvati />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 04 — La Ricostruzione · decisione, nuovo paese ~13.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
          <Sequence04LaRicostruzione />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 05 — La Speranza · nomi, tagline, loghi, iris ~16.4s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05}>
          <Sequence05LaSperanza />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
