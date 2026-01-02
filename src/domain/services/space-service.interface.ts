import type { ApodData, IssPosition, IssTle, MarsRoverPhoto, SpaceXLaunch } from "../models/space-data";

export interface IApodService {
	getApod(date?: string): Promise<ApodData>;
}

export interface MarsPhotoOptions {
	sol?: number;
	earth_date?: string;
	camera?: string;
	page?: number;
}

export interface IMarsService {
	getMarsPhotos(rover: string, options?: MarsPhotoOptions): Promise<MarsRoverPhoto[]>;
}

export interface ILaunchService {
	getLaunches(limit?: number, page?: number): Promise<{ docs: SpaceXLaunch[]; hasNextPage: boolean; nextPage: number | null }>;
}

export interface IIssService {
	getIssLocation(): Promise<IssPosition>;
	getIssTle(): Promise<IssTle>;
}

export interface ISpaceService extends IApodService, IMarsService, ILaunchService, IIssService {}
