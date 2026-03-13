import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02Laterano} from './Sequence02Laterano';
import {Sequence03LaSirena} from './Sequence03LaSirena';
import {Sequence04Strati} from './Sequence04Strati';
import {Sequence05Outro} from './Sequence05Outro';
import {AUDIO, COLORS, SEQ_DUR} from './constants';

// ──────────────────────────────────────────────────────────────────────
// TAG A3.01 — Chiesa della Consolazione
// 71.03s · 2131 frame @30fps
// 290+430+420+390+681 - 4×20 = 2211 - 80 = 2131 ✓
// ──────────────────────────────────────────────────────────────────────

export const ChiesaConsolazione: React.FC = () => {
  const {fps} = useVideoConfig();
  const springT = springTiming({config: {damping: 200}, durationInFrames: SEQ_DUR.transition});

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.neroFondo}}>
      <Audio
        src={staticFile(AUDIO)}
        startFrom={0}
        volume={(f) => interpolate(f, [0, 30], [0, 1], {extrapolateRight: 'clamp'})}
      />
      <Audio
        src={staticFile('music/sacro-contemplativo.mp3')}
        volume={(f) => interpolate(f, [0, fps], [0, 0.18], {extrapolateRight: 'clamp'})}
        loop
      />

      <TransitionSeries>
        {/* Seq 01 — Intro ~9.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={30}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 02 — Laterano ~14.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={30}>
          <Sequence02Laterano />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 03 — La Sirena ~14.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={30}>
          <Sequence03LaSirena />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 04 — Strati Storici ~13.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={30}>
          <Sequence04Strati />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 05 — Speranza/Outro ~22.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05} premountFor={30}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
