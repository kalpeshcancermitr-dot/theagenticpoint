import type { MetadataRoute } from 'next';

const BASE_URL = 'https://agenticpoint.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/about',
    '/services',
    '/solutions',
    '/playground',
    '/portfolio',
    '/resources',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const solutionSlugs = [
    'healthcare',
    'real-estate',
    'ecommerce',
    'recruitment',
    'professional-services',
    'finance',
    'hospitality',
    'education',
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/' ? ('daily' as const) : ('weekly' as const),
      priority: route === '/' ? 1 : 0.8,
    })),
    ...solutionSlugs.map((slug) => ({
      url: `${BASE_URL}/solutions/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
