"use client"


import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { nasaService } from "../infrastructure/api/nasa-service";
import { spaceXService } from "../infrastructure/api/spacex-service";
import { issService } from "../infrastructure/api/iss-service";
import * as satellite from "satellite.js";
import { useState, useEffect } from "react";

import type { MarsPhotoOptions } from "../domain/services/space-service.interface";

export const useApod = (date?: string) => {
	return useQuery({
		queryKey: ["apod", date],
		queryFn: () => nasaService.getApod(date),
		staleTime: 24 * 60 * 60 * 1000, // APOD usually changes once a day
	});
};

export const useMarsPhotos = (rover: string, options?: MarsPhotoOptions) => {
	return useQuery({
		queryKey: ["mars-photos", rover, options],
		queryFn: () => nasaService.getMarsPhotos(rover, options),
	});
};

export const useSpaceXLaunches = (limit?: number) => {
	return useQuery({
		queryKey: ["spacex-launches", limit],
		queryFn: async () => {
			const data = await spaceXService.getLaunches(limit);
			return data.docs;
		},
	});
};

export const useInfiniteSpaceXLaunches = (limit = 10) => {
	return useInfiniteQuery({
		queryKey: ["spacex-launches-infinite", limit],
		queryFn: ({ pageParam = 1 }) => spaceXService.getLaunches(limit, pageParam),
		getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
		initialPageParam: 1,
	});
};

export const useIssLocation = () => {
	return useQuery({
		queryKey: ["iss-location"],
		queryFn: () => issService.getIssLocation(),
		refetchInterval: 5000, // Refresh every 5 seconds for live tracking
	});
};

export const useIssTle = () => {
    return useQuery({
        queryKey: ["iss-tle"],
        queryFn: () => issService.getIssTle(),
        staleTime: 1000 * 60 * 60 * 24, // Cache TLE for 24 hours
    });
};

export interface VisiblePass {
    rise: Date;
    set: Date;
    maxElevation: number;
    duration: number; // in minutes
}

export const useIssVisibility = () => {
    const { data: tle } = useIssTle();
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [passes, setPasses] = useState<VisiblePass[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    setError("Could not get your location.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    useEffect(() => {
        if (!tle || !userLocation) return;

        const calculatePasses = () => {
            setIsLoading(true);
            try {
                const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
                const passesFound: VisiblePass[] = [];
                const now = new Date();
                const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Check next 24 hours

                // Check every minute
                let isVisible = false;
                let currentPass: Partial<VisiblePass> = {};

                for (let t = now.getTime(); t < oneDayLater.getTime(); t += 60 * 1000) {
                    const time = new Date(t);
                    const positionAndVelocity = satellite.propagate(satrec, time);
                    const gmst = satellite.gstime(time);
                    
                    if (typeof positionAndVelocity.position === 'boolean' || !positionAndVelocity.position) continue; // Skip if calculation fails

                    // The type definition is now correct in satellite.d.ts, so we can use it directly
                    const positionEci = positionAndVelocity.position; 

                    const positionEcf = satellite.eciToEcf(positionEci, gmst);
                    
                    const lookAngles = satellite.ecfToLookAngles(
                        {
                            longitude: satellite.degreesToRadians(userLocation.lng),
                            latitude: satellite.degreesToRadians(userLocation.lat),
                            height: 0
                        },
                        positionEcf
                    );

                    // Elevation in degrees
                    const elevation = satellite.radiansToDegrees(lookAngles.elevation);

                    if (elevation > 10) { // Visible if > 10 degrees
                        if (!isVisible) {
                            isVisible = true;
                            currentPass = {
                                rise: time,
                                maxElevation: elevation,
                            };
                        } else {
                            if (elevation > (currentPass.maxElevation || 0)) {
                                currentPass.maxElevation = elevation;
                            }
                        }
                    } else {
                        if (isVisible && currentPass.rise) {
                            isVisible = false;
                            passesFound.push({
                                rise: currentPass.rise,
                                set: time,
                                maxElevation: currentPass.maxElevation || 0,
                                duration: (time.getTime() - currentPass.rise.getTime()) / 1000 / 60
                            });
                            
                            if (passesFound.length >= 5) break; // Limit to 5 passes
                        }
                    }
                }
                setPasses(passesFound);
            } catch (e) {
                console.error("Error calculating passes:", e);
                setError("Failed to calculate visibility.");
            } finally {
                setIsLoading(false);
            }
        };

        calculatePasses();
    }, [tle, userLocation]);

    return { passes, isLoadingLocation: !userLocation && !error, isLoadingPasses: isLoading, error, userLocation };
};
