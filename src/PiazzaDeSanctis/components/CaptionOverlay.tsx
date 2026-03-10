import React, { useState, useEffect, useCallback } from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { createTikTokStyleCaptions } from '@remotion/captions';
import type { Caption, TikTokPage } from '@remotion/captions';
import { CAPTIONS_SRC, COLORS, LATO } from '../constants';

// Raggruppa le parole in "pagine" da mostrare insieme
const SWITCH_EVERY_MS = 3800;
const HIGHLIGHT_COLOR = '#F0C040'; // oro caldo per la parola attiva

// ─── Singola pagina di sottotitoli ──────────────────────────────────────────
const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0 2px',
        whiteSpace: 'pre',
        fontFamily: LATO,
        fontSize: 28,
        fontWeight: 600,
        lineHeight: 1.55,
        color: COLORS.biancoCalce,
        textShadow: '0 2px 8px rgba(0,0,0,0.85), 0 0 20px rgba(0,0,0,0.6)',
        letterSpacing: '0.01em',
      }}
    >
      {page.tokens.map((token) => {
        const isActive =
          token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
        return (
          <span
            key={token.fromMs}
            style={{
              color: isActive ? HIGHLIGHT_COLOR : COLORS.biancoCalce,
              fontWeight: isActive ? 700 : 600,
              transition: 'color 0.08s',
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};

// ─── Componente principale CaptionOverlay ────────────────────────────────────
export const CaptionOverlay: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(CAPTIONS_SRC));
      const data = await response.json();
      setCaptions(data);
    } catch (e) {
      console.error('CaptionOverlay: errore caricamento captions', e);
    }
  }, []);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  if (!captions) return null;

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: SWITCH_EVERY_MS,
  });

  const currentMs = (frame / fps) * 1000;

  // Trova la pagina attiva al frame corrente
  const activePage = pages.find((page, idx) => {
    const nextPage = pages[idx + 1] ?? null;
    const endMs = nextPage
      ? Math.min(nextPage.startMs, page.startMs + SWITCH_EVERY_MS)
      : page.startMs + SWITCH_EVERY_MS;
    return currentMs >= page.startMs && currentMs < endMs;
  });

  if (!activePage) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 64,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(8,8,15,0.72)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '14px 32px',
          maxWidth: 1600,
          textAlign: 'center',
          border: '1px solid rgba(212,168,67,0.25)',
        }}
      >
        <CaptionPage page={activePage} />
      </div>
    </AbsoluteFill>
  );
};
