import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF385C 0%, #D90B38 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 24,
            }}
          >
            <span style={{ color: '#FF385C', fontSize: '80px', fontWeight: 'bold' }}>O</span>
          </div>
          <h1 style={{ fontSize: '100px', fontWeight: 'bold', margin: 0, letterSpacing: '-0.05em' }}>
            ORMA
          </h1>
        </div>
        <p style={{ fontSize: '42px', fontWeight: 500, opacity: 0.9, marginTop: 20 }}>
          Rent Anything, From Anyone, Anywhere
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
