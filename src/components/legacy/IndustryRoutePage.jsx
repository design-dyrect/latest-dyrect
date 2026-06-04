'use client';
import IndustryPage from './IndustryTemplateLegacyPage';
import INDUSTRY_CONFIGS from './IndustryConfigs';

export default function IndustryRoutePage({ industryKey }) {
  const config = INDUSTRY_CONFIGS[industryKey];
  if (!config) return null;
  return <IndustryPage config={config} />;
}
