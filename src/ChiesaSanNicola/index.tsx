import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02IlPortale } from './Sequence02IlPortale';
import { Sequence03LaDevozione } from './Sequence03LaDevozione';
import { Sequence04LaStatua } from './Sequence04LaStatua';
import { Sequence05IlSeicentoVivo } from './Sequence05IlSeicentoVivo';
import { Sequence06Outro } from './Sequence06Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ──────────────────────────────────────────────────────────────────────
// TAG A3.06 — Chiesa di San Nicola
// 79.02s · 2371 frame @30fps
// 290+490+470+450+300+471 - 5×20 = 2471 - 100 = 2371 ✓
// ──────────────────────────────────────────────────────────────────────

export const ChiesaSanNicola: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Audio narrazione — voce Iapetus */}
      <Audio src={staticFile(AUDIO)} />

      <TransitionSeries>
        {/* Seq 01 — Intro ~9.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 02 — Il Portale ~16.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02IlPortale />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 03 — La Devozione ~15.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03LaDevozione />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 04 — La Statua ~15.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
          <Sequence04LaStatua />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 05 — Il Seicento Vivo ~10.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05} premountFor={SEQ_DUR.transition}>
          <Sequence05IlSeicentoVivo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 06 — La Festa/Outro ~15.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s06}>
          <Sequence06Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
