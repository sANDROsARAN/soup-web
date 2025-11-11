// app/page.tsx
"use client";
import React, { useState } from "react";
import SongItem from "@/components/SongItem";

export default function Page() {
  const [songs, setSongs] = React.useState<{ name: string; url: string }[]>([]);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [currentSongName, setCurrentSongName] = React.useState<string | null>(
    null
  );
  const [analyser, setAnalyser] = React.useState<AnalyserNode | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  React.useEffect(() => {
    async function load() {
      const res = await fetch("/api/getsongs"); // change to your API route
      const data = await res.json();
      setSongs(data);
    }
    load();
  }, []);

  //comment
  async function handlePlay(url: string, name: string) {
    // if clicking the same song while playing → pause
    if (currentSongName === name) {
      audio?.pause();
      setCurrentSongName(null);
      return;
    }

    // stop old audio
    audio?.pause();

    // create new audio
    const a = new Audio(url);
    a.crossOrigin = "anonymous";

    const ctx = new AudioContext();
    const src = ctx.createMediaElementSource(a);
    const an = ctx.createAnalyser();
    an.fftSize = 128;
    src.connect(an);
    an.connect(ctx.destination);

    setAnalyser(an);
    setAudio(a);
    setCurrentSongName(name);

    a.play();
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      <div className="max-w-xl">
        <div className="bg-[#FF0000] w-screen overflow-hidden p-4">
          <h1 className="text-7xl font-bold whitespace-nowrap animate-marquee">
            WELCOME TO THE SOUP WEB &nbsp; WELCOME TO THE SOUP WEB &nbsp;
            WELCOME TO THE SOUP WEB &nbsp; WELCOME TO THE SOUP WEB
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-6 grid-rows-6 w-full h-full p-10 gap-10 divide-x divide-y divide-[#0000FF]">
        {songs.map((s) => {
          const isExpanded = expanded === s.name;

          const handleClick = () => {
            // expand/collapse
            setExpanded(isExpanded ? null : s.name);
            // play song
            handlePlay(s.url, s.name);
          };

          return (
            <div
              key={s.name}
              onClick={handleClick}
              className={`hover:bg-[#FFFF00] transition-all duration-300 ${isExpanded ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                }`}
            >
              <SongItem
                name={s.name}
                url={s.url}
                isPlaying={currentSongName === s.name}
                analyser={analyser}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
