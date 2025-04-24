export const colors = {
  primary: '#121212',     // Dark background
  secondary: '#1E1E1E',   // Slightly lighter background
  surface: '#2C2C2C',     // Surface color for cards
  accent: '#BB86FC',      // Purple accent color
  text: {
    primary: '#FFFFFF',   // White text
    secondary: '#B3B3B3', // Light gray text
  },
  border: '#3D3D3D',      // Border color
  success: '#03DAC6',     // Teal for success states
  error: '#CF6679',       // Pink/Red for error states
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

type FontWeight = 
  | 'normal' 
  | 'bold' 
  | '100' 
  | '200' 
  | '300' 
  | '400' 
  | '500' 
  | '600' 
  | '700' 
  | '800' 
  | '900';

interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: FontWeight;
}

// Define base font families
const circularStdBook = 'CircularStd-Book'; // Assuming this corresponds to normal/400 weight
const circularStdLight = 'CircularStd-Light'; // Assuming this corresponds to 300 weight

export const typography: Record<string, TypographyStyle & { lineHeight?: number; letterSpacing?: number; textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'; }> = {
  // Updated heading style
  heading: {
    fontFamily: circularStdBook, // Using Book for headings, adjust if needed
    fontSize: 24,
    fontWeight: '500', // Circular Std doesn't have standard bold, using 500
    lineHeight: 24 * 1.4, // 140% line height
    letterSpacing: 24 * -0.015, // -1.5% letter spacing
  },
  // Updated subheading style
  subheading: {
    fontFamily: circularStdBook,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 18 * 1.4,
    letterSpacing: 18 * -0.015,
  },
  // Updated body style (using Light as requested)
  body: {
    fontFamily: circularStdLight, // Using Light for weight 300
    fontSize: 16, // Keeping 16 for general body, 20 seems large
    fontWeight: '300',
    lineHeight: 16 * 1.4,
    letterSpacing: 16 * -0.015,
  },
   // Style based on user request (20px, 300 weight)
  bodyLarge: {
    fontFamily: circularStdLight,
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 20 * 1.4,
    letterSpacing: 20 * -0.015,
  },
  // Style for search suggestions (lowercase)
  searchSuggestion: {
    fontFamily: circularStdLight,
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 20 * 1.4,
    letterSpacing: 20 * -0.015,
    textTransform: 'lowercase',
  },
  // Updated caption style
  caption: {
    fontFamily: circularStdLight,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * -0.015,
  },
  // Style for stats text (views/likes) - smaller, secondary color
  stats: {
    fontFamily: circularStdLight,
    fontSize: 12, // Smaller size for stats
    fontWeight: '300',
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * -0.015,
  }
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
};

const theme = {
  colors,
  spacing,
  typography,
  shadows,
};

export default theme;