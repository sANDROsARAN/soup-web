"use client";
import React from "react";
import Visualizer from "../components/Visualizer";

export default function SongItem({
  name,
  url,
  isPlaying,
  onPlay,
  analyser
}: {
  name: string;
  url: string;
  isPlaying: boolean;
  onPlay: (url: string, name: string) => void;
  analyser: AnalyserNode | null;
}) {
  return (
    <div className="relative flex items-center justify-between border-b border-white py-3 gap-4">
      {/* Visualizer as background */}
      <div className="absolute inset-0 z-0">
        <Visualizer analyser={analyser} isPlaying={isPlaying} />
      </div>

      {/* Foreground content */}
      <span className="relative z-10 font-medium text-white">{name}</span>



      <button
        onClick={() => onPlay(url, name)}
        className="relative z-10 bg-white text-black px-3 py-1 rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>

  );
}
