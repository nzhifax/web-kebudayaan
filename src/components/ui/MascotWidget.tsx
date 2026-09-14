import React, { useState } from "react";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { Sparkles, MessageCircle, RefreshCw } from "lucide-react";

import mascotBird from "@/assets/mascot-bird.png";
import mascotExplorer from "@/assets/mascot-explorer.png";
import tipsMascot from "@/assets/tips-mascot.png";

export type MascotVariant = "bird" | "explorer" | "tips";
export type MascotMood = "happy" | "thinking" | "celebrate" | "encouraging" | "guide" | "officer";

interface MascotWidgetProps {
  variant?: MascotVariant;
  mood?: MascotMood;
  title?: string;
  message?: string | string[];
  size?: "sm" | "md" | "lg" | "xl";
  bubblePosition?: "right" | "top" | "left" | "bottom";
  interactive?: boolean;
  className?: string;
  showBubble?: boolean;
  onAvatarClick?: () => void;
}

export function MascotWidget({
  variant = "bird",
  mood = "guide",
  title = "Janu Si Petualang",
  message,
  size = "md",
  bubblePosition = "right",
  interactive = true,
  className = "",
  showBubble = true,
  onAvatarClick,
}: MascotWidgetProps) {
  const messagesArray = Array.isArray(message)
    ? message
    : message
    ? [message]
    : [
        "Klik pada peta provinsi untuk mempelajari tarian, kuliner, dan rumah adat!",
        "Kumpulkan stempel di paspormu dengan menyelesaikan kuis kebudayaan!",
        "Tahukah kamu? Indonesia memiliki lebih dari 300 kelompok etnis budaya!",
      ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleNextMessage = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
    setCurrentMessageIndex((prev) => (prev + 1) % messagesArray.length);
    if (onAvatarClick) onAvatarClick();
  };

  // Mascot Image Mapping
  const getImageSource = () => {
    switch (variant) {
      case "explorer":
        return mascotExplorer;
      case "tips":
        return tipsMascot;
      case "bird":
      default:
        return mascotBird;
    }
  };

  // Avatar Size Mapping - Significantly larger for high visual impact
  const sizeClasses = {
    sm: "h-16 md:h-20 w-auto",
    md: "h-24 md:h-28 w-auto",
    lg: "h-32 md:h-36 w-auto",
    xl: "h-40 md:h-48 w-auto",
  };

  // Framer Motion animation presets according to Mood
  const getMoodAnimation = (): TargetAndTransition => {
    switch (mood) {
      case "happy":
        return {
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        };
      case "celebrate":
        return {
          y: [0, -14, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
          transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        };
      case "thinking":
        return {
          rotate: [-3, 3, -3],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        };
      case "encouraging":
        return {
          scale: [1, 1.06, 1],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        };
      case "officer":
        return {
          y: [0, -4, 0],
          transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        };
      case "guide":
      default:
        return {
          y: [0, -6, 0],
          transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        };
    }
  };

  const activeMessage = messagesArray[currentMessageIndex];

  // Bubble Layout Classes
  const getBubbleLayout = () => {
    switch (bubblePosition) {
      case "top":
        return "flex-col-reverse items-center";
      case "bottom":
        return "flex-col items-center";
      case "left":
        return "flex-row-reverse items-center";
      case "right":
      default:
        return "flex-row items-center";
    }
  };

  return (
    <div className={`relative inline-flex gap-3 pointer-events-auto select-none ${getBubbleLayout()} ${className}`}>
      {/* Mascot Avatar */}
      <motion.div
        animate={isBouncing ? { scale: [1, 1.25, 0.95, 1], rotate: [0, -15, 15, 0] } : getMoodAnimation()}
        onClick={handleNextMessage}
        className={`relative shrink-0 cursor-pointer group`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <img
          src={getImageSource()}
          alt={`Maskot Nusantara (${variant})`}
          className={`${sizeClasses[size]} object-contain relative z-10 filter drop-shadow-lg`}
        />

        {/* Mood badge indicator */}
        {mood === "celebrate" && (
          <motion.div
            animate={{ scale: [0, 1.2, 1], rotate: [0, 20, 0] }}
            className="absolute -top-1 -right-1 z-20 bg-amber-400 text-amber-950 p-1 rounded-full text-xs font-black shadow-md border-2 border-white"
          >
            🎉
          </motion.div>
        )}
        {mood === "thinking" && (
          <motion.div
            animate={{ opacity: [0, 1, 0], y: [-2, -8, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 right-0 z-20 text-blue-500 text-sm font-black"
          >
            💭
          </motion.div>
        )}
      </motion.div>

      {/* Speech Bubble */}
      {showBubble && activeMessage && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, scale: 0.85, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -5 }}
            transition={{ duration: 0.2 }}
            className="relative flex-1 max-w-md md:max-w-lg rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-xl border-2 border-amber-200/80 text-xs text-slate-700 flex flex-col gap-1"
          >
            {/* Title & Interactive Badge */}
            <div className="flex items-center justify-between gap-2 border-b border-amber-100 pb-1">
              <span className="inline-flex items-center gap-1.5 font-extrabold text-[11px] text-amber-700 uppercase tracking-wider">
                <Sparkles className="size-3 text-amber-500" />
                {title}
              </span>
              {messagesArray.length > 1 && (
                <button
                  onClick={handleNextMessage}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-amber-600 font-bold transition-colors"
                  title="Klik untuk tips berikutnya"
                >
                  <RefreshCw className="size-2.5 animate-spin-hover" />
                  <span>{currentMessageIndex + 1}/{messagesArray.length}</span>
                </button>
              )}
            </div>

            {/* Message Body */}
            <div className="font-medium text-slate-700 leading-relaxed pt-0.5 flex items-start gap-2">
              <MessageCircle className="size-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{activeMessage}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
