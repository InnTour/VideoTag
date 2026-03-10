/**
 * TAG A1.04 — Porta di Sotto
 * "La Porta dei Mercanti"
 *
 * Durata: 41.98s · 1259 frame @30fps · Voce: Leda
 * Sottotitoli: disabilitati — gestiti in Filmora
 *
 * Sequenze:
 *   s01=310 + s02=330 + s03=310 + s04=369 − 3×20 = 1259 ✓
 */
import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro }     from './Sequence01Intro';
import { Sequence02Passaggio } from './Sequence02Passaggio';
import { Sequence03Commercio } from './Sequence03Commercio';
import { Sequence04Oggi }      from './Sequence04Oggi';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

export const PortaDiSotto: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* ── Narrazione ──────────────────────────────────────────────────────── */}
      <Audio src={staticFile(AUDIO.narrazione)} volume={1} />

      {/* ── Sequenze ────────────────────────────────────────────────────────── */}
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s01}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s02}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence02Passaggio />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s03}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence03Commercio />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04}>
          <Sequence04Oggi />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
