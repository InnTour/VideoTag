import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02IlMilite } from './Sequence02IlMilite';
import { Sequence03LeLapidi } from './Sequence03LeLapidi';
import { Sequence04LaCerimonia } from './Sequence04LaCerimonia';
import { Sequence05Outro } from './Sequence05Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ─────────────────────────────────────────────────────────────
// TAG A4.08 — Monumento ai Caduti · Lacedonia
// Durata: 61.60s · 1848 frame @30fps
// Voce: Iapetus
// ─────────────────────────────────────────────────────────────

export const MonumentoAiCaduti: React.FC = () => {
  const { fps } = useVideoConfig();
  const TRANSITION_DUR = 30;
  const springT = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DUR });

  return (
    <AbsoluteFill style={{ background: COLORS.neroProfondo }}>
      <Audio
        src={staticFile(AUDIO)}
        startFrom={0}
        volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: 'clamp' })}
      />
      <Audio
        src={staticFile('music/solenne-caduti.mp3')}
        volume={(f) => interpolate(f, [0, fps], [0, 0.13], { extrapolateRight: 'clamp' })}
        loop
      />

      <TransitionSeries>
        {/* Seq01 — Intro · Nebbia Dorata (300f) */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s01}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq02 — Il Milite · Nicola Di Vietri (440f) */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s02}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence02IlMilite />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq03 — Le Lapidi · I Nomi (400f) */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s03}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence03LeLapidi />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq04 — La Cerimonia · 4 Novembre (390f) */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s04}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence04LaCerimonia />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq05 — Outro · Memoria Immortale (398f) */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
