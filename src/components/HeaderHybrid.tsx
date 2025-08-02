"use client";

import { useEffect, useState } from "react";

export default function HeaderHybrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative w-full overflow-hidden">
      {/* Overlay subtil pour le header */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-transparent backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            {/* Titre principal avec effet glass léger */}
            <div className="relative inline-block mb-8">
              {/* Halo subtil derrière le titre */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl scale-110"></div>
              
              <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl px-12 py-8 shadow-lg">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-thin tracking-wider">
                  <span className="text-slate-900 dark:text-white">Vr</span>
                  <span className="mx-3 text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">•</span>
                  <span className="text-slate-900 dark:text-white">Ai</span>
                </h1>
                
                {/* Ligne de séparation avec gradient */}
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-500 via-purple-500 to-transparent mx-auto mt-6"></div>
              </div>
            </div>
          </div>

          {/* Sous-titre avec animation décalée */}
          <div className={`transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-4xl mx-auto mb-4">
              Innovation • Créativité • Excellence
            </p>
            
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Réalité Virtuelle et Intelligence Artificielle
            </p>
          </div>

          {/* Badges tech avec glass morphism léger */}
          <div className={`mt-12 transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <span className="mr-2">🥽</span>VR Development
              </div>
              <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <span className="mr-2">🤖</span>AI Solutions
              </div>
              <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <span className="mr-2">✨</span>Innovation
              </div>
            </div>
          </div>

          {/* Call to action minimaliste */}
          <div className={`mt-16 transition-all duration-1000 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 text-slate-500 dark:text-slate-400 group cursor-pointer">
              <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Explorez nos réalisations</span>
              <svg className="w-4 h-4 animate-bounce group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}