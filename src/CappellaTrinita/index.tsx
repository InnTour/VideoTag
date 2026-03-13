import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02Lamorea } from './Sequence02Lamorea';
import { Sequence03Altare } from './Sequence03Altare';
import { Sequence04SanGerardo } from './Sequence04SanGerardo';
import { Sequence05SanGerardoMiracolo } from './Sequence05SanGerardoMiracolo';
import { Sequence06Outro } from './Sequence06Outro';
import { AUDIO, COLORS, SEQ_DUR } from './constants';

// ──────────────────────────────────────────────────────────────────────
// TAG A3.02 — Cappella Santissima Trinità
// 91.74s · 2752 frame @30fps
// 300+580+560+540+450+422 - 5×20 = 2852 - 100 = 2752 ✓
// ──────────────────────────────────────────────────────────────────────

export const CappellaTrinita: React.FC = () => {
  const { fps } = useVideoConfig();
  const TRANSITION_DUR = 30;
  const springT = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DUR });

  return (
    <AbsoluteFill style={{ background: COLORS.neroFondo }}>
      {/* Audio narrazione — voce Iapetus */}
      <Audio
        src={staticFile(AUDIO)}
        startFrom={0}
        volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: 'clamp' })}
      />
      <Audio
        src={staticFile('music/sacro-contemplativo.mp3')}
        volume={(f) => interpolate(f, [0, fps], [0, 0.17], { extrapolateRight: 'clamp' })}
        loop
      />

      <TransitionSeries>
        {/* Seq 01 — Intro ~10.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 02 — Lamorea & Iscrizione ~19.3s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02Lamorea />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 03 — L'Altare ~18.7s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03Altare />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 04 — San Gerardo ~18.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
          <Sequence04SanGerardo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 05 — Il Miracolo murales ~15.0s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05} premountFor={SEQ_DUR.transition}>
          <Sequence05SanGerardoMiracolo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        {/* Seq 06 — Rinascita/Outro ~14.1s */}
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s06}>
          <Sequence06Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
