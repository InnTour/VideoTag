import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02IsideStrati } from './Sequence02IsideStrati';
import { Sequence03LaMadonna } from './Sequence03LaMadonna';
import { Sequence04Outro } from './Sequence04Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ──────────────────────────────────────────────────────────────────────
// TAG A2.09 — Chiesa Santa Maria della Cancellata
// 39.58s · 1187 frame @30fps
// 240+340+340+327 - 3×20 = 1247 - 60 = 1187 ✓
// ──────────────────────────────────────────────────────────────────────

export const ChiesaSantaMaria: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Audio narrazione — voce Iapetus */}
      <Audio src={staticFile(AUDIO)} />

      <TransitionSeries>
        {/* Seq 01 — Intro ~8.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 02 — Iside & Strati ~11.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02IsideStrati />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 03 — La Madonna ~11.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03LaMadonna />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 04 — Continuum/Outro ~10.9s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04}>
          <Sequence04Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
