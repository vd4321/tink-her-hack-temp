"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export type Spot = {
  id: string;
  name: string;
  loc: string;
  lat: number;
  lng: number;
  type: string;   // "Landscape" | "Street" | "Portrait" | "Astro" | "Aerial" | "Reels"
  vibe: string;   // "Golden Hour" | "Moody" | "Minimal" | "Urban" | "Cinematic"
  access: string; // "Easy" | "Hike" | "4WD" | "Permit"
  crowd: number;  // 1–5
  bestHour: number; // 0–23
  rating: number;
  emoji: string;
  tip: string;
};

type Filters = {
  type: string[];
  vibe: string[];
  access: string[];
  crowd: number;
  hours: number[];
  search: string;
};

type SpotsContextType = {
  spots: Spot[];
  filters: Filters;
  setFilters: (f: Filters) => void;
  visibleSpots: Spot[];
  selectedSpot: Spot | null;
  setSelectedSpot: (s: Spot | null) => void;
  loading: boolean;
};

const SpotsContext = createContext<SpotsContextType | null>(null);

export function SpotsProvider({ children }: { children: ReactNode }) {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [filters, setFilters] = useState<Filters>({
    type: [], vibe: [], access: [], crowd: 5, hours: [], search: "",
  });

 useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snap) => {
      setSpots(snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name ?? "Unknown",
          loc: data.loc ?? "",
          lat: data.lat ?? data.latitude,
          lng: data.lng ?? data.longitude,
          type: data.type ?? "Landscape",
          vibe: data.vibe ?? "Golden Hour",
          access: data.access ?? "Easy",
          crowd: data.crowd ?? 3,
          bestHour: data.bestHour ?? 7,
          rating: data.rating ?? 4.5,
          emoji: data.emoji ?? "📍",
          tip: data.tip ?? "",
        } as Spot;
      }));
      setLoading(false);
    });
    return unsub;
  }, []);
  /*const visibleSpots = spots.filter((s) => {
    const q = filters.search.toLowerCase();
    if (q && !s.name.toLowerCase().includes(q) && !s.loc.toLowerCase().includes(q)) return false;
    if (filters.type.length && !filters.type.includes(s.type)) return false;
    if (filters.vibe.length && !filters.vibe.includes(s.vibe)) return false;
    if (filters.access.length && !filters.access.includes(s.access)) return false;
    if (s.crowd > filters.crowd) return false;
    if (filters.hours.length && !filters.hours.some((h) => Math.abs(h - s.bestHour) <= 1)) return false;
    return true;
  });*/
  const visibleSpots = spots.filter((s) => {
    const q = filters.search.toLowerCase().trim();
    if (q) {
      const exactMatch =
        s.name.toLowerCase() === q ||
        s.loc.toLowerCase() === q ||
        s.type.toLowerCase() === q ||
        s.vibe.toLowerCase() === q ||
        s.access.toLowerCase() === q;

      const partialMatch =
        s.name.toLowerCase().includes(q) ||
        s.loc.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        s.vibe.toLowerCase().includes(q);

      if (!exactMatch && !partialMatch) return false;
    }
    if (filters.type.length && !filters.type.includes(s.type)) return false;
    if (filters.vibe.length && !filters.vibe.includes(s.vibe)) return false;
    if (filters.access.length && !filters.access.includes(s.access)) return false;
    if (Number(s.crowd) > Number(filters.crowd)) return false;
    if (filters.hours.length && !filters.hours.some((h) => Math.abs(Number(h) - Number(s.bestHour)) <= 1)) return false;
    return true;
  });

  return (
    <SpotsContext.Provider value={{ spots, filters, setFilters, visibleSpots, selectedSpot, setSelectedSpot, loading }}>
      {children}
    </SpotsContext.Provider>
  );
}

export function useSpots() {
  const ctx = useContext(SpotsContext);
  if (!ctx) throw new Error("useSpots must be used inside SpotsProvider");
  return ctx;
}