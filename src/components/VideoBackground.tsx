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
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
    </div>
  );
}