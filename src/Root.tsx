import "./index.css";
import { Composition, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { LacedoniaVideo } from "./LacedoniaVideo";
import { MetaBorghiVideo } from "./MetaBorghiVideo";
import { PortaLaStella } from "./PortaLaStella";
import { PiazzettaNicolaVella } from "./PiazzettaNicolaVella";
import { PiazzettaPrimoMaggio } from "./PiazzettaPrimoMaggio";
import { PortaDegliAlbanesi } from "./PortaDegliAlbanesi";
import { PortaDiSopra } from "./PortaDiSopra";
import { CattedralAttuale } from "./CattedralAttuale";
import { ChiesaSantAntonio } from "./ChiesaSantAntonio";
import { ChiesaSantAntonioV2 } from "./ChiesaSantAntonioV2";
import { TeatroComunale } from "./TeatroComunale";
import { BibliotecaVescovile } from "./BibliotecaVescovile";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        calculateMetadata={calculateCaptionedVideoMetadata}
        schema={captionedVideoSchema}
        width={1080}
        height={1920}
        defaultProps={{
          src: staticFile("sample-video.mp4"),
        }}
      />
      <Composition
        id="LacedoniaVideo"
        component={LacedoniaVideo}
        durationInFrames={1500}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MetaBorghiVideo"
        component={MetaBorghiVideo}
        durationInFrames={3150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* === CICERONE DIGITALE DI LACEDONIA — Clip Tematiche === */}

      {/* A1.02 — Porta la Stella · durata audio reale: ~64s → 1920 frame */}
      <Composition
        id="A1-02-PortaLaStella"
        component={PortaLaStella}
        durationInFrames={1920}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.05 — Piazzetta Nicola Vella · durata audio: 56.83s → 1705 frame */}
      <Composition
        id="A1-05-PiazzettaNicolaVella"
        component={PiazzettaNicolaVella}
        durationInFrames={1705}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.06 — Piazzetta Primo Maggio · durata audio: 68.28s → 2048 frame */}
      <Composition
        id="A1-06-PiazzettaPrimoMaggio"
        component={PiazzettaPrimoMaggio}
        durationInFrames={2048}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.07 — Porta degli Albanesi · durata audio: 65.57s → 1967 frame */}
      <Composition
        id="A1-07-PortaDegliAlbanesi"
        component={PortaDegliAlbanesi}
        durationInFrames={1967}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.10 — Porta di Sopra (Demolita) · durata audio: 73.34s → 2200 frame */}
      <Composition
        id="A1-10-PortaDiSopra"
        component={PortaDiSopra}
        durationInFrames={2200}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.01 — Cattedrale Attuale · durata audio: 74.92s → 2248 frame */}
      <Composition
        id="A2-01-CattedralAttuale"
        component={CattedralAttuale}
        durationInFrames={2248}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.03 — Chiesa Sant'Antonio (Congiura) v1 · durata audio: 79.34s → 2380 frame */}
      <Composition
        id="A2-03-ChiesaSantAntonio"
        component={ChiesaSantAntonio}
        durationInFrames={2380}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.03 v2 — Chiesa Sant'Antonio · Affresco Sacro · durata audio: 79.34s → 2380 frame */}
      <Composition
        id="A2-03v2-ChiesaSantAntonio"
        component={ChiesaSantAntonioV2}
        durationInFrames={2380}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A4.04 — Teatro Comunale · durata audio: 71.73s → 2152 frame */}
      <Composition
        id="A4-04-TeatroComunale"
        component={TeatroComunale}
        durationInFrames={2152}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A4.05 — Biblioteca Storica Vescovile · durata audio: 68.94s → 2068 frame */}
      <Composition
        id="A4-05-BibliotecaVescovile"
        component={BibliotecaVescovile}
        durationInFrames={2068}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
