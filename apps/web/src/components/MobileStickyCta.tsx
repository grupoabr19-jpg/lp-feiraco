'use client';

import { useEffect, useState } from 'react';

export function MobileStickyCta() {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById('inscricao');
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`mobile-sticky${formVisible ? ' mobile-sticky-hidden' : ''}`}
      href="#inscricao"
      aria-hidden={formVisible}
      tabIndex={formVisible ? -1 : undefined}
    >
      Credenciamento gratuito
    </a>
  );
}
