import { ImageResponse } from 'next/og'

// Favicon (32×32) via de App Router file-conventie — Next voegt automatisch
// de juiste <link rel="icon"> toe. Huisstijl: navy-vlak met cyan "S".

export const runtime = 'nodejs'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0abbd6, #0090b8)',
          borderRadius: 7,
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        S
      </div>
    ),
    size,
  )
}
