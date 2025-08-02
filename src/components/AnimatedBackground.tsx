"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Grille animée */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] animate-grid-move"></div>
      
      {/* Éléments flottants animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-blue-500/3 dark:bg-blue-400/5 rounded-full blur-3xl animate-float-1"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/3 dark:bg-purple-400/5 rounded-full blur-3xl animate-float-2"></div>
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-cyan-500/3 dark:bg-cyan-400/5 rounded-full blur-3xl animate-float-3"></div>
        
        {/* Éléments flottants supplémentaires pour couvrir plus d'espace */}
        <div className="absolute top-1/2 right-1/6 w-40 h-40 bg-pink-500/3 dark:bg-pink-400/5 rounded-full blur-3xl animate-float-1" style={{animationDelay: '5s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-52 h-52 bg-indigo-500/3 dark:bg-indigo-400/5 rounded-full blur-3xl animate-float-2" style={{animationDelay: '8s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-44 h-44 bg-teal-500/3 dark:bg-teal-400/5 rounded-full blur-3xl animate-float-3" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Particules animées étendues */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Région top */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full animate-particle-1"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/30 rounded-full animate-particle-2"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-pink-400/30 rounded-full animate-particle-4"></div>
        
        {/* Région middle */}
        <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-particle-3"></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-particle-5"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400/30 rounded-full animate-particle-1" style={{animationDelay: '6s'}}></div>
        
        {/* Région bottom */}
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-particle-3"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-particle-5"></div>
        <div className="absolute bottom-40 left-2/3 w-1 h-1 bg-yellow-400/30 rounded-full animate-particle-2" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Dégradé animé global plus subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10 animate-gradient-shift"></div>
      
      {/* Lignes de scan globales */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-scan-horizontal"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/15 to-transparent animate-scan-horizontal-reverse"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-scan-vertical"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-pink-400/15 to-transparent animate-scan-vertical" style={{animationDelay: '7s'}}></div>
        
        {/* Lignes de scan diagonales */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/10 to-transparent animate-scan-horizontal" style={{animationDelay: '15s'}}></div>
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/10 to-transparent animate-scan-horizontal-reverse" style={{animationDelay: '20s'}}></div>
      </div>

      {/* Bulles animées qui montent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bulles grandes */}
        <div className="absolute bottom-0 left-[10%] w-6 h-6 bg-blue-400/20 dark:bg-blue-300/15 rounded-full animate-bubble-rise-1"></div>
        <div className="absolute bottom-0 left-[25%] w-4 h-4 bg-purple-400/25 dark:bg-purple-300/20 rounded-full animate-bubble-rise-2"></div>
        <div className="absolute bottom-0 left-[40%] w-8 h-8 bg-cyan-400/15 dark:bg-cyan-300/10 rounded-full animate-bubble-rise-3"></div>
        <div className="absolute bottom-0 left-[55%] w-3 h-3 bg-pink-400/30 dark:bg-pink-300/25 rounded-full animate-bubble-rise-4"></div>
        <div className="absolute bottom-0 left-[70%] w-5 h-5 bg-indigo-400/20 dark:bg-indigo-300/15 rounded-full animate-bubble-rise-5"></div>
        <div className="absolute bottom-0 left-[85%] w-7 h-7 bg-teal-400/15 dark:bg-teal-300/10 rounded-full animate-bubble-rise-6"></div>
        
        {/* Bulles moyennes */}
        <div className="absolute bottom-0 left-[15%] w-3 h-3 bg-orange-400/25 dark:bg-orange-300/20 rounded-full animate-bubble-rise-7"></div>
        <div className="absolute bottom-0 left-[30%] w-4 h-4 bg-emerald-400/20 dark:bg-emerald-300/15 rounded-full animate-bubble-rise-8"></div>
        <div className="absolute bottom-0 left-[45%] w-2 h-2 bg-violet-400/35 dark:bg-violet-300/30 rounded-full animate-bubble-rise-9"></div>
        <div className="absolute bottom-0 left-[60%] w-5 h-5 bg-sky-400/20 dark:bg-sky-300/15 rounded-full animate-bubble-rise-10"></div>
        <div className="absolute bottom-0 left-[75%] w-3 h-3 bg-rose-400/25 dark:bg-rose-300/20 rounded-full animate-bubble-rise-11"></div>
        <div className="absolute bottom-0 left-[90%] w-4 h-4 bg-lime-400/20 dark:bg-lime-300/15 rounded-full animate-bubble-rise-12"></div>
        
        {/* Bulles petites */}
        <div className="absolute bottom-0 left-[5%] w-2 h-2 bg-blue-400/30 dark:bg-blue-300/25 rounded-full animate-bubble-rise-13"></div>
        <div className="absolute bottom-0 left-[20%] w-1.5 h-1.5 bg-purple-400/40 dark:bg-purple-300/35 rounded-full animate-bubble-rise-14"></div>
        <div className="absolute bottom-0 left-[35%] w-2.5 h-2.5 bg-cyan-400/25 dark:bg-cyan-300/20 rounded-full animate-bubble-rise-15"></div>
        <div className="absolute bottom-0 left-[50%] w-1 h-1 bg-pink-400/45 dark:bg-pink-300/40 rounded-full animate-bubble-rise-16"></div>
        <div className="absolute bottom-0 left-[65%] w-2 h-2 bg-indigo-400/30 dark:bg-indigo-300/25 rounded-full animate-bubble-rise-17"></div>
        <div className="absolute bottom-0 left-[80%] w-1.5 h-1.5 bg-teal-400/35 dark:bg-teal-300/30 rounded-full animate-bubble-rise-18"></div>
        <div className="absolute bottom-0 left-[95%] w-2.5 h-2.5 bg-amber-400/25 dark:bg-amber-300/20 rounded-full animate-bubble-rise-19"></div>
        
        {/* Bulles très petites pour effet de fond */}
        <div className="absolute bottom-0 left-[8%] w-1 h-1 bg-blue-400/35 dark:bg-blue-300/30 rounded-full animate-bubble-rise-20"></div>
        <div className="absolute bottom-0 left-[18%] w-0.5 h-0.5 bg-purple-400/50 dark:bg-purple-300/45 rounded-full animate-bubble-rise-21"></div>
        <div className="absolute bottom-0 left-[28%] w-1 h-1 bg-cyan-400/40 dark:bg-cyan-300/35 rounded-full animate-bubble-rise-22"></div>
        <div className="absolute bottom-0 left-[38%] w-0.5 h-0.5 bg-pink-400/55 dark:bg-pink-300/50 rounded-full animate-bubble-rise-23"></div>
        <div className="absolute bottom-0 left-[48%] w-1 h-1 bg-indigo-400/35 dark:bg-indigo-300/30 rounded-full animate-bubble-rise-24"></div>
        <div className="absolute bottom-0 left-[58%] w-0.5 h-0.5 bg-teal-400/50 dark:bg-teal-300/45 rounded-full animate-bubble-rise-25"></div>
        <div className="absolute bottom-0 left-[68%] w-1 h-1 bg-emerald-400/40 dark:bg-emerald-300/35 rounded-full animate-bubble-rise-26"></div>
        <div className="absolute bottom-0 left-[78%] w-0.5 h-0.5 bg-violet-400/55 dark:bg-violet-300/50 rounded-full animate-bubble-rise-27"></div>
        <div className="absolute bottom-0 left-[88%] w-1 h-1 bg-sky-400/35 dark:bg-sky-300/30 rounded-full animate-bubble-rise-28"></div>
        <div className="absolute bottom-0 left-[98%] w-0.5 h-0.5 bg-rose-400/50 dark:bg-rose-300/45 rounded-full animate-bubble-rise-29"></div>
      </div>

      {/* Overlay très subtil pour maintenir la lisibilité */}
      <div className="absolute inset-0 bg-background/5 dark:bg-background/10"></div>
    </div>
  );
}