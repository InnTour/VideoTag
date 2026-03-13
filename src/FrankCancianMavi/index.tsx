import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02Cancian } from './Sequence02Cancian';
import { Sequence03LaVitaContadina } from './Sequence03Museo';
import { Sequence04IlMuseo } from './Sequence04Outro';
import { Sequence05Outro } from './Sequence05Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ─────────────────────────────────────────────────────────────
// TAG C3.01 — Frank Cancian e il MAVI
// Voce: Iapetus · Durata: 58.70s · 1761 frame @30fps
// 300+420+340+340+441 − 4×20 = 1841 − 80 = 1761 ✓
// ─────────────────────────────────────────────────────────────

export const FrankCancianMavi: React.FC = () => {
  const { fps } = useVideoConfig();
  const TRANSITION_DUR = 30;
  const springT = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DUR });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFoto }}>
      {/* Audio narrazione — voce Iapetus · 58.70s */}
      <Audio
        src={staticFile(AUDIO)}
        startFrom={0}
        volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: 'clamp' })}
      />
      <Audio
        src={staticFile('music/jazz-vintage-1957.mp3')}
        volume={(f) => interpolate(f, [0, fps], [0, 0.18], { extrapolateRight: 'clamp' })}
        loop
      />

      <TransitionSeries>
        {/* Seq 01 — Intro · Manifesto MAVI ~10.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 02 — Frank Cancian · 1957 · 1801 scatti ~14.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02Cancian />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 03 — La Vita Contadina · bambiniBW→contadini ~11.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03LaVitaContadina />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 04 — Il Museo · maviInterno · stats ~11.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
          <Sequence04IlMuseo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 05 — Outro · L'Anima · loghi · iris ~14.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
