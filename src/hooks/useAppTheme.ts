import { useTheme } from 'react-native-paper';
import { AppTheme } from '../theme';

export const useAppTheme = () => {
  const theme = useTheme<AppTheme>();
  return theme;
};

// Re-export the theme type for convenience
export type { AppTheme } from '../theme';
