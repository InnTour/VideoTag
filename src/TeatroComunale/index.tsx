import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Sequence01Intro } from './Sequence01Intro';
import { Sequence02Origini } from './Sequence02Origini';
import { Sequence03Cinema } from './Sequence03Cinema';
import { Sequence04Oggi } from './Sequence04Oggi';
import { Sequence05Outro } from './Sequence05Outro';
import { AUDIO, SEQ, DURATION, COLORS } from './constants';

export const TeatroComunale: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.neroSala }}>
      {/* Audio narrazione */}
      <Audio src={staticFile(AUDIO)} />

      {/* Seq 01 — Intro */}
      <Sequence from={SEQ.s01Start} durationInFrames={SEQ.s01End - SEQ.s01Start + 30}>
        <Sequence01Intro />
      </Sequence>

      {/* Seq 02 — Origini Romane */}
      <Sequence from={SEQ.s02Start} durationInFrames={SEQ.s02End - SEQ.s02Start + 30}>
        <Sequence02Origini />
      </Sequence>

      {/* Seq 03 — Cinema Argentino */}
      <Sequence from={SEQ.s03Start} durationInFrames={SEQ.s03End - SEQ.s03Start + 30}>
        <Sequence03Cinema />
      </Sequence>

      {/* Seq 04 — Oggi */}
      <Sequence from={SEQ.s04Start} durationInFrames={SEQ.s04End - SEQ.s04Start + 30}>
        <Sequence04Oggi />
      </Sequence>

      {/* Seq 05 — Outro */}
      <Sequence from={SEQ.s05Start} durationInFrames={DURATION - SEQ.s05Start}>
        <Sequence05Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
