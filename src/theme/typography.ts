export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  
  // Font Weights (for react-native-paper)
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  
  // Font Sizes
  sizes: {
    // Headers
    headerLarge: 32,
    headerMedium: 20,
    
    // Body
    bodyLarge: 20,
    bodyMedium: 15,
    bodySmall: 13,
    
    // Special Elements
    caloriesValue: 38,
    caloriesUnit: 22,
    nutrientValue: 26,
    nutrientLabel: 15,
  },
  
  // Predefined Text Styles
  styles: {
    greeting: {
      fontSize: 32,
      fontFamily: 'Inter-Bold',
      fontWeight: '700' as const,
    },
    streak: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      fontWeight: '600' as const,
    },
    dateSelector: {
      date: {
        fontSize: 20,
        fontFamily: 'Inter-Regular',
        fontWeight: '400' as const,
      },
      day: {
        fontSize: 13,
        fontFamily: 'Inter-Regular',
        fontWeight: '400' as const,
      },
    },
    caloriesCard: {
      value: {
        fontSize: 38,
        fontFamily: 'Inter-Regular',
        fontWeight: '400' as const,
      },
      unit: {
        fontSize: 22,
        fontFamily: 'Inter-Regular',
        fontWeight: '400' as const,
      },
      label: {
        fontSize: 20,
        fontFamily: 'Inter-Regular',
        fontWeight: '400' as const,
      },
    },
    nutrientCard: {
      value: {
        fontSize: 26,
        fontFamily: 'Inter-Regular',
        fontWeight: '400' as const,
      },
      label: {
        fontSize: 15,
        fontFamily: 'Inter-Regular',
        fontWeight: '400' as const,
      },
    },
    emptyState: {
      header: {
        fontSize: 15,
        fontFamily: 'Inter-Medium',
        fontWeight: '500' as const,
      },
      subtext: {
        fontSize: 15,
        fontFamily: 'Inter-Medium',
        fontWeight: '500' as const,
      },
    },
  },
};