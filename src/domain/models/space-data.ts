export interface ApodData {
	date: string;
	explanation: string;
	hdurl?: string;
	media_type: "image" | "video";
	service_version: string;
	title: string;
	url: string;
	copyright?: string;
}

export interface MarsRoverPhoto {
	id: number;
	sol: number;
	camera: {
		id: number;
		name: string;
		rover_id: number;
		full_name: string;
	};
	img_src: string;
	earth_date: string;
	rover: {
		id: number;
		name: string;
		landing_date: string;
		launch_date: string;
		status: string;
	};
}

export interface SpaceXLaunch {
	id: string;
	flight_number: number;
	name: string;
	date_utc: string;
	date_unix: number;
	date_local: string;
	precision: string;
	upcoming: boolean;
	static_fire_date_utc: string | null;
	static_fire_date_unix: number | null;
	net: boolean;
	window: number | null;
	rocket: string;
	success: boolean | null;
	failures: unknown[];
	details: string | null;
	links: {
		patch: {
			small: string | null;
			large: string | null;
		};
		reddit: {
			campaign: string | null;
			launch: string | null;
			media: string | null;
			recovery: string | null;
		};
		flickr: {
			small: unknown[];
			original: string[];
		};
		presskit: string | null;
		webcast: string | null;
		youtube_id: string | null;
		article: string | null;
		wikipedia: string | null;
	};
}

export interface IssPosition {
	latitude: string;
	longitude: string;
	name_id?: string;
}

export interface IssTle {
	name: string;
	id: number;
	line1: string;
	line2: string;
}

export interface FavoriteItem {
	type: string;
	id: string;
	url: string;
	title: string;
}
