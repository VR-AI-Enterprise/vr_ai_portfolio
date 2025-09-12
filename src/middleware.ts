import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Headers de sécurité
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Protection CSRF pour les API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // Vérifier l'origine pour les requêtes POST/PUT/DELETE
    if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
      if (!origin || !host) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
  }

  // Rate limiting basique pour les API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    // const rateLimitKey = `rate_limit_${ip}`;
    
    // Ici vous pourriez implémenter un vrai rate limiting avec Redis
    // Pour l'instant, on se contente de laisser passer
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};