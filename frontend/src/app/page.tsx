// app/page.tsx
"use client";
import React from "react";
import SongItem from "@/components/SongItem";

export default function Page() {
  const [songs, setSongs] = React.useState<{ name: string; url: string }[]>([]);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [currentSongName, setCurrentSongName] = React.useState<string | null>(null);
  const [analyser, setAnalyser] = React.useState<AnalyserNode | null>(null);

  React.useEffect(() => {
    async function load() {
      const res = await fetch("/api/getsongs"); // change to your API route
      const data = await res.json();
      setSongs(data);
    }
    load();
  }, []);

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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl mb-4 font-bold">Soup Songs</h1>

      {songs.map((s) => (
        <SongItem
          key={s.name}
          name={s.name}
          url={s.url}
          isPlaying={currentSongName === s.name}
          onPlay={handlePlay}
          analyser={analyser}
        />
      ))}
    </div>
  );
}
