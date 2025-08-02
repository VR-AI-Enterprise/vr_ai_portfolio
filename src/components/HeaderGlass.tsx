"use client";

import { useEffect, useState } from "react";

export default function HeaderGlass() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Floating glass elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 dark:bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-40 h-40 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center">
          <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Glass card container */}
            <div className="relative inline-block">
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-3xl p-12 shadow-2xl">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Vr-Ai
                  </span>
                </h1>
                
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"></div>
                
                <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  Créons ensemble l&apos;avenir numérique
                </p>
              </div>
            </div>
          </div>

          {/* Floating tech badges */}
          <div className={`mt-12 transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full px-6 py-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                🥽 Réalité Virtuelle
              </div>
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full px-6 py-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                🤖 Intelligence Artificielle
              </div>
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full px-6 py-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                ✨ Innovation
              </div>
            </div>
          </div>

          {/* Subtle call to action */}
          <div className={`mt-16 transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <span className="text-sm">Explorez nos réalisations</span>
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}