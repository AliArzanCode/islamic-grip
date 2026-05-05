"use client";

import { useEffect, useState } from "react";

const DEFAULT_TRANSLATION_ENDPOINTS = {
  english: "https://api.alquran.cloud/v1/quran/en.asad",
  urdu: "https://api.alquran.cloud/v1/quran/ur.jalandhry",
  arabic: "https://api.alquran.cloud/v1/quran/ar.alafasy",
};

const LANGUAGE_UI = {
  english: { label: "English", dir: "ltr" },
  urdu: { label: "Urdu", dir: "rtl" },
  arabic: { label: "Arabic", dir: "rtl" },
};

export default function QuranReader({
  onClose,
  translationApiMap = DEFAULT_TRANSLATION_ENDPOINTS,
}) {
  const [quranSurahs, setQuranSurahs] = useState([]);
  const [quranLoading, setQuranLoading] = useState(true);
  const [quranError, setQuranError] = useState("");
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  useEffect(() => {
    async function fetchQuran() {
      try {
        setQuranLoading(true);
        setQuranError("");

        const apiUrl = translationApiMap[selectedLanguage];
        if (!apiUrl) {
          throw new Error("Translation API is not configured for this language.");
        }

        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to load Quran data.");
        }

        const data = await res.json();
        setQuranSurahs(data?.data?.surahs || []);
        setCurrentSurahIndex(0);
      } catch {
        setQuranError("Unable to load Quran data right now.");
      } finally {
        setQuranLoading(false);
      }
    }

    fetchQuran();
  }, [selectedLanguage, translationApiMap]);

  const currentSurah = quranSurahs[currentSurahIndex];
  const canGoPrevious = currentSurahIndex > 0;
  const canGoNext = currentSurahIndex < quranSurahs.length - 1;

  return (
    <section className="px-5 py-8">
      <div className="mb-5 flex items-end justify-center gap-4">
        
            <div className="flex flex-col justify-center items-center">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Quran Reader</p>
          <h2 className="text-2xl font-bold text-gray-900">All ayat from Al Quran Cloud</h2>
        </div>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Close
          </button>
        ) : null}
      </div>

      {quranLoading ? (
        <p className="text-gray-600">Loading all ayat...</p>
      ) : quranError ? (
        <p className="text-red-600">{quranError}</p>
      ) : (
        currentSurah ? (
          <div className="space-y-4">
            <article className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentSurah.number}. {currentSurah.englishName}
                  </h3>
                  <p className="text-sm text-gray-500">{currentSurah.englishNameTranslation}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {currentSurah.ayahs?.length || 0} ayahs
                </span>
              </div>

              <div className="border-b border-gray-100 px-5 py-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Translation
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(LANGUAGE_UI).map(([languageKey, languageInfo]) => (
                    <button
                      key={languageKey}
                      type="button"
                      onClick={() => setSelectedLanguage(languageKey)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                        selectedLanguage === languageKey
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {languageInfo.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[28rem] space-y-3 overflow-y-auto px-5 py-4">
                {currentSurah.ayahs?.map((ayahItem) => (
                  <div key={ayahItem.numberInSurah} className="rounded-xl bg-gray-50 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-gray-800">Ayah {ayahItem.numberInSurah}</span>
                      <span className="text-xs text-gray-500">{ayahItem.juz ? `Juz ${ayahItem.juz}` : ""}</span>
                    </div>
                    <p
                      dir={LANGUAGE_UI[selectedLanguage]?.dir || "ltr"}
                      className={selectedLanguage === "urdu" ? "urdu text-lg sm:text-lg md:text-base font-semibold leading-8 text-gray-800 md:font-normal" : "text-lg sm:text-lg md:text-base font-bold leading-8 text-gray-800 md:font-normal"}
                    >
                      {ayahItem.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex    md:justify-between w-auto items-center gap-2 pt-3 ">
              <button
                type="button"
                onClick={() => setCurrentSurahIndex((current) => current - 1)}
                disabled={!canGoPrevious}
                className=" md:w-auto inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true">←</span>
                Previous surah
              </button>

              <p className="text-sm text-gray-600">
                Surah {currentSurahIndex + 1} of {quranSurahs.length}
              </p>

              <button
                type="button"
                onClick={() => setCurrentSurahIndex((current) => current + 1)}
                disabled={!canGoNext}
                className=" md:w-auto inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next surah
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : null
      )}
    </section>
  );
}
