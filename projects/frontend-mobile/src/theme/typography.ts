export const typography = {
  families: {
    ui: 'Montserrat', // System UI, sans-serif
    content: 'Montserrat', // Reading text
  },
  h1: {
    fontFamily: 'Montserrat',
    fontSize: 24, // Typically derived iteratively
    lineHeight: 32,
    fontWeight: '700' as const,
  },
  h2: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  sectionTitle: {
    fontFamily: 'Montserrat',
    fontSize: 9, // From 4.6 Section Headers in SKILLS
    letterSpacing: 2.5,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  input: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    fontWeight: '400' as const,
  },
  button: {
    fontFamily: 'Montserrat',
    fontSize: 11.5,
    fontWeight: '600' as const,
  },
  tag: {
    fontFamily: 'Montserrat',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
  },
} as const;
