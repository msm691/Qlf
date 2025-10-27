import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileCardProps {
  avatarUrl?: string;
  username?: string;
  tag?: string;
  description?: string;
  badges?: string[]; // URLs des icônes à afficher
}

export function ProfileCard({ 
  avatarUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=vvm', 
  username = 'vvm',
  tag = '#381PPS',
  description = 'joined 11 months ago',
  badges = []
}: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-red-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
          <ImageWithFallback 
            src={avatarUrl}
            alt={username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-white text-3xl tracking-wide">{username}</h1>
        
        {/* Affichage des badges sous le pseudo */}
        {badges.length > 0 && (
          <div className="flex items-center gap-2 mt-1">
            {badges.map((badgeUrl, index) => (
              <div 
                key={index}
                className="w-6 h-6 transition-transform duration-300 hover:scale-110"
              >
                <ImageWithFallback
                  src={badgeUrl}
                  alt={`Badge ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="text-cyan-400 text-lg tracking-wider">{tag}</div>
      
      <div className="text-white/50 text-sm">{description}</div>
    </div>
  );
}