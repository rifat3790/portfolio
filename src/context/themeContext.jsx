import { createContext } from "react";

export const COLOR_SCHEMES = [
  {
    name: "Ocean Blue",
    hsl: "hsl(210, 80%, 60%)",
    tw: "from-blue-500 to-blue-300",
    start: "#3b82f6",
    end: "#38bdf8",
  },
  {
    name: "Emerald Green",
    hsl: "hsl(150, 70%, 60%)",
    tw: "from-green-500 to-green-300",
    start: "#22c55e",
    end: "#4ade80",
  },
  {
    name: "Royal Purple",
    hsl: "hsl(270, 70%, 60%)",
    tw: "from-purple-500 to-purple-300",
    start: "#8b5cf6",
    end: "#a78bfa",
  },
  {
    name: "Sunset Orange",
    hsl: "hsl(20, 90%, 60%)",
    tw: "from-orange-500 to-orange-300",
    start: "#f97316",
    end: "#fb923c",
  },
  {
    name: "Rose Pink",
    hsl: "hsl(340, 70%, 60%)",
    tw: "from-pink-500 to-pink-300",
    start: "#ec4899",
    end: "#f472b6",
  },
  {
    name: "Electric Cyan",
    hsl: "hsl(190, 100%, 60%)",
    tw: "from-cyan-500 to-cyan-300",
    start: "#06b6d4",
    end: "#22d3ee",
  },
];

export const ThemeContext = createContext({
  colorIdx: 0,
  setColorIdx: () => {},
  isDarkMode: true,
  setIsDarkMode: () => {},
});
