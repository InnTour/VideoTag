/**
 * TAG B2.01 — Via Tagliata
 * "La Strada che Custodisce il Sangue di Roma"
 *
 * Durata: 173.35s · 5200 frame @30fps
 * Voce: Iapetus
 * Sottotitoli: disabilitati — gestiti in Filmora
 *
 * Sequenze:
 *   s01=720 + s02=1050 + s03=1080 + s04=1050 + s05=1380 − 4×20 = 5280−80 = 5200 ✓
 */
import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro }    from './Sequence01Intro';
import { Sequence02LaVia }    from './Sequence02LaVia';
import { Sequence03Annibale } from './Sequence03Annibale';
import { Sequence04Caedes }   from './Sequence04Caedes';
import { Sequence05Outro }    from './Sequence05Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

export const ViaTagliata: React.FC = () => {
  const { fps } = useVideoConfig();
  const TRANSITION_DUR = 30;
  const springT = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DUR });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* ── Narrazione principale ──────────────────────────────────────────────── */}
      <Audio
        src={staticFile(AUDIO.narrazione)}
        startFrom={0}
        volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: 'clamp' })}
      />
      <Audio
        src={staticFile('music/romano-ambient.mp3')}
        volume={(f) => interpolate(f, [0, fps], [0, 0.18], { extrapolateRight: 'clamp' })}
        loop
      />

      {/* ── Sequenze ──────────────────────────────────────────────────────────── */}
      <TransitionSeries>
        {/* Seq01 — Intro · Selciato · 24s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s01}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq02 — La Via · 150 d.C. · 35s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s02}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence02LaVia />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq03 — 212 a.C. · Annibale · 36s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s03}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence03Annibale />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq04 — Caedes · Origine del nome · 35s */}
        <TransitionSeries.Sequence
          durationInFrames={SEQ_DUR.s04}
          premountFor={SEQ_DUR.transition}
        >
          <Sequence04Caedes />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq05 — Outro · Memoria · 46s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
