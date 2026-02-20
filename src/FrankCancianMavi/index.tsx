import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02Cancian } from './Sequence02Cancian';
import { Sequence03Museo } from './Sequence03Museo';
import { Sequence04Outro } from './Sequence04Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ─────────────────────────────────────────────────────────────────────────
// TAG C3.01 — Frank Cancian e il MAVI
// 27.79s · 834 frame @30fps
// 200+260+240+194 − 3×20 = 894 − 60 = 834 ✓
// ─────────────────────────────────────────────────────────────────────────

export const FrankCancianMavi: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFoto }}>
      {/* Audio narrazione — voce Leda */}
      <Audio src={staticFile(AUDIO)} />

      <TransitionSeries>
        {/* Seq 01 — Intro / Benvenuti al MAVI ~6.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 02 — Frank Cancian · 1957 · 1801 scatti ~8.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02Cancian />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 03 — La Vita Contadina · Il Museo ~8.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03Museo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 04 — L'Anima · Outro ~6.5s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04}>
          <Sequence04Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
