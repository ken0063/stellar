"use client"

import type { SpaceXLaunch } from "../../domain/models/space-data";
import type { ILaunchService } from "../../domain/services/space-service.interface";
import { ApiClient, apiClient } from "./api-client";

const SPACEX_BASE_URL = "https://api.spacexdata.com/v4";

export class SpaceXService implements ILaunchService {
	constructor(private client: ApiClient = apiClient) {}

	async getLaunches(limit = 10): Promise<SpaceXLaunch[]> {
		const data = await this.client.post<{ docs: SpaceXLaunch[] }>(
			`${SPACEX_BASE_URL}/launches/query`,
			{
				query: {},
				options: {
					limit,
					sort: { date_utc: "desc" },
				},
			},
			{ revalidate: 3600 }
		);
		return data.docs;
	}
}

export const spaceXService = new SpaceXService();
