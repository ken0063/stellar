
export interface APODResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface SpaceXLaunch {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;
  rocket: {
    rocket_name: string;
  };
  details: string;
  links: {
    mission_patch_small: string;
    article_link: string;
    video_link: string;
  };
  launch_success: boolean;
}

export interface ISSPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: {
    name: string;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    name: string;
    status: string;
  };
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MARS_ROVER = 'MARS_ROVER',
  SPACEX = 'SPACEX',
  ISS_TRACKER = 'ISS_TRACKER',
  AI_ASSISTANT = 'AI_ASSISTANT'
}
