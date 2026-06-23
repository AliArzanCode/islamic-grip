"use client";

import { useCallback, useState } from "react";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

function formatDistanceMeters(distanceInMeters) {
	if (distanceInMeters < 1000) {
		return `${Math.round(distanceInMeters)} m`;
	}

	return `${(distanceInMeters / 1000).toFixed(1)} km`;
}

function calculateDistanceMeters(lat1, lon1, lat2, lon2){
	const toRadians = (value) => (value * Math.PI) / 180;
	const earthRadius = 6371000;
	const deltaLat = toRadians(lat2 - lat1);
	const deltaLon = toRadians(lon2 - lon1);
	const a =
		Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
		Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

	return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function normalizeMosqueElement(element, userLat, userLon) {
	const lat = element.lat ?? element.center?.lat;
	const lon = element.lon ?? element.center?.lon;
	const name = element.tags?.name || "Nearby Mosque(No Name)";
	const distanceMeters = lat && lon ? calculateDistanceMeters(userLat, userLon, lat, lon) : null;

	return {
		id: `${element.type}-${element.id}`,
		name,
		address: element.tags?.["addr:full"] || element.tags?.["addr:street"] || element.tags?.description || "OpenStreetMap result",
		distance: distanceMeters ? formatDistanceMeters(distanceMeters) : "Nearby",
		distanceMeters,
		status: element.tags?.opening_hours || element.tags?.religion || "Mosque",
		halal: true,
		coordinates: lat && lon ? [lat, lon] : [userLat, userLon],
	};
}

async function fetchOverpassMosques(lat, lon, radiusMeters) {
	const query = `
	[out:json][timeout:25];
	(
	  node[amenity=mosque](around:${radiusMeters},${lat},${lon});
	  way[amenity=mosque](around:${radiusMeters},${lat},${lon});
	  relation[amenity=mosque](around:${radiusMeters},${lat},${lon});
	  node[amenity=place_of_worship][religion~"^(islam|muslim)$",i](around:${radiusMeters},${lat},${lon});
	  way[amenity=place_of_worship][religion~"^(islam|muslim)$",i](around:${radiusMeters},${lat},${lon});
	  relation[amenity=place_of_worship][religion~"^(islam|muslim)$",i](around:${radiusMeters},${lat},${lon});
	  node[building=mosque](around:${radiusMeters},${lat},${lon});
	  way[building=mosque](around:${radiusMeters},${lat},${lon});
	  relation[building=mosque](around:${radiusMeters},${lat},${lon});
	);
	out center tags;`;

	const response = await fetch(OVERPASS_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: `data=${encodeURIComponent(query)}`,
	});

	if (!response.ok) {
		throw new Error("Unable to load nearby mosques from OpenStreetMap.");
	}

	return response.json();
}

export default function useMosques() {
	const [mosques, setMosques] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchNearbyMosques = useCallback(async (lat, lon, radiusMeters = 2500) => {
		try {
			setLoading(true);
			setError(null);

			let data = await fetchOverpassMosques(lat, lon, radiusMeters);
			if (!data.elements?.length) {
				data = await fetchOverpassMosques(lat, lon, radiusMeters * 2);
			}
			const results = (data.elements || [])
				.map((element) => normalizeMosqueElement(element, lat, lon))
				.filter(Boolean)
				.sort((first, second) => (first.distanceMeters ?? Number.POSITIVE_INFINITY) - (second.distanceMeters ?? Number.POSITIVE_INFINITY))
				.slice(0, 12);

			setMosques(results);
			return results;
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unable to fetch nearby mosques.";
			setError(message);
			setMosques([]);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		mosques,
		loading,
		error,
		fetchNearbyMosques,
	};
}
