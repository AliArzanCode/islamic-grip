"use client";

function buildDirectionsUrl(mosque, userLocation) {
  const destination = `${mosque.coordinates[0]},${mosque.coordinates[1]}`;

  if (userLocation) {
    const origin = `${userLocation.lat},${userLocation.lon}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=walking`;
}

export default function MosqueCard({ mosque, isSelected, onSelect, userLocation }) {
  const directionsUrl = buildDirectionsUrl(mosque, userLocation);

  return (
    <div
      className={`w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
        isSelected ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={() => onSelect(mosque)} className="min-w-0 flex-1 text-left">
          <h4 className="text-sm font-semibold text-slate-900">{mosque.name}</h4>
          <p className="mt-1 text-xs leading-5 text-slate-600">{mosque.address}</p>
        </button>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800 transition hover:bg-emerald-100"
        >
          Directions
        </a>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
        <span className="rounded-full bg-slate-100 px-2.5 py-1">{mosque.status}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">{mosque.halal ? "Halal nearby" : "Nearby food"}</span>
      </div>
    </div>
  );
}
