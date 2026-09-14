import { useMemo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";

type FogOverlayProps = {
  provinces: Array<{
    id: string;
    lat: number;
    lng: number;
  }>;
  clearedFogs: Record<string, boolean>;
  recentlyCleared: string | null;
};

/**
 * Renders animated cloud/fog SVG overlays on unvisited province centroids.
 * When a province is cleared, the fog animates away (opacity + scale).
 */
export function FogOverlay({ provinces, clearedFogs, recentlyCleared }: FogOverlayProps) {
  // Only render fog for provinces that haven't been cleared
  const foggedProvinces = useMemo(
    () => provinces.filter((p) => !clearedFogs[p.id]),
    [provinces, clearedFogs]
  );

  return (
    <>
      {foggedProvinces.map((prov) => {
        const icon = L.divIcon({
          className: "fog-overlay-marker",
          html: `
            <div style="
              width: 80px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
              opacity: 0.55;
              filter: blur(1px);
              transform: translate(-50%, -50%);
            ">
              <svg viewBox="0 0 80 50" width="80" height="50" fill="white" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.08));">
                <ellipse cx="40" cy="30" rx="35" ry="18" opacity="0.7" />
                <ellipse cx="28" cy="25" rx="22" ry="14" opacity="0.5" />
                <ellipse cx="52" cy="25" rx="22" ry="14" opacity="0.5" />
                <ellipse cx="40" cy="22" rx="25" ry="12" opacity="0.4" />
              </svg>
            </div>
          `,
          iconSize: [80, 50],
          iconAnchor: [40, 25],
        });

        return (
          <Marker
            key={`fog-${prov.id}`}
            position={[prov.lat, prov.lng]}
            icon={icon}
            interactive={false}
          />
        );
      })}
    </>
  );
}

/**
 * Animated fog clearing effect shown as HTML overlay when a province is first clicked.
 * Uses Framer Motion for the dissipation animation.
 */
export function FogClearEffect({
  isVisible,
  onComplete,
}: {
  isVisible: boolean;
  onComplete: () => void;
}) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Fog cloud that dissipates */}
          <motion.div
            className="relative"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <svg
              viewBox="0 0 200 120"
              width="200"
              height="120"
              className="filter drop-shadow-md"
            >
              <ellipse cx="100" cy="60" rx="90" ry="50" fill="white" opacity="0.7" />
              <ellipse cx="70" cy="50" rx="60" ry="35" fill="white" opacity="0.5" />
              <ellipse cx="130" cy="50" rx="60" ry="35" fill="white" opacity="0.5" />
              <ellipse cx="100" cy="45" rx="70" ry="30" fill="white" opacity="0.4" />
            </svg>
          </motion.div>

          {/* Discovery sparkle burst */}
          <motion.div
            className="absolute text-4xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            ✨
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
