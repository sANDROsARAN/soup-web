"use client";
import React from "react";
import Visualizer from "../components/Visualizer";

export default function SongItem({
  name,
  url,
  isPlaying,
  onPlay,
  analyser,
}: {
  name: string;
  url: string;
  isPlaying: boolean;
  onPlay: (url: string, name: string) => void;
  analyser: AnalyserNode | null;
}) {
  return (
    <button
      onClick={() => onPlay(url, name)}
      className="relative flex items-center justify-between cursor-pointer 
      transition-all duration-300 hover:text-black"
    >
      {/* Visualizer as background */}
      <div className="absolute inset-0 z-0">
        <Visualizer analyser={analyser} isPlaying={isPlaying} />
      </div>

      <span className="inline">{name}</span>

      {/* 
      <button className="relative z-10 bg-white text-black px-3 py-1 rounded">
        {isPlaying ? "Pause" : "Play"}
      </button> */}
    </button>
  );
}
