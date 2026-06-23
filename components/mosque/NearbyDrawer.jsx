"use client";

import MosqueMap from "./MosqueMap";
import MosqueList from "./MosqueList";

export default function NearbyDrawer({ open, onClose, mosques, selectedMosque, onSelectMosque, userLocation, loading, error }) {
  return (
    <div
      id="masjid-drawer"
      className={`fixed inset-0 z-[9998] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Close nearby mosques drawer"
        onClick={onClose}
        className={`absolute inset-0 bg-transparent transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className={`absolute right-0 top-[60px] h-[calc(100vh-140px)] w-[min(92vw,420px)] overflow-hidden rounded-l-3xl border border-emerald-200 bg-white/95 p-5 shadow-2xl backdrop-blur-md transition-all duration-500 ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-full flex-col gap-4 overflow-y-auto pr-2 text-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Nearby Places</p>
            <h3 className="mt-2 text-2xl font-bold">Nearby Mosques</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <p className="text-sm leading-7 text-slate-600">
          Browse the map preview and the list of nearby mosques around your current location.
        </p>

        {userLocation ? (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-900">
            Current location: {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}. The list is sorted by the
            nearest mosque first.
          </div>
        ) : null}

        {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        {loading ? <p className="text-sm font-medium text-emerald-700">Loading nearby mosques from OpenStreetMap...</p> : null}

        {selectedMosque ? (
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">Nearest Mosque</p>
            <h4 className="mt-2 text-lg font-bold text-slate-900">{selectedMosque.name}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-600">{selectedMosque.address}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-emerald-900">
              <span className="rounded-full bg-emerald-100 px-3 py-1">{selectedMosque.distance}</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1">{selectedMosque.status}</span>
            </div>
          </div>
        ) : null}

        <div className="pb-2">
          {mosques.length > 0 ? (
            <MosqueList
              mosques={mosques}
              selectedMosque={selectedMosque}
              onSelectMosque={onSelectMosque}
              userLocation={userLocation}
            />
          ) : loading ? null : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No nearby mosques were found in OpenStreetMap for this area. Try opening the map again or increasing the search radius.
            </div>
          )}
        </div>

        <MosqueMap mosques={mosques} selectedMosque={selectedMosque} userLocation={userLocation} />

      </div>
      </div>
    </div>
  );
}
