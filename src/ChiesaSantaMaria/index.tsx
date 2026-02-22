import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
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
  const fadeTiming = linearTiming({durationInFrames: SEQ_DUR.transition});

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.neroFondo}}>
      <Audio src={staticFile(AUDIO)} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s01} premountFor={SEQ_DUR.transition}>
          <Sequence01Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s02} premountFor={SEQ_DUR.transition}>
          <Sequence02IsideStrati />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s03} premountFor={SEQ_DUR.transition}>
          <Sequence03LaCattedrale />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s04} premountFor={SEQ_DUR.transition}>
          <Sequence04IlMiracolo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SEQ_DUR.s05}>
          <Sequence05Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
