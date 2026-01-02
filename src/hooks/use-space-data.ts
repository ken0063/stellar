"use client"

import { useQuery } from "@tanstack/react-query";
import { nasaService } from "../infrastructure/api/nasa-service";
import { spaceXService } from "../infrastructure/api/spacex-service";
import { issService } from "../infrastructure/api/iss-service";

export const useApod = (date?: string) => {
	return useQuery({
		queryKey: ["apod", date],
		queryFn: () => nasaService.getApod(date),
		staleTime: 24 * 60 * 60 * 1000, // APOD usually changes once a day
	});
};

export const useMarsPhotos = (rover: string, sol?: number, camera?: string) => {
	return useQuery({
		queryKey: ["mars-photos", rover, sol, camera],
		queryFn: () => nasaService.getMarsPhotos(rover, sol, camera),
	});
};

export const useSpaceXLaunches = (limit?: number) => {
	return useQuery({
		queryKey: ["spacex-launches", limit],
		queryFn: () => spaceXService.getLaunches(limit),
	});
};

export const useIssLocation = () => {
	return useQuery({
		queryKey: ["iss-location"],
		queryFn: () => issService.getIssLocation(),
		refetchInterval: 5000, // Refresh every 5 seconds for live tracking
	});
};
