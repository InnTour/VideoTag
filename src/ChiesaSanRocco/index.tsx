import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02IlSanto } from './Sequence02IlSanto';
import { Sequence03LaChiesa } from './Sequence03LaChiesa';
import { Sequence04LaPromessa } from './Sequence04LaPromessa';
import { Sequence05GrandeRitorno } from './Sequence05GrandeRitorno';
import { Sequence06Outro } from './Sequence06Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ──────────────────────────────────────────────────────────────────────
// TAG A3.04 — Chiesa di San Rocco
// 93.96s · 2819 frame @30fps
// 310+590+580+560+300+579 - 5×20 = 2919 - 100 = 2819 ✓
// ──────────────────────────────────────────────────────────────────────

export const ChiesaSanRocco: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Audio narrazione — voce Iapetus */}
      <Audio src={staticFile(AUDIO)} />

      <TransitionSeries>
        {/* Seq 01 — Intro ~10.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 02 — Il Santo ~19.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02IlSanto />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 03 — La Chiesa ~19.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03LaChiesa />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 04 — La Promessa ~18.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
          <Sequence04LaPromessa />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 05 — Il Grande Ritorno ~10.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05} premountFor={SEQ_DUR.transition}>
          <Sequence05GrandeRitorno />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 06 — La Festa/Outro ~19.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s06}>
          <Sequence06Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
