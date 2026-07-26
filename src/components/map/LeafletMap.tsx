import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { provinces, islandColors, type Province } from "@/lib/provinces-data";
import { ArrowRight, Home, Music, UtensilsCrossed, Drum } from "lucide-react";

function makeIcon(emoji: string, color: string, active: boolean) {
  const size = active ? 46 : 38;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:14px;background:${color};display:grid;place-items:center;font-size:${active ? 24 : 20}px;box-shadow:0 6px 0 rgba(0,0,0,.18),0 8px 20px -6px rgba(0,0,0,.35);border:3px solid white;transform:translate(-50%,-100%);position:relative;">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [0, 0],
  });
}

type Props = {
  filter: string | null;
  onSelect: (p: Province) => void;
  activeId: string | null;
};

export default function LeafletMap({ filter, onSelect, activeId }: Props) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const visible = useMemo(
    () => (filter ? provinces.filter((p) => p.island === filter) : provinces),
    [filter],
  );

  if (!ready) return null;

  return (
    <MapContainer
      center={[-2.5, 118]}
      zoom={5}
      minZoom={4}
      maxZoom={9}
      zoomControl={false}
      scrollWheelZoom
      className="size-full rounded-3xl"
      style={{ background: "#bfe0ff" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="bottomright" />
      {visible.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={makeIcon(p.emoji, islandColors[p.island], activeId === p.id)}
          eventHandlers={{ click: () => onSelect(p) }}
        >
          <Popup>
            <div className="min-w-[220px] font-[family-name:var(--font-body)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <div className="font-bold text-base text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">Ibu Kota: {p.capital}</div>
                </div>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex gap-2"><Home className="size-4 text-terracotta shrink-0" /> {p.rumahAdat}</li>
                <li className="flex gap-2"><Music className="size-4 text-ocean shrink-0" /> {p.tarian}</li>
                <li className="flex gap-2"><UtensilsCrossed className="size-4 text-forest shrink-0" /> {p.makanan}</li>
                <li className="flex gap-2"><Drum className="size-4 text-gold-foreground shrink-0" /> {p.alatMusik}</li>
              </ul>
              <button
                onClick={() => onSelect(p)}
                className="mt-3 w-full inline-flex items-center justify-center gap-1 rounded-xl bg-terracotta text-terracotta-foreground py-2 text-sm font-bold"
              >
                Jelajahi <ArrowRight className="size-4" />
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
