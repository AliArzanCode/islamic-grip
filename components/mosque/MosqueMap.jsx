"use client";

import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), {
  ssr: false,
});

const CircleMarker = dynamic(() => import("react-leaflet").then((module) => module.CircleMarker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), {
  ssr: false,
});

export default function MosqueMap({ mosques, selectedMosque, userLocation }) {
  const center =
    selectedMosque?.coordinates ??
    (userLocation ? [userLocation.lat, userLocation.lon] : mosques[0]?.coordinates) ??
    [24.7136, 46.6753];
  const mapKey = `${center[0]}-${center[1]}-${selectedMosque?.id ?? "default"}`;

  return (

    <>
    
    <h3 className="mt-2 text-2xl  font-bold">Nearby Mosques Map</h3>
    
   
    <div className=" rounded-2xl border border-slate-200 bg-white shadow-sm"> 
      <MapContainer key={mapKey} center={center} zoom={13} scrollWheelZoom={true} className="h-56 w-full">
        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        {userLocation ? (
          <CircleMarker
            center={[userLocation.lat, userLocation.lon]}
            radius={8}
            pathOptions={{
              color: "#1d4ed8",
              fillColor: "#3b82f6",
              fillOpacity: 0.95,
            }}
          >
            <Popup>
              <div>
                <strong>Your current location</strong>
                <div>Searching for nearby mosques</div>
              </div>
            </Popup>
          </CircleMarker>
        ) : null}
        {mosques.map((mosque) => (
          <CircleMarker
            key={mosque.id}
            center={mosque.coordinates}
            radius={selectedMosque?.id === mosque.id ? 10 : 7}
            pathOptions={{
              color: selectedMosque?.id === mosque.id ? "#b45309" : "#047857",
              fillColor: selectedMosque?.id === mosque.id ? "#f59e0b" : "#10b981",
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <div>
                <strong>{mosque.name}</strong>
                <div>{mosque.address}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
    </>
  );
  
}
