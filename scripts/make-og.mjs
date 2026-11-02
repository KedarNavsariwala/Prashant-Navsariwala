import { readFile, writeFile } from 'node:fs/promises'
import satori from 'satori'
import sharp from 'sharp'

/**
 * Builds the 1200 × 630 social card and the small touch icon. Both use the
 * site's own faces, so the unfurl matches the page.
 */

const h = (type, style, children) => ({ type, props: { style, children } })

const [inter400, inter500, serif400, serif400i, portrait] = await Promise.all([
  readFile('node_modules/@fontsource/inter/files/inter-latin-400-normal.woff'),
  readFile('node_modules/@fontsource/inter/files/inter-latin-500-normal.woff'),
  readFile('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff'),
  readFile('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff'),
  readFile('Assets/Prashant-Navsariwala.png'),
])

const fonts = [
  { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
  { name: 'Inter', data: inter500, weight: 500, style: 'normal' },
  { name: 'Serif', data: serif400, weight: 400, style: 'normal' },
  { name: 'Serif', data: serif400i, weight: 400, style: 'italic' },
]

const portraitUri = `data:image/png;base64,${portrait.toString('base64')}`

const card = h(
  'div',
  {
    width: '1200px',
    height: '630px',
    display: 'flex',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontFamily: 'Inter',
    overflow: 'hidden',
  },
  [
    h(
      'div',
      {
        position: 'absolute',
        left: '0',
        top: '40px',
        fontSize: '330px',
        lineHeight: '0.7',
        fontFamily: 'Serif',
        fontStyle: 'italic',
        letterSpacing: '-12px',
        color: '#D9D9D9',
        whiteSpace: 'nowrap',
      },
      'Innovation',
    ),
    h(
      'div',
      {
        position: 'absolute',
        right: '-40px',
        bottom: '-6px',
        width: '560px',
        height: '620px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
      {
        type: 'img',
        props: {
          src: portraitUri,
          width: 560,
          height: 747,
          style: { objectFit: 'contain' },
          children: [],
        },
      },
    ),
    h(
      'div',
      {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        padding: '64px 72px',
      },
      [
        h(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '2.4px',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.6)',
          },
          'Vehicle design leader · Pune, India',
        ),
        h('div', { display: 'flex', flexDirection: 'column', gap: '26px', width: '700px' }, [
          h(
            'div',
            {
              fontFamily: 'Serif',
              fontSize: '94px',
              lineHeight: '0.94',
              letterSpacing: '-2.4px',
            },
            'Prashant Navsariwala',
          ),
          h('div', { display: 'flex', height: '1px', width: '620px', backgroundColor: 'rgba(0,0,0,0.3)' }, []),
          h(
            'div',
            {
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '24px',
              lineHeight: '1.35',
              color: 'rgba(0,0,0,0.7)',
              width: '560px',
            },
            [
              h('div', {}, 'Automotive Product Design and Development Professional'),
              h(
                'div',
                {
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.5)',
                  marginTop: '6px',
                },
                '30 years · 25 leading programmes · Tata Motors',
              ),
            ],
          ),
        ]),
      ],
    ),
  ],
)

const svg = await satori(card, { width: 1200, height: 630, fonts })
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png')

const icon = h(
  'div',
  {
    width: '180px',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  h(
    'div',
    {
      width: '160px',
      height: '160px',
      borderRadius: '999px',
      border: '2px solid #000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Serif',
      fontSize: '74px',
      letterSpacing: '-2px',
      paddingBottom: '6px',
    },
    'PN',
  ),
)

const iconSvg = await satori(icon, { width: 180, height: 180, fonts })
await sharp(Buffer.from(iconSvg)).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png')

await writeFile(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#fff"/><circle cx="32" cy="32" r="27" fill="none" stroke="#000" stroke-width="2"/><text x="32" y="41" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="24" fill="#000">PN</text></svg>`,
)

console.log('public/og.png, public/apple-touch-icon.png and public/favicon.svg written.')
