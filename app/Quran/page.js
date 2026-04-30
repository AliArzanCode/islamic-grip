"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import QuranReader from "@/components/QuranReader";

const translationApiMap = {
  // Replace these URLs with your own translation APIs.
  english: "https://api.alquran.cloud/v1/quran/en.asad",
  urdu: "https://api.alquran.cloud/v1/quran/ur.jalandhry",
  arabic: "https://api.alquran.cloud/v1/quran/ar.alafasy",
};

export default function QuranPage() {
  const router = useRouter();
  const { status } = useSession();
  const hasShownReminder = useRef(false);
  const [showLoginReminder, setShowLoginReminder] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && !hasShownReminder.current) {
      hasShownReminder.current = true;
      setShowLoginReminder(true);

      const hideTimeout = setTimeout(() => {
        setShowLoginReminder(false);
      }, 1800);

      const redirectTimeout = setTimeout(() => {
        router.replace("/Login");
      }, 2200);

      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(redirectTimeout);
      };
    }
  }, [status, router]);

  const loginReminderCard = (
    <div
      className={`fixed right-4 top-4 z-50 w-[88%] max-w-xs rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lg transition-all duration-500 ${
        showLoginReminder
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      Please login first to see this section.
    </div>
  );

  if (status === "loading") {
    return (
      <main>
        {loginReminderCard}
        <Navbar />
        <section className="px-5 py-6">
          <p className="text-sm text-gray-600">Loading...</p>
        </section>
      </main>
    );
  }

  if (status !== "authenticated") {
    return (
      <main>
        {loginReminderCard}
        <Navbar />
        <section className="px-5 py-6">
          <p className="text-sm text-gray-600">Redirecting to login...</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      {loginReminderCard}
      <Navbar />

      <section className="px-5 py-6">
        <div className="mb-6 flex items-center justify-around gap-4">
          <div >
            <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Quran</p>
            <h1 className="text-3xl font-bold text-gray-900">Al Quran</h1>
          </div>

          <Link
            href="/"
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Back to home
          </Link>
        </div>

        <QuranReader translationApiMap={translationApiMap} />
      </section>
    </main>
  );
}