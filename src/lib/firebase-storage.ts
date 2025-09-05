import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Upload une image vers Firebase Storage
 */
export async function uploadImage(file: File, folder: string = 'projects'): Promise<UploadResult> {
  try {
    // Créer une référence unique pour le fichier
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);

    // Upload du fichier
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtenir l'URL de téléchargement
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      path: fileName
    };
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    throw new Error('Erreur lors de l\'upload de l\'image');
  }
}

/**
 * Supprime une image de Firebase Storage
 */
export async function deleteImage(imagePath: string): Promise<void> {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    throw new Error('Erreur lors de la suppression de l\'image');
  }
}

/**
 * Extrait le chemin Firebase depuis une URL Firebase Storage
 */
export function extractFirebasePath(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('firebasestorage.googleapis.com')) {
      // URL Firebase Storage: https://firebasestorage.googleapis.com/v0/b/bucket/o/path%2Ffile.jpg?alt=media
      const pathMatch = urlObj.pathname.match(/\/o\/(.+)$/);
      if (pathMatch) {
        return decodeURIComponent(pathMatch[1]);
      }
    }
    return null;
  } catch {
    return null;
  }
}