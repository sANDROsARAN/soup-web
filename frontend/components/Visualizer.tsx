"use client";
import React, { useEffect, useRef } from "react";

interface Props {
    analyser: AnalyserNode | null;
    isPlaying: boolean;
}

function getLogBins(data: Uint8Array, bands = 64) {
  const out = [];
  const maxIdx = data.length - 1;
  for (let i = 0; i < bands; i++) {
    const f = i / (bands - 1);
    const idx = Math.floor(Math.pow(f, 2) * maxIdx);
    out.push(data[idx]);
  }
  return out;
}

export default function Visualizer({ analyser, isPlaying }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!analyser) return;
        if (!isPlaying) return;

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const draw = () => {
            if (!isPlaying) return; // stop when paused
            requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let bins = getLogBins(dataArray); // pick 32 or 64 or 48 etc
            //bins = bins.map((v, i) => v * (1 + i / bins.length));


            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = canvas.width / bins.length;
            let x = 0;

            for (let i = 0; i < bins.length; i++) {
                const barHeight = bins[i] / 10; // adjust visual scale

                ctx.fillStyle = "#16a34a";
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth;
            }
        };

        draw();
    }, [analyser, isPlaying]);

    return <canvas ref={canvasRef} className="w-full h-8" />
        ;
}
