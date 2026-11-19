import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink, Share, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isInIframe, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  // Hide completely when already running as an installed standalone PWA
  if (isInstalled) {
    return null;
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard restrictions
    }
  };

  // Native Chromium / Android one-tap download & install prompt
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        title="Pobierz i zainstaluj aplikację Miękiszon na telefonie"
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#84CC16] px-3 py-2 text-xs font-semibold text-[#050505] transition-colors hover:bg-[#9BE12E] whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Pobierz aplikację</span>
      </button>
    );
  }

  // Fallback mobile browser / iOS Safari / iframe install & download dialog
  return (
    <>
      <button
        type="button"
        onClick={() => setShowGuide(true)}
        title="Pobierz aplikację Miękiszon na telefon"
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#3B5422] bg-[#131C0E] px-3 py-2 text-xs font-semibold text-[#C9F27B] transition-colors hover:border-[#84CC16] hover:bg-[#192612] whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="h-3.5 w-3.5 text-[#84CC16]" aria-hidden="true" />
        <span>Pobierz na telefon</span>
      </button>

      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pobierz aplikację na telefon"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#242C22] bg-[#0B0D0B] p-5 text-[#F3F5F2] shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-[#181E17] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2F4226] bg-[#12190F]">
                  <Smartphone className="h-4 w-4 text-[#84CC16]" />
                </div>
                <div>
                  <h2 className="font-display text-base font-bold text-[#F3F5F2]">
                    Pobierz Miękiszon na telefon
                  </h2>
                  <p className="text-xs text-[#8C948A]">
                    Zainstaluj aplikację bezpośrednio na ekranie telefonu
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Zamknij okno pobierania"
                className="rounded-lg p-1.5 text-[#8C948A] hover:bg-[#161B15] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#CFD7CD]">
              {isInIframe && (
                <div className="rounded-xl border border-[#3B5422] bg-[#11190D] p-3.5 space-y-2">
                  <p className="font-semibold text-[#C9F27B]">
                    Aplikacja działa teraz w podglądzie — otwórz ją w przeglądarce telefonu:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={typeof window !== 'undefined' ? window.location.href : '/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-[#84CC16] px-3 text-xs font-semibold text-[#050505] hover:bg-[#9BE12E]"
                    >
                      <span>Otwórz w przeglądarce</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => void handleCopyLink()}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#2A3428] bg-[#141A13] px-3 text-xs font-medium text-[#E2E7E0] hover:border-[#84CC16] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#84CC16]" />
                          <span>Skopiowano link</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-[#84CC16]" />
                          <span>Kopiuj link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isIOS ? (
                <div className="rounded-xl border border-[#1E261C] bg-[#080A08] p-3.5 space-y-2">
                  <p className="font-semibold text-[#84CC16]">iPhone / iPad (Safari):</p>
                  <p className="flex items-center gap-1.5">
                    <span>1. Dotknij ikony</span>
                    <span className="inline-flex items-center gap-1 rounded border border-[#2C3629] bg-[#131812] px-1.5 py-0.5 font-semibold text-white">
                      <Share className="h-3 w-3 text-[#84CC16]" /> Udostępnij
                    </span>
                    <span>w dolnym pasku Safari.</span>
                  </p>
                  <p>
                    2. Wybierz <strong>Do ekranu początkowego</strong> i dotknij <strong>Dodaj</strong> — ikona Miękiszon pojawi się na pulpicie telefonu.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-[#1E261C] bg-[#080A08] p-3.5 space-y-2">
                  <p className="font-semibold text-[#84CC16]">Android (Google Chrome / Edge):</p>
                  <p>
                    1. Otwórz aplikację w przeglądarce <strong>Google Chrome</strong> na telefonie.
                  </p>
                  <p>
                    2. Dotknij menu <strong>⋮</strong> w prawym górnym rogu i wybierz{' '}
                    <strong>Zainstaluj aplikację</strong> (lub <strong>Dodaj do ekranu głównego</strong>), aby pobrać ją na telefon.
                  </p>
                </div>
              )}

              {!isInIframe && (
                <button
                  type="button"
                  onClick={() => void handleCopyLink()}
                  className="inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl border border-[#242C22] bg-[#101410] px-3 text-xs font-medium text-[#D6DDD4] hover:border-[#84CC16] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#84CC16]" />
                      <span>Skopiowano link aplikacji</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#84CC16]" />
                      <span>Kopiuj link do wysłania na telefon</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-4 w-full min-h-[42px] rounded-xl bg-[#84CC16] py-2 text-xs font-semibold text-[#050505] hover:bg-[#9BE12E] cursor-pointer"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </>
  );
};
