import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02SanGerardo} from './Sequence02SanGerardo';
import {Sequence03LaChiave} from './Sequence03LaChiave';
import {Sequence04IlMiracolo} from './Sequence04IlMiracolo';
import {Sequence05Outro} from './Sequence05Outro';
import {AUDIO, COLORS, SEQ_DUR} from './constants';

// ──────────────────────────────────────────────────────────────────────
// TAG A2.08 — Pozzo del Miracolo
// 63.58s · 1907 frame @30fps
// 280+400+400+400+507 - 4×20 = 1987 - 80 = 1907 ✓
// ──────────────────────────────────────────────────────────────────────

export const PozzoDelMiracolo: React.FC = () => {
  const {fps} = useVideoConfig();
  const springT = springTiming({config: {damping: 200}, durationInFrames: SEQ_DUR.transition});

  return (
    <AbsoluteFill style={{background: COLORS.neroFondo}}>
      {/* Audio narrazione — voce Iapetus */}
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
        {/* Seq 01 — Intro ~9.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={30}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 02 — San Gerardo ~13.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={30}>
          <Sequence02SanGerardo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 03 — La Chiave ~13.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={30}>
          <Sequence03LaChiave />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 04 — Il Miracolo ~13.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={30}>
          <Sequence04IlMiracolo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 05 — Outro ~16.9s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05} premountFor={30}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
