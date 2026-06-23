"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useLocation from "@/hooks/useLocation";
import useMosques from "@/hooks/useMosques";
import FloatingMosqueButton from "./mosque/FloatingMosqueButton";
import NearbyDrawer from "./mosque/NearbyDrawer";

export default function Location() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [message, setMessage] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showMasjidPanel, setShowMasjidPanel] = useState(false);
  const [selectedMosque, setSelectedMosque] = useState(null);
  const { location, getNearbyMosques, loading: locationLoading, error: locationError } = useLocation();
  const { mosques, loading: mosquesLoading, error: mosquesError, fetchNearbyMosques } = useMosques();

  useEffect(() => {
    setMessage(true);

    const timer = setTimeout(() => {
      setMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLoginPrompt) {
      return;
    }

    const timer = setTimeout(() => {
      setShowLoginPrompt(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showLoginPrompt]);

  useEffect(() => {
    if (!selectedMosque && mosques.length > 0) {
      setSelectedMosque(mosques[0]);
    }
  }, [mosques, selectedMosque]);

  const handleToggle = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    const nextOpen = !showMasjidPanel;
    setShowMasjidPanel(nextOpen);

    if (nextOpen && mosques.length === 0) {
      try {
        const results = await getNearbyMosques((lat, lon) => fetchNearbyMosques(lat, lon));
        setSelectedMosque(results?.[0] ?? null);
      } catch {
        setSelectedMosque(null);
      }
    }
  };

  return (
    <>
      {showLoginPrompt ? (
        <div className="fixed bottom-19 right-5 z-[10000] mb-3 rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900 shadow-lg ring-1 ring-amber-200 animate-bounce">
          Please login first to know nearby masjid.
        </div>
      ) : null}

      <div className="fixed bottom-5 right-5 z-[9999]">
        {message && isAuthenticated ? (
          <div className="fixed bottom-19 right-5 mb-3 rounded-lg bg-white px-4 py-2 text-black shadow-lg animate-bounce">
            👋 Know Mosque and Halal Resturant near by you
          </div>
        ) : null}

        <FloatingMosqueButton isOpen={showMasjidPanel} onToggle={handleToggle} />
      </div>

      <NearbyDrawer
        open={showMasjidPanel}
        onClose={() => setShowMasjidPanel(false)}
        mosques={mosques}
        selectedMosque={selectedMosque}
        onSelectMosque={setSelectedMosque}
        userLocation={location}
        loading={locationLoading || mosquesLoading}
        error={locationError || mosquesError}
      />
    </>
  );
}