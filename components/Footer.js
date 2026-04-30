import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-10 w-full overflow-hidden bg-gradient-to-br from-[#0f1f1a] via-[#13332a] to-[#0a1713] text-emerald-50">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="max-w-md">
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Islamic Grip</p>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            Grow with faith, one step at a time.
          </h3>
          <p className="mt-3 text-sm leading-6 text-emerald-100/85 sm:text-base">
            Daily reminders, prayer tools, and Quran access to keep your connection strong.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:min-w-[360px]">
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="no-underline transition hover:text-lime-200 hover:no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/NamazTiming" className="no-underline transition hover:text-lime-200 hover:no-underline">
                  Namaz-timing
                </Link>
              </li>
              <li>
                <Link href="/Quran" className="no-underline transition hover:text-lime-200 hover:no-underline">
                  Quran
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Connect</p>
            <a
              href="https://www.instagram.com/islamic.grip/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-900/40 px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-emerald-800 hover:no-underline"
              aria-label="Open Islamic Grip Instagram profile"
            >
              Instagram
            </a>
            <p className="mt-3 text-xs text-emerald-100/75">
              Follow us for updates and Islamic content.
            </p>
          </div>
        </div>
      </div>

      <div className="relative px-5 py-4 text-center text-xs text-emerald-100/75 sm:px-8">
        Copyright {currentYear} Islamic Grip. All rights reserved.
      </div>
    </footer>
  );
}
