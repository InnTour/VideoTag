import path from "path";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import {
  installWhisperCpp,
  downloadWhisperModel,
  transcribe,
  toCaptions,
} from "@remotion/install-whisper-cpp";

const WHISPER_PATH = path.join(process.cwd(), "whisper.cpp");
const WHISPER_VERSION = "1.6.0";
const WHISPER_MODEL = "medium"; // modello multilingue per italiano

const inputWav = process.argv[2];
const outputJson = process.argv[3];

if (!inputWav || !outputJson) {
  console.error("Usage: node transcribe-ita.mjs <input.wav> <output.json>");
  process.exit(1);
}

console.log("Installando whisper.cpp...");
await installWhisperCpp({ to: WHISPER_PATH, version: WHISPER_VERSION });
console.log("Scaricando modello medium...");
await downloadWhisperModel({ folder: WHISPER_PATH, model: WHISPER_MODEL });
console.log("Trascrivendo in italiano...");

const whisperOutput = await transcribe({
  inputPath: path.resolve(inputWav),
  model: WHISPER_MODEL,
  tokenLevelTimestamps: true,
  whisperPath: WHISPER_PATH,
  whisperCppVersion: WHISPER_VERSION,
  printOutput: true,
  translateToEnglish: false,
  language: "it",
  splitOnWord: true,
});

const { captions } = toCaptions({ whisperCppOutput: whisperOutput });

const outDir = path.dirname(path.resolve(outputJson));
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

writeFileSync(path.resolve(outputJson), JSON.stringify(captions, null, 2));
console.log("Trascrizione completata:", outputJson);
console.log("Totale segmenti:", captions.length);
