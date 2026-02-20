# Remotion Video Engine — Cicerone Digitale di Lacedonia
### Documento Vivente · InnTour S.R.L. · MetaBorghi Initiative

> **Documento Auto-Aggiornante**: Questo file è il cuore operativo del progetto. Viene aggiornato da Claude in tempo reale dopo ogni clip prodotta, ogni pattern scoperto, ogni ottimizzazione applicata. Tratta questo documento come un regista tratta il suo quaderno di regia: è vivo, in costante evoluzione, e riflette lo stato esatto del progetto in ogni momento.

---

## 🎯 Missione del Progetto

**Progetto**: *Cicerone Digitale di Lacedonia* — Serie di clip cinematografiche per il virtual tour del Comune di Lacedonia (AV), Irpinia, Campania.

**Obiettivo**: Produrre una serie di clip video di alta qualità cinematografica (50–80 secondi ciascuna) che narrino la storia, la cultura, l'identità e il patrimonio materiale e immateriale di Lacedonia. Ogni clip è una storia autonoma, con inizio, sviluppo e climax emotivo. L'insieme forma un'opera narrativa coerente che trasforma il virtual tour in un'esperienza emozionante e memorabile.

**Flusso Operativo**:
```
Brief Narrativo
    ↓
Claude analizza contesto storico/culturale
    ↓
Claude progetta la clip: struttura, testi, timing, stile visivo
    ↓
Claude scrive il codice Remotion
    ↓
Claude genera/assembla audio (narrazione + musica + effetti)
    ↓
Claude genera/integra sottotitoli multilingue (IT · EN · Cerugnés)
    ↓
Rendering con Remotion CLI (Cloud Code)
    ↓
Output: MP4 1920×1080 · 50–80s · audio embedded · sottotitoli burned-in
    ↓
Caricamento nella cartella progetto + aggiornamento registro
```

**Impatto Atteso**: Ogni clip deve produrre un autentico "effetto wow" — emozione, stupore, orgoglio identitario. I visitatori del virtual tour devono sentirsi catapultati nel cuore di Lacedonia. I residenti devono riconoscere e celebrare la propria storia.

---

## 🏛️ Contesto Storico-Culturale — Lacedonia

> Claude deve sempre consultare questa sezione prima di scrivere qualsiasi testo narrativo o strutturare una clip. La profondità storica è il materiale grezzo da cui nasce la qualità cinematografica.

### Identità Territoriale
- **Posizione**: Lacedonia, Comune dell'Alta Irpinia (AV), Appennino meridionale, Campania
- **Altitudine**: ~734 m s.l.m. — paesaggio di creste, boschi, vento e luce radente
- **Popolazione**: ~2.000 abitanti — comunità autentica, memoria storica vivente
- **Carattere**: Borgo di confine tra Campania e Puglia e Basilicata, crocevia millenario di culture, lingue e popoli

### Stratificazione Storica
- **Origini sannite**: L'area era territorio dei Sanniti Irpini — guerrieri liberi, montanari indomiti
- **Età romana**: Presenza di *Aeclanum* nell'area, tracce di centuriazione e insediamenti
- **Longobardi e Normanni**: Il castello di Lacedonia testimonia il periodo medievale e la stratificazione feudale
- **Terremoti storici**: 1930 (devastante), 1980 (Terremoto dell'Irpinia) — la resilienza come identità
- **Emigrazione e ritorno**: La diaspora irpina nel mondo; i discendenti che tornano cercando radici

### Patrimonio Materiale
- **Castello Normanno-Svevo**: Dominante sul paesaggio, simbolo di potere e resistenza
- **Centro storico**: Vicoli, portali in pietra calcarea, scalinate, logge panoramiche
- **Chiesa Matrice**: Arte sacra, ex-voto, stratificazioni devozionali
- **Fontane storiche**: Punti di aggregazione comunitaria, memoria dell'acqua
- **Panorama Appenninico**: Vista sulla Campania interna, verso il Vulture, verso il Foggiano

### Patrimonio Immateriale
- **Dialetto Cerugnés**: Varietà linguistica locale con caratteristiche fonetiche uniche, rilevante per la linguistica romanza — lingua della memoria emotiva
- **Tradizioni calendariali**: Feste patronali, riti stagionali, processioni
- **Gastronomia irpina**: Cipolla ramata, pasta fatta a mano, formaggi di pecora, vini d'altura
- **Canti e musica popolare**: Tammurriate, tarantelle irpine, canti di lavoro
- **Artigianato**: Pietra lavorata, ceramiche, tessuti

### I 131 Punti del Patrimonio
Il Cicerone Digitale organizza il territorio in **6 sezioni tematiche**:
1. **Architettura e Monumenti** — Castello, chiese, edifici storici
2. **Paesaggio e Natura** — Vedute, boschi, itinerari naturalistici
3. **Tradizioni e Cultura Popolare** — Feste, riti, artigianato
4. **Gastronomia e Prodotti Tipici** — Eccellenze enogastronomiche
5. **Memoria e Identità** — Emigrazione, resilienza, storie di comunità
6. **Lingua Cerugnés** — Patrimonio linguistico immateriale, glossario, espressioni

---

## 🎬 Specifiche Tecniche Clip

### Formato di Uscita
| Parametro | Valore |
|-----------|--------|
| **Risoluzione** | 1920 × 1080 px (Full HD) |
| **Frame Rate** | 30 fps |
| **Durata** | 50–60 secondi (1500–1800 frame a 30fps) |
| **Codec Video** | H.264 (compatibilità massima) |
| **Codec Audio** | AAC 48kHz Stereo |
| **Bitrate Video** | ~8 Mbps (alta qualità, streaming-ready) |
| **Formato Output** | MP4 |
| **Sottotitoli** | Burned-in + file .SRT separato |
| **Lingue** | Italiano (principale) · Inglese · Cerugnés (dove appropriato) |

### Struttura Narrativa Standard per Clip
Ogni clip segue un arco drammaturgico preciso:

```
ATTO I — AGGANCIO (0–8s)
  Logo/intro InnTour · Titolo sezione tematica
  Primo frame ad alto impatto visivo
  Hook narrativo (frase di apertura che cattura)
  
ATTO II — SVILUPPO (8–45s)
  Narrazione principale strutturata in micro-sequenze
  Alternanza testo / immagine / dati contestuali
  Build-up emotivo progressivo
  Integrazione sottotitoli bilingue IT/EN
  
ATTO III — CLIMAX & CALL-TO-ACTION (45–60s)
  Peak emotivo — la rivelazione, il dettaglio sorprendente
  Frase conclusiva memorabile (tagline narrativa)
  Logo InnTour + Comune di Lacedonia
  Indicazione sito / virtual tour
```

---

## 🛠️ Stack Tecnologico

### Remotion (Core Engine)
- **Framework**: [Remotion](https://www.remotion.dev/) — React-based video production
- **Versione Target**: Remotion 4.x (latest stable)
- **Rendering**: `npx remotion render` via Cloud Code CLI
- **Composizioni**: Una composizione per clip, namespace chiaro (es. `CastelloNormanno`, `DialettoCerugnes`)
- **Struttura Progetto**:
  ```
  lacedonia-video/
  ├── src/
  │   ├── compositions/        # Una cartella per clip
  │   │   ├── castello/
  │   │   ├── paesaggio/
  │   │   ├── tradizioni/
  │   │   ├── gastronomia/
  │   │   ├── memoria/
  │   │   └── cerugnes/
  │   ├── components/          # Componenti riutilizzabili
  │   │   ├── TextOverlay/
  │   │   ├── SubtitleBar/
  │   │   ├── LogoIntro/
  │   │   ├── KenBurns/        # Effetto zoom/pan su immagini statiche
  │   │   ├── ParallaxLayer/
  │   │   ├── AudioVisualizer/
  │   │   └── TransitionEngine/
  │   ├── audio/               # File audio per le clip
  │   ├── assets/              # Immagini, font, loghi
  │   └── Root.tsx             # Registro di tutte le composizioni
  ├── public/                  # Asset statici
  ├── package.json
  ├── remotion.config.ts
  └── CLAUDE.md                # Questo file
  ```

### Tecnologie Audio
- **Narrazione**: File MP3/WAV pre-generati (ElevenLabs, Azure TTS, o registrazioni originali)
- **Musica di Sottofondo**: Brani ambient/orchestrali liberi da diritti (es. Pixabay, Freesound, o composizioni originali)
- **Mixer Audio in Remotion**: `<Audio>` component con timing preciso, fade-in/fade-out, volume normalizzato
- **Standard Audio**: Narrazione a -6dBFS, musica a -18dBFS (ducking automatico durante narrazione)

### Tecnologie Testo e Sottotitoli
- **Font principale**: Google Fonts `Playfair Display` (titoli) + `Lato` (testi corpo)
- **Sottotitoli IT**: Generati da script di trascrizione o forniti manualmente
- **Sottotitoli EN**: Traduzione professionale o AI-assisted (Claude API)
- **Cerugnés**: Curato da esperti linguistici locali, formattato con font speciale se necessario
- **Formato SRT**: Generato parallelamente per utilizzo su piattaforme video

### Effetti Visivi Cinematografici
- **Ken Burns Effect**: Zoom lento + pan su fotografie storiche e panoramiche
- **Parallax Layers**: Profondità visiva su composizioni fotografiche multiple
- **Color Grading**: Palette calda/dorata per interni, fredda/nebbiosa per panorami
- **Transizioni**: Cross-fade cinematografici, wipe diretti, flash bianchi per cambi di atto
- **Particelle**: Effetti polvere/luce per sequenze storiche, petali/foglie per sequenze naturali
- **Typography Kinetics**: Testi che appaiono lettera per lettera, parola per parola, con peso variabile

---

## 📐 Sistema di Design Visivo

### Palette Cromatica

```
PRIMARI (Identità InnTour):
  Verde InnTour:    #2ECC71  (vitalità, territorio, natura)
  Azure InnTour:    #3498DB  (innovazione, cielo, apertura)
  Lime InnTour:     #A8E063  (energia, modernità)

SECONDARI (Lacedonia / Irpinia):
  Pietra Antica:    #8B7355  (architettura, storia)
  Oro Irpino:       #D4A843  (tradizioni, calore, luce meridionale)
  Terra Bruciata:   #A0522D  (terra, radici, autenticità)
  Verde Bosco:      #2D5016  (natura appenninica, boschi)
  Cielo Irpino:     #87CEEB  (panorami, libertà, altitudine)

NEUTRI:
  Bianco Calce:     #F8F4EE  (sfondi, respiro visivo)
  Antracite:        #2C2C2C  (testi principali)
  Grigio Caldo:     #6B6560  (testi secondari)
```

### Tipografia

```
⚠️ STANDARD AGGIORNATO (dal 2026-02-20 — Clip di riferimento: A4.05 BibliotecaVescovile):
  I font sono stati aumentati di 2-4 punti per migliorare leggibilità su schermi video.

TITOLI PRINCIPALI:
  Font: Playfair Display (Bold/Italic)
  Dimensione: 88–108px  ← aggiornato (era 72–96px)
  Tracking: -0.02em
  Colore: Oro Irpino su scuro / Bianco su sfondi fotografici
  Effetto: Text-shadow sottile per leggibilità su foto

SOTTOTITOLI / SEZIONE:
  Font: Lato (Light 300 / Regular 400)
  Dimensione: 38–46px  ← aggiornato (era 32–42px)
  Tracking: 0.1em (maiuscolo)
  Colore: Bianco Calce / Oro Irpino

NARRAZIONE / CORPO:
  Font: Lato (Regular 400 / Light 300)
  Dimensione: 26–30px  ← aggiornato (era 24–30px)
  Interlinea: 1.55–1.6
  Colore: Bianco su overlay scuro

LABEL SEZIONE / HEADER CARD:
  Font: Lato (Bold 700)
  Dimensione: 15–17px  ← aggiornato (era 11–14px)
  Tracking: 0.16–0.22em (maiuscolo)
  Colore: Accent della palette della clip

TITOLI CARD / GLASSMORPHISM:
  Font: Playfair Display (Bold) / Lato (Bold)
  Dimensione: 38–44px  ← aggiornato
  Colore: Bianco Calce

CORPO CARD / GLASSMORPHISM:
  Font: Lato (Light 300)
  Dimensione: 22–26px  ← aggiornato (era 18px)
  Interlinea: 1.55

COUNTER NUMERI:
  Font: Playfair Display (Bold)
  Dimensione: 84–96px  ← standard per impatto visivo
  Colore: Accent principale della clip

CITAZIONI (Georgia italic):
  Font: Georgia (Italic)
  Dimensione: 22–26px  ← aggiornato
  Bordo sinistro: 4px accent color

SOTTOTITOLI VIDEO (Filmora):
  [Gestiti in post-produzione — non nel codice Remotion]

CERUGNÉS (citazioni dialettali):
  Font: Georgia (Italic) — autorità linguistica
  Dimensione: 38px  ← aggiornato (era 36px)
  Colore: Oro Irpino
  Bordo sinistro: 4px Oro Irpino
  Padding: 16px 24px
```

### Componenti UI Riutilizzabili

#### `<LogoIntro duration={60} />`
Sequenza di apertura: Logo InnTour che emerge su sfondo nero, dissolvenza su primo frame clip.

#### `<SectionBadge section="castello" />`
Badge laterale con icona e nome sezione tematica. Appare al secondo 2, rimane per 8 secondi.

#### `<NarrativeText text="..." startFrame={90} />`
Testo narrativo con animazione di ingresso (fade-up 0.5s). Supporta testo lungo con wrapping intelligente.

#### `<SubtitleBar it="..." en="..." frame={currentFrame} />`
Barra sottotitoli sincronizzata. Lingua IT sopra, EN sotto (più piccolo), separati da sottile linea oro.

#### `<KenBurns src="..." from="zoom-in" intensity={0.05} />`
Effetto Ken Burns su immagine statica. `intensity` controlla la percentuale di zoom/pan.

#### `<CinematicOverlay type="warm|cool|sepia" opacity={0.3} />`
Overlay cromatico per color grading. Layering CSS su immagini originali.

#### `<FactCard title="..." value="..." unit="..." />`
Scheda dato contestuale (es. "Anno di fondazione | 1050 d.C. | stima storica"). Ingresso animato.

#### `<AudioDuck narrationRef audioRef />`
Componente logic che abbassa automaticamente musica di fondo durante narrazione.

#### `<OutroSignature duration={90} />`
Sequenza di chiusura: Logo InnTour + Comune di Lacedonia + URL + QR code virtual tour.

---

## 🎭 Linee Guida Narrative

### Voce Narrativa
La narrazione delle clip deve avere una **personalità precisa**: non è una guida turistica, non è un documentario accademico. È il racconto di un **Cicerone appassionato** — qualcuno che ama Lacedonia visceralmente, conosce ogni pietra, ogni storia, ogni sfumatura dialettale.

**Tono**: Caldo, autorevole, poetico quando serve, diretto quando racconta fatti, commosso quando tocca l'identità.

**Ritmo**: Frasi corte per i fatti. Frasi più lunghe e sinuose per le emozioni. Pause drammatiche tra le sequenze.

**Aperture efficaci** (esempi):
- *"C'è un momento, al tramonto, in cui Lacedonia diventa oro."*
- *"I Sanniti sapevano scegliere i posti. Seicento metri sul mare, vento che non si ferma mai."*
- *"Ogni pietra di questo castello ha visto almeno dieci secoli. Ognuna ha una storia che il vento non ha ancora finito di raccontare."*
- *"'Cicerone' non è solo un nome. È una promessa: ti mostro quello che gli altri non vedono."*

**Chiusure efficaci**:
- *"Lacedonia non è solo un luogo. È una domanda che ti porti a casa."*
- *"Il Cerugnés non muore finché c'è qualcuno che lo ricorda. E oggi, lo ricordiamo insieme."*
- *"Vieni a vedere. La storia non aspetta — ma Lacedonia sì."*

### Regole Auree per Claude
1. **Mai il cliché**: Vietati "borgo incantevole", "luogo magico", "perla nascosta". Sii specifico, concreto, sorprendente.
2. **Il dettaglio vince**: Un anno preciso, un nome di persona, una misura, un colore specifico — questi elementi creano credibilità e emozione.
3. **La tensione narrativa è tutto**: Ogni clip deve avere un momento di sorpresa o di rivelazione. Lo spettatore deve pensare "non lo sapevo".
4. **Il dialetto è orgoglio, non folklore**: Quando si introduce il Cerugnés, va trattato con rispetto linguistico, non come curiosità pittoresca.
5. **La resilienza è il fil rouge**: Lacedonia ha subito terremoti devastanti e ha ricostruito. Questa forza è la vera identità del borgo.

---

## 📋 Istruzioni Operative per Claude

### ⚠️ Regola Aggiornata: SOTTOTITOLI DISABILITATI (dal 2026-02-18)

> **DECISIONE OPERATIVA**: I sottotitoli burned-in NON vengono più generati né integrati nelle clip Remotion. La gestione dei sottotitoli è delegata completamente a **Wondershare Filmora** nella fase di post-produzione finale.
>
> **Cosa NON fare** nelle nuove clip:
> - ❌ Non importare `SubtitleBar` in `index.tsx`
> - ❌ Non includere `<SubtitleBar />` nel JSX
> - ❌ Non generare file `.SRT` (a meno che non venga esplicitamente richiesto)
> - ❌ Non definire array `SUBTITLES` in `constants.ts`
>
> **La trascrizione Whisper** può ancora essere eseguita per estrarre il **contenuto storico** dell'audio (nomi, date, fatti), ma il risultato viene usato solo per le **cards narrative** nel codice Remotion, non per i sottotitoli.
>
> I file `components/SubtitleBar.tsx` restano nelle cartelle esistenti ma non vengono utilizzati.

---

### Comportamento Standard per ogni Clip

Quando ricevo una richiesta di produzione clip (es. "crea la clip sul Castello"):

1. **CONSULTA** la sezione Contesto Storico-Culturale per il tema richiesto
2. **PROGETTA** la struttura narrativa: Atto I / II / III con timing preciso
3. **SCRIVI** la narrazione seguendo le linee guida narrative
4. **CREA** il codice Remotion per la composizione, usando i componenti del sistema di design — **senza SubtitleBar**
5. **DOCUMENTA** la clip nel Registro sottostante
6. **AGGIORNA** le Metriche e il Changelog di questo file

### Ordine di Priorità Creativa
Quando ho libertà interpretativa (che è ampia e incoraggiata):
- Massimizzare l'**impatto emotivo** della clip
- Garantire la **coerenza visiva** con il sistema di design InnTour
- Innovare nei **pattern di animazione** (mai due clip uguali nello stile)
- Assicurare la **precisione storica** dei contenuti
- Ottimizzare la **leggibilità** su tutti i dispositivi (anche mobile)

### Gestione Asset Forniti
Quando vengono caricati asset nella cartella progetto:
- **Fotografie originali**: Applicare Ken Burns, color grading, composizione a layers
- **File audio narrazione**: Sincronizzare con testi, generare SRT automaticamente
- **File audio musica**: Applicare ducking, fade-in/out, loop intelligente
- **File audio dialetto Cerugnés**: Trattare con cura speciale, featured prominentemente
- **Documenti storici / testi**: Estrarre citazioni chiave per le NarrativeText cards

### Auto-Aggiornamento del File
**CRITICO**: Dopo ogni clip completata, aggiornare:
- ✅ Registro Clip (nuova entry)
- ✅ Metriche (contatore, tempo totale)
- ✅ Pattern Scoperti (nuove tecniche Remotion trovate)
- ✅ Changelog (data e descrizione modifiche)
- ✅ Asset Inventory (foto, audio, font utilizzati)

---

## 🔧 Configurazione Ambiente

### Setup Remotion (Inizializzazione Progetto)
```bash
# 1. Crea progetto Remotion
npx create-video@latest lacedonia-video --template=blank-typescript

# 2. Installa dipendenze aggiuntive
cd lacedonia-video
npm install @remotion/player @remotion/motion-blur
npm install @remotion/google-fonts
npm install framer-motion  # Per animazioni avanzate

# 3. Configura remotion.config.ts
# - FPS: 30
# - Width: 1920
# - Height: 1080
# - ConcurrentRenderers: 4 (bilanciato per qualità)

# 4. Struttura cartelle
mkdir -p src/compositions/{castello,paesaggio,tradizioni,gastronomia,memoria,cerugnes}
mkdir -p src/components/{TextOverlay,SubtitleBar,LogoIntro,KenBurns,ParallaxLayer,TransitionEngine}
mkdir -p src/audio src/assets/{images,fonts,logos}
mkdir -p public
```

### Rendering via Cloud Code
```bash
# Render singola clip
npx remotion render src/index.ts CastelloNormanno out/castello.mp4 \
  --codec=h264 \
  --jpeg-quality=95 \
  --log=verbose

# Render tutte le clip
npx remotion render src/index.ts --all \
  --output-dir=out/ \
  --codec=h264

# Preview in browser (sviluppo)
npx remotion studio
```

### Configurazione `remotion.config.ts`
```typescript
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setOverwriteOutput(true);
Config.setOutputLocation('out');
Config.setChromiumOpenGlRenderer('angle');  // Migliori performance GPU
Config.setTimeoutInMilliseconds(60000);     // 60s timeout per clip lunghe
```

### Variabili di Progetto
```
PROGETTO: Cicerone Digitale di Lacedonia
CLIENT: InnTour S.R.L. / Comune di Lacedonia
ANNO: 2026
LINGUA_PRIMARIA: Italiano
LINGUE_SECONDARIE: Inglese, Cerugnés
SEZIONI_TEMATICHE: 6
PUNTI_PATRIMONIO: 131
CLIP_TARGET: ~18 (3 per sezione, più intro e outro generali)
DURATA_CLIP: 50–60 secondi
RISOLUZIONE: 1920×1080 @ 30fps
```

---

## 🎨 Pattern Cinematografici Documentati

> Questa sezione documenta le tecniche Remotion e i pattern visivi/narrativi già sviluppati e testati. Viene aggiornata automaticamente.

### Pattern 1: Ken Burns su Architettura Storica
**Scenario**: Clip su edifici storici con sole fotografie disponibili
**Implementazione**:
```typescript
// Partenza: inquadratura totale dell'edificio
// Zoom lento verso il dettaglio più significativo (portale, finestra, stemma)
// Durata: tutta la clip (1500-1800 frame)
// Intensity: 0.04 (sottile, non disturbante)

const kenBurnsStyle = useCurrentFrame(frame => ({
  transform: `scale(${1 + frame * 0.00003 * 0.04}) 
              translateX(${frame * 0.01}px)`,
  transformOrigin: 'center center',
}));
```
**Quando usarlo**: Castello, chiese, edifici storici
**Note**: Sempre combinare con overlay cromatico warm (#D4A843 a 15% opacità)

### Pattern 2: Split-Screen Temporale
**Scenario**: "Prima e dopo" — il borgo prima del 1980, dopo la ricostruzione
**Implementazione**: Canvas diviso verticalmente, linea di separazione animata da sx a dx, stesso soggetto in due epoche
**Quando usarlo**: Narrazioni sulla resilienza post-terremoto
**Note**: La linea di separazione può essere la timeline testuale (anno sx · anno dx)

### Pattern 3: Typography-Led Sequence
**Scenario**: Clip sul dialetto Cerugnés — le parole stesse sono il visual
**Implementazione**: Testo grande (120px+) come elemento visivo principale, immagini in background sfocate a bassa opacità
**Quando usarlo**: Sezione Cerugnés, citazioni storiche potenti
**Note**: Le parole compaiono e scompaiono con timing musicale

### Pattern 4: Panorama Reveal
**Scenario**: Apertura clip con rivelazione progressiva del paesaggio appenninico
**Implementazione**: Frame inizia con dettaglio (un fiore, una pietra) poi zoom-out lento che rivela il panorama
**Quando usarlo**: Sezione Paesaggio, apertura clip generali
**Note**: Massimo impatto se accompagnato da crescendo musicale

### Pattern 5: Data Card Sequence
**Scenario**: Clip che racconta fatti storici con dati precisi
**Implementazione**: Serie di FactCards animate in sequenza, ogni card appare con bounce sottile, dato numerico conta fino al valore finale
**Quando usarlo**: Cronologie storiche, statistiche demografiche, dati patrimonio
**Note**: Non più di 4 FactCards per clip (rischio information overload)

### Pattern 6: Foto + Glassmorphism Overlay (Photo-First Cinematic)
**Scenario**: Clip con immagini AI-generate o fotografiche disponibili — il visual reale diventa protagonista
**Implementazione**:
```typescript
// Struttura layering:
// 1. KenBurnsImage (foto come sfondo animato, zoom/pan 4-6%)
// 2. Overlay gradiente bitonale (sx scuro per testo, dx trasparente per foto)
// 3. Vignette top/bottom per profondità
// 4. Testo + GlassCards (backdrop-filter: blur, rgba scuro 0.75-0.82)
// 5. ParticleField ridotto (opacity 0.25-0.35 su foto)
// 6. ScanLines (opacity 0.025 — effetto cinematografico discreto)

// Cross-dissolve tra due immagini:
const crossDissolveProgress = interpolate(frame, [dissolveStart, dissolveEnd], [0, 1], {...});
<div style={{opacity: 1 - crossDissolveProgress}}><KenBurnsImage src="img1" /></div>
<div style={{opacity: crossDissolveProgress}}><KenBurnsImage src="img2" /></div>
```
**Quando usarlo**: Ogni clip con immagini disponibili — questa è la modalità predefinita
**Regola**: Il testo deve sempre avere `textShadow` e le card `backdropFilter: blur(16-20px)` per leggibilità su foto
**Asset Naming**: Le immagini AI per ogni TAG vanno in `public/images/[TAG-name]/image_[uuid].png`
**Trascrizione automatica**: Usare Whisper cpp (model: medium, lang: it) per generare sottotitoli da audio MP3
  Conversione: `npx remotion ffmpeg -i input.mp3 -ar 16000 output.wav -y`
  Whisper: `transcribe({whisperPath, inputPath, model:'medium', tokenLevelTimestamps:true, language:'it'})`

### Pattern 7: Circolarità Narrativa con Iris Outro
**Scenario**: Sequenza finale che richiama la prima immagine (stessa foto, diverso mood)
**Implementazione**: Stesso src della Seq01, ma con `motion="zoom-out"` e overlay più pesante per far emergere i loghi
**Quando usarlo**: Ogni clip — crea senso di completezza e coerenza artistica
**Note**: La stessa foto intro/outro funge da "bookend" narrativo. Aggiungere effetto iris con `irisProgress`

---

## 📊 Registro Clip Prodotte

> **Auto-aggiornamento**: Ogni clip completata viene registrata qui con tutti i dettagli.

### Template Entry
```
### Clip #[N] — [Titolo Descrittivo]
- **Data Produzione**: YYYY-MM-DD
- **Sezione Tematica**: [nome sezione]
- **Durata**: [X secondi] / [Y frame @30fps]
- **Asset Utilizzati**: [lista file usati]
- **Pattern Applicati**: [lista pattern]
- **Lingua Narrazione**: IT + EN (+ Cerugnés se presente)
- **File Output**: `out/[nome_file].mp4`
- **Note Creative**: [scelte stilistiche e motivazioni]
- **Lezioni Apprese**: [tecniche o fix scoperte]
```

---

### Clip Prodotte

### Clip #1 — A1.02 · Porta la Stella
- **Data Produzione**: 2026-02-17
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 64 secondi / 1920 frame @30fps
- **Composizione Remotion**: `A1-02-PortaLaStella`
- **Audio**: `TAG_A1.02_PORTA_LA_STELLA_Iapetus_ITA.mp3` (voce Iapetus)
- **Sottotitoli**: `A1-2_ITA.srt` forniti manualmente → hardcoded in constants.ts (7 segmenti)
- **Asset Visivi**: Solo SVG procedurali (nessuna foto fornita)
  - `PortaSVG.tsx` — porta medievale con stella a 6 punte, variante `buried={true}`
  - `MappaCasali.tsx` — diagramma animato Lacedonia→Rocchetta
- **Pattern Applicati**: Pattern 2 (Split-Screen Temporale), Pattern 5 (Data Card Sequence), Ken Burns SVG
- **Lingua Narrazione**: IT (sottotitoli burned-in)
- **File Output**: Da renderizzare — `out/A1-02-PortaLaStella.mp4`
- **Note Creative**: 4 sequenze narrative (Intro/Storia/Paradosso/Risoluzione). La porta è sia sepolta che soglia — questo paradosso è il cuore della clip. Estetica sobria con gold accent.
- **Lezioni Apprese**:
  - ID composizione: SOLO hyphens `-`, mai underscores `_` (causa white page)
  - Durata audio reale va sempre verificata con `npx remotion ffmpeg -i file.mp3 2>&1 | grep Duration`
  - TS6133: rimuovere sempre le variabili inutilizzate nel destructuring `.map()`

---

### Clip #2 — A1.05 · Piazzetta Nicola Vella
- **Data Produzione**: 2026-02-17
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 56.83 secondi / 1705 frame @30fps
- **Composizione Remotion**: `A1-05-PiazzettaNicolaVella`
- **Audio**: `TAG_A1.05_PIAZZETTA_NICOLA_VELLA_Leda_ITA.mp3` (voce Leda)
- **Sottotitoli**: Auto-generati con Whisper.cpp (model: medium, lang: it) → 7 segmenti hardcoded
- **Asset Visivi**: 5 immagini AI in `public/images/Nicola Vella/`
  - `image_695bd7aa` — Vella nella piazzetta di Lacedonia (Intro + Outro — bookend)
  - `image_e2347f6d` — Vella firma documenti con testimoni (Seq02 Personaggio)
  - `image_0ba1c98b` — Folla con bandiere e falci (Seq03 Storia, primo layer)
  - `image_a9776721` — Marcia contadina nella campagna irpina (Seq03 Storia, cross-dissolve)
  - `image_1046a492` — Vella dirige la ricostruzione del borgo (Seq04 Impegno)
- **Componenti Creati**:
  - `KenBurnsImage.tsx` — componente riutilizzabile per foto animate (zoom-in/out, pan L/R)
  - `ParticleField.tsx` — 55 particelle tri-colore, movimento sinusoidale
  - `ScanLines.tsx` — overlay cinematografico SVG pattern
  - `PersonaggioVella.tsx` — silhouette olografica SVG (non utilizzata nella versione foto)
  - `PiazzettaSVG.tsx` — piazzetta isometrica wireframe (non utilizzata nella versione foto)
- **Pattern Applicati**: Pattern 6 (Photo-First Cinematic), Pattern 7 (Iris Outro), Pattern 5 (Data Card)
- **Lingua Narrazione**: IT (sottotitoli burned-in)
- **File Output**: Da renderizzare — `out/A1-05-PiazzettaNicolaVella.mp4`
- **Contenuto Storico Reale** (trascritto con Whisper):
  - Nicola Vella: avvocato, **primo sindaco democratico** di Lacedonia (1946)
  - Eletto con coalizione di sinistra · larghissimo consenso popolare
  - Mandato 1946–1950: acqua, terre incolte, riscatto contadini
  - Cariche: Sindaco · Consigliere Provinciale · Candidato Parlamento
- **Note Creative**: Estetica moderna/futuristica con glassmorphism e neon accents. Cross-dissolve tra immagini della lotta popolare nella Seq03. Circolarità narrativa (stessa foto intro/outro).
- **Lezioni Apprese**:
  - Whisper.cpp richiede WAV 16kHz: `npx remotion ffmpeg -i input.mp3 -ar 16000 output.wav -y`
  - Audio senza SRT → trascrizione automatica → contenuto storico reale molto diverso dai placeholder
  - Immagini AI portrait (ratio ~9:16) si adattano bene come sfondi 16:9 con `objectFit: cover`
  - `backdropFilter: blur()` su GlassCards garantisce leggibilità anche su foto molto contrastate

### Clip #3 — A1.06 · Piazzetta Primo Maggio
- **Data Produzione**: 2026-02-17
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 68.28 secondi / 2048 frame @30fps
- **Composizione Remotion**: `A1-06-PiazzettaPrimoMaggio`
- **Audio**: `TAG_A1.06_PIAZZETTA_PRIMO_MAGGIO_Leda_ITA(1).mp3` (voce Leda)
- **Sottotitoli**: Auto-generati con Whisper.cpp main.exe (model: medium, lang: it) → 10 segmenti hardcoded
- **Asset Visivi**: 5 immagini in stile pittoresco-oil in `public/images/Primo Maggio/`
  - `image_9592a387` — Contadini nella piazzetta al tramonto (Intro + Outro — bookend)
  - `image_68f296c7` — Vicolo in pietra del borgo (Seq02 Roccia, layer 1)
  - `image_42537123` — Padre con bambini sul balcone panoramico (Seq02 Roccia, cross-dissolve)
  - `image_0587f294` — Folla "Pane e Lavoro" nella piazzetta (Seq03 Marcia, layer 1)
  - `image_9db3a61d` — Colonna con bandiere rosse verso Chiancarelle (Seq03+04 climax)
- **Pattern Applicati**: Pattern 6 (Photo-First Cinematic), Pattern 7 (Circolarità/Iris Outro), Pattern 5 (Data Card + Counter animato)
- **Lingua Narrazione**: IT (sottotitoli burned-in)
- **File Output**: Da renderizzare — `out/A1-06-PiazzettaPrimoMaggio.mp4`
- **Contenuto Storico Reale** (Whisper):
  - Piazzetta su banco di Ignimbrite vulcanica (Monte Vulture) — dal 1456
  - Ridisegnata dopo il sisma del 1980
  - Marzo 1950: 400+ contadini → latifondi Chiancarelle al canto di "Bandiera Rossa"
  - Fine del latifondo → comunità democratica
  - Dall'analfabetismo all'istruzione → Istituto Magistrale come faro culturale
- **Palette Cromatica**: rossoBandiera `#CC2222` come accent, oroIrpino `#D4A843` per la conquista, verdeInnTour per il riscatto
- **Estetica**: Pittoresca (immagini oil-painting) + toni caldi di lotta e tramonto. Counter animato 0→400+ contadini. Diagramma stratigrafico geologico nella Seq02.
- **Note Creative**: Le immagini pittoriche richiedono meno blur sull'overlay (colori già morbidi). Cross-dissolve nella Seq02 (vicolo→balcone) e Seq03 (folla→marcia). Tono rossastro caldo evoca la lotta senza essere celebrativo.
- **Lezioni Apprese**:
  - Whisper `main.exe` directo funziona perfettamente per trascrizione IT (evita problemi con le versioni npm)
  - Immagini in stile pittorico oil richiedono overlay più leggeri (il software blur già nella texture)
  - Il ParticleField copiato da A1.05 usa `neonBlue` — aggiungere sempre quel colore in COLORS se si copia il componente

### Clip #4 — A1.07 · Porta degli Albanesi
- **Data Produzione**: 2026-02-17
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 65.57 secondi / 1967 frame @30fps
- **Composizione Remotion**: `A1-07-PortaDegliAlbanesi`
- **Audio**: `TAG_A1.07_PORTA_DEGLI_ALBANESI_Iapetus_ITA(1).mp3` (voce Iapetus)
- **Sottotitoli**: Auto-generati con Whisper.cpp main.exe → 11 segmenti hardcoded
- **Asset Visivi**: 6 immagini in `public/images/TAG A1.07 - PORTA DEGLI ALBANESI/`
  - `image_378f3769` — Arco in pietra dorata su roccia (Intro)
  - `image_4d2fbfcf` — Guardie medievali all'arco (Seq02 Layer 1)
  - `image_78152e82` — Mano sulla pietra (Seq02 Layer 2 cross-dissolve)
  - `image_8af3ff01` — Mercante con mulo alla porta (Seq03 Assalto)
  - `image_95f44ccd` — Arco al tramonto sui colli (Seq04 Layer 1)
  - `image_d30e338b` — Figura che apre la porta verso la luce (Seq04 Layer 2 + Outro)
- **Contenuto Storico Reale** (Whisper):
  - Porta orientale della cittadella, dedicata a **San Nicola di Bari**
  - Comunità arberesche insediate tra **XV e XVII sec.** — fuga dall'avanzata ottomana
  - **30 gennaio 1682**: 80 banditi assaltano il borgo, sequestrano vescovo **Benedetto Bartoli**
  - Capobanda: **Giovanni Botta, detto l'Albanese**
  - Oggi: simbolo di accoglienza e incontro tra culture
- **Palette**: oroAntico `#C8A84B`, rossoBanditi `#8B1A1A` per il drama, verdeInnTour per la risoluzione
- **Note Creative**: Mix di immagini pitturiche (stile oil dorato) e fotorealistiche (guardie medievali). Counter 0→80 banditi. Rivelazione progressiva della data 1682. Cross-dissolve tramonto→luce apertura per il climax emotivo. Logo InnTour reale nell'Outro.
- **Lezioni Apprese**:
  - `oroIrpino` alias necessario in COLORS quando si copia ParticleField (usa sempre quel nome)
  - Glitch flash iniziale (`frame < 5`) efficace per aperture drammatiche su contenuti storici
  - Date storiche precise + nomi propri = massimo impatto narrativo (Bartoli, Botta, 1682)

### Clip #5 — A1.10 · Porta di Sopra (Demolita)
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 73.34 secondi / 2200 frame @30fps
- **Composizione Remotion**: `A1-10-PortaDiSopra`
- **Audio**: `TAG_A1.10_PORTA_DI_SOPRA_Leda_ITA.mp3` (voce Leda)
- **Sottotitoli**: Auto-generati con Whisper.cpp main.exe → 11 segmenti hardcoded
- **Asset Visivi**: 7 immagini B&W + pittorica in `public/images/TAG A1.10 - PORTA DI SOPRA (DEMOLITA)/`
  - `image_23e4c71c` — Portale gotico ornato B&W (Intro layer 2 fantasma + Outro bookend)
  - `image_584fd135` — Arco con colonne B&W (Seq02 Maestosa, cross-dissolve layer 2)
  - `image_6f08e18f` — Foto-montage processione B&W (Seq02 fantasma + Seq03 layer base)
  - `image_8baeb7ed` — Mani con fotografie d'epoca (Seq03 Passaggio + Seq04 layer 1)
  - `image_a0d316e5` — Anziano nel vicolo vuoto (Seq01 layer base + Seq04 layer 2)
  - `image_8dd5a117` — Figura B&W nel vicolo (Seq02 layer 1)
  - `image_d39c6922` — Pittura: famiglia inginocchiata sotto arco di luce (Seq05 Eco)
- **Contenuto Storico Reale** (Whisper):
  - **"Porta del Messere"** / "Di Sopra" — la più monumentale delle 4 porte medievali di Lacedonia
  - Nome dal titolo di rispetto per il Vescovo / Signore — ingresso d'onore per i prelati
  - **Dal 1059**: diocesi → decine di vescovi e principi vi passarono
  - Arco gotico decorato con **stemma degli Orsini**, battenti rinforzati, cardini giganteschi
  - **1851**: il sindaco **Vincenzo Franciosi** ne ordina l'abbattimento (struttura pericolante)
  - Oggi: solo un vuoto sotto una palazzina moderna — "l'eco dei passi solenni"
- **Palette**: B&W puro con `oroMemoria #C8A84B` come solo accento cromatico — estetica fotografia d'epoca con inchiostro oro
- **Struttura**: Intro / Maestosa / Passaggio / Demolita / Eco (5 sequenze)
- **Innovazioni Narrative**:
  - **Narrazione dell'assenza**: la clip racconta qualcosa che NON ESISTE PIÙ — hook "Cosa manca?"
  - **Ghost layering**: foto del luogo oggi + overlay traslucido del portale storico = vedere l'invisibile
  - **Crepa diagonale SVG** nella Seq04 come metafora visiva dell'abbattimento (frattura nella pagina)
  - **"ECO" lettera grande** (148px, 0.35 opacity) nella Seq05 Outro — tipografia come fantasma visivo
  - **Campana beats**: pulse lento alla Seq05 (3 battiti a fps 3.5/5/6.5) che simula suono campana
- **File Output**: Da renderizzare — `out/A1-10-PortaDiSopra.mp4`
- **Lezioni Apprese**:
  - `SubtitleBar` è self-contained (gestisce il proprio stato interno) → in `index.tsx` usare `<SubtitleBar />` senza props
  - `useCurrentFrame()` e `useVideoConfig()` NON necessari in `index.tsx` se SubtitleBar è autonomo → rimuovere dagli import
  - `msToFrame` esportato da constants ma NON importato in index.tsx se si usa la formula diretta `Math.round(s * 30)` → TS6133
  - Palette completamente B&W → rinominare `neonBlue` in COLORS come `'#B8A878'` (dorato) per coerenza estetica
  - Le immagini B&W + overlay dorato evocano le fotografie d'archivio sepia — effetto memoriale autentico

### Clip #6 — A2.01 · Cattedrale Attuale (Concattedrale di Santa Maria Sunta)
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 74.92 secondi / 2248 frame @30fps
- **Composizione Remotion**: `A2-01-CattedralAttuale`
- **Audio**: `TAG_A2.01_CATTEDRALE_ATTUALE_Iapetus_ITA(1).mp3` (voce Iapetus)
- **Sottotitoli**: Auto-generati con Whisper.cpp main.exe → 17 segmenti hardcoded
- **Asset Visivi**: 8 immagini in `public/images/TAG A2.01 - CATTEDRALE ATTUALE/`
  - `image_c51d34bc` — Cattedrale nella nebbia dorata (Intro hero + bookend Seq01)
  - `image_aa8f2c75` — Vescovo/nobile con pergamena (Seq02 layer 1)
  - `image_ae9aa339` — Vescovo entra in cattedrale, fedeli inginocchiati B&W (Seq02 cross-dissolve)
  - `image_a807ba56` — Interno a tre navate B&W, processione clero, luce dal cupolino (Seq03)
  - `image_37057e69` — Processione notturna con torce, campanile illuminato (Seq04 layer 1)
  - `image_91af5b3a` — Campanile al tramonto infuocato, figura solitaria (Seq04 cross-dissolve)
  - `image_dd305ad1` — Iscrizioni latine illustrate, epigrafia romana (Seq05 apertura)
  - `image_bda67ca2` — Campanile al mattino, cielo blu (Seq05 bookend circolarità)
- **Contenuto Storico Reale** (Whisper):
  - **Concattedrale di Santa Maria Sunta** — cuore pulsante di Lacedonia da oltre 3 secoli
  - **1696**: vescovo **Giovanni Battista La Morea** sulle rovine della Chiesa di Sant'Antonio (sito della *congiura dei baroni*)
  - **1696–1709**: 13 anni di costruzione → portale in **marmo rosso screziato** ancora oggi visibile
  - Rifugio spirituale sotto **San Nicola di Bari**, patrono dal **terremoto del 1456**
  - Da 1 navata originale → 3 navate — peso della sede vescovile nel **Regno di Napoli**
  - Chiusura poetica: incenso, campane, generazioni di lacedonesi
- **Palette**: `oroSacro #D4A843`, `rossoPorporato #8B1A2A` (vescovado), `azzurroCielo #7BA8C8`
- **Struttura**: Intro / Fondazione / Portale / San Nicola / Campane (5 sequenze)
- **Innovazioni Visive**:
  - **Flash apertura dorato** — come uno scatto fotografico che rivela la cattedrale
  - **Raggio di luce dal cupolino**: `radial-gradient` verticale con `lucePulse` sinusoidale (Seq03)
  - **Ghost tipografico "RIFUGIO"** a 120px/0.14 opacity — parola come presenza invisibile (Seq03)
  - **Torcia pulse** su icona 🕯️ con `Math.sin(frame/fps*0.3)` — effetto fiamma viva (Seq04)
  - **Glow processione**: overlay `rgba(220,120,20)` per evocare la luce delle torce notturne
  - **Anno ghost** a 110px (0.18 opacity) come filigrana temporale ("1696" e "1456")
  - **Campana beats** in Seq05 + cross-dissolve iscrizioni romane → campanile bookend
- **File Output**: Da renderizzare — `out/A2-01-CattedralAttuale.mp4`
- **Lezioni Apprese**:
  - Prima clip della **Sezione A2** — numerazione TAG cambia ma workflow identico
  - `mixBlendMode: 'multiply'` + overlay dorato su foto B&W = effetto candela/sepia caldo
  - `mixBlendMode: 'overlay'` per tonalità colorimetrica senza oscurare il soggetto
  - Anno ghost (0.15–0.22 opacity) funziona meglio come elemento decorativo sullo sfondo scuro

### Clip #7 — A2.03 · Chiesa di Sant'Antonio (Congiura dei Baroni)
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 79.34 secondi / 2380 frame @30fps
- **Composizione Remotion**: `A2-03-ChiesaSantAntonio`
- **Audio**: `TAG_A2.03_CHIESA_SANTANTONIO_Leda_ITA.mp3` (voce Leda)
- **Sottotitoli**: Auto-generati con Whisper.cpp main.exe → 17 segmenti hardcoded
- **Asset Visivi**: 7 immagini in `public/images/TAG A2.03 - CHIESA SANT'ANTONIO (CONGIURA)/`
  - `image_0312fcac` — Nobili in abiti scuri nella chiesa con torce (Intro)
  - `image_eb64892f` — Due nobili in velluto rosso/verde che si consultano (Seq02 layer 1)
  - `image_cc45b20b` — Nobile con candela che bisbiglia a un frate (Seq02 cross-dissolve)
  - `image_68cbb35c` — Prete con ostia consacrata, fedeli inginocchiati (Seq03 layer 1)
  - `image_3d85aafc` — Mani illuminate sui Vangeli (Seq03 cross-dissolve — il giuramento)
  - `image_51f5aa45` — Nobili attorno al tavolo con mappe e candele (Seq04 l'atto notarile)
  - `image_f7e33fa1` — Portale medievale di notte con figure incappucciate (Seq05 Epilogo)
- **Contenuto Storico Reale** (Whisper):
  - **10 settembre 1486** — la notte della **Congiura dei Baroni** contro Ferdinando d'Aragona
  - Cospiratori: **Francesco Coppola** (Principe di Sarno), **Antonio San Severino** (Principe di Salerno), **Giovanni Caracciolo** (Duca di Melfi)
  - Il prete: **Pietro Guglielmone** celebra la messa del giuramento con mani tremanti
  - Giuramento sull'**ostia consacrata** e sui **Vangeli** — sacrilego e irrevocabile
  - Obiettivo: rovesciare **Ferdinando d'Aragona e suo figlio Alfonso**
  - L'atto notarile redatto in chiesa alla luce delle torce
  - La stessa chiesa → sulle cui rovine il vescovo La Morea costruirà la Cattedrale nel 1696
- **Palette**: `oroTorcia #C8841A` (candele), `rossoTradimento #8B1A1A` (il sangue del giuramento), `avorio #F0E8D8` (la pergamena)
- **Struttura**: Intro / Congiurati / Giuramento / Atto / Epilogo (5 sequenze)
- **Innovazioni Narrative**:
  - **Thriller storico puro**: la narrazione è in tempo reale — "È la notte del 10 settembre 1486"
  - **Flash bianco all'elevazione dell'ostia** (Seq03) — il momento sacrilego
  - **"GIURANO" a 160px** (0.15 opacity rosso) — la parola come fantasma sul layer dei Vangeli
  - **"DESTINO" ghost** (0.12 opacity, Seq04) — il peso di ciò che sta accadendo
  - **Progress bar "Atto in redazione"** (0→100%) — il notaio che scrive
  - **Collegamento narrativo con A2.01**: la stessa chiesa diventerà la cattedrale 210 anni dopo
- **File Output**: Da renderizzare — `out/A2-03-ChiesaSantAntonio.mp4`
- **Lezioni Apprese**:
  - Gli errori TS in `MetaBorghiVideo` sono pre-esistenti e non correlati alle nuove clip — ignorare nel check `grep -i "ChiesaSantAntonio"`
  - Palette "torcia" (neroTotaleBG + oroArancio candela) crea atmosfera thriller medievale senza elementi aggiuntivi
  - Flash bianco istantaneo (6 frame interpolati 0→0.35→0) = effetto teatrale potente per momenti drammatici

### Clip #8 — A2.03 v2 · ChiesaSantAntonioV2 (Affresco Sacro)
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 79.34 secondi / 2380 frame @30fps (stessa audio A2.03 v1)
- **Composizione Remotion**: `A2-03v2-ChiesaSantAntonio`
- **Estetica v2**: Codice miniato medievale · pergamena · oro liturgico · vignette pesante
- **Sequenze v2**: Notte / I Tre / L'Ostia / La Penna / Il Silenzio
- **Nuovi componenti**: `ManuscriptFrame.tsx` (cornice SVG ornamentale), `CandleParticles.tsx` (scintille ascensionali Perlin noise)
- **File Output**: Da renderizzare — `out/A2-03v2-ChiesaSantAntonio.mp4`

### Clip #9 — A2.08 · Pozzo del Miracolo
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 66.43 secondi / 1993 frame @30fps
- **Composizione Remotion**: `A2-08-PozzoDelMiracolo`
- **Audio**: `TAG_A2.08_POZZO_DEL_MIRACOLO_Leda_ITA.mp3` (voce Leda)
- **Asset Visivi**: 6 immagini in `public/images/TAG A2.08 - POZZO DEL MIRACOLO/`
- **Contenuto Storico** (Whisper): San Gerardo Maiella (1741–44) · Vescovo Claudio Albini · chiave nel pozzo · Bambino Gesù cala nella fune · "Pensaci tu." · chiave ritrovata · primo carisma del Santo
- **Palette**: `oroMiracolo #F0C040` · `azzurroAcqua #4A8FAA` · flash bianco apertura Seq03
- **File Output**: Da renderizzare — `out/A2-08-PozzoDelMiracolo.mp4`

### Clip #10 — A2.09 · Chiesa Santa Maria della Cancellata
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 79.68 secondi / 2390 frame @30fps
- **Composizione Remotion**: `A2-09-ChiesaSantaMaria`
- **Audio**: `TAG_A2.09_CHIESA_SANTA_MARIA_Leda_ITA.mp3` (voce Leda)
- **Sottotitoli**: Auto-generati con Whisper.cpp → 13 segmenti (non integrati — Filmora)
- **Asset Visivi**: 8 immagini in `public/images/TAG A2.09 - CHIESA SANTA MARIA DELLA CANCELLATA/`
  - `image_c81f9269` — Colonne corinzie in marmo (Intro hero + Outro)
  - `image_1f086b43` — Sacerdotesse con torce notturne (Seq02 Iside layer 1)
  - `image_8feb5932` — Sacerdotesse in lino bianco con incenso (Seq02 cross-dissolve)
  - `image_9051dfe6` — Interno ibrido egizio-cristiano con colonne (Seq02 layer 3)
  - `image_a441a81b` — Interno illustrato con mosaici pavimento e frati (Seq03 Strati)
  - `image_81a662d7` — Chiesa con figure episcopali fantasmatiche (Seq04 layer 1)
  - `image_f06d7a5c` — Madonna Addolorata con lacrime d'argento (Seq04 climax)
  - `image_7f38cc92` — Processione solenne davanti alla facciata reale (Seq05 Oggi)
- **Contenuto Storico Reale** (Whisper):
  - **La più antica chiesa del paese** · sorge dove c'era un **Tempio di Iside** romano
  - **30 a.C.**: annessione Egitto → culto isiaco in Aquilonia (Lacedonia romana)
  - Colonne corinzie in marmo greco — **originali del tempio pagano** incorporate nella struttura cristiana
  - **Fino al 1705**: cattedrale della diocesi
  - **1840**: scoperta terme romane con mosaici **sotto la chiesa**
  - **Aprile 1948**: statua Madonna Addolorata muove gli occhi e piange → migliaia di pellegrini
  - Chiusura: *"Due mila anni di fede ininterrotta."*
- **Palette Cromatica per strato**:
  - Seq02 Iside: `ambraEgizia #C8781A` · `oroEgizio #D4A030` · `linoSacro #E8D8B0`
  - Seq03 Strati: `pietraRomana #A08868` · `rossoMosaico #8B3A2A`
  - Seq04 Pianto: `bluLacrime #1A3A6B` · `argento #C0C8D4`
  - Seq05 Continuum: `oroMedievale #D4A843`
- **Struttura**: Intro / Iside / Strati / Il Pianto / Continuum (5 sequenze)
- **Innovazioni Narrative**:
  - **ParticleField tri-modale** (`mode='isiaco'|'oro'|'lacrime'`) — prima implementazione adattiva
  - **Diagramma strati storici** in Seq03: 5 barre animate con anno e colore dedicato per strato
  - **Doppio cross-dissolve** in Seq02 (3 layer: notte → giorno → interno ibrido)
  - **Lacrime animate SVG** in Seq04 — gocce argentate in discesa sulla Madonna
  - **Continuità tematica** Seq02→03: img_9051dfe6 fa da ponte tra isiaco e cristiano
  - **Chiusura a 52px bold oro**: *"Due mila anni di fede ininterrotta."* — la più forte della serie
- **File Output**: Da renderizzare — `out/A2-09-ChiesaSantaMaria.mp4`
- **Lezioni Apprese**:
  - `oroAntico` va sempre aggiunto come alias in constants.ts se si usa in Sequence05 (pattern ricorrente)
  - `playfairFont` inutilizzato → TS6133 — rimuovere sempre se non presente nel JSX della sequenza
  - ParticleField con `mode` prop = pattern riutilizzabile per clip con più "strati" cromatici
  - Triple cross-dissolve (3 layer con opacità combinata) richiede `Math.max(0,...)` e `Math.min(1,...)` sulle opacità per evitare valori negativi o >1

### Clip #11 — A3.01 · Chiesa della Consolazione
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 71.00 secondi / 2130 frame @30fps
- **Composizione Remotion**: `A3-01-ChiesaConsolazione`
- **Audio**: `TAG_A3.01_CHIESA_DELLA_CONSOLAZIONE_Iapetus_ITA.mp3` (voce Iapetus)
- **Sottotitoli**: Non integrati — gestiti in Filmora (regola aggiornata 2026-02-18)
- **Asset Visivi**: 5 immagini JPG in `public/images/TAG A3.01 - CHIESA DELLA CONSOLAZIONE/`
  - `blwQQ.jpg` — Portale principale (Intro hero + Outro bookend)
  - `8jhKy.jpg` — Portale travertino con insegna lateranense (Seq02 layer 1)
  - `jnmUr.jpg` — Veduta/dettaglio chiesa (Seq02 cross-dissolve + Seq04)
  - `7n7dy.jpg` — Interno/fonte battesimale (Seq03 layer 1)
  - `sjqjY.jpg` — Altro aspetto della chiesa (Seq03 cross-dissolve)
- **Contenuto Storico Reale** (Whisper):
  - **Edificata nel 1503** su terreno denominato "**Solo Lateranense**"
  - Donata dal sacerdote **Giovanni Giacomo di Muro** alla **Basilica di San Giovanni in Laterano** (Roma)
  - **Portale in travertino romanico** con insegna della Basilica ancora visibile
  - **Tela della Visitazione** sull'altare maggiore
  - **Acqua santiera medievale** con **sirena a due code** (simbolo di rigenerazione spirituale)
  - Acquasantiera trasferita al **Museo Diocesano** per tutela
  - Sorge vicino alle **antiche terme romane** e alla **Colonna del Pedoca** (Tempio di Iside)
  - Sopravvissuta ai terremoti del 1930 e del 1980
- **Palette**: `travertino #D4C4A0` · `oroAntico #C89830` · `acquaBlu #2A6080` · `sirenoTeal #1A7A6A`
- **Struttura**: Intro / Laterano / Sirena / Strati / Speranza (5 sequenze)
- **Innovazioni Creative**:
  - **SirenaSVG.tsx** — componente originale SVG animato con sirena bicaudata (code animate con Math.sin)
  - **ParticleField bimodale** (`mode='acqua'|'oro'`) — gocce d'acqua (ellisse verticale) vs scintille oro
  - **Connessione tematica A2.09**: stesso diagramma strati storici (Tempio di Iside → stessa area geografica)
  - **Parola ghost "SPERANZA"** a 220px (0.07 opacity) nella chiusura — imponente e sobrio
  - **Anno ghost "1503"** a 180px (0.08 opacity) nella Seq01 — filigrana temporale
  - **Iris outro** (radial-gradient che si restringe) per chiusura cinematografica
  - **Overlay acqua** `rgba(42,96,128, glow)` con `mixBlendMode: 'overlay'` nella Seq03
- **File Output**: Da renderizzare — `out/A3-01-ChiesaConsolazione.mp4`
- **Lezioni Apprese**:
  - `durationInFrames` NON è una prop di `KenBurnsImage` — viene derivata da `useVideoConfig()` → rimuovere sempre dal JSX
  - Variabili inutilizzate nel ciclo SVG (es. `const s = size/200`) → TS6133, rimuovere prima del check
  - Root.tsx ha import orfani pre-esistenti (MatrixVideo, LacedoniaVideo ecc.) — non sono errori nostri, ignorare nei check

### Clip #12 — A3.02 · Cappella Santissima Trinità
- **Data Produzione**: 2026-02-18
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 91.72 secondi / 2752 frame @30fps
- **Composizione Remotion**: `A3-02-CappellaTrinita`
- **Audio**: `TAG_A3.02_CAPPELLA_TRINITA_Iapetus_ITA.mp3` (voce Iapetus)
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 8 immagini JPG in `public/images/TAG A3.02 - CAPPELLA SANTISSIMA TRINITÀ/`
  - `cXqIV.jpg` — Facciata cappella (Intro hero + Outro bookend)
  - `dzjro.jpg` — Facciata cappella (Seq02 layer 1)
  - `Izd0L.jpg` — Portale/dettaglio con iscrizione (Seq02 cross-dissolve)
  - `larL8.jpg` — Interno cappella / altare (Seq03 layer 1)
  - `R2WBZ.jpg` — Dettaglio altare marmo rosso (Seq03 cross-dissolve)
  - `vyKml.jpg` — Murales ceramica facciata (Seq04 layer 1)
  - `XaVMK.jpg` — San Gerardo / scena soprannaturale (Seq04 cross-dissolve)
  - `xLg7b.jpg` — (disponibile per uso futuro)
- **Contenuto Storico Reale** (Whisper):
  - **1697**: iscrizione sul portale — vescovo **Giovanni Battista La Morea** ordina ricostruzione
  - Epigrafe romana (storico **Pasquale Palmese**) dedicata a **Lucio Licinio** → link con **Aquilonia**
  - **Altare in marmo rosso** donato nel **1856** — **Stemma della Cicogna** scolpito
  - **San Gerardo Maiella** sottomette il demonio durante una tempesta — qui, in questa cappella
  - **Murales in ceramica** sulla facciata esterna che ricorda l'episodio
  - **Sisma 1980** → riapertura nel **2002**
  - Ogni anno: **celebrazioni di giugno** tra fede e giochi tradizione popolare
- **Palette**: `pietraChiara #D8C8A8` · `marmoRosso #9B2A2A` · `oroVescovile #C89830` · `lightningGold #F0D060` · `azzurroCielo #3A7A9A`
- **Struttura**: Intro / Lamorea / Altare / Gerardo / Rinascita (5 sequenze)
- **Innovazioni Creative**:
  - **CicognaSVG**: componente SVG araldico inline (scudo medievale + cicogna + anno) per stemma altare
  - **Lightning flash doppio** (2 burst sovrapposti a frame diversi) con `mixBlendMode: 'screen'` → effetto tempesta
  - **Iscrizione reveal lettera-per-lettera** "ANNO DOMINI 1697" + cursore lampeggiante in Seq02
  - **Counter 1800→1856** animato per reveal anno altare in Seq03
  - **Glow marmo rosso** (`radial-gradient` + `mixBlendMode: 'overlay'`) pulsante sulla Seq03
  - **ParticleField bimodale**: si alterna tra mode='luce' e mode='tempesta' in Seq04 (crossfade con `opacity: dissolve`)
  - **Timeline resilienza 4 nodi** (1697/1856/1980/2002) con cerchi colorati nella chiusura
- **File Output**: Da renderizzare — `out/A3-02-CappellaTrinita.mp4`
- **Lezioni Apprese**:
  - `interface Particle` dichiarata ma mai usata come tipo → TS6196 — rimuovere sempre le interface non usate
  - Due ParticleField in parallelo con `opacity: dissolve` e `opacity: 1-dissolve` funzionano perfettamente per transizione modo
  - Componenti SVG inline (come CicognaSVG) vanno dichiarati FUORI dalla funzione principale → no re-render per frame

### Clip #14 — A3.06 · Chiesa di San Nicola
- **Data Produzione**: 2026-02-19
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 70.46 secondi / 2114 frame @30fps
- **Composizione Remotion**: `A3-06-ChiesaSanNicola`
- **Audio**: `TAG_A3.06_CHIESA_SAN_NICOLA_Leda_ITA.mp3` (voce Leda)
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 6 immagini PNG in `public/images/TAG A3.06 - CHIESA DI SAN NICOLA/`
  - `image_bfae0f45` — facciata/hero (Intro + Outro bookend)
  - `image_8368ec60` — portale gotico (Seq02 layer 1)
  - `image_6d290300` — interno navata (Seq02 cross-dissolve + Seq03 layer 1 + Seq04 layer 2)
  - `image_a7fdd89d` — statua lignea San Nicola (Seq04 layer 1)
  - `image_653204b7` — devoti / figura nella chiesa (Seq03 cross-dissolve)
  - `image_34f3caba` — festa patronale (Seq05 layer 1)
- **Contenuto Storico Reale** (Whisper):
  - **Patrono di Lacedonia**: San Nicola di Bari — scelto dopo il **terremoto del 1456**
  - **Portale gotico**: al centro l'**agnello** → testimonianza che la chiesa era in origine dedicata a **San Giovanni Battista**
  - **1746**: Padri Liguorini istituiscono la **Congrega dell'Immacolata Concezione**
  - **Altare in marmo rosso** con **stemma della Cicogna** → trasferito nel **1856** alla Cappella Trinità (collegamento con A3.02!)
  - **Statua lignea del Seicento** — intagliata nel XVII sec.
  - **6 dicembre**: festa patronale — campane, dolci, comunità
- **Palette**: `oroSacro #D4A843` · `azzurroNicola #1A4A7A` · `rossoMarmo #9B2A2A` · `avorioCarta #F0E8D8` · `gialloFesta #F0C040`
- **Struttura**: Intro / Il Portale / La Devozione / La Statua / La Festa (5 sequenze)
- **Componenti Originali Nuovi**:
  - **CathedralLight.tsx** — raggio di luce gotica con doppio fascio (principale + secondario), respiro sinusoidale, drift orizzontale
  - **DustMotes.tsx** — 40 particelle di polvere sacra, ascesa lenta organica con oscillazione laterale, loop continuo
  - **BellPulse.tsx** — onde sonore concentriche (beat frames personalizzabili), simulano il suono delle campane visivamente
- **Innovazioni Narrative e Visive**:
  - **Wipe rivelatore verticale** in Seq02: linea luminosa che scorre da sx a dx accompagnata dal raggio di luce — svela il "palinsesto" gotico
  - **Connessione esplicita A3.02→A3.06**: lo stesso altare con stemma Cicogna lega le due clip
  - **Counter animato 1700→1746** (Seq03) per la data fondazione Congrega
  - **Spotlight radiale pulsante** in Seq04: radial-gradient che si restringe attorno alla statua con micro-breathe sinusoidale
  - **Ghost "SEICENTO"** ruotato 90° come filigrana verticale (Seq04)
  - **Ghost "1456"** a 220px come anno fondativo dominante nell'Intro
  - **Ghost "AGNELLO"** italic nella Seq02 — la parola come chiave del palinsesto
  - **Doppio BellPulse** sfasato (x=82 e x=88) nella Seq05 — ricreare lo spazio fisico del suono
  - **Bookend circolare**: stessa hero image intro/outro con zoom-out per chiusura narrativa
- **File Output**: Da renderizzare — `out/A3-06-ChiesaSanNicola.mp4`
- **Lezioni Apprese**:
  - `interpolate` importato ma non usato in CathedralLight → TS6133 — rimosso (usare solo `useCurrentFrame`)
  - `Math.round(val * 255).toString(16).padStart(2,'0')` per convertire opacity 0-1 in hex CSS inline — funziona perfettamente per colori dinamici nei gradient string
  - DustMotes: seme deterministico con operazioni modulo prime → particelle consistenti tra frame senza `Math.random()`
  - BellPulse: due istanze con `beatFrames` sfasati diversi + posizioni diverse = spazialità del suono senza audio aggiuntivo

### Clip #13 — A3.04 · Chiesa di San Rocco
- **Data Produzione**: 2026-02-19
- **Sezione Tematica**: Architettura e Monumenti
- **Durata**: 93.96 secondi / 2819 frame @30fps
- **Composizione Remotion**: `A3-04-ChiesaSanRocco`
- **Audio**: `TAG_A3.04_CHIESA_SAN_ROCCO_Iapetus_ITA.mp3` (voce Iapetus)
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 5 immagini JPG in `public/images/TAG A3.04 - CHIESA DI SAN ROCCO/`
  - `41IYo.jpg` — chiesa hero (Intro + Outro bookend circolarità)
  - `IZAgf.jpg` — facciata / esterno (Seq02 layer 1 + Seq03 layer 1)
  - `SLBps.jpg` — statua del Santo con cane (Seq02 cross-dissolve + Seq03 layer 2 + Seq04 layer 1)
  - `Tjhg5.jpg` — interno / altare (Seq03 layer 3 + Seq04 layer 2)
  - `z7TCH.jpg` — processione / festa (Seq05 La Festa)
- **Contenuto Storico Reale** (Whisper):
  - **San Rocco**: pellegrino francese del **XIV secolo**, curava malati durante la peste
  - **Patrono degli emigranti** — protettore di chi parte in cerca di fortuna
  - **XVI secolo**: chiesa costruita dopo un'epidemia che decimò il paese
  - **Promessa degli emigranti** anni '50/'60: *"Se troverò fortuna, contribuirò al restauro"*
  - **Anni 2000**: nuovo altare finanziato dagli emigranti che mantennero la promessa
  - **16 agosto**: festa patronale — il Grande Ritorno dei lacedonesi nel mondo
  - Statua con il **cane fedele al fianco** — attributo iconografico (il cane portò pane a Rocco malato)
- **Palette**: `oroSanto #D4A843` · `rossoPeste #8B1A1A` · `azzurroOceano #1A4A7A` · `gialloFesta #F0C040` · `arancioneFesta #E87030`
- **Struttura**: Intro / Il Santo / La Chiesa / La Promessa / La Festa (5 sequenze)
- **Componente SVG Originale**:
  - **PellegrinoSVG.tsx** — silhouette pellegrino animata con bastone, cappello a tesa larga, conchiglia jakobsmuschel e cane ai piedi; passo oscillante (sin wave sul bastone)
- **Innovazioni Narrative**:
  - **ParticleField bimodale** (`mode='partenza'|'ritorno'`): polvere di strada terrosa per la partenza, lucine scintillanti per la festa del ritorno
  - **Counter anno 1950→1960** animato nella Seq04 — gli anni del Grande Esodo
  - **Timeline emigrazione**: linea animata Epidemia → Chiesa eretta (con gradient da rosso a oro)
  - **Badge mete**: America · Australia · Germania come pill colorate in Seq04
  - **Citazione diretta** con bordo sinistro oro: *"Se troverò fortuna, contribuirò al restauro."*
  - **Ghost "XIV"** (0.09 opacity) e **Ghost "PROMESSA"** (0.08 opacity) come filigrane testuali
  - **Bookend narrativo**: stessa hero image intro/outro con zoom-out — chiusura circolare sul patrono
  - **Tagline finale**: *"San Rocco unisce chi è partito e chi è rimasto."* — diretta dalla trascrizione audio
- **File Output**: Da renderizzare — `out/A3-04-ChiesaSanRocco.mp4`
- **Lezioni Apprese**:
  - `s` helper importato ma non usato in Seq01 → TS6133 → rimuovere dall'import se la sequenza non usa timing relativo
  - ParticleField `mode='partenza'` (ellissi orizzontali) vs `mode='ritorno'` (stelle a 4 punte) — ottima separazione semantica visiva

### Clip #15 — A4.04 · Teatro Comunale
- **Data Produzione**: 2026-02-20
- **Sezione Tematica**: Architettura e Monumenti (A4 — Luoghi della Cultura)
- **Durata**: 71.73 secondi / 2152 frame @30fps
- **Composizione Remotion**: `A4-04-TeatroComunale`
- **Audio**: `TAG_A4.04_TEATRO_COMUNALE_Iapetus_ITA.mp3` (voce Iapetus)
- **Stile**: [STILE 5] — Pattern 5 (Data Card Sequence) + Pattern 6 (Photo-First Cinematic) + Pattern 7 (Iris Outro)
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 5 immagini PNG in `public/images/TAG A4.04 - TEATRO COMUNALE/`
  - `image_09055990` — Teatro Comunale esterno/hero (Intro + Outro bookend)
  - `image_b0d3125e` — Archivio storico / contesto visivo (Seq02 layer 1)
  - `image_d6a7a600` — Riferimento anfiteatro / area storica (Seq02 cross-dissolve)
  - `image_dd9cbe46` — Cinema Argentino / atmosfera Novecento (Seq03)
  - `image_ee8cda8a` — Teatro oggi / stagione contemporanea (Seq04)
- **Contenuto Narrativo** (fornito dall'utente):
  - **Edificio attuale**: costruzione recente, ma il richiamo allo spettacolo è nel DNA lacedoniese
  - **Anfiteatro Romano**: ipotizzato dagli storici alle spalle dell'Istituto Magistrale — **Epoca Imperiale**
  - **XVIII secolo**: blocchi dell'anfiteatro smantellati per costruire il campanile della Cattedrale
  - **Cinema Argentino**: fondato da **Gerardo Vigorita** — faro culturale per **50+ anni**
  - **Oggi**: compagnie di rilievo nazionale, grandi concerti, sfide e restauri
  - Chiusura: *"Luogo dove la comunità si ritrova per sognare e nutrire l'anima creativa di Lacedonia."*
- **Palette**: `neroSala #0D0D1A` · `rossoTelone #8B1A1A` · `oroLampade #D4A843` · `beigeRoma #D4C4A0` · `verdeInnTour #2ECC71`
- **Struttura**: Intro / Origini Romane / Cinema Argentino / Oggi / Outro (5 sequenze)
- **Componenti Nuovi**:
  - **SpotlightEffect.tsx** — riflettore teatrale ellittico SVG con respiro sinusoidale e drift orizzontale
- **Innovazioni Visive e Narrative**:
  - **SpotlightEffect** su Seq01 e Seq05 — atmosfera da palcoscenico
  - **Cross-dissolve storico** in Seq02: archivio → anfiteatro (svela il palinsesto visivo)
  - **FactCards in cascata** in Seq02 (Anfiteatro Romano · XVIII sec · 2000+ anni DNA culturale)
  - **Counter animato 0→50 anni** in Seq03 — gli anni del Cinema Argentino
  - **Overlay "warm sepia"** `rgba(80,30,10,0.22)` con `mixBlendMode: 'multiply'` in Seq03 — atmosfera d'epoca
  - **ProgramCards in cascata** in Seq04 (Stagione Teatrale · Concerti · Resilienza)
  - **Ghost "ROMANI"** verticale a 200px (0.06 opacity) in Seq02 — filigrana storica
  - **Ghost "ARGENTINO"** a 220px (0.07 opacity) in Seq03 — parola come presenza culturale
  - **Ghost "OGGI"** verticale a 240px (0.05 opacity) verde in Seq04 — contemporaneità
  - **Bookend circolare**: stessa hero image intro/outro con zoom-out (Pattern 7)
  - **Iris outro** SVG con cerchio che si restringe in chiusura
- **File Output**: Da renderizzare — `out/A4-04-TeatroComunale.mp4`
- **Lezioni Apprese**:
  - Prima clip della **serie A4** — nuovo blocco tematico "Luoghi della Cultura"
  - `SpotlightEffect` con `ellipse` SVG (rx≠ry) simula meglio il cono di luce teatrale rispetto al cerchio
  - `mixBlendMode: 'multiply'` + `rgba(80,30,10,0.22)` = tono sepia caldo senza desaturare la foto
  - Misura durata MP3 via Node.js (parse frame headers MPEG): metodo affidabile senza ffprobe

### Clip #16 — A4.05 · Biblioteca Storica Vescovile
- **Data Produzione**: 2026-02-20
- **Sezione Tematica**: Architettura e Monumenti (A4 — Luoghi della Cultura)
- **Durata**: 68.94 secondi / 2068 frame @30fps
- **Composizione Remotion**: `A4-05-BibliotecaVescovile`
- **Audio**: `TAG_A4.05_BIBLIOTECA_VESCOVILE_Iapetus_ITA.mp3` (voce Iapetus)
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 8 immagini PNG in `public/images/TAG A4.05 - BIBLIOTECA STORICA VESCOVILE/`
  - `image_7f62077c` — Monaci con candele/hero (Intro + Outro bookend)
  - `image_e375ce7f` — Pergamene con sigilli in cera (Seq02 layer 1)
  - `image_b22ee069` — Luce obliqua sui manoscritti (Seq02 cross-dissolve)
  - `image_55679d34` — Teche con volumi cinquecentine (Seq03 layer 1)
  - `image_6e75bfa5` — Teca aperta con enciclopedia (Seq03 cross-dissolve)
  - `image_5d27520e` — Biblioteca dorata (Seq04 layer 1 — cinquecentine)
  - `image_306912f6` — Giacobini B&W 1799 (Seq04 layer 2 — il pericolo)
  - `image_50c5a577` — Vescovo Romanzi in processione (Seq04 layer 3 — la protezione)
- **Contenuto Storico**: 100+ pergamene XII-XIII sec · Encyclopédie Diderot & d'Alembert 30 volumi · 60 cinquecentine/seicentine · Vescovo Romanzi protegge la biblioteca nel 1799
- **Palette**: `pergamena #E8D8B0` · `oroAntico #C89830` · `rossoVescovile #8B1A1A`
- **Struttura**: Intro / Le Pergamene / L'Encyclopédie / Cinquecentine & 1799 / Outro (5 sequenze)
- **Componente Nuovo**: `FilmGrain.tsx` NO — componente aggiunto in C3.01; qui SpotlightEffect + ParticleField (polvere/oro/carta)
- **Standard di Riferimento**: ⭐ **CLIP DI RIFERIMENTO** — standard approvato dall'utente per tutte le produzioni successive
- **File Output**: Da renderizzare — `out/A4-05-BibliotecaVescovile.mp4`
- **Lezioni Apprese**:
  - Font di output aumentati (titoli 88-108px, corpo 26-30px, label 15-17px) — nuovo standard
  - `ParticleField` con `mode='polvere'` (particelle ellittiche warm) efficace per atmosfere archivistiche
  - Triple cross-dissolve in 3 layer con `Math.max(0, d1*(1-d2))` per layering corretto

### Clip #17 — C3.01 · Frank Cancian e il MAVI *(corretta 2026-02-20)*
- **Data Produzione**: 2026-02-20
- **Sezione Tematica**: Fotografia & Cultura (C3 — Museo Antropologico)
- **Durata**: 58.70 secondi / 1761 frame @30fps *(corretta: era errata a 834 frame con voce Leda)*
- **Composizione Remotion**: `C3-01-FrankCancianMavi`
- **Audio**: `TAG_C3.01_FRANK_CANCIAN_E_IL_MAVI_Iapetus_ITA.mp3` (voce Iapetus · 58.70s)
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 7 immagini PNG in `public/images/TAG A4.06 - MAVI - MUSEO ANTROPOLOGICO/`
  - `image_34b443c2` — Manifesto mostra "Frank Cancian: 1957. L'Irpinia e il tempo fermo." (Seq01 Intro hero)
  - `image_dd722545` — Cancian pittoresco nel borgo con macchina (Seq02 layer 1)
  - `image_d3a3d1c2` — Bar contadini B&W scatto autentico 1957 (Seq02 cross-dissolve)
  - `image_d615f189` — Bambini in classe B&W con raggi di luce (Seq03 layer 1)
  - `image_bea476be` — Scene contadine pittoresche (collage) (Seq03 cross-dissolve)
  - `image_1596ff07` — MAVI interno: visitatore guarda grande foto (Seq04 Il Museo)
  - `image_d8d2c82f` — Porta dorata — l'emigrazione (Seq05 Outro bookend)
- **Contenuto Storico Reale**: Frank Cancian (Cornell University) · 1801 scatti nel 1957 · mondo contadino pre-emigrazione · MAVI nell'antico carcere ottocentesco · dialogo tra generazioni
- **Palette**: `seppia #C8A878` · `oroMavi #D4A843` · `seppiaScuro #2A1A08` · `biancoCalce #F8F4EE`
- **Struttura**: Intro / Frank Cancian · 1957 / La Vita Contadina / Il Museo / Outro (5 sequenze + 4 fade)
  - s01=300f (Intro · manifesto) · s02=420f (Cancian · counter) · s03=340f (bambiniBW→contadini) · s04=340f (maviInterno · stats) · s05=441f (outro)
  - `300+420+340+340+441 − 4×20 = 1841 − 80 = 1761 ✓`
- **Componenti Nuovi**:
  - `FilmGrain.tsx` — grana fotografica animata con `feTurbulence` SVG (seed cambia ogni 3 frame) · evoca le stampe d'archivio di Cancian
  - `Sequence05Outro.tsx` — aggiunto come 5a sequenza autonoma (era Seq04 in v1)
- **Innovazioni Visive**:
  - **Flash otturatore** in Seq02 (frame 148-162) — simula lo scatto della macchina fotografica
  - **Counter 1.801 scatti** in Playfair 90px con `toLocaleString('it-IT')` per separatore punti (Seq02)
  - **Ghost "1957"** a 280px in seppia — sia in Seq01 (verticale) che in Seq02 (centrato orizzontale)
  - **Cross-dissolve** cancianBorgo→barBW in Seq02 (frame 150-230) con tono seppia sul B&W
  - **Cross-dissolve** bambiniBW→contadini in Seq03 (frame 100-175) — la vita prima della partenza
  - **Seq04 separata** per maviInterno con stats "Al MAVI Oggi" e card carcere ottocentesco
  - **Iris outro** in Seq05 con l'immagine della porta d'oro (metafora dell'emigrazione come soglia)
- **Tagline**: *"Ogni fotografia è un'anima che continua a parlare, rendendo Lacedonia un simbolo internazionale della fotografia antropologica."*
- **File Output**: Da renderizzare — `out/C3-01-FrankCancianMavi.mp4`
- **Lezioni Apprese**:
  - ⚠️ **CRITICO**: Verificare SEMPRE la durata della voce specifica (Iapetus ≠ Leda!) — stessa narrazione in voci diverse può differire di 2× la durata
  - Misurare con Node.js MPEG parser ENTRAMBE le versioni audio prima di scegliere → documentare la scelta
  - `feTurbulence` con `seed` che cambia ogni 3 frame = grana fotografica realistica senza essere stroboscopica
  - Clip ~60s → 5 sequenze ben bilanciate (10+14+11+11+15s) con 4 transizioni
  - Separare La Vita Contadina e Il Museo in sequenze distinte migliora la narrazione

### Clip #18 — A4.08 · Monumento ai Caduti
- **Data Produzione**: 2026-02-20
- **Sezione Tematica**: Architettura e Monumenti (A4 — Luoghi della Cultura · Memoria)
- **Durata**: 61.60 secondi / 1848 frame @30fps
- **Composizione Remotion**: `A4-08-MonumentoAiCaduti`
- **Audio**: `TAG_A4.08_MONUMENTO_AI_CADUTI_Iapetus_ITA.mp3` (voce Iapetus)
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 5 immagini PNG in `public/images/TAG A4.08 - MONUMENTO AI CADUTI/`
  - `image_e6ece517` — Monumento nella nebbia dorata (Intro hero + Outro bookend)
  - `image_42f20829` — Statua del milite di Nicola Di Vietri (Seq02)
  - `image_045dcb26` — Lapidi di marmo con i nomi dei caduti (Seq03 layer 1)
  - `image_70a072b0` — Soldati in partenza (Seq03 cross-dissolve layer 2)
  - `fdfewea.png` — Cerimonia del 4 Novembre (Seq04)
- **Contenuto Storico Reale** (narrazione utente):
  - Monumento collocato accanto alla **Chiesa di Santa Maria della Cancellata** (A2.09)
  - Scultore: **Nicola Di Vietri** — raffigura il milite che **depone l'elmetto** (rifiuto della guerra)
  - Committente: **Leonardo Cuozzo** in memoria dei caduti lacedonesi
  - Due **lapidi in marmo** con i nomi dei caduti della Prima e Seconda Guerra Mondiale
  - **4 novembre**: Giornata dell'Unità Nazionale — cerimonia civile e militare
  - Chiusura poetica: contadini e studenti partiti con speranza, restituiti dalla pietra alla memoria immortale
- **Palette**: `neroProfondo #0A0A0A` · `oroLuce #D4A843` · `biancoLapide #F0EDE8` · `rossoPapavero #8B1A1A` · `verdeSperanza #2D5016`
- **Struttura**: Intro / Il Milite · Di Vietri / Le Lapidi / La Cerimonia / Outro · Memoria Immortale (5 sequenze)
- **Componenti Nuovi**:
  - `TrombaPulse.tsx` — onde concentriche SVG che simulano il suono della tromba (3 rings per beat con delay sfasato)
- **Innovazioni Visive e Narrative**:
  - **ElmettoIcon** inline SVG — elmo da soldato che cade/si inclina come metafora del rifiuto della guerra
  - **Cross-dissolve lapidi → soldati** (frame 220-320) — nomi incisi → i volti di chi partì
  - **Ghost "NON TORNARONO"** a 130px (0.08 opacity) — parola come presenza dei caduti
  - **Ghost "4 NOVEMBRE"** verticale (0.07 opacity) — data come filigrana della cerimonia
  - **TrombaPulse** con beats a [60, 140, 220, 310] in Seq04 — visualizzare il suono della tromba
  - **Date reveal "4 Novembre"** a 108px oro in Seq04
  - **Overlay caldo pomeridiano invernale** `rgba(184,120,40, 0.14)` in Seq04 — luce del 4 novembre
  - **Tagline finale piena**: *"Erano contadini e studenti partiti con speranza: la guerra li ha presi, ma il marmo li restituisce oggi alla memoria immortale di Lacedonia."*
  - **Bookend narrativo circolare**: stessa hero image (nebbia dorata) intro/outro con zoom-out
  - **Iris SVG outro** per chiusura cinematografica
  - **Collegamento tematico A2.09**: monumento adiacente alla Chiesa di Santa Maria della Cancellata
- **File Output**: Da renderizzare — `out/A4-08-MonumentoAiCaduti.mp4`
- **Lezioni Apprese**:
  - TrombaPulse con rings sfasati ([0, 12, 24] delay per beat) crea progressione organica del suono senza essere ripetitivo
  - Tema della memoria dei caduti richiede palette molto sobria (grigio/oro) — evitare colori troppo vivaci che snaturerebbero il contesto commemorativo
  - `ElmettoIcon` SVG inline (non componente separato) = soluzione rapida per icone semantiche usate in una sola sequenza

### Clip #19 — A4.09 · Lapide Terremoto 1930
- **Data Produzione**: 2026-02-20
- **Sezione Tematica**: Architettura e Monumenti (A4 — Luoghi della Cultura · Memoria del Sisma)
- **Durata**: 66.06 secondi / 1982 frame @30fps
- **Composizione Remotion**: `A4-09-LapideTerremoto1930`
- **Audio**: `TAG_A4.09_LAPIDE_TERREMOTO_1930_Iapetus_ITA.mp3` (voce Iapetus · 66.06s)
  - ⚠️ Voce Leda (29.64s/889f) — NON usare
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 6 immagini PNG in `public/images/TAG A4.09 - LAPIDE TERREMOTO 1930/`
  - `image_03b78576` — Lapide commemorativa (Seq01 Intro hero + Seq05 Outro bookend)
  - `image_0d87df3b` — Macerie/devastazione 1930 (Seq02 Il Sisma layer 1)
  - `image_173461cb` — Lapide con nomi incisi (Seq02 cross-dissolve)
  - `image_2f0e0bf7` — Contadini nei campi / mietitura estate 1930 (Seq03 I Salvati)
  - `image_b3231da5` — Ricostruzione / nuovo paese a monte (Seq04 La Ricostruzione)
  - `image_e9c42da1` — Speranza / paesaggio rinato (Seq05 bookend)
- **Contenuto Storico Reale** (narrazione fornita dall'utente):
  - **22–23 luglio 1930** — notte del sisma, ore 3:00 di mattina
  - **Vulture** —  10° grado scala Mercalli — rase al suolo gran parte del borgo antico
  - **~200 vittime** a Lacedonia · **1.000+ feriti**
  - Salvati molti perché i contadini dormivano **nei campi per la mietitura**
  - **Cappella del Purgatorio** tra i luoghi storici crollati
  - Decisione governativa: abbandonare le aree instabili · ricostruire **più a monte**
  - Chiusura: *"trasformando la polvere in una nuova speranza"*
- **Palette Cromatica**:
  - `neroNotte #030306` — le 3 di mattina (buio totale)
  - `rossoSisma #8B1A1A` — la violenza del terremoto
  - `polvere #8B7355` — la polvere delle macerie
  - `oroSperanza #C8A84B` — la rinascita e la speranza
  - `biancoMarmo #F0EDE8` — il marmo della lapide
- **Struttura**: L'Alba del Dolore / Il Sisma / I Salvati / La Ricostruzione / La Speranza (5 sequenze + 4 fade)
  - s01=350f · s02=440f · s03=380f · s04=400f · s05=492f
  - `350+440+380+400+492 − 4×20 = 2062 − 80 = 1982 ✓`
- **Componenti Originali Nuovi**:
  - **SeismicWave.tsx** — onda sismica SVG con battimento doppio (onda primaria + secondaria + linea base) che simula il tracciato di un sismografo; animata con `frame` per scorrimento continuo
  - **ClockIcon** (SVG inline in Seq01) — orologio delle 3:00 con lancette, tacche ore e pulse sinusoidale
- **Innovazioni Narrative e Visive**:
  - **SHAKE visivo del sisma** in Seq02 (frame 0–80): `shakeX/Y` con doppia sinusoide (magnitudine max a frame 8) — si percepisce la scossa
  - **Flash bianco impatto** (frame 0→3→14): la violenza del sisma come lampo visivo
  - **Counter 0→200 vittime** in rosso Playfair 92px + counter 0→1.000+ feriti in bianco
  - **Card 10° grado Mercalli** con dato "X°" in Playfair 64px rosso
  - **Ghost "22 LUGLIO"** verticale in rosso (0.045 opacity) — la data come trauma
  - **Ghost "MIETITURA"** centrato in polvere (0.040 opacity) — il paradosso della salvezza
  - **Ghost "RINASCITA"** verticale in oro (0.042 opacity) in Seq04
  - **Ghost "SPERANZA"** 220px in oro (0.060 opacity) — la parola chiave finale
  - **ParticleField mode='polvere'** in Seq03 — polvere di campo e terra irpina d'estate
  - **SeismicWave** in Seq02 (waveOp 0→1 durante dissolve) e Seq04 (si spegne 0.45→0 — il sisma si allontana)
  - **Progressione cromatica** Seq04: cenere → oro con `mixBlendMode: 'overlay'` crescente
  - **Orologio SVG** in Seq01: lancette alle 3:00, pulse `Math.sin` che batte lentamente
  - **Bookend circolare**: speranza/lapide image intro/outro con zoom-out (Pattern 7)
- **File Output**: Da renderizzare — `out/A4-09-LapideTerremoto1930.mp4`
- **Lezioni Apprese**:
  - `SeismicWave` con battimento (due sinusoidi a frequenze prime: 8/13, 6/11) = aspetto realistico sismografo senza essere periodico
  - Shake visivo del sisma: doppia sinusoide (sin+cos) con magnitudine interpolata garantisce un tremore organico, non meccanico
  - Palette quasi monocromatica (nero/grigio/bianco/rosso → oro finale) crea un arco visivo che rispecchia la narrazione
  - ⚠️ **REGOLA OPERATIVA CONFERMATA**: la voce Leda è sempre ~metà della durata di Iapetus — misurare SEMPRE entrambe prima di scegliere

### Clip #20 — A4.10 · Colonna del Pedoca
- **Data Produzione**: 2026-02-20
- **Sezione Tematica**: Architettura e Monumenti (A4 — Luoghi della Cultura)
- **Durata**: 59.19 secondi / 1776 frame @30fps
- **Composizione Remotion**: `A4-10-ColonnaPedoca`
- **Audio**: `TAG_A4.10_COLONNA_DEL_PEDOCA_Iapetus_ITA.mp3` (voce Iapetus · 59.19s)
  - ⚠️ Voce Leda (29.66s/890f) — NON usare
- **Sottotitoli**: Non integrati — gestiti in Filmora
- **Asset Visivi**: 6 immagini PNG in `public/images/TAG A4.10 - COLONNA DEL PEDOCA/`
  - `fssfsfasf` — Colonna del Pedoca hero (Seq01 Intro + Seq05 Outro bookend)
  - `image_28d55fc9` — Tempio di Iside / rovine romane (Seq02 layer 1)
  - `image_8aa60710` — Dettaglio colonna / travertino / iscrizione (Seq02 cross-dissolve)
  - `image_9678b6d2` — Vescovo Marco Pedoca / Controriforma (Seq03 layer 1)
  - `image_afd583ef` — Croce sulla colonna / cerimonia 1587 (Seq03 cross-dissolve)
  - `image_cc17995a` — Contadini che si avvicinano al borgo / ingresso (Seq04)
- **Contenuto Storico Reale** (narrazione fornita dall'utente):
  - **Colonna in travertino di epoca romana** recuperata dagli scavi dell'antico **Tempio di Iside**
  - **1587**: croce sovrapposta per volontà del vescovo **Marco Pedoca**, monaco benedettino e insigne matematico
  - **Controriforma**: riconsacrazione di un simbolo dell'antica **Aquilonia** (nome romano di Lacedonia)
  - **1586**: iscrizione ancora leggibile dedicata al prelato
  - Situata all'**ingresso del borgo** — luogo di sosta per i contadini che tornavano dalle fatiche nelle contrade
  - Per secoli: **confine sacro tra il lavoro dei campi e la pace della citta**
- **Palette Cromatica**:
  - `neroFondo #0A0808` — sfondo scuro notturno
  - `travertino #D8C8A8` — la colonna romana
  - `oroVescovile #C89830` — il potere del vescovado
  - `rossoVescovile #6A1A1A` — la Controriforma
  - `verdePagano #2D5A3A` — il mondo pagano di Iside
  - `grigioIscrizione #8A8078` — l'iscrizione sul marmo
- **Struttura**: Intro / Il Tempio di Iside / Il Vescovo Pedoca / Il Confine Sacro / Outro (5 sequenze + 4 fade)
  - s01=300f · s02=380f · s03=380f · s04=340f · s05=456f
  - `300+380+380+340+456 − 4×20 = 1856 − 80 = 1776 ✓`
- **Componenti Originali Nuovi**:
  - **CrossReveal.tsx** — croce latina SVG che si disegna progressivamente dal centro verso l'esterno con `stroke-dashoffset`; include glow filter e fill fade-in finale; rappresenta la sovrapposizione della fede cristiana sul travertino pagano
  - **ParticleField mode='travertino'** — polvere di pietra beige/ocra per rovine romane
  - **ParticleField mode='incenso'** — fumo liturgico grigio-oro per atmosfera religiosa
- **Innovazioni Narrative e Visive**:
  - **Transizione cromatica pagano→cristiano** in Seq02: overlay che muta da `verdePagano` a travertino caldo via interpolazione RGB
  - **Ghost "AQUILONIA"** a 180px in verdePagano (Seq02) — il nome romano come presenza del passato pagano
  - **Ghost "CONTRORIFORMA"** verticale a 110px in oroVescovile (Seq03) — il clima storico
  - **Ghost "CONFINE SACRO"** rotated -90deg a 120px in travertino (Seq04) — la funzione del monumento
  - **Ghost "PEDOCA"** a 240px in oroVescovile (Seq05) — il nome del vescovo come filigrana finale
  - **Ghost "1587"** verticale a 220px (Seq01) — l'anno fondativo come sigillo d'apertura
  - **Iscrizione reveal lettera-per-lettera** "ANNO DOMINI MDLXXXVI" con cursore lampeggiante (Seq03) — effetto scrittura su pietra
  - **Counter 1500→1587** in Playfair 76px oro (Seq03) — l'anno della croce sovrapposta
  - **CrossReveal SVG** che emerge dal nulla durante Seq03 — la fede che si sovrappone al paganesimo
  - **Overlay golden hour** crescente `rgba(212,168,67)` in Seq04 — la luce del pomeriggio sui contadini
  - **Collegamento tematico A2.09 e A3.01**: il Tempio di Iside e la Colonna del Pedoca sono nello stesso contesto archeologico
  - **Bookend circolare**: stessa hero image intro/outro (Pattern 7)
  - **Iris SVG outro** per chiusura cinematografica
- **Tagline Finale**: *"Per secoli, il confine sacro tra la fatica e la pace — oggi, custode silenzioso di duemila anni di storia stratificata."*
- **File Output**: Da renderizzare — `out/A4-10-ColonnaPedoca.mp4`
- **Lezioni Apprese**:
  - `CrossReveal` con `stroke-dasharray` + `stroke-dashoffset` = tecnica efficace per "disegnare" simboli progressivamente
  - Transizione cromatica RGB interpolata (verdePagano→travertino warm) su overlay `mixBlendMode:'overlay'` crea una mutazione percettiva sottile e potente
  - ParticleField con `mode='travertino'` (beige/ocra) e `mode='incenso'` (grigio-oro) separano visivamente l'atmosfera pagana da quella cristiana
  - Iscrizione lettera-per-lettera con cursore lampeggiante aggiunge un livello di "scrittura dal vivo" che cattura l'attenzione anche in assenza di movimento fotografico

---

## 📈 Metriche di Produzione

> **Auto-aggiornamento**: Statistiche aggiornate dopo ogni clip

```
Clip Prodotte:        20 / ~18 target (+ 1 versione alternativa)
Durata Totale:        1421.09 secondi (23:41.09)  ← aggiunta A4.10 Colonna del Pedoca (59.19s)
Sezioni Completate:   0 / 6 (A4 Luoghi della Cultura: 5 clip · C3 Fotografia: 1 clip · Architettura: 18)
Pattern Documentati:  7 (vedi sezione Pattern)
Asset Caricati:       113 immagini AI/JPG/PNG, 27 MP3 narrazione, 1 SRT manuale
Plugin Installati:    @remotion/transitions · @remotion/motion-blur · @remotion/noise · @remotion/shapes · @remotion/paths · @remotion/light-leaks · @remotion/player · @remotion/renderer
Lingue Coperte:       IT (principale) · EN e Cerugnés pronte al primo uso
Ultimo Rendering:     N/A (composizioni pronte per render locale)
Tempo Medio Render:   N/A (stimato: 3–5 min/clip su macchina locale)
```

### Distribuzione Target per Sezione
| Sezione | Clip Pianificate | Clip Prodotte | Status |
|---------|-----------------|---------------|--------|
| Architettura & Monumenti (A) | 3+ | 19 | 🔄 In produzione (A1.02 · A1.05 · A1.06 · A1.07 · A1.10 · A2.01 · A2.03 · A2.03v2 · A2.08 · A2.09 · A3.01 · A3.02 · A3.04 · A3.06 · **A4.04** · **A4.05** · **A4.08** · **A4.09** · **A4.10**) |
| Fotografia & Cultura (C) | 3 | 1 | 🔄 In produzione (**C3.01** Frank Cancian e il MAVI) |
| Paesaggio & Natura | 3 | 0 | ⏳ In attesa |
| Tradizioni & Cultura Popolare | 3 | 0 | ⏳ In attesa |
| Gastronomia & Prodotti | 3 | 0 | ⏳ In attesa |
| Memoria & Identità | 3 | 0 | ⏳ In attesa |
| Lingua Cerugnés | 3 | 0 | ⏳ In attesa |
| **Intro Generale** | 1 | 0 | ⏳ In attesa |
| **Outro / CTA** | 1 | 0 | ⏳ In attesa |

---

## 🐛 Troubleshooting & Soluzioni Remotion

> **Auto-aggiornamento**: Problemi e soluzioni documentati in tempo reale.

### Problemi Noti e Soluzioni

#### Rendering lento su immagini ad alta risoluzione
**Problema**: Clip con molte immagini full-res rallenta il rendering
**Soluzione**: Pre-processare le immagini a 1920×1080 prima dell'import. Usare `sharp` o `ffmpeg` per batch resize.
```bash
ffmpeg -i input.jpg -vf scale=1920:1080 -q:v 2 output_1080p.jpg
```

#### Font non caricato durante il rendering headless
**Problema**: Google Fonts non disponibili in ambiente Cloud Code senza rete
**Soluzione**: Scaricare i font localmente e importarli come asset statici in `/public/fonts/`
```typescript
// In ogni composizione:
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";
const { fontFamily } = loadFont();
```

#### Audio non sincronizzato con il testo
**Problema**: Il timing dei sottotitoli non corrisponde all'audio narrazione
**Soluzione**: Usare Whisper API (o whisper.cpp locale) per generare SRT preciso, poi convertire i timestamp SRT in frame Remotion:
```typescript
// Conversione timestamp SRT → frame number
const srtTimeToFrame = (srtTime: string, fps = 30): number => {
  const [h, m, s, ms] = srtTime.replace(',', ':').split(':').map(Number);
  return Math.round((h * 3600 + m * 60 + s + ms / 1000) * fps);
};
```

#### Transizioni con artefatti visivi
**Problema**: Cross-fade tra sequenze produce flickering
**Soluzione**: Usare `@remotion/motion-blur` e assicurarsi che il `opacity` vada da 0 a 1 su almeno 15 frame (0.5 secondi).

---

## 🔄 Changelog del Documento

### 2026-02-20 — v2.7 — Clip #19 A4.09 · Lapide Terremoto 1930
- 🎬 **Produzione A4.09 "Lapide Terremoto 1930"** — 66.06s / 1982 frame · voce Iapetus
- 🌊 **SeismicWave.tsx**: onda sismica SVG con doppio battimento (primaria + secondaria sfasata) — tracciato sismografo realistico animato con frame
- ⏰ **ClockIcon SVG inline** in Seq01: orologio delle 3:00 con lancette + pulse sinusoidale lento
- 📳 **SHAKE visivo** in Seq02 (frame 0–80): doppia sinusoide con magnitudine interpolata — si percepisce la scossa del Vulture
- ⚡ **Flash bianco impatto** (frame 0→3→14) + tono rosso overlay sulle macerie
- 🔢 **Counter 0→200 vittime** (rosso) · **Counter 0→1.000+ feriti** (bianco)
- 📊 **Card 10° grado Mercalli** con "X°" Playfair 64px rosso
- 👻 **Ghost "22 LUGLIO"** verticale rosso (Seq02) · **Ghost "MIETITURA"** polvere (Seq03) · **Ghost "RINASCITA"** oro (Seq04) · **Ghost "SPERANZA"** 220px oro (Seq05)
- 🌾 **ParticleField mode='polvere'** in Seq03 — polvere di campo e terra irpina d'estate
- 📉 **SeismicWave in Seq04** che si spegne (0.45→0) — il sisma che si allontana
- 🎨 **Progressione cromatica** Seq04: cenere → oro con `mixBlendMode:'overlay'` crescente
- ⚠️ **REGOLA CONFERMATA**: voce Leda (29.64s) = ~metà di Iapetus (66.06s) — misurare SEMPRE entrambe
- 📊 Metriche aggiornate: **19 clip** / **1361.90s totali** (22:41.90)

### 2026-02-20 — v2.8 — Clip #20 A4.10 · Colonna del Pedoca
- 🎬 **Produzione A4.10 "Colonna del Pedoca"** — 59.19s / 1776 frame · voce Iapetus
- 🏛️ **Tema: transizione paganesimo→fede cristiana** — la colonna romana riconsacrata nel 1587
- ✝️ **CrossReveal.tsx**: croce latina SVG con animazione `stroke-dashoffset` progressiva + glow filter + fill fade-in — rappresenta la sovrapposizione della fede cristiana
- 🏛️ **ParticleField mode='travertino'**: polvere di pietra beige/ocra per atmosfera rovine romane
- ⛪ **ParticleField mode='incenso'**: fumo liturgico grigio-oro per atmosfera religiosa
- 🎨 **Transizione cromatica RGB** in Seq02: overlay che muta da verdePagano (#2D5A3A) a travertino caldo (#D8C8A8) via interpolazione
- 📜 **Iscrizione reveal lettera-per-lettera** "ANNO DOMINI MDLXXXVI" + cursore lampeggiante in Seq03
- 🔢 **Counter 1500→1587** in Playfair 76px — l'anno della croce sovrapposta
- 👻 **5 Ghost typography**: "1587" verticale (Seq01) · "AQUILONIA" verdePagano (Seq02) · "CONTRORIFORMA" verticale (Seq03) · "CONFINE SACRO" rotated (Seq04) · "PEDOCA" 240px (Seq05)
- 🌅 **Overlay golden hour** crescente `rgba(212,168,67)` in Seq04 — luce del pomeriggio sui contadini
- 🔗 **Collegamento tematico A2.09/A3.01**: Tempio di Iside e Colonna nello stesso contesto archeologico
- 📊 Metriche aggiornate: **20 clip** / **1421.09s totali** (23:41.09) / 113 asset immagine

### 2026-02-20 — v2.6 — C3.01 FrankCancianMavi · Correzione Durata e Rifacimento
- ⚠️ **FIX CRITICO**: C3.01 era sbagliato — usava voce Leda (27.79s/834f) invece di Iapetus (58.70s/1761f)
- 🔄 **Rifacimento completo** con voce Iapetus · 5 sequenze (era 4) · struttura bilanciata
- ⏱️ **Nuova struttura timing**: s01=300f · s02=420f · s03=340f · s04=340f · s05=441f → 1761f ✓
- 🎬 **Seq03 "La Vita Contadina"** separata da "Il Museo" → narrazione più chiara e respiro maggiore
- 🏛️ **Seq04 "Il Museo"** autonoma: maviInterno + stats "Al MAVI Oggi" + card carcere ottocentesco
- 🚪 **Seq05 Outro** espansa a 441f per tagline completa + loghi + iris con spazio sufficiente
- 📏 Root.tsx: `durationInFrames` aggiornato 834 → 1761
- 📊 Durata totale aggiornata: 1264.93s → **1295.84s** (21:35.84)
- 📌 **Regola operativa aggiunta**: misurare SEMPRE la durata di entrambe le voci audio prima di scegliere

### 2026-02-20 — v2.5 — Clip #18 A4.08 · Monumento ai Caduti
- 🎬 **Produzione A4.08 "Monumento ai Caduti"** — 61.60s / 1848 frame · voce Iapetus
- 🏛️ **Prima clip commemorativa** — tema memoria e caduti in guerra
- 🎺 **TrombaPulse.tsx**: onde concentriche SVG per la tromba del 4 novembre (3 ring per beat · delay sfasato [0,12,24])
- ⛑️ **ElmettoIcon**: SVG inline dell'elmo che cade — metafora del rifiuto della guerra (Seq02)
- 🔀 **Cross-dissolve lapidi→soldati** (frame 220-320) — nomi incisi → volti di chi partì
- 👻 **Ghost "NON TORNARONO"** (0.08 opacity) · **Ghost "4 NOVEMBRE"** verticale (0.07 opacity)
- 🎺 **Beats TrombaPulse** a [60, 140, 220, 310] in Seq04 — suono della tromba reso visivo
- 🌅 **Overlay pomeridiano invernale** `rgba(184,120,40,0.14)` in Seq04 — luce del 4 novembre
- 🔗 **Collegamento tematico A2.09**: monumento adiacente alla Chiesa Santa Maria della Cancellata
- 📊 Metriche aggiornate: 18 clip / 1264.93s totali / 101 asset immagine · target raggiunto

### 2026-02-20 — v2.4 — Clip #17 C3.01 · Frank Cancian e il MAVI
- 🎬 **Produzione C3.01 "Frank Cancian e il MAVI"** — 27.79s / 834 frame · voce Leda
- 📷 **Prima clip della sezione C3** — Fotografia & Cultura Antropologica
- 🎞️ **FilmGrain.tsx**: grana fotografica animata con `feTurbulence` SVG — seed ogni 3 frame — evoca le stampe d'archivio di Cancian
- ⚡ **Flash otturatore** in Seq02 (frame 148-160) — simula lo scatto fotografico al momento del dissolve
- 🔢 **Counter 1.801 scatti** in Playfair 90px con `toLocaleString('it-IT')`
- 👻 **Ghost "1957"** 280px verticale in seppia — l'anno come filigrana dominante
- 🔀 **Triple cross-dissolve** Seq03: bambini → contadini pittoreschi → MAVI interno (passato→storia→presente)
- 🎨 **Tono seppia** `rgba(200,168,120,0.14)` `mixBlendMode:'multiply'` sulle foto B&W — stampa d'archivio
- 🔠 **Font aggiornati** (titoli 100px, body 28px, label 16px) — nuovo standard approvato
- 📐 **4 sequenze** per clip brevi (<30s) — struttura ottimale senza overhead eccessivo
- 📊 Metriche aggiornate: 17 clip / 1203.33s totali / 96 asset immagine

### 2026-02-20 — v2.3 — Clip #16 A4.05 · Biblioteca Storica Vescovile
- 🎬 **Produzione A4.05 "Biblioteca Storica Vescovile"** — 68.94s / 2068 frame · voce Iapetus
- ⭐ **CLIP DI RIFERIMENTO APPROVATA** — nuovo standard per tutte le produzioni successive
- 📐 **Nuovi standard font** aggiornati nel documento (titoli 88-108px, corpo 26-30px, label 15-17px)
- 📜 **Seq02 Le Pergamene**: counter 0→100+, cross-dissolve pergamene → luce obliqua
- 📚 **Seq03 Encyclopédie**: counter 0→30, ghost "ENCYCLOPÉDIE", spotlight dorato sui volumi
- 📖 **Seq04 Cinquecentine & 1799**: triple cross-dissolve biblioteca → giacobini B&W → vescovo Romanzi
- 💥 **Flash drammatico** all'arrivo dei giacobini + date reveal "1799" + card vescovo custode
- 🎭 **ParticleField**: nuovi mode 'polvere' (particelle warm archivistiche) · 'oro' · 'carta'
- 📊 Metriche aggiornate: 16 clip / 1175.54s totali

### 2026-02-20 — v2.2 — Clip #15 A4.04 · Teatro Comunale
- 🎬 **Produzione A4.04 "Teatro Comunale"** — 71.73s / 2152 frame · voce Iapetus
- 🏛️ **Prima clip serie A4** — nuovo blocco "Luoghi della Cultura"
- 🎭 **SpotlightEffect.tsx**: riflettore teatrale ellittico SVG con respiro sinusoidale e drift — atmosfera da palcoscenico
- 📜 **Cross-dissolve storico** Seq02: archivio → anfiteatro (svela palinsesto visivo del luogo)
- 🃏 **FactCards in cascata** Seq02: Anfiteatro Romano · XVIII sec · 2000+ anni DNA culturale
- 🎬 **Counter 0→50 anni** Seq03 — gli anni del Cinema Argentino di Gerardo Vigorita
- 🕯️ **Overlay warm sepia** `rgba(80,30,10,0.22)` `mixBlendMode:'multiply'` — atmosfera Novecento
- 📋 **ProgramCards** Seq04: stagione teatrale · concerti · resilienza in cascata
- 👻 **Tripla ghost typography**: "ROMANI" · "ARGENTINO" · "OGGI" come filigrane testuali per sequenza
- 🔵 **Workflow**: narrazione fornita direttamente dall'utente (no Whisper) — nuovo flusso alternativo
- 🔧 **Fix audio duration**: Node.js parse MPEG frame headers = metodo affidabile senza ffprobe
- 🗂️ **Riorganizzazione asset**: TAG folders da `public/` → `public/images/` · A4.05 estratto da A4.07
- 📊 Metriche aggiornate: 15 clip / 1106.60 secondi totali

### 2026-02-19 — v2.1 — Clip #14 A3.06 · Chiesa di San Nicola
- 🎬 **Produzione A3.06 "Chiesa di San Nicola"** — 70.46s / 2114 frame · voce Leda
- ⛪ **Tema Patronato e Resilienza** — San Nicola scelto dopo il terremoto del 1456
- 💡 **CathedralLight**: raggio di luce gotica con doppio fascio, respiro sinusoidale + drift orizzontale
- ✨ **DustMotes**: particelle di polvere sacra organiche con ascesa lenta e oscillazione, seme deterministico con numeri primi
- 🔔 **BellPulse**: onde concentriche visive che simulano il suono delle campane (Seq05)
- ↔️ **Wipe rivelatore verticale** in Seq02: svela il palinsesto gotico San Giovanni→San Nicola
- 🔗 **Connessione narrativa A3.02↔A3.06**: stesso altare con stemma Cicogna trasferito nel 1856
- 🔢 **Counter 1700→1746** nella Seq03 per la data Congrega Immacolata
- 🎭 **Spotlight radiale pulsante** in Seq04: restringe il campo visivo sulla statua lignea
- 🔧 Fix: `interpolate` inutilizzato in CathedralLight → TS6133 rimosso
- 📊 Metriche aggiornate: 14 clip / 1034.87 secondi totali

### 2026-02-19 — v2.0 — Clip #13 A3.04 · Chiesa di San Rocco
- 🎬 **Produzione A3.04 "Chiesa di San Rocco"** — 93.96s / 2819 frame · voce Iapetus
- 🧳 **Tema Emigrazione** — prima clip centrata sul legame San Rocco/emigranti lacedonesi
- 🚶 **PellegrinoSVG**: silhouette animata pellegrino con bastone, conchiglia jakobsmuschel, cane; passo sinusoidale
- ✨ **ParticleField bimodale** `mode='partenza'` (polvere terrosa) | `mode='ritorno'` (lucine festa)
- 🔢 **Counter anno 1950→1960** animato per il Grande Esodo
- 💬 **Citazione diretta con bordo oro**: *"Se troverò fortuna, contribuirò al restauro."*
- 🏠 **Bookend narrativo** (stessa hero intro/outro con zoom-out) — circolarità San Rocco
- 🎯 **Tagline estratta da audio Whisper**: *"San Rocco unisce chi è partito e chi è rimasto."*
- 🔧 Fix: `s` helper → TS6133 in Seq01, rimosso dall'import
- 📊 Metriche aggiornate: 13 clip / 964.41 secondi totali

### 2026-02-18 — v1.9 — Clip #12 A3.02 · Cappella Santissima Trinità
- 🎬 **Produzione A3.02 "Cappella Santissima Trinità"** — 91.72s / 2752 frame · voce Iapetus
- ⚡ **Lightning flash tempesta** (Seq04): `mixBlendMode: 'screen'` su `rgba(240,208,96)` — 2 burst sovrapposti
- 🐦 **CicognaSVG**: componente SVG araldico inline (scudo + cicogna + anno) per lo stemma dell'altare 1856
- 🎨 **ParticleField bimodale**: `mode='luce'` (oro calmo) | `mode='tempesta'` (scintille veloci + lightning gold)
- 🕯️ **Iscrizione lettera-per-lettera** "ANNO DOMINI 1697" reveal progressivo nella Seq02
- 🔢 **Counter 1800→1856** animato nella Seq03 — anno altare conta fino al valore reale
- 📍 **Timeline resilienza** 4 nodi (1697 · 1856 · 1980 · 2002) con cerchi colorati in Seq05
- 🔧 Fix: `interface Particle` non usata come tipo → rimossa (TS6196)
- 📊 Metriche aggiornate: 12 clip / 870.45 secondi totali

### 2026-02-18 — v1.8 — Clip #11 A3.01 · Chiesa della Consolazione
- 🎬 **Produzione A3.01 "Chiesa della Consolazione"** — 71.00s / 2130 frame · voce Iapetus
- 🐟 Prima clip con **SirenaSVG** originale — sirena bicaudata medievale con code animate (sin wave)
- 💧 **ParticleField bimodale** (`mode='acqua'|'oro'`) — gocce d'acqua vs scintille liturgiche
- 🏛️ **Connessione tematica A2.09** — stesso diagramma strati (Tempio di Iside → area contigua)
- 🌐 Prima clip della **sezione A3** — capofila di una nuova area del catalogo
- 🔧 Fix documentato: `durationInFrames` non è prop di `KenBurnsImage` → rimuovere sempre dal JSX
- 📊 Metriche aggiornate: 11 clip / 778.73 secondi totali / 57 asset immagine

### 2026-02-18 — v1.5 — Clip #5 A1.10 · Porta di Sopra (Demolita)
- 🎬 **Produzione A1.10 "Porta di Sopra (Demolita)"** — 73.34s / 2200 frame · voce Leda
- 🏚️ Prima clip sulla **narrazione dell'assenza** — un monumento demolito nel 1851
- 👻 **Ghost layering tecnica**: foto del luogo oggi + portale storico traslucido sovrapposto
- 💥 **Crepa SVG diagonale** in Seq04 come metafora visiva dell'abbattimento
- 🔔 **Campana beats** animati (3 pulse a frame fissi) nella Seq05 Eco
- 🔧 Fix: `SubtitleBar` self-contained → `index.tsx` semplificato (no useCurrentFrame/useVideoConfig)
- 🎨 Palette B&W puro + `oroMemoria #C8A84B` come unico accento — estetica dagherrotipo
- 📊 Metriche aggiornate: 5 clip / 328.02 secondi totali

### 2026-02-17 — v1.4 — Clip #4 A1.07 · Porta degli Albanesi
- 🎬 Produzione A1.07 "Porta degli Albanesi" — 65.57s / 1967 frame · voce Iapetus

### 2026-02-17 — v1.0 — Bootstrap del Progetto
- ✨ **Creazione CLAUDE.md per progetto Remotion Cicerone Digitale Lacedonia**
- 📐 Sistema di Design Visivo completo definito (palette, tipografia, componenti)
- 🎬 Specifiche tecniche clip documentate (1920×1080 · 30fps · 50-60s)
- 🏛️ Contesto storico-culturale di Lacedonia strutturato (6 sezioni · 131 punti)
- 🎭 Linee guida narrative definite (voce del Cicerone, regole auree)
- 🛠️ Stack tecnologico configurato (Remotion 4.x + toolchain audio)
- 🎨 5 Pattern cinematografici documentati e pronti all'uso
- 📊 Registro clip inizializzato con template entry
- 🐛 Troubleshooting pre-compilato con soluzioni ai problemi più comuni
- 🔧 Configurazione ambiente e comandi CLI documentati

---

## 📌 Note per Claude

### Principi Non Negoziabili
- ⚠️ **MAI produrre contenuto generico** — ogni clip deve essere unica nel suo approccio visivo
- ⚠️ **SEMPRE rispettare la palette InnTour** — coerenza visiva è brand identity
- ⚠️ **Il dialetto Cerugnés è sacro** — va trattato con rispetto linguistico e culturale, mai folklorizzato
- ⚠️ **SEMPRE aggiornare questo file** dopo ogni clip completata
- ⚠️ **L'emozione precede l'informazione** — se devo scegliere, scelgo l'impatto emotivo
- ⚠️ **Precisione storica obbligatoria** — nessun dato inventato, nessuna data approssimata senza segnalarlo

### Per l'Utente (InnTour)
- Caricare gli asset nella cartella progetto e comunicare a Claude il percorso
- Ogni brief per una nuova clip può essere anche molto semplice: "crea la clip sul castello" — Claude farà il resto
- Il documento si aggiorna automaticamente: è il registro vivo del progetto
- Modificare questo file direttamente per aggiungere note, correzioni storiche, preferenze stilistiche

### 🔧 Workflow Operativo Concordato (aggiornato 2026-02-18)
- **Asset forniti dall'utente**: file audio MP3 e immagini in `public/` — Claude non genera asset
- **Sottotitoli**: ~~generati da Claude~~ → **DISABILITATI** — gestiti in Filmora nella post-produzione
- **Whisper**: usato solo per estrarre contenuto storico (nomi, date, fatti) da usare nelle cards narrative
- **Durata audio**: SEMPRE misurata con precisione prima di impostare `durationInFrames`
- **Logo InnTour**: `public/Logo facicon.png` — usare in tutte le clip (Intro + Outro)
- **Dimensione testo**: leggermente aumentata rispetto ai template base (titoli ≥80px, corpo ≥20px)
- **Ken Burns**: essere creativi e variati nell'uso — ogni sequenza ha il suo movimento specifico
- **Brief minimo**: percorso audio + percorso immagini → Claude gestisce tutto il resto autonomamente

### Visione a Lungo Termine
Questo framework è progettato per essere **completamente riutilizzabile**. Una volta completato il progetto Lacedonia, l'architettura può essere adattata a:
- Altri borghi del progetto MetaBorghi (MAVI, Canton Ticino)
- Qualsiasi comune dell'Irpinia interessato alla narrazione digitale
- Progetto CERV / Heritage europeo per altri territori marginali
- Formato scalabile a 4K con modifiche minime alla configurazione

---

**Versione**: 2.8 — 20 Clip Prodotte · A4.10 Colonna del Pedoca (59.19s · CrossReveal SVG)
**Ultimo Aggiornamento**: 2026-02-20
**Status**: 🟢 Target Superato — 20/18 clip sviluppate · A4.10 completa
**Prossimo Step**: Prossimo TAG su richiesta utente
**Maintainer**: Claude (InnTour S.R.L. / MetaBorghi Initiative)
