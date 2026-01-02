"use client"

import type { ApodData, MarsRoverPhoto } from "../../domain/models/space-data";
import type { IApodService, IMarsService } from "../../domain/services/space-service.interface";
import { ApiClient, apiClient } from "./api-client";

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
const NASA_BASE_URL = "https://api.nasa.gov";

export class NasaService implements IApodService, IMarsService {
	constructor(private client: ApiClient = apiClient) {}

	async getApod(date?: string): Promise<ApodData> {
		try {
			return await this.client.get<ApodData>(`${NASA_BASE_URL}/planetary/apod`, {
				params: { api_key: NASA_API_KEY, date },
				revalidate: 3600,
			});
		} catch (error: unknown) {
			const statusError = error as { data?: { code?: string } };
			if (statusError.data?.code === "OVER_RATE_LIMIT") {
				return {
					date: date || new Date().toISOString().split('T')[0],
					explanation: "We've reached the cosmic limit for today! The NASA API is currently rate-limited. Please enjoy this stunning view of our universe while we wait for the stars to align again. Try again later or explore other sections of Stellar.",
					media_type: "image",
					service_version: "v1",
					title: "Celestial Wonder",
					url: "/images/stock-space.png",
					hdurl: "/images/stock-space.png"
				};
			}
			throw error;
		}
	}

	async getMarsPhotos(rover: string, sol = 1000, camera?: string): Promise<MarsRoverPhoto[]> {
		const data = await this.client.get<{ photos: MarsRoverPhoto[] }>(
			`${NASA_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`,
			{
				params: { api_key: NASA_API_KEY, sol, camera },
				revalidate: 86400,
			}
		);
		return data.photos;
	}
}

export const nasaService = new NasaService();
