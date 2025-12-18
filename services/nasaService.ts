
import { APODResponse, MarsPhoto } from '../types';

const NASA_API_KEY = 'DEMO_KEY'; // In production, this would be an environment variable.
const BASE_URL = 'https://api.nasa.gov';

export const nasaService = {
  async getAPOD(date?: string): Promise<APODResponse> {
    const url = new URL(`${BASE_URL}/planetary/apod`);
    url.searchParams.append('api_key', NASA_API_KEY);
    if (date) url.searchParams.append('date', date);
    
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch APOD');
    return response.json();
  },

  async getMarsPhotos(rover: string = 'curiosity', sol: number = 1000): Promise<MarsPhoto[]> {
    const url = new URL(`${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`);
    url.searchParams.append('sol', sol.toString());
    url.searchParams.append('api_key', NASA_API_KEY);
    
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch Mars photos');
    const data = await response.json();
    return data.photos;
  }
};
