import { useState, useEffect, useCallback, useMemo } from "react";
import confetti from "canvas-confetti";

import iconRookie from "@/assets/level/rookie.png";
import iconScout from "@/assets/level/scout.png";
import iconExplorer from "@/assets/level/explorer.png";
import iconVeteran from "@/assets/level/veteran.png";
import iconElite from "@/assets/level/elite.png";
import iconMaster from "@/assets/level/master.png";
import iconGrandMaster from "@/assets/level/grand-master.png";
import iconHero from "@/assets/level/hero.png";
import iconLegend from "@/assets/level/legend.png";
import iconMythicGuardian from "@/assets/level/mythic-guardian.png";

export type LevelInfo = {
  level: number;
  title: string;
  badgeEmoji: string;
  badgeImage: string;
  minXp: number;
  maxXp: number;
};

export const LEVELS: LevelInfo[] = [
  { level: 1, title: "Rookie", badgeEmoji: "🎒", badgeImage: iconRookie, minXp: 0, maxXp: 300 },
  { level: 2, title: "Scout", badgeEmoji: "🗺️", badgeImage: iconScout, minXp: 300, maxXp: 750 },
  { level: 3, title: "Explorer", badgeEmoji: "🔍", badgeImage: iconExplorer, minXp: 750, maxXp: 1500 },
  { level: 4, title: "Veteran", badgeEmoji: "🧭", badgeImage: iconVeteran, minXp: 1500, maxXp: 2500 },
  { level: 5, title: "Elite", badgeEmoji: "📜", badgeImage: iconElite, minXp: 2500, maxXp: 3800 },
  { level: 6, title: "Master", badgeEmoji: "🏛️", badgeImage: iconMaster, minXp: 3800, maxXp: 5200 },
  { level: 7, title: "Grand Master", badgeEmoji: "🎓", badgeImage: iconGrandMaster, minXp: 5200, maxXp: 6700 },
  { level: 8, title: "Hero", badgeEmoji: "🛡️", badgeImage: iconHero, minXp: 6700, maxXp: 8300 },
  { level: 9, title: "Legend", badgeEmoji: "🦅", badgeImage: iconLegend, minXp: 8300, maxXp: 10000 },
  { level: 10, title: "Mythic Guardian", badgeEmoji: "👑", badgeImage: iconMythicGuardian, minXp: 10000, maxXp: 15000 },
];

export type BadgeInfo = {
  id: string;
  title: string;
  description: string;
  icon: string;
  categoryId: string; // which culture category this badge tracks
  requiredCount: number; // how many provinces must have this category explored
};

export const BADGES: BadgeInfo[] = [
  {
    id: "house-explorer",
    title: "Stempel Rumah Adat",
    description: "Jelajahi 15 Rumah Adat dari berbagai provinsi",
    icon: "🏠",
    categoryId: "rumahAdat",
    requiredCount: 15,
  },
  {
    id: "food-hunter",
    title: "Stempel Kuliner",
    description: "Temukan 15 Kuliner Khas Nusantara",
    icon: "🍜",
    categoryId: "makanan",
    requiredCount: 15,
  },
  {
    id: "dance-master",
    title: "Stempel Tari",
    description: "Pelajari 15 Tarian Tradisional Indonesia",
    icon: "🎭",
    categoryId: "tarian",
    requiredCount: 15,
  },
  {
    id: "music-lover",
    title: "Stempel Musik",
    description: "Dengarkan 15 Alat Musik Tradisional",
    icon: "🎵",
    categoryId: "musik",
    requiredCount: 15,
  },
  {
    id: "weapon-collector",
    title: "Stempel Pusaka",
    description: "Koleksi 15 Senjata Tradisional Nusantara",
    icon: "🗡️",
    categoryId: "senjata",
    requiredCount: 15,
  },
  {
    id: "heritage-guardian",
    title: "Stempel Warisan",
    description: "Kunjungi 15 Cagar Budaya Bersejarah",
    icon: "🏛️",
    categoryId: "cagar",
    requiredCount: 15,
  },
  {
    id: "tradition-keeper",
    title: "Stempel Tradisi",
    description: "Pelajari 15 Warisan Budaya Tak Benda",
    icon: "📜",
    categoryId: "warisan",
    requiredCount: 15,
  },
  {
    id: "fashion-expert",
    title: "Stempel Wastra",
    description: "Koleksi 15 Pakaian Adat Nusantara",
    icon: "👘",
    categoryId: "pakaian",
    requiredCount: 15,
  },
  {
    id: "flora-botanist",
    title: "Stempel Flora",
    description: "Temukan 15 Flora Khas Nusantara",
    icon: "🌿",
    categoryId: "flora",
    requiredCount: 15,
  },
  {
    id: "fauna-zoologist",
    title: "Stempel Fauna",
    description: "Temukan 15 Fauna Khas Nusantara",
    icon: "🐾",
    categoryId: "fauna",
    requiredCount: 15,
  },
];

const STORAGE_KEY = "jelajah_budaya_adventure_state_v1";

type AdventureState = {
  xp: number;
  clearedFogs: Record<string, boolean>; // provinceId -> true
  exploredCategories: Record<string, Record<string, boolean>>; // provinceId -> categoryId -> true
  openedChests: Record<string, boolean>; // chestId -> true
  unlockedBadges: Record<string, boolean>; // badgeId -> true
  firstVisits: Record<string, boolean>; // provinceId -> true (first time seeing welcome)
};

const defaultState: AdventureState = {
  xp: 0,
  clearedFogs: {},
  exploredCategories: {},
  openedChests: {},
  unlockedBadges: {},
  firstVisits: {},
};

export function useAdventureStore() {
  const [state, setState] = useState<AdventureState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new fields exist for backwards compatibility
        return {
          ...defaultState,
          ...parsed,
        };
      }
    } catch (e) {
      console.error("Failed to load adventure state", e);
    }
    return defaultState;
  });

  const [toastMessage, setToastMessage] = useState<{ text: string; xp: number } | null>(null);
  const [newBadge, setNewBadge] = useState<BadgeInfo | null>(null);
  const [recentlyCleared, setRecentlyCleared] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save adventure state", e);
    }
  }, [state]);

  // Current Level Calculation
  const currentLevelInfo = LEVELS.find(
    (l) => state.xp >= l.minXp && state.xp < l.maxXp
  ) || LEVELS[LEVELS.length - 1];

  // Add XP with toast animation
  const addXp = useCallback((amount: number, reason: string) => {
    setState((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
    setToastMessage({ text: reason, xp: amount });
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Check and unlock badges based on current state
  const checkBadgeUnlocks = useCallback(
    (updatedState: AdventureState) => {
      for (const badge of BADGES) {
        if (updatedState.unlockedBadges[badge.id]) continue;

        // Count how many provinces have this category explored
        let count = 0;
        for (const provCats of Object.values(updatedState.exploredCategories)) {
          if (provCats[badge.categoryId]) count++;
        }

        if (count >= badge.requiredCount) {
          // Unlock badge!
          updatedState.unlockedBadges = {
            ...updatedState.unlockedBadges,
            [badge.id]: true,
          };
          setNewBadge(badge);
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ["#FFD54F", "#FF9800", "#F44336", "#E91E63", "#9C27B0"],
          });
          // Only show one badge at a time
          break;
        }
      }
      return updatedState;
    },
    []
  );

  // Clear Fog of War for a province
  const clearFog = useCallback(
    (provinceId: string) => {
      if (!state.clearedFogs[provinceId]) {
        setRecentlyCleared(provinceId);
        setTimeout(() => setRecentlyCleared(null), 1500);

        setState((prev) => ({
          ...prev,
          clearedFogs: { ...prev.clearedFogs, [provinceId]: true },
        }));
        addXp(20, "🗺️ Kabut Terbuka! (+20 XP)");
      }
    },
    [state.clearedFogs, addXp]
  );

  // Mark first visit complete for a province
  const markFirstVisit = useCallback((provinceId: string) => {
    setState((prev) => ({
      ...prev,
      firstVisits: { ...prev.firstVisits, [provinceId]: true },
    }));
  }, []);

  // Explore a cultural category inside a province
  const exploreCategory = useCallback(
    (provinceId: string, categoryId: string) => {
      const provExplored = state.exploredCategories[provinceId] || {};
      if (!provExplored[categoryId]) {
        setState((prev) => {
          const newState = {
            ...prev,
            exploredCategories: {
              ...prev.exploredCategories,
              [provinceId]: {
                ...provExplored,
                [categoryId]: true,
              },
            },
          };

          // Check if all 8 categories for this province are complete
          const updatedProvCats = newState.exploredCategories[provinceId] || {};
          const completedCount = Object.keys(updatedProvCats).length;
          if (completedCount >= 8) {
            // Province complete bonus!
            setTimeout(() => {
              addXp(100, `🏆 Provinsi Tuntas! (+100 XP)`);
              confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.4 },
                colors: ["#FFD54F", "#FF9800", "#4CAF50", "#2196F3"],
              });
            }, 500);
          }

          // Check badge unlocks
          return checkBadgeUnlocks(newState);
        });
        addXp(10, "🎭 Menemukan Budaya Baru! (+10 XP)");
      }
    },
    [state.exploredCategories, addXp, checkBadgeUnlocks]
  );

  // Open Treasure Chest
  const openChest = useCallback(
    (chestId: string, bonusXp: number, _funFact: string) => {
      if (!state.openedChests[chestId]) {
        setState((prev) => ({
          ...prev,
          openedChests: { ...prev.openedChests, [chestId]: true },
        }));
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD54F", "#FF9800", "#E91E63"],
        });
        addXp(bonusXp, `🎁 Harta Karun Terbuka! (+${bonusXp} XP)`);
      }
    },
    [state.openedChests, addXp]
  );

  // Clear new badge notification
  const clearNewBadge = useCallback(() => {
    setNewBadge(null);
  }, []);

  // Get Exploration Progress Percentage for a Province (0..100)
  const getProvinceProgress = useCallback(
    (provinceId: string) => {
      const provExplored = state.exploredCategories[provinceId] || {};
      const count = Object.keys(provExplored).length;
      return Math.min(100, Math.round((count / 10) * 100));
    },
    [state.exploredCategories]
  );

  // Is this the first visit to a province?
  const isFirstVisit = useCallback(
    (provinceId: string) => !state.firstVisits[provinceId],
    [state.firstVisits]
  );

  // Overall Stats
  const visitedProvincesCount = Object.keys(state.clearedFogs).length;
  const discoveredCulturesCount = Object.values(state.exploredCategories).reduce(
    (acc, provCats) => acc + Object.keys(provCats).length,
    0
  );

  // Earned badges
  const earnedBadges = useMemo(
    () => BADGES.filter((b) => state.unlockedBadges[b.id]),
    [state.unlockedBadges]
  );

  const earnedBadgesCount = earnedBadges.length;

  return {
    xp: state.xp,
    levelInfo: currentLevelInfo,
    clearedFogs: state.clearedFogs,
    exploredCategories: state.exploredCategories,
    openedChests: state.openedChests,
    unlockedBadges: state.unlockedBadges,
    toastMessage,
    newBadge,
    recentlyCleared,
    clearFog,
    exploreCategory,
    openChest,
    addXp,
    getProvinceProgress,
    visitedProvincesCount,
    discoveredCulturesCount,
    earnedBadges,
    earnedBadgesCount,
    clearNewBadge,
    isFirstVisit,
    markFirstVisit,
  };
}
