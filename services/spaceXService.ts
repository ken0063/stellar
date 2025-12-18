
import { SpaceXLaunch } from '../types';

const BASE_URL = 'https://api.spacexdata.com/v3';

export const spaceXService = {
  async getPastLaunches(limit: number = 10): Promise<SpaceXLaunch[]> {
    const response = await fetch(`${BASE_URL}/launches/past?limit=${limit}&order=desc`);
    if (!response.ok) throw new Error('Failed to fetch SpaceX launches');
    return response.json();
  }
};
