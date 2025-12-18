
import { ISSPosition } from '../types';

const BASE_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

export const issService = {
  async getCurrentPosition(): Promise<ISSPosition> {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch ISS position');
    return response.json();
  }
};
