import { NextResponse } from 'next/server';

// Endpoint pour purger le cache des projets
export async function POST() {
  try {
    // En production, vous pourriez utiliser un service de cache externe
    // Pour l'instant, on retourne juste un succès
    return NextResponse.json(
      { 
        message: 'Cache purgé avec succès',
        timestamp: new Date().toISOString()
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('Erreur lors de la purge du cache:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la purge du cache' },
      { status: 500 }
    );
  }
}