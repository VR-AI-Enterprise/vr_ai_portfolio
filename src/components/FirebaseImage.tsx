"use client";
import Image from 'next/image';
import { useState } from 'react';

interface FirebaseImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
}

export default function FirebaseImage({ 
  src, 
  alt, 
  width = 400, 
  height = 320, 
  className = "",
  fallback = "/images/1.jpg"
}: FirebaseImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  // Si c'est une image Firebase, on utilise un img normal
  if (src.includes('firebasestorage.googleapis.com')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        // width={width}
        // height={height}
        className={className}
        onError={handleError}
        loading="lazy"
      />
    );
  }

  // Sinon on utilise Next.js Image
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}