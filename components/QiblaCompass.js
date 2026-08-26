
"use client";

import { useEffect, useRef, useState } from "react";
import useLocation from "@/hooks/useLocation";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;
const CARDINALS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;
const normalize360 = (deg) => ((deg % 360) + 360) % 360;
const cardinalFor = (deg) => CARDINALS[Math.round(normalize360(deg) / 22.5) % 16];

function qiblaBearing(lat, lng) {
  const lat1 = toRad(lat);
  const lat2 = toRad(KAABA_LAT);
  const deltaLng = toRad(KAABA_LNG - lng);
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
  return normalize360(toDeg(Math.atan2(y, x)));
}

// Accumulates rotation (can exceed 0–360°) so the compass never visibly
// "snaps back" when a raw reading crosses the 360°/0° seam.
function accumulateRotation(prevAccumulated, rawDegrees) {
  let delta = rawDegrees - normalize360(prevAccumulated);
  delta = (((delta + 180) % 360) + 360) % 360 - 180;
  return prevAccumulated + delta;
}

export default function QiblaCompass() {
  const { location, loading, error, getUserLocation } = useLocation();

  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [heading, setHeading] = useState(0);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [canListen, setCanListen] = useState(false);
  const [sensorError, setSensorError] = useState(null);

  const headingRef = useRef(0);
  const rafRef = useRef(null);
  const pendingRef = useRef(null);

  useEffect(() => {
    getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Assumes `location` is shaped like { latitude, longitude }.
  // Change these two accessors if your hook returns different keys.
  useEffect(() => {
    if (location?.latitude == null || location?.longitude == null) return;
    setQiblaDirection(qiblaBearing(location.latitude, location.longitude));
  }, [location]);

  useEffect(() => {
    const DOE = typeof window !== "undefined" && window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === "function") {
      setNeedsPermission(true); // iOS 13+: needs a tap before we can listen
    } else {
      setCanListen(true);
    }
  }, []);

  useEffect(() => {
    if (!canListen) return;

    const handleOrientation = (event) => {
      let raw;
      if (typeof event.webkitCompassHeading === "number") {
        raw = event.webkitCompassHeading; // iOS
      } else if (typeof event.alpha === "number") {
        raw = 360 - event.alpha; // Android / others
      } else {
        return;
      }
      pendingRef.current = raw;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          headingRef.current = accumulateRotation(headingRef.current, pendingRef.current);
          setHeading(headingRef.current);
        });
      }
    };

    // Prefer the "absolute" event where available (mainly Android) — plain
    // deviceorientation can drift relative to the phone's start angle.
    const eventName =
      typeof window !== "undefined" && "ondeviceorientationabsolute" in window
        ? "deviceorientationabsolute"
        : "deviceorientation";

    window.addEventListener(eventName, handleOrientation, true);
    return () => {
      window.removeEventListener(eventName, handleOrientation, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canListen]);

  const enableCompass = async () => {
    try {
      const result = await window.DeviceOrientationEvent.requestPermission();
      if (result === "granted") {
        setNeedsPermission(false);
        setCanListen(true);
      } else {
        setSensorError("Compass access was denied.");
      }
    } catch {
      setSensorError("Couldn't access the compass sensor.");
    }
  };

  const displayHeading = normalize360(heading);
  const rotation = qiblaDirection === null ? 0 : qiblaDirection - heading;

  return (
    <div className="qibla-wrap">
      {error && (
        <>
          <p className="qibla-error">{error}</p>
          <button className="qibla-btn" onClick={() => getUserLocation()}>
            Try again
          </button>
        </>
      )}

      {!error && (loading || qiblaDirection === null) && (
        <p className="qibla-loading">Locating you…</p>
      )}

      {!error && !loading && qiblaDirection !== null && (
        <>
          <h2 className="qibla-title">🕋 Qibla Finder</h2>

          {needsPermission && (
            <button className="qibla-btn" onClick={enableCompass}>
              Enable Compass
            </button>
          )}
          {sensorError && <p className="qibla-error">{sensorError}</p>}

          <div className="scene">
            <div className="compass-3d">
              <div className="bezel" />

              <div
                className="dial"
                style={{ transform: `translateZ(10px) rotateZ(${-heading}deg)` }}
              >
                <span className="cardinal n">N</span>
                <span className="cardinal e">E</span>
                <span className="cardinal s">S</span>
                <span className="cardinal w">W</span>
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className={i % 6 === 0 ? "tick tick-major" : "tick"}
                    style={{ transform: `rotate(${i * 15}deg) translateY(-95px)` }}
                  />
                ))}
              </div>

              <div
                className="needle"
                style={{ transform: `translateZ(28px) rotateZ(${rotation}deg)` }}
              >
                <div className="needle-shaft" />
                <div
                  className="kaaba-icon"
                  style={{ transform: `translate(-50%, -100%) rotate(${-rotation}deg)` }}
                >
                  🕋
                </div>
              </div>

              <div className="center-cap" />
            </div>
          </div>

          <p className="qibla-reading" aria-live="polite">
            Qibla {qiblaDirection.toFixed(1)}° ({cardinalFor(qiblaDirection)})
          </p>
          <p className="qibla-reading" aria-live="polite">
            Facing {displayHeading.toFixed(1)}° ({cardinalFor(displayHeading)})
          </p>
        </>
      )}
    </div>
  );
}