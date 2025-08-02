"use client";

import { useEffect, useState } from "react";

export default function HeaderCyberpunk() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative w-full overflow-hidden bg-black">
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjeWFuIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

      {/* Animated scanning lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Cyberpunk style borders */}
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-lg"></div>
              <div className="relative bg-black/80 border border-cyan-400/30 rounded-lg p-8">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-wider">
                  <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    [VR
                  </span>
                  <span className="text-white mx-2">-</span>
                  <span className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    AI]
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="font-mono text-lg sm:text-xl text-green-400 mb-4">
              &gt; INITIALIZING_VIRTUAL_REALITY_SYSTEMS...
            </div>
            <div className="font-mono text-lg sm:text-xl text-cyan-400 mb-4">
              &gt; LOADING_AI_NEURAL_NETWORKS...
            </div>
            <div className="font-mono text-lg sm:text-xl text-purple-400 mb-8">
              &gt; SYSTEM_READY_FOR_INNOVATION
            </div>
          </div>

          {/* Tech status indicators */}
          <div className={`transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex justify-center space-x-6 text-sm font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span className="text-green-400">VR_ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse animation-delay-1000 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                <span className="text-cyan-400">AI_ACTIVE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-2000 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                <span className="text-purple-400">SYSTEMS_GO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glitch effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-cyan-400 opacity-0 animate-pulse"></div>
        <div className="absolute top-2/3 left-0 right-0 h-px bg-purple-400 opacity-0 animate-pulse animation-delay-1000"></div>
      </div>
    </header>
  );
}