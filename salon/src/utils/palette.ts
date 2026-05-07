export const P = {
  // Backgrounds
  bg:        '#1C0F1A',
  section:   '#2E1628',
  cardBg:    'rgba(46,22,40,0.65)',
  cardBgSolid: '#241020',

  // Brand colors
  primary:   '#8B4865',
  primaryDark: '#6B3050',
  gold:      '#D4A96A',
  goldDark:  '#B8894E',
  blush:     '#E8C9B8',

  // Text — warm ivory tones that match the gold bg
  text:        '#F5ECD7',          // headings, primary text
  textSub:     'rgba(245,236,215,0.75)', // subtitles, body
  textMuted:   'rgba(245,236,215,0.5)',  // secondary labels
  textFaint:   'rgba(245,236,215,0.3)',  // copyright, hints

  // Borders — gold-tinted
  border:    'rgba(212,169,106,0.15)',
  borderMid: 'rgba(212,169,106,0.28)',
  borderHot: 'rgba(212,169,106,0.5)',

  // Glows
  glow:      'rgba(139,72,101,0.22)',
  glowGold:  'rgba(212,169,106,0.15)',

  // Gradients
  gradBrand:  'linear-gradient(135deg,#8B4865,#6B3050)',
  gradGold:   'linear-gradient(120deg,#E8C9B8 0%,#D4A96A 45%,#8B4865 85%)',
  gradText:   'linear-gradient(120deg,#F5ECD7 0%,#D4A96A 50%,#E8C9B8 100%)',

  textGold:       '#D4A96A',                    // primary gold — headings, titles
  textGoldMuted:  'rgba(212,169,106,0.65)',      // secondary gold — subtitles, body
  textGoldFaint:  'rgba(212,169,106,0.35)',  
} as const;

export const DIVIDER: React.CSSProperties = {
  height: '1px',
  background: P.border,
  margin: '0 5%',
};