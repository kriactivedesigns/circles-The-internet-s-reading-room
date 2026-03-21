export interface Colors {
  primary: {
    base: string;
    opacity20: string;
    opacity10: string;
  };
  background: {
    base: string;
    surface: string;
    glass: string;
  };
  border: {
    glass: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  status: {
    success: string;
    warn: string;
    error: string;
  };
}

export const darkColors: Colors = {
  primary: {
    base: '#5C94E9',
    opacity20: 'rgba(92, 148, 233, 0.20)',
    opacity10: 'rgba(92, 148, 233, 0.10)',
  },
  background: {
    base: '#05070A',
    surface: '#121212',
    glass: 'rgba(26, 29, 36, 0.6)',
  },
  border: {
    glass: 'rgba(255, 255, 255, 0.10)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.75)',
    muted: 'rgba(255, 255, 255, 0.45)',
  },
  status: {
    success: '#10B981',
    warn: '#F59E0B',
    error: '#EF4444',
  },
};

export const lightColors: Colors = {
  primary: {
    base: '#5C94E9',
    opacity20: 'rgba(92, 148, 233, 0.20)',
    opacity10: 'rgba(92, 148, 233, 0.10)',
  },
  background: {
    base: '#F2F4F7',
    surface: '#FAFAFA',
    glass: 'rgba(255, 255, 255, 0.7)',
  },
  border: {
    glass: 'rgba(255, 255, 255, 0.60)',
  },
  text: {
    primary: '#05070A', // Inverted mapping for dark text against light surfaces
    secondary: 'rgba(5, 7, 10, 0.75)',
    muted: 'rgba(5, 7, 10, 0.45)',
  },
  status: {
    success: '#10B981',
    warn: '#F59E0B',
    error: '#EF4444',
  },
};
