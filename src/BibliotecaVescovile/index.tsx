import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02Pergamene } from './Sequence02Pergamene';
import { Sequence03Encyclopedie } from './Sequence03Encyclopedie';
import { Sequence04Cinquecentine } from './Sequence04Cinquecentine';
import { Sequence05Outro } from './Sequence05Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ──────────────────────────────────────────────────────────────────────
// TAG A4.05 — Biblioteca Storica Vescovile
// 68.94s · 2068 frame @30fps
// 270+500+480+450+448 - 4×20 = 2148 - 80 = 2068 ✓
// ──────────────────────────────────────────────────────────────────────

export const BibliotecaVescovile: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroSala }}>
      {/* Audio narrazione — voce Iapetus */}
      <Audio src={staticFile(AUDIO)} />

      <TransitionSeries>
        {/* Seq 01 — Intro ~9.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 02 — Le Pergamene ~16.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02Pergamene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 03 — L'Encyclopédie ~16.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03Encyclopedie />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 04 — Cinquecentine & 1799 ~15.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
          <Sequence04Cinquecentine />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        {/* Seq 05 — Outro ~14.9s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
