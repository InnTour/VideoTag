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
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { LightLeak } from '@remotion/light-leaks';
import { Sequence01Intro }       from './Sequence01Intro';
import { Sequence02Storia }      from './Sequence02Storia';
import { Sequence03Paradosso }   from './Sequence03Paradosso';
import { Sequence04Risoluzione } from './Sequence04Risoluzione';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

export const PortaLaStella: React.FC = () => {
  const { fps } = useVideoConfig();
  const fadeTiming = springTiming({ config: { damping: 200 }, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* ── Narrazione ──────────────────────────────────────────────────────── */}
      <Audio
        src={staticFile(AUDIO.narrazione)}
        volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: 'clamp' })}
      />
      <Audio
        src={staticFile('music/epico-medievale.mp3')}
        volume={(f) => interpolate(f, [0, fps], [0, 0.18], { extrapolateRight: 'clamp' })}
        loop
      />

      {/* ── Sequenze ────────────────────────────────────────────────────────── */}
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s01}
          premountFor={30}
        >
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s02}
          premountFor={30}
        >
          <Sequence02Storia />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Overlay durationInFrames={20}>
          <LightLeak seed={1} hueShift={30} />
        </TransitionSeries.Overlay>

        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s03}
          premountFor={30}
        >
          <Sequence03Paradosso />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Overlay durationInFrames={20}>
          <LightLeak seed={2} hueShift={30} />
        </TransitionSeries.Overlay>

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={30}>
          <Sequence04Risoluzione />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
