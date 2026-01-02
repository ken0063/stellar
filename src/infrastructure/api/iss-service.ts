"use client"

import type { IssPosition } from "../../domain/models/space-data";
import type { IIssService } from "../../domain/services/space-service.interface";
import { ApiClient, apiClient } from "./api-client";

const ISS_BASE_URL = "https://api.wheretheiss.at/v1/satellites/25544";

export class IssService implements IIssService {
	constructor(private client: ApiClient = apiClient) {}

	async getIssLocation(): Promise<IssPosition> {
		return this.client.get<IssPosition>(ISS_BASE_URL, {
			cache: "no-store", // Live data
		});
	}
}

export const issService = new IssService();
