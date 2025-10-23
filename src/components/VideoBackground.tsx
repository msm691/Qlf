import React, { useState } from 'react';

interface VideoBackgroundProps {
  videoUrl?: string;
}

export function VideoBackground({ videoUrl }: VideoBackgroundProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
      
      {/* Video layer (only if URL provided and no error) */}
      {videoUrl && !hasError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={handleError}
          onLoadedData={handleLoadedData}
          className="absolute inset-0 w-full h-full object-cover opacity-60 md:opacity-40 blur-[1px] md:blur-[2px]"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay gradient - plus léger sur mobile pour mieux voir la vidéo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 md:from-black/60 md:via-black/40 md:to-black/80" />
    </div>
  );
}
