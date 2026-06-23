"use client";

import MosqueCard from "./MosqueCard";

export default function MosqueList({ mosques, selectedMosque, onSelectMosque, userLocation }) {
  return (
    <div className="grid gap-3">
      {mosques.map((mosque) => (
        <MosqueCard
          key={mosque.id}
          mosque={mosque}
          isSelected={selectedMosque?.id === mosque.id}
          onSelect={onSelectMosque}
          userLocation={userLocation}
        />
      ))}
    </div>
  );
}
