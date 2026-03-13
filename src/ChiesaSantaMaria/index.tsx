import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Sequence01Intro} from './Sequence01Intro';
import {Sequence02IsideStrati} from './Sequence02IsideStrati';
import {Sequence03LaCattedrale} from './Sequence03LaCattedrale';
import {Sequence04IlMiracolo} from './Sequence04IlMiracolo';
import {Sequence05Outro} from './Sequence05Outro';
import {AUDIO, COLORS, SEQ_DUR} from './constants';

// TAG A2.09 — Chiesa Santa Maria della Cancellata
// Audio: TAG_A2.09_CHIESA_SANTA_MARIA_Iapetus_ITA.mp3 · 80s = 2400 frame @30fps
// 300+500+440+420+820 - 4×20 = 2480 - 80 = 2400 ✓

export const ChiesaSantaMaria: React.FC = () => {
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
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={30}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={30}>
          <Sequence02IsideStrati />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={30}>
          <Sequence03LaCattedrale />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={30}>
          <Sequence04IlMiracolo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={springT} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05} premountFor={30}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
