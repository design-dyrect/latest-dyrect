const fallbackApiVersion = '2026-06-03';
const configuredApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const isValidApiVersion =
  configuredApiVersion === '1' || /^\d{4}-\d{2}-\d{2}$/.test(configuredApiVersion || '');

export const apiVersion = isValidApiVersion ? configuredApiVersion : fallbackApiVersion;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2clvfbpa';

export const hasSanityConfig = Boolean(projectId && dataset);
