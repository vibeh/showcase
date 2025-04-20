import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Vibe Kit';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Image generation
export default async function GET() {
  // Load the font data
  const ppmondwest = fetch(
    // Use absolute URL - works in development and production
    // Assuming the base URL where the app is hosted will serve files from /public
    // If deploying, ensure this URL is correct or use a different method to load font data
    new URL('/fonts/PPMondwest-Regular.otf', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
  ).then((res) => res.arrayBuffer());

  const fontData = await ppmondwest;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          fontFamily: '"PPMondwest"',
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          letterSpacing: '-0.05em',
        }}
      >
        Vibe Kit
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'PPMondwest',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
} 