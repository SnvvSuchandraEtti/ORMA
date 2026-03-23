import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FF385C',
          color: 'white',
          fontSize: 120,
          fontWeight: 'bold',
          fontFamily: 'sans-serif'
        }}
      >
        O
      </div>
    ),
    { ...size }
  )
}
