"use client";

import { useEffect, useState } from "react";

export default function HeaderMinimal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative w-full py-20 sm:py-32 bg-white dark:bg-slate-950">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className={`transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-thin tracking-wider mb-8">
              <span className="text-slate-900 dark:text-white">Vr</span>
              <span className="mx-2 text-blue-500">•</span>
              <span className="text-slate-900 dark:text-white">Ai</span>
            </h1>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
              Innovation • Créativité • Excellence
            </p>
            
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
              Réalité Virtuelle et Intelligence Artificielle
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}