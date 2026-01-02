import React from "react";

export default function VideoPlayer({ url }: { url: string }) {
  return (
    <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-zinc-900 my-12">
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
