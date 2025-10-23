import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from './ui/slider';

interface AudioPlayerProps {
  audioUrl?: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ audioUrl, autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(20); // Volume par défaut à 20%
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (autoPlay && audioRef.current && audioUrl && !hasError) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Autoplay was prevented or error occurred
            console.log('Audio autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay, audioUrl, hasError]);

  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl || hasError) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Audio play error:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  // Don't render if no audio URL provided
  if (!audioUrl) return null;

  return (
    <>
      <audio ref={audioRef} loop onError={handleError}>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
      
      <div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Bouton principal */}
        <button
          onClick={togglePlay}
          disabled={hasError}
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-black/60 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-cyan-400 transition-colors group-hover:text-cyan-300" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-300" />
          )}
        </button>

        {/* Slider de volume qui apparait au survol (desktop uniquement) */}
        <div 
          className={`hidden md:flex items-center gap-2 transition-all duration-300 ${
            showVolumeSlider 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-4 pointer-events-none'
          }`}
        >
          <div className="w-32 px-4 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
          <span className="text-white/60 text-sm min-w-[3ch]">{volume}%</span>
        </div>
      </div>
    </>
  );
}