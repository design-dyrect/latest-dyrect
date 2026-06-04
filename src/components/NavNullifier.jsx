'use client';
import {useEffect} from 'react';

/**
 * Overrides window.SiteNav and window.SiteFooter to return null.
 * Used on pages where the legacy component reads nav/footer from window,
 * so we can replace them with the proper SiteHeader/SiteFooter components.
 */
export default function NavNullifier() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.SiteNav = () => null;
      window.SiteFooter = () => null;
    }
  }, []);
  return null;
}
