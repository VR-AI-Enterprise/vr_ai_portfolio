export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-12 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Background avec glass morphism */}
      <div className="absolute inset-0 bg-background/50 dark:bg-background/30 backdrop-blur-lg border-t border-foreground/20 dark:border-foreground/10"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-1/4 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 right-1/3 w-24 h-24 bg-purple-500/5 dark:bg-purple-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Vr-Ai
              </span>
            </h3>
            <p className="text-base text-foreground/80 dark:text-foreground/90 max-w-md mx-auto leading-relaxed">
              Spécialisée dans le développement de solutions innovantes en réalité virtuelle et intelligence artificielle.
            </p>
          </div>
          
          {/* Links avec glass morphism */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <a 
              href="mailto:contact@vr-ai.com" 
              className="group flex items-center space-x-2 px-4 py-2 bg-background/40 dark:bg-background/20 backdrop-blur-sm border border-foreground/20 dark:border-foreground/10 rounded-full text-foreground/80 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/30 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">contact@vr-ai.com</span>
            </a>
            
            <a 
              href="tel:+33123456789" 
              className="group flex items-center space-x-2 px-4 py-2 bg-background/40 dark:bg-background/20 backdrop-blur-sm border border-foreground/20 dark:border-foreground/10 rounded-full text-foreground/80 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-400/30 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">+33 1 23 45 67 89</span>
            </a>
          </div>

          {/* Social links (optionnel) */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-8 h-8 bg-background/40 dark:bg-background/20 backdrop-blur-sm border border-foreground/20 dark:border-foreground/10 rounded-full flex items-center justify-center hover:border-blue-400/30 transition-all duration-300 cursor-pointer">
              <span className="text-xs text-foreground/60">🌐</span>
            </div>
            <div className="w-8 h-8 bg-background/40 dark:bg-background/20 backdrop-blur-sm border border-foreground/20 dark:border-foreground/10 rounded-full flex items-center justify-center hover:border-purple-400/30 transition-all duration-300 cursor-pointer">
              <span className="text-xs text-foreground/60">💼</span>
            </div>
            <div className="w-8 h-8 bg-background/40 dark:bg-background/20 backdrop-blur-sm border border-foreground/20 dark:border-foreground/10 rounded-full flex items-center justify-center hover:border-cyan-400/30 transition-all duration-300 cursor-pointer">
              <span className="text-xs text-foreground/60">🚀</span>
            </div>
          </div>
          
          {/* Copyright avec séparateur stylé */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 py-3 bg-background/60 dark:bg-background/40 backdrop-blur-sm text-xs text-foreground/70 dark:text-foreground/80 rounded-full border border-foreground/10 dark:border-foreground/5">
                © {currentYear} Vr-Ai. Tous droits réservés.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}