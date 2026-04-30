"use client"

import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Quran from "@/public/koran.png"
import ComingSoonCard from "@/components/Coming-soon";
import { useRef } from "react";

export default function HomePage() {
  const { status } = useSession();
  const backgroundImages = ["/back.jpg", "/back2.jpg", "/back3.jpg", "/back4.jpg"];
  const [bgIndex, setBgIndex] = useState(0);
  const [verse, setVerse] = useState("");
  const [surah, setSurah] = useState("");
  const [ayah, setAyah] = useState("");
  const [showLoginReminder, setShowLoginReminder] = useState(false);
  const ref = useRef(null);

  const handleQuranOpen = (event) => {
    if (status !== "authenticated") {
      event.preventDefault();
      setShowLoginReminder(true);
    }
  };

  useEffect(() => {
    if (!showLoginReminder) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowLoginReminder(false);
    }, 2600);

    return () => clearTimeout(timeout);
  }, [showLoginReminder]);

  async function fetchVerse() {
    const randomNumber = Math.floor(Math.random() * 6236) + 1;
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${randomNumber}/en.asad`);
    const data = await res.json();

    setVerse(data?.data?.text || "No verse found.");
    setSurah(data?.data?.surah?.englishName || "");
    setAyah(data?.data?.numberInSurah || "");
  }

  useEffect(() => {
    fetchVerse();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((index) => (index + 1) % backgroundImages.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed right-4 top-4 z-50 w-[88%] max-w-xs rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-lg transition-all duration-500 ${
          showLoginReminder
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        Please login first to see this section.
      </div>

      <Navbar />
      <div
        style={{
          backgroundImage: `url(${backgroundImages[bgIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width:"100%",
          height: "400px",
          transition: "background-image 1s ease-in-out",
        }}
        className="sticky flex flex-col justify-center gap-5 px-5 text-gray-50 sm:px-8"
      >
        <div className="max-w-2xl">
          <h1 className="font-bold text-3xl sm:text-5xl">
            Let's Unite
          </h1>

          <h2 className="mt-3 text-2xl font-bold sm:text-4xl">
            <span>
              Islam teaches us{" "}
              <span className="inline-flex os">
                <Typewriter
                  options={{
                    strings: ["Unity", "Humanity", "Truth", "Peace"],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </span>
          </h2>
        </div>

        <div>
          <button onClick={() => ref.current.scrollIntoView({ behavior: "smooth" })} className="bg-black border-green-400 border-2 text-white hover:shadow-lg hover:shadow-gray-600 h-9 cursor-pointer w-30 p-0.5 rounded-lg">
            Explore Now
          </button>
        </div>
      </div>

      <div ref={ref} className="card relative flex flex-col gap-4 p-4 text-white md:h-90 md:flex-row md:p-5">
        <div className="w-full rounded-lg bg-black p-4 md:w-1/2 md:p-5">
          <p className="font-semibold text-sm sm:text-base">
            {surah} - Ayah {ayah}
          </p>
          <p className="mb-2 text-base italic leading-7 sm:text-lg">"{verse}"</p>
        </div>

        <Link
          href="/Quran"
          onClick={handleQuranOpen}
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 text-left shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:w-1/2 md:p-5"
          aria-label="Open Quran page"
        >
          <div className="flex h-full items-center gap-3 sm:gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-2 ring-1 ring-white/10 sm:h-20 sm:w-20 sm:p-3 md:h-24 md:w-24">
              <Image
                src={Quran}
                alt="Quran"
                className="h-full w-full object-contain invert"
                width={96}
                height={96}
              />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 sm:text-xs sm:tracking-[0.25em]">Quran</p>
              <h3 className="mt-1 text-lg font-bold text-white sm:mt-2 sm:text-xl md:text-2xl">Open Quran</h3>
              <p className="mt-2 max-w-xs text-xs leading-5 text-gray-300 sm:text-sm sm:leading-6">
                Tap this card to read the full Quran page with surah navigation.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <ComingSoonCard />
    </>
  );
}