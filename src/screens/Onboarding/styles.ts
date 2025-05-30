import { StyleSheet } from 'react-native';

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-start', // Changed from center to flex-start for left alignment
    paddingTop: 32, // Consistent top padding after progress bar
    paddingBottom: 48, // Increased spacing before input area
    width: '100%',
  },
  title: {
    textAlign: 'left', // Changed from center to left
    marginBottom: 8, // Reduced spacing between title and subtitle
  },
  subtitle: {
    textAlign: 'left', // Changed from center to left
    paddingHorizontal: 0, // Removed horizontal padding for consistent alignment
  },
  inputContainer: {
    flex: 1, // Takes remaining space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    paddingBottom: 20, // Add some bottom padding
  },
  footer: {
    paddingBottom: 24,
    paddingTop: 16, // Add consistent top padding
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    height: 56, // Fixed height for all buttons
  },
  buttonLabel: {
  },
  buttonContent: {
    paddingVertical: 16, // Consistent vertical padding
    height: 56, // Ensure content height matches button height
  },
  backButton: {
    flex: 0.35, // Slightly smaller for back button
    borderRadius: 12,
  },
  nextButton: {
    flex: 0.65, // Larger for primary action button
    borderRadius: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
  pickerWrapper: {
    alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pickerBackground: {
    backgroundColor: '#F8F8F8',
    borderRadius: 40,
    paddingHorizontal: 10,
    height: 200,
    justifyContent: 'center',
  },
  pickerLabel: {
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  pickerText: {
  },
  pickerSelectedText: {
  },
  pickerValueContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  pickerValueText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
    opacity: 0.05,
  },
  // Additional utility styles for consistent spacing
  inputWrapper: {
    width: '100%',
    maxWidth: 400, // Max width for better appearance on tablets
    alignSelf: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});