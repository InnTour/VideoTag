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
import { PozzoDelMiracolo } from "./PozzoDelMiracolo";
import { ChiesaSantaMaria } from "./ChiesaSantaMaria";
import { ChiesaConsolazione } from "./ChiesaConsolazione";
import { CappellaTrinita } from "./CappellaTrinita";
import { ChiesaSanRocco } from "./ChiesaSanRocco";
import { ChiesaSanNicola } from "./ChiesaSanNicola";
import { TeatroComunale } from "./TeatroComunale";
import { BibliotecaVescovile } from "./BibliotecaVescovile";
import { FrankCancianMavi } from "./FrankCancianMavi";
import { MonumentoAiCaduti } from "./MonumentoAiCaduti";
import { LapideTerremoto1930 } from "./LapideTerremoto1930";
import { ColonnaPedoca } from "./ColonnaPedoca";

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

      {/* A1.02 — Porta la Stella · durata audio: ~64s → 1920 frame */}
      <Composition
        id="A1-02-PortaLaStella"
        component={PortaLaStella}
        durationInFrames={1920}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.05 — Piazzetta Nicola Vella · voce Iapetus: 54.47s → 1634 frame */}
      <Composition
        id="A1-05-PiazzettaNicolaVella"
        component={PiazzettaNicolaVella}
        durationInFrames={1634}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.06 — Piazzetta Primo Maggio · voce Iapetus(1): 76.96s → 2309 frame */}
      <Composition
        id="A1-06-PiazzettaPrimoMaggio"
        component={PiazzettaPrimoMaggio}
        durationInFrames={2309}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.07 — Porta degli Albanesi · voce Iapetus(1): 65.59s → 1968 frame */}
      <Composition
        id="A1-07-PortaDegliAlbanesi"
        component={PortaDegliAlbanesi}
        durationInFrames={1968}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A1.10 — Porta di Sopra (Demolita) · voce Iapetus: 73.51s → 2205 frame */}
      <Composition
        id="A1-10-PortaDiSopra"
        component={PortaDiSopra}
        durationInFrames={2205}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.01 — Cattedrale Attuale · voce Iapetus(1): 74.95s → 2248 frame */}
      <Composition
        id="A2-01-CattedralAttuale"
        component={CattedralAttuale}
        durationInFrames={2248}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.03 — Chiesa Sant'Antonio (Congiura) v1 · voce Leda: 39.70s → 1191 frame */}
      <Composition
        id="A2-03-ChiesaSantAntonio"
        component={ChiesaSantAntonio}
        durationInFrames={1191}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.03 v2 — Chiesa Sant'Antonio · Affresco Sacro · voce Leda: 39.70s → 1191 frame */}
      <Composition
        id="A2-03v2-ChiesaSantAntonio"
        component={ChiesaSantAntonioV2}
        durationInFrames={1191}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.08 — Pozzo del Miracolo · voce Iapetus: 63.58s → 1907 frame */}
      <Composition
        id="A2-08-PozzoDelMiracolo"
        component={PozzoDelMiracolo}
        durationInFrames={1907}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A2.09 — Chiesa Santa Maria della Cancellata · voce Iapetus: 39.58s → 1187 frame */}
      <Composition
        id="A2-09-ChiesaSantaMaria"
        component={ChiesaSantaMaria}
        durationInFrames={1187}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A3.01 — Chiesa della Consolazione · voce Iapetus: 71.03s → 2131 frame */}
      <Composition
        id="A3-01-ChiesaConsolazione"
        component={ChiesaConsolazione}
        durationInFrames={2131}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A3.02 — Cappella Santissima Trinità · voce Iapetus: 91.74s → 2752 frame */}
      <Composition
        id="A3-02-CappellaTrinita"
        component={CappellaTrinita}
        durationInFrames={2752}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A3.04 — Chiesa di San Rocco · voce Iapetus: 93.96s → 2819 frame */}
      <Composition
        id="A3-04-ChiesaSanRocco"
        component={ChiesaSanRocco}
        durationInFrames={2819}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A3.06 — Chiesa di San Nicola · voce Iapetus: 79.02s → 2371 frame */}
      <Composition
        id="A3-06-ChiesaSanNicola"
        component={ChiesaSanNicola}
        durationInFrames={2371}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A4.04 — Teatro Comunale · voce Iapetus: 71.73s → 2152 frame */}
      <Composition
        id="A4-04-TeatroComunale"
        component={TeatroComunale}
        durationInFrames={2152}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A4.05 — Biblioteca Storica Vescovile · voce Iapetus: 68.94s → 2068 frame */}
      <Composition
        id="A4-05-BibliotecaVescovile"
        component={BibliotecaVescovile}
        durationInFrames={2068}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* C3.01 — Frank Cancian e il MAVI · voce Iapetus: 58.70s → 1761 frame */}
      <Composition
        id="C3-01-FrankCancianMavi"
        component={FrankCancianMavi}
        durationInFrames={1761}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A4.08 — Monumento ai Caduti · voce Iapetus: 61.60s → 1848 frame */}
      <Composition
        id="A4-08-MonumentoAiCaduti"
        component={MonumentoAiCaduti}
        durationInFrames={1848}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A4.09 — Lapide Terremoto 1930 · voce Iapetus: 66.06s → 1982 frame */}
      <Composition
        id="A4-09-LapideTerremoto1930"
        component={LapideTerremoto1930}
        durationInFrames={1982}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* A4.10 — Colonna del Pedoca · voce Iapetus: 59.19s → 1776 frame */}
      <Composition
        id="A4-10-ColonnaPedoca"
        component={ColonnaPedoca}
        durationInFrames={1776}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
