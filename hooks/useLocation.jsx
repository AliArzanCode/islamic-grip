"use client";

import { useCallback, useState } from "react";

export default function useLocation() {
	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getUserLocation = useCallback(() => {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(new Error("Geolocation is not supported by this browser."));
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					const nextLocation = {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					};

					setLocation(nextLocation);
					resolve(nextLocation);
				},
				() => {
					reject(new Error("Location permission required"));
				}
			);
		});
	}, []);

	const getNearbyMosques = useCallback(
		async (fetchMosques) => {
			try {
				setLoading(true);
				setError(null);

				const userLocation = await getUserLocation();

				if (typeof fetchMosques === "function") {
					return await fetchMosques(userLocation.lat, userLocation.lon);
				}

				return userLocation;
			} catch (err) {
				const message = err instanceof Error ? err.message : "Unable to get location.";
				setError(message);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[getUserLocation]
	);

	return {
		location,
		loading,
		error,
		getUserLocation,
		getNearbyMosques,
	};
}
