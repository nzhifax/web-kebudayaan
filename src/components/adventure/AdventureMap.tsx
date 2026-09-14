import { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  provinces,
  islandColors,
  islandStrokeColors,
  fogColor,
  fogStrokeColor,
  type Province,
} from "@/lib/provinces-data";
import { allProvincesMeta, ProvinceMeta } from "@/lib/culture-loader";
import { useAdventureStore } from "@/hooks/useAdventureStore";
import { FloatingClouds } from "./FloatingClouds";
import { AnimatedDecorations } from "./AnimatedDecorations";
import { SidePanel, CategoryConfig } from "./SidePanel";
import { CategoryModal } from "./CategoryModal";
import { PassportModal } from "./PassportModal";
import { SearchBar } from "./SearchBar";
import { IslandFilter } from "./IslandFilter";
import { FogOverlay, FogClearEffect } from "./FogOverlay";
import { AchievementPopup } from "./AchievementPopup";
import { Link } from "@tanstack/react-router";
import { Sparkles, MapPin, Compass, Lightbulb, Home, Map as MapIcon, Gamepad2, Briefcase, Info, ArrowRight, BookOpen } from "lucide-react";

import { PassportCard } from "./PassportCard";
import { ProgressCard } from "./ProgressCard";
import { ProvinceInfoCard } from "./ProvinceInfoCard";
import { MapControls } from "./MapControls";
import passportIcon from "@/assets/passport-icon.png";
import tipsMascot from "@/assets/tips-mascot.png";
import compassIcon from "@/assets/compass-icon.png";
import logoIcon from "@/assets/logo-icon.png";

// Helper for cartoon mascot pin markers
function makeMascotIcon(emoji: string, color: string, isSelected: boolean, isHovered: boolean, isCompleted: boolean) {
  const size = isSelected ? 48 : isHovered ? 44 : 38;
  const borderColor = isCompleted ? "#F59E0B" : "white";
  const glow = isCompleted
    ? "0 0 12px rgba(245, 158, 11, 0.6), 0 6px 16px rgba(0,0,0,0.2)"
    : "0 6px 16px rgba(0,0,0,0.2)";

  return L.divIcon({
    className: "custom-mascot-pin",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 18px;
        background: ${isSelected ? "#F59E0B" : "#82CD47"};
        display: grid;
        place-items: center;
        font-size: ${isSelected ? 26 : isHovered ? 23 : 20}px;
        box-shadow: ${glow};
        border: 3px solid ${borderColor};
        transform: translate(-50%, -100%);
        transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
        animation: pin-bounce 3s ease-in-out infinite;
      ">
        <span>${emoji}</span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

const INDONESIA_BOUNDS: L.LatLngBoundsExpression = [
  [-10.5, 95.0],
  [6.0, 141.0]
];

// Leaflet Camera Controller to handle flyToBounds / flyTo
function MapCameraController({
  targetBounds,
  targetCenter,
}: {
  targetBounds: L.LatLngBoundsExpression | null;
  targetCenter: [number, number] | null;
}) {
  const map = useMap();
  const isFirstRender = useRef(true);

  // Only the sidebar needs padding — bottom cards are overlays, not layout constraints
  const SIDEBAR_WIDTH = 380; // px, matches sidebar right-6 panel width

  useEffect(() => {
    if (targetBounds) {
      const isInitial = isFirstRender.current;
      if (isInitial) {
        isFirstRender.current = false;
      }

      map.fitBounds(targetBounds, {
        maxZoom: 6.5,
        paddingTopLeft: [40, 80] as unknown as L.PointExpression,
        paddingBottomRight: [SIDEBAR_WIDTH + 16, 40] as unknown as L.PointExpression,
        animate: !isInitial,
        duration: isInitial ? 0 : 1.2,
      });
    } else if (targetCenter) {
      map.flyTo(targetCenter, 6, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [targetBounds, targetCenter, map]);

  return null;
}

// Map instance grabber helper
function MapInstanceGrabber({ setMap }: { setMap: (map: L.Map | null) => void }) {
  const map = useMap();
  useEffect(() => {
    setMap(map);
    return () => setMap(null);
  }, [map, setMap]);
  return null;
}

export function AdventureMap({ initialPassportOpen }: { initialPassportOpen?: boolean }) {
  const {
    clearedFogs,
    exploredCategories,
    openedChests,
    toastMessage,
    newBadge,
    recentlyCleared,
    clearFog,
    exploreCategory,
    openChest,
    getProvinceProgress,
    visitedProvincesCount,
    discoveredCulturesCount,
    earnedBadgesCount,
    levelInfo,
    xp,
    clearNewBadge,
    isFirstVisit,
    markFirstVisit,
  } = useAdventureStore();

  // Component State
  const [selectedIsland, setSelectedIsland] = useState("all");
  const [hoveredProvMeta, setHoveredProvMeta] = useState<ProvinceMeta | null>(null);
  const [selectedProvMeta, setSelectedProvMeta] = useState<ProvinceMeta | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [showDetailSidePanel, setShowDetailSidePanel] = useState(false);
  const [activeCategoryModal, setActiveCategoryModal] = useState<{
    cat: CategoryConfig;
    title: string;
    detail: string;
  } | null>(null);
  const [passportOpen, setPassportOpen] = useState(Boolean(initialPassportOpen));
  const [showFogClearAnim, setShowFogClearAnim] = useState(false);

  useEffect(() => {
    if (initialPassportOpen) {
      setPassportOpen(true);
    }
  }, [initialPassportOpen]);

  // Camera Target state for Leaflet fitBounds / flyTo
  const [cameraTargetBounds, setCameraTargetBounds] = useState<L.LatLngBoundsExpression | null>(INDONESIA_BOUNDS);
  const [cameraTargetCenter, setCameraTargetCenter] = useState<[number, number] | null>(null);

  // Dynamic GeoJSON data state loaded from public/provinces.geojson
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    fetch("/provinces.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Failed to load provinces GeoJSON:", err));
  }, []);

  // Map of Province Meta by ID
  const metaMap = useMemo(() => {
    const map = new Map<string, ProvinceMeta>();
    allProvincesMeta.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  // Map of Province data by ID and Code
  const provinceLookup = useMemo(() => {
    const map = new Map<string, Province>();
    provinces.forEach((p) => {
      map.set(p.id, p);
    });
    return map;
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Floating Tooltip Position via GPU translate3d
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !tooltipRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(e.clientX - rect.left + 16, containerRef.current.clientWidth - 300);
    const y = Math.max(16, Math.min(e.clientY - rect.top - 40, containerRef.current.clientHeight - 260));
    tooltipRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  // Find matching Province object for GeoJSON feature
  const resolveProvince = (feature: any): Province | undefined => {
    const pId = feature?.properties?.id;
    const nmProv = feature?.properties?.Nm_Prov || feature?.properties?.name;
    const code = feature?.properties?.code || feature?.properties?.ID;

    if (nmProv) {
      const matchByName = provinces.find((p) => p.name.toLowerCase() === nmProv.toLowerCase());
      if (matchByName) return matchByName;
    }

    if (pId && provinceLookup.get(pId)) return provinceLookup.get(pId);

    return provinces.find((p) => p.id === pId);
  };

  // Handle click on province
  const handleProvinceClick = (prov: Province, layerBounds?: L.LatLngBounds) => {
    const isNewFog = !clearedFogs[prov.id];
    if (isNewFog) {
      setShowFogClearAnim(true);
    }
    clearFog(prov.id);

    const meta = metaMap.get(prov.id) || null;
    setSelectedProvMeta(meta);

    if (layerBounds) {
      setCameraTargetBounds(layerBounds);
      setCameraTargetCenter(null);
    } else {
      setCameraTargetCenter([prov.lat, prov.lng]);
      setCameraTargetBounds(null);
    }
  };

  // Visible provinces based on island filter
  const visibleProvinces = useMemo(
    () =>
      selectedIsland === "all"
        ? provinces
        : provinces.filter((p) => {
            const meta = metaMap.get(p.id);
            return (meta?.island || p.island) === selectedIsland;
          }),
    [selectedIsland, metaMap]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen overflow-hidden adventure-ocean-bg select-none font-[family-name:var(--font-body)]"
    >
      {/* Atmosphere Overlays (Clouds, Birds, Boats, Dolphins, Waves) */}
      <FloatingClouds />
      <AnimatedDecorations />

      {/* 1. TOP FLOATING HEADER OVERLAY */}
      <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform duration-300 group-hover:rotate-12 shrink-0">
              <img src={logoIcon} alt="Logo" className="size-10 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.15)]" />
            </div>
            <div className="font-[family-name:var(--font-display)] leading-none text-slate-800">
              <div className="text-lg font-black tracking-tight">Jelajah</div>
              <div className="text-xs font-extrabold text-slate-500">Nusantara</div>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Capsule */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <nav className="flex items-center gap-1 bg-white/90 backdrop-blur border border-slate-200/50 px-2 py-1.5 rounded-full shadow-[var(--shadow-soft)]">
            <Link
              to="/"
              className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-slate-655 hover:bg-slate-100 hover:text-slate-800 transition"
            >
              <Home className="size-4" />
              <span className="hidden md:inline">Beranda</span>
            </Link>
            <Link
              to="/peta"
              className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 bg-emerald-500/10 text-emerald-800 transition"
            >
              <MapIcon className="size-4 text-emerald-800" />
              <span className="hidden md:inline">Peta</span>
            </Link>
              <Link
                to="/kuis"
                className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-slate-655 hover:bg-slate-100 hover:text-slate-800 transition"
              >
                <Gamepad2 className="size-4" />
                <span className="hidden md:inline">Kuis</span>
              </Link>
              <button
                onClick={() => setPassportOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-slate-655 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer"
              >
                <BookOpen className="size-4" />
                <span className="hidden md:inline">Paspor</span>
              </button>
          </nav>
        </div>

        {/* Empty placeholder to balance flex row */}
        <div className="w-10 h-10" />
      </div>

      {/* 2. RIGHT SIDE PANEL OVERLAY */}
      <div className="absolute right-6 top-[5.25rem] z-30 hidden lg:flex flex-col gap-3 pointer-events-auto max-h-[calc(100vh-12rem)] overflow-y-auto no-scrollbar">
        <PassportCard
          visitedCount={visitedProvincesCount}
          clearedFogs={clearedFogs}
          onSelectProvince={(provId) => {
            const prov = provinces.find((p) => p.id === provId);
            if (prov) handleProvinceClick(prov);
          }}
          onOpenPassport={() => setPassportOpen(true)}
        />

        <ProgressCard
          visitedCount={visitedProvincesCount}
          totalProvinces={provinces.length}
          levelInfo={levelInfo}
          xp={xp}
        />
      </div>

      {/* 3. BOTTOM LEFT INFO CARDS */}
      <div className="absolute bottom-6 left-6 z-30 hidden xl:flex items-end gap-4 pointer-events-none max-w-3xl">
        {/* Card 1: Petunjuk */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-100/80 shadow-[var(--shadow-soft)] flex-1 h-[7.5rem] flex items-center justify-between gap-4 pointer-events-auto">
          <div className="flex-1 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-slate-850">
              <Compass className="size-4.5 text-slate-700" />
              <h4 className="text-xs font-black tracking-tight font-[family-name:var(--font-display)]">Petunjuk</h4>
            </div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              Arahkan cursor ke provinsi atau klik untuk melihat informasi budayanya.
            </p>
          </div>
          <div className="size-20 shrink-0 select-none animate-[spin_65s_linear_infinite] opacity-90 hover:opacity-100 transition-opacity">
            <img src={compassIcon} alt="Kompas" className="size-20 object-contain drop-shadow-xs" />
          </div>
        </div>

        {/* Card 2: Tips Jelajah */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-100/80 shadow-[var(--shadow-soft)] flex-1 h-[7.5rem] flex items-center justify-between gap-4 pointer-events-auto">
          <div className="flex-1 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-slate-850">
              <Lightbulb className="size-4.5 text-slate-700" />
              <h4 className="text-xs font-black tracking-tight font-[family-name:var(--font-display)]">Tips Jelajah</h4>
            </div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              Kumpulkan semua stempel di paspor dan selesaikan misi budaya untuk mendapatkan hadiah!
            </p>
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0 select-none">
            <img src={tipsMascot} alt="Tips" className="h-24 w-auto object-contain drop-shadow-sm" />
          </div>
        </div>
      </div>

      {/* 4. BOTTOM RIGHT FLOATING BUTTON — Lihat Paspor Nusantara */}
      <div className="absolute bottom-6 right-6 z-40 pointer-events-auto">
        <button
          onClick={() => setPassportOpen(true)}
          className="py-3.5 px-5.5 rounded-3xl bg-gradient-to-r from-[#FFB703] to-[#FB8500] hover:from-[#FB8500] hover:to-[#EA580C] text-slate-900 font-[family-name:var(--font-display)] font-extrabold text-sm sm:text-base shadow-[0_6px_20px_rgba(251,133,0,0.35),0_4px_0_#B45309] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(251,133,0,0.5),0_4px_0_#B45309] active:translate-y-[2px] active:shadow-[0_2px_0_#B45309] transition-all border-2 border-white/90 flex items-center gap-3 cursor-pointer whitespace-nowrap"
        >
          <img src={passportIcon} alt="Paspor" className="h-12 sm:h-14 w-auto object-contain shrink-0 -my-3 drop-shadow-md" />
          <span className="text-slate-950">Lihat Paspor</span>
          <ArrowRight className="size-4 sm:size-5 stroke-[3] text-slate-950" />
        </button>
      </div>

      {/* Map Zoom / Recenter Controls — placed outside MapContainer to guarantee clickability */}
      <div className="absolute bottom-24 xl:bottom-36 left-6 z-30 pointer-events-auto">
        <MapControls
          map={map}
          onRecenter={() => {
            setCameraTargetBounds([
              [-10.5, 95.0],
              [6.0, 141.0]
            ]);
            setCameraTargetCenter(null);
            setSelectedProvMeta(null);
          }}
        />
      </div>

      {/* 4. PRIMARY MAP BACKGROUND (Spans the entire viewport) */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <MapContainer
          center={[-2.5, 118]}
          zoom={5}
          minZoom={4}
          maxZoom={9}
          zoomControl={false}
          scrollWheelZoom
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <MapCameraController
            targetBounds={cameraTargetBounds}
            targetCenter={cameraTargetCenter}
          />

          <MapInstanceGrabber setMap={setMap} />

          {geoJsonData && (
            <GeoJSON
              key={selectedIsland}
              data={geoJsonData}
              style={(feature) => {
                const prov = resolveProvince(feature);
                if (!prov) return { fillColor: fogColor, fillOpacity: 0.25, weight: 1, color: "#ffffff" };

                const meta = metaMap.get(prov.id);
                const islandName = meta?.island || prov.island;
                const isFiltered = selectedIsland !== "all" && islandName !== selectedIsland;
                const isSelected = selectedProvMeta?.id === prov.id;
                const isHovered = hoveredProvMeta?.id === prov.id;

                const baseColor = isSelected || isHovered ? "#FBBF24" : "#82CD47";
                const strokeColor = isSelected ? "#EA580C" : isHovered ? "#FBBF24" : "#ffffff";

                return {
                  fillColor: baseColor,
                  fillOpacity: isFiltered ? 0.15 : isSelected || isHovered ? 0.95 : 0.8,
                  color: strokeColor,
                  weight: isSelected || isHovered ? 3.5 : 1.5,
                  opacity: isFiltered ? 0.2 : 0.95,
                };
              }}
              onEachFeature={(feature, layer) => {
                const prov = resolveProvince(feature);
                if (!prov) return;

                const provMeta = metaMap.get(prov.id) || null;

                layer.on({
                  mouseover: (e) => {
                    const l = e.target;
                    setHoveredProvMeta(provMeta);
                    l.setStyle({
                      fillColor: "#FBBF24",
                      fillOpacity: 0.95,
                      weight: 3.5,
                      color: "#FBBF24",
                    });
                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                      l.bringToFront();
                    }
                  },
                  mouseout: (e) => {
                    const l = e.target;
                    setHoveredProvMeta(null);
                    const isSelected = selectedProvMeta?.id === prov.id;
                    const meta = metaMap.get(prov.id);
                    const isFiltered = selectedIsland !== "all" && (meta?.island || prov.island) !== selectedIsland;

                    l.setStyle({
                      fillColor: isSelected ? "#FBBF24" : "#82CD47",
                      fillOpacity: isFiltered ? 0.15 : isSelected ? 0.95 : 0.8,
                      color: isSelected ? "#EA580C" : "#ffffff",
                      weight: isSelected ? 3.5 : 1.5,
                    });
                  },
                  click: (e) => {
                    handleProvinceClick(prov, e.target.getBounds());
                  },
                });
              }}
            />
          )}
        </MapContainer>
      </div>

      {/* Selected Province Info Card (Positioned floating over the map like in design screenshot) */}
      <AnimatePresence>
        {selectedProvMeta && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/25 backdrop-blur-[2px]"
            onClick={() => setSelectedProvMeta(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ProvinceInfoCard
                province={selectedProvMeta}
                onClose={() => setSelectedProvMeta(null)}
                onExplore={() => {
                  setShowDetailSidePanel(true);
                }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Fog Clearing Animated Dissipation Overlay */}
      <FogClearEffect
        isVisible={showFogClearAnim}
        onComplete={() => setShowFogClearAnim(false)}
      />

      {/* Gamification Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-gradient-to-r from-terracotta to-amber-600 text-white px-6 py-3 shadow-2xl font-black text-sm border-2 border-white flex items-center gap-2.5"
          >
            <Sparkles className="size-5 text-amber-300 animate-spin" />
            <span>{typeof toastMessage === "string" ? toastMessage : toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Unlock Celebration Popup */}
      <AchievementPopup
        badge={newBadge}
        onClose={clearNewBadge}
      />

      {/* Slide-in Right Culture Detail Side Panel */}
      {showDetailSidePanel && (
        <SidePanel
          province={selectedProvMeta}
          onClose={() => setShowDetailSidePanel(false)}
          exploredCategories={
            selectedProvMeta ? exploredCategories[selectedProvMeta.id] || {} : {}
          }
          progressPercent={selectedProvMeta ? getProvinceProgress(selectedProvMeta.id) : 0}
          isFirstVisit={selectedProvMeta ? isFirstVisit(selectedProvMeta.id) : false}
          onStartAdventure={() => {
            if (selectedProvMeta) markFirstVisit(selectedProvMeta.id);
          }}
          onSelectCategory={(cat, title, detail) => {
            if (selectedProvMeta) exploreCategory(selectedProvMeta.id, cat.id);
            setActiveCategoryModal({ cat, title, detail });
          }}
        />
      )}

      {/* Category Trivia Detail Modal */}
      {activeCategoryModal && selectedProvMeta && (
        <CategoryModal
          category={activeCategoryModal.cat}
          province={selectedProvMeta}
          title={activeCategoryModal.title}
          detail={activeCategoryModal.detail}
          onClose={() => setActiveCategoryModal(null)}
          onExplore={() => {
            if (selectedProvMeta) exploreCategory(selectedProvMeta.id, activeCategoryModal.cat.id);
          }}
        />
      )}

      {/* Virtual Passport Nusantara Modal */}
      <PassportModal
        isOpen={passportOpen}
        onClose={() => setPassportOpen(false)}
        getProvinceProgress={getProvinceProgress}
      />
    </div>
  );
}
