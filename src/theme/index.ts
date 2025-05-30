import { MD3LightTheme, configureFonts, MD3Theme } from 'react-native-paper';
import { colors, nutrientColors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, elevation } from './spacing';

// Extend the theme type
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      background: string;
      surface: string;
      accent: string;
      border: string;
      progressTrack: string;
      success: string;
      warning: string;
      error: string;
      info: string;
    }

    interface Theme {
      custom: {
        colors: typeof colors & { nutrients: typeof nutrientColors };
        typography: typeof typography;
        spacing: typeof spacing;
        borderRadius: typeof borderRadius;
        elevation: typeof elevation;
      };
    }
  }
}

// Configure fonts for react-native-paper
const fontConfig = {
  labelLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 16,
  },
  labelMedium: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 14,
  },
  labelSmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
  },
  bodyLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
  },
  headlineLarge: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 32,
  },
  headlineMedium: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 24,
  },
  headlineSmall: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 20,
  },
  titleLarge: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 18,
  },
  titleSmall: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 16,
  },
};

// Create the theme with proper typing
export type AppTheme = MD3Theme & {
  custom: {
    colors: typeof colors & { nutrients: typeof nutrientColors };
    typography: typeof typography;
    spacing: typeof spacing;
    borderRadius: typeof borderRadius;
    elevation: typeof elevation;
  };
};

const theme: AppTheme = {
  ...MD3LightTheme,
  
  // Override react-native-paper colors
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.secondary,
    secondary: colors.accent.orange,
    secondaryContainer: colors.accent.orangeLight,
    tertiary: colors.accent.blue,
    tertiaryContainer: colors.accent.green,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.secondary,
    error: colors.error,
    errorContainer: colors.accent.red,
    onPrimary: colors.surface,
    onPrimaryContainer: colors.text.primary,
    onSecondary: colors.surface,
    onSecondaryContainer: colors.text.primary,
    onTertiary: colors.surface,
    onTertiaryContainer: colors.text.primary,
    onBackground: colors.text.primary,
    onSurface: colors.text.primary,
    onSurfaceVariant: colors.text.secondary,
    onError: colors.surface,
    outline: colors.border,
    outlineVariant: colors.progressTrack,
    inverseSurface: colors.text.primary,
    inverseOnSurface: colors.surface,
    inversePrimary: colors.primary,
    elevation: {
      level0: 'transparent',
      level1: colors.surface,
      level2: colors.surface,
      level3: colors.surface,
      level4: colors.surface,
      level5: colors.surface,
    },
  },
  
  fonts: configureFonts({ config: fontConfig }),
  
  // Custom theme properties
  custom: {
    colors: {
      ...colors,
      nutrients: nutrientColors,
    },
    typography,
    spacing,
    borderRadius,
    elevation,
  } as const,
};

// Export the theme as default
export default theme;

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primary: string;
      background: string;
      surface: string;
      accent: string;
      error: string;
      text: string;
      onSurface: string;
      disabled: string;
      placeholder: string;
      backdrop: string;
      notification: string;
    }
    
    interface Theme {
      custom: typeof theme.custom;
    }
  }
}