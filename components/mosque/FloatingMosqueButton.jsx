"use client";

import Image from "next/image";
import Mosque from "@/public/mosque.png";

export default function FloatingMosqueButton({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls="masjid-drawer"
      onClick={onToggle}
      className="masjid px-6 py-3 text-white transition hover:scale-105"
    >
      <Image src={Mosque} alt="Mosque" width={55} height={55} />
    </button>
  );
}
