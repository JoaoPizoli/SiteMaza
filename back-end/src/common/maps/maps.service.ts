import { Injectable } from '@nestjs/common';

type GoogleGeocodeResponse = {
  status: string;
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
};

@Injectable()
export class GoogleGeocoderService {
  private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY;

  async getLatLongByAddress(address: string): Promise<{ lat: number; lng: number }> {
    if (!this.apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY não configurada');
    }

    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');

    url.searchParams.set('address', address);
    url.searchParams.set('key', this.apiKey);
    url.searchParams.set('language', 'pt-BR');
    url.searchParams.set('region', 'br');

    const response = await fetch(url);
    const data = (await response.json()) as GoogleGeocodeResponse;

    if (data.status !== 'OK' || data.results.length === 0) {
      throw new Error(`Endereço não encontrado. Status: ${data.status}`);
    }

    const location = data.results[0].geometry.location;
    
    return {
       lat: location.lat,
       lng: location.lng,
    };
  }
}