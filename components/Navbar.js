"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const displayName = session?.user?.name || "User";
  const displayEmail = session?.user?.email || "";
  const avatarImage = session?.user?.image;
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <>
      <nav
        style={{ backgroundColor: "#F0EFEA" }}
        className="flex w-full items-center justify-between h-15 px-4 md:px-8"
      >
        <div className="flex items-center space-x-2">
          <img className="rounded-full shadow-2xl" width={50} src="/logo.png" alt="icon" />
          <Link href="/" className="font-bold font">Islamic-Grip</Link>
        </div>

        <ul className="hidden md:flex items-center gap-2 lg:gap-4">
          <li>
            <Link href="/" className="rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-green-600 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <a href="#about" className="rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-green-600 hover:text-white">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-green-600 hover:text-white">
              Contact
            </a>
          </li>
          <li>
            <Link href="/NamazTiming" className="rounded-lg  px-3 py-1.5 text-sm font-semibold hover:bg-green-600 hover:text-white">
              Namaz-timing
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {!session ? (
            <Link
              href="/Login"
              className="hidden md:block rounded-lg bg-black px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-gray-900"
            >
              Login
            </Link>
          ) : null}

          {session ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 border border-green-900/20 bg-white px-1 py-0.5 rounded-full shadow-sm hover:shadow-lg hover:shadow-gray-500 cursor-pointer"
              >
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt={`${displayName} avatar`}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-800 text-white text-sm font-bold">
                    {avatarLetter}
                  </span>
                )}
              </button>

              {isProfileOpen ? (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-xl p-3 z-30">
                  <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                  <p className="text-xs text-gray-600 truncate mt-0.5">{displayEmail}</p>
                  <div className="h-px bg-gray-200 my-3" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            className="group relative h-10 w-10 rounded-full bg-black text-white shadow-lg hover:bg-gray-900 cursor-pointer px-5 md:hidden"
          >
            <span
              className={`absolute left-2.5 top-3 block h-0.5 w-5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-2.5 top-[18px] block h-0.5 w-5 bg-white transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-2.5 top-[23px] block h-0.5 w-5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-20 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed left-0 right-0 top-0 z-20 mx-auto mt-16 w-[92%] max-w-xl rounded-2xl border border-white/15 bg-gradient-to-b from-green-900 to-black p-6 text-white shadow-2xl transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-green-200/90">Menu</p>
        <ul className="mt-5 space-y-3">
          <li>
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl border border-white/15 px-4 py-3 text-lg font-semibold hover:bg-white/10"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl border border-white/15 px-4 py-3 text-lg font-semibold hover:bg-white/10"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl border border-white/15 px-4 py-3 text-lg font-semibold hover:bg-white/10"
            >
              Contact
            </a>
          </li>
          <li>
            <Link
              href="/NamazTiming"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl border border-white/15 px-4 py-3 text-lg font-semibold hover:bg-white/10"
            >
              Namaz-timing
            </Link>
          </li>
          <li>
            <Link
              href="/Login"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl border border-white/15 px-4 py-3 text-lg font-semibold hover:bg-white/10"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
