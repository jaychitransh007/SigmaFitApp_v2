import { StyleSheet } from 'react-native';

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    paddingBottom: 24,
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 12,
    justifyContent: 'center',
  },
  buttonLabel: {
  },
  buttonContent: {
    paddingVertical: 8,
  },
  backButton: {
    flex: 0.4,
    borderRadius: 12,
  },
  nextButton: {
    flex: 1,
    borderRadius: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
  pickerWrapper: {
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
});
