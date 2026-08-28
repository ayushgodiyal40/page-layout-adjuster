import { SourcePhoto } from '../types';

/**
 * Creates high quality SVG-based photographic canvas data URLs
 * for instant testing and out-of-the-box shop owner workflow preview.
 */
function createSamplePhoto(
  id: string,
  name: string,
  width: number,
  height: number,
  bgColor: string,
  accentColor: string,
  title: string,
  subtitle: string,
  type: 'portrait' | 'landscape' | 'id'
): SourcePhoto {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgColor}" />
          <stop offset="100%" stop-color="${accentColor}" />
        </linearGradient>
        <radialGradient id="glow-${id}" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.3"/>
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg-${id})" />
      <rect width="${width}" height="${height}" fill="url(#glow-${id})" />
      
      <!-- Subtle Decorative Frame -->
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#ffffff" stroke-width="3" stroke-opacity="0.3" rx="8" />
      
      ${
        type === 'id' || type === 'portrait'
          ? `
        <!-- Headshot Silhouette -->
        <circle cx="${width / 2}" cy="${height * 0.38}" r="${Math.min(width, height) * 0.22}" fill="#ffffff" fill-opacity="0.9" />
        <path d="M ${width * 0.2} ${height * 0.88} C ${width * 0.2} ${height * 0.62}, ${width * 0.8} ${height * 0.62}, ${width * 0.8} ${height * 0.88} Z" fill="#ffffff" fill-opacity="0.9" />
      `
          : `
        <!-- Landscape Mountain / Sun Iconography -->
        <circle cx="${width * 0.7}" cy="${height * 0.32}" r="${height * 0.14}" fill="#fde047" fill-opacity="0.85" />
        <polygon points="${width * 0.1},${height * 0.85} ${width * 0.45},${height * 0.4} ${width * 0.8},${height * 0.85}" fill="#ffffff" fill-opacity="0.75" />
        <polygon points="${width * 0.35},${height * 0.85} ${width * 0.65},${height * 0.5} ${width * 0.95},${height * 0.85}" fill="#ffffff" fill-opacity="0.5" />
      `
      }

      <text x="${width / 2}" y="${height * 0.82}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.max(16, width * 0.045)}" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="1">
        ${title}
      </text>
      <text x="${width / 2}" y="${height * 0.87}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.max(12, width * 0.03)}" fill="#f1f5f9" text-anchor="middle" opacity="0.9">
        ${subtitle}
      </text>
    </svg>
  `;

  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return {
    id,
    name,
    dataUrl,
    originalWidth: width,
    originalHeight: height,
    aspectRatio: width / height,
    baseRotation: 0,
    fileSize: Math.round(width * height * 0.1),
    fileType: 'image/svg+xml',
  };
}

export const INITIAL_SAMPLE_PHOTOS: SourcePhoto[] = [
  createSamplePhoto(
    'sample-1',
    'Passport_Headshot_01.jpg',
    600,
    800,
    '#1e3a8a',
    '#3b82f6',
    'RAMESH SHARMA',
    'Passport ID Photo (35x45mm)',
    'id'
  ),
  createSamplePhoto(
    'sample-2',
    'Passport_Headshot_02.jpg',
    600,
    800,
    '#065f46',
    '#10b981',
    'PRIYA VERMA',
    'Visa Application Photo',
    'id'
  ),
  createSamplePhoto(
    'sample-3',
    'Family_Portrait_Outdoor.jpg',
    1200,
    800,
    '#831843',
    '#ec4899',
    'FAMILY VACATION',
    'Standard 4x6 / 5x7 Print',
    'landscape'
  ),
  createSamplePhoto(
    'sample-4',
    'Mountain_Landscape_View.jpg',
    1200,
    800,
    '#78350f',
    '#f59e0b',
    'HIMALAYAN SUNSET',
    'Godiyal Photo Lab HD Print',
    'landscape'
  ),
  createSamplePhoto(
    'sample-5',
    'Student_ID_Headshot.jpg',
    600,
    800,
    '#312e81',
    '#6366f1',
    'AMIT RAWAT',
    'College Admit Card Photo',
    'id'
  ),
  createSamplePhoto(
    'sample-6',
    'Wedding_Couple_Portrait.jpg',
    800,
    1000,
    '#4c1d95',
    '#8b5cf6',
    'ANITA & VIKAS',
    'Studio Portrait Print',
    'portrait'
  ),
];
