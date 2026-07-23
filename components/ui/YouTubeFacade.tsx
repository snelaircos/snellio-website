'use client'

import { useState } from 'react'
import Image from 'next/image'

// Facade pattern voor YouTube-embed: toont thumbnail met play-button tot
// gebruiker klikt, pas daarna wordt de iframe geladen. Voordelen:
// - Homepage/demo-page LCP blijft snel (YouTube iframe is ~500KB JS+CSS
//   die anders bij elke visit geladen wordt).
// - youtube-nocookie.com: geen tracking-cookies tot expliciete klik,
//   GDPR-vriendelijk.
// - autoplay=1 na klik zodat de bezoeker meteen ziet dat er iets gebeurt.
interface Props {
  videoId:   string
  thumbnail: string
  title:     string
  className?: string
}

export default function YouTubeFacade({ videoId, thumbnail, title, className = '' }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(15,33,51,.18)] ring-1 ring-[#e4ecf2] ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Speel af: ${title}`}
      className={`group relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(15,33,51,.18)] ring-1 ring-[#e4ecf2] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        priority={false}
      />
      {/* Subtiel dark overlay zodat de play-button altijd goed contrasteert */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" aria-hidden="true" />
      {/* Play-button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(15,33,51,.12)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {/* Driehoek naar rechts, cyan */}
          <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 ml-1 fill-[var(--accent)]" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
