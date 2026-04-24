"use client";

import { useEffect, useMemo } from "react";
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, ZoomControl, useMap } from "react-leaflet";
import { divIcon, type LatLngTuple } from "leaflet";
import { ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import {
  BRAZIL_CENTER,
  formatDistance,
  type GeoPoint,
  type StoreWithDistance,
} from "@/lib/store-locator";

export interface StoreLocatorMapProps {
  stores: StoreWithDistance[];
  selectedStoreId?: string;
  userLocation?: GeoPoint;
  onSelectStore: (storeId: string) => void;
}

interface MapViewportProps {
  stores: StoreWithDistance[];
  selectedStore?: StoreWithDistance;
  userLocation?: GeoPoint;
}

function toLatLng(point: GeoPoint): LatLngTuple {
  return [point.lat, point.lng];
}

function MapViewport({ stores, selectedStore, userLocation }: MapViewportProps) {
  const map = useMap();

  useEffect(() => {
    const visiblePoints = [
      ...(userLocation ? [toLatLng(userLocation)] : []),
      ...(selectedStore ? [toLatLng(selectedStore.coordinates)] : stores.slice(0, 6).map((store) => toLatLng(store.coordinates))),
    ];

    if (visiblePoints.length > 1) {
      map.fitBounds(visiblePoints, {
        animate: true,
        duration: 0.7,
        maxZoom: 13,
        padding: [46, 46],
      });
      return;
    }

    if (visiblePoints.length === 1) {
      map.setView(visiblePoints[0], 12, { animate: true });
    }
  }, [map, selectedStore, stores, userLocation]);

  return null;
}

function createStoreIcon(index: number, isActive: boolean) {
  return divIcon({
    className: "maza-map-marker-shell",
    html: `<span class="maza-map-marker${isActive ? " maza-map-marker--active" : ""}"><span>${index}</span></span>`,
    iconAnchor: [18, 42],
    iconSize: [36, 42],
    popupAnchor: [0, -36],
  });
}

function createUserIcon() {
  return divIcon({
    className: "maza-map-marker-shell",
    html: '<span class="maza-user-marker"><span></span></span>',
    iconAnchor: [14, 14],
    iconSize: [28, 28],
    popupAnchor: [0, -18],
  });
}

export function StoreLocatorMap({
  stores,
  selectedStoreId,
  userLocation,
  onSelectStore,
}: StoreLocatorMapProps) {
  const userIcon = useMemo(() => createUserIcon(), []);
  const selectedStore = stores.find((store) => store.id === selectedStoreId) ?? stores[0];
  const center = userLocation ?? selectedStore?.coordinates ?? BRAZIL_CENTER;
  const routeLine = userLocation && selectedStore ? [toLatLng(userLocation), toLatLng(selectedStore.coordinates)] : null;

  return (
    <MapContainer
      center={toLatLng(center)}
      zoom={userLocation ? 10 : 5}
      scrollWheelZoom={false}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />
      <MapViewport stores={stores} selectedStore={selectedStore} userLocation={userLocation} />

      {userLocation ? (
        <>
          <Circle
            center={toLatLng(userLocation)}
            pathOptions={{ color: "#B11116", fillColor: "#B11116", fillOpacity: 0.08, weight: 1 }}
            radius={18000}
          />
          <Marker icon={userIcon} position={toLatLng(userLocation)}>
            <Popup>
              <div className="flex min-w-36 flex-col gap-1">
                <strong className="text-sm text-[#1C1C1C]">Seu CEP</strong>
                <span className="text-xs text-[#5F5F5A]">Ponto usado para calcular as lojas mais próximas.</span>
              </div>
            </Popup>
          </Marker>
        </>
      ) : null}

      {routeLine ? (
        <Polyline
          positions={routeLine}
          pathOptions={{ color: "#B11116", dashArray: "8 10", opacity: 0.55, weight: 3 }}
        />
      ) : null}

      {stores.map((store, index) => {
        const isActive = store.id === selectedStore?.id;

        return (
          <Marker
            key={store.id}
            eventHandlers={{ click: () => onSelectStore(store.id) }}
            icon={createStoreIcon(index + 1, isActive)}
            position={toLatLng(store.coordinates)}
          >
            <Popup>
              <article className="flex min-w-56 flex-col gap-3">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#B11116]">
                    {formatDistance(store.distanceKm)}
                  </span>
                  <h3 className="mt-1 text-base font-bold leading-tight text-[#1C1C1C]">{store.name}</h3>
                </div>

                <p className="text-sm leading-relaxed text-[#5F5F5A]">
                  {store.address}, {store.city} - {store.state}
                </p>

                <div className="flex flex-wrap gap-2">
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#B11116] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#A00010]"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Navigation className="h-3.5 w-3.5" aria-hidden />
                    Rota
                  </a>
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#EBEBEB] px-3 py-2 text-xs font-bold text-[#1C1C1C] transition-colors hover:border-[#B11116]/40 hover:text-[#B11116]"
                    href={`tel:${store.phone.replace(/\D/g, "")}`}
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    Ligar
                  </a>
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#EBEBEB] px-3 py-2 text-xs font-bold text-[#1C1C1C] transition-colors hover:border-[#B11116]/40 hover:text-[#B11116]"
                    href={`https://www.openstreetmap.org/?mlat=${store.coordinates.lat}&mlon=${store.coordinates.lng}#map=15/${store.coordinates.lat}/${store.coordinates.lng}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    Mapa
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </div>
              </article>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
