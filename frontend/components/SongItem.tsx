"use client";
import React from "react";
import Visualizer from "../components/Visualizer";

export default function SongItem({
  name,
  url,
  isPlaying,
  analyser,
}: {
  name: string;
  url: string;
  isPlaying: boolean;
  analyser: AnalyserNode | null;
}) {
  return (
    <div
      className="relative flex items-center justify-between cursor-pointer 
      transition-all duration-300 hover:text-black w-full h-full border border-[#0000FF]"
    >
      {/* Visualizer as background */}
      <div className="absolute inset-0 z-0">
        <Visualizer analyser={analyser} isPlaying={isPlaying} />
      </div>

      <span className="relative z-10">{name}</span>
    </div>
  );
}
