import { ImageResponse } from 'next/og'

// Sitewide standaard Open Graph-afbeelding (1200×630), gegenereerd bij de
// build via de App Router file-conventie. Elke pagina zonder eigen og-image
// krijgt deze — dus elke share op WhatsApp/LinkedIn/X toont een nette kaart.
// Kleuren = licht thema (wit/grijsblauw/blauw, zelfde palet als de app).

export const runtime = 'nodejs'
export const alt = 'Snellio, software voor koeltechniek en airco-installateurs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #ffffff 0%, #f4f7fa 55%, #e8f1f7 100%)',
          padding: '72px 84px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Merk */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #0abbd6, #0090b8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', color: '#0f2133', fontSize: 44, fontWeight: 800 }}>
            Snellio
          </div>
        </div>

        {/* Kern-boodschap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              color: '#0f2133',
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1px',
              maxWidth: 980,
            }}
          >
            Eén plek voor je werkbonnen, planning en F-gassen
          </div>
          <div style={{ display: 'flex', color: '#44607a', fontSize: 30, lineHeight: 1.4 }}>
            Software voor koeltechniek- en airco-installateurs
          </div>
        </div>

        {/* Onderbalk */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', color: '#0090b8', fontSize: 28, fontWeight: 700 }}>
            snellio.nl
          </div>
          <div style={{ display: 'flex', color: '#5f7791', fontSize: 24 }}>
            BRL100 · F-gassen 2024/573 · Werkbon · Planning
          </div>
        </div>

        {/* Cyan accentlijn onderaan */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 10,
            background: 'linear-gradient(90deg, #0abbd6, #0090b8)',
            display: 'flex',
          }}
        />
      </div>
    ),
    size,
  )
}
