/**
 * TAG A1.02 — Porta La Stella
 * "La Soglia Sepolta"
 *
 * Durata: 65.25s · 1958 frame @30fps · Voce: Iapetus
 * Sottotitoli: disabilitati — gestiti in Filmora
 *
 * Sequenze:
 *   s01=490 + s02=540 + s03=490 + s04=498 − 3×20 = 2018−60 = 1958 ✓
 */
import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro }       from './Sequence01Intro';
import { Sequence02Storia }      from './Sequence02Storia';
import { Sequence03Paradosso }   from './Sequence03Paradosso';
import { Sequence04Risoluzione } from './Sequence04Risoluzione';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

export const PortaLaStella: React.FC = () => {
  const fadeTiming = linearTiming({ durationInFrames: SEQ_DUR.transition });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* ── Narrazione ──────────────────────────────────────────────────────── */}
      <Audio src={staticFile(AUDIO.narrazione)} volume={1} />
      <Audio src={staticFile('music/epico-medievale.mp3')} volume={0.18} loop />

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
          <Sequence02Storia />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s03}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence03Paradosso />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04}>
          <Sequence04Risoluzione />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
