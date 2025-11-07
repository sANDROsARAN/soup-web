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
    <div className="flex items-center justify-between border-b border-white/10 py-3 gap-4">
      <span className="font-medium text-white">{name}</span>

      <div className="min-w-[130px] flex justify-center">
        <Visualizer analyser={analyser} isPlaying={isPlaying} />
      </div>

      <button
        onClick={() => onPlay(url, name)}
        className="bg-white text-black px-3 py-1 rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
