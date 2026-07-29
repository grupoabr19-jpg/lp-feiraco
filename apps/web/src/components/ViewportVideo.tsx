'use client';

import { useEffect, useRef } from 'react';

export function ViewportVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src="/media/feiraco-1080x1350.mp4"
      controls
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Vídeo de apresentação do FeirAço Grupo ABR"
    >
      Seu navegador não oferece suporte à reprodução deste vídeo
    </video>
  );
}
