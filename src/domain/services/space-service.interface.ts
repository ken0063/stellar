import type { ApodData, IssPosition, MarsRoverPhoto, SpaceXLaunch } from "../models/space-data";

export interface IApodService {
	getApod(date?: string): Promise<ApodData>;
}

export interface IMarsService {
	getMarsPhotos(rover: string, sol?: number, camera?: string): Promise<MarsRoverPhoto[]>;
}

export interface ILaunchService {
	getLaunches(limit?: number): Promise<SpaceXLaunch[]>;
}

export interface IIssService {
	getIssLocation(): Promise<IssPosition>;
}

export interface ISpaceService extends IApodService, IMarsService, ILaunchService, IIssService {}
