import React from 'react';

interface SocialButtonProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
}

export function SocialButton({ icon, label, href }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full"
    >
      {/* Aura lumineuse colorée qui apparaît au survol */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-red-500/50 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-lg" />
      
      {/* Contenu du bouton */}
      <div className="relative px-6 py-4 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-black/50 group-hover:border-cyan-400/50">
        <div className="flex items-center justify-center gap-3">
          {icon && (
            <span className="text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              {icon}
            </span>
          )}
          <span className="text-white/90 transition-colors duration-300 group-hover:text-white">
            {label}
          </span>
        </div>
      </div>
    </a>
  );
}
