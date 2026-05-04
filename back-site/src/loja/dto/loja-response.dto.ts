import { Coordinates } from '../entities/loja.entity';

export type LojaResponseDto = {
  id: string;
  codcli: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  representativeCode: string;
  representativeName: string;
  coordinates: Coordinates;
  distanceKm?: number;
};

export type SyncLojasResponseDto = {
  imported: number;
  created: number;
  updated: number;
  skipped: number;
};

export type GeocodePendingLojasResponseDto = {
  processed: number;
  geocoded: number;
  failed: number;
  pending: number;
  errors: Array<{
    codcli: string;
    message: string;
  }>;
};
