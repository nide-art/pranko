import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 108,
  },
  
  // Card styles
  card: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  // Button styles
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  // Text styles
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
  
  // Layout styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Spacing styles
  marginSmall: {
    margin: 8,
  },
  marginMedium: {
    margin: 16,
  },
  marginLarge: {
    margin: 24,
  },
  paddingSmall: {
    padding: 8,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 24,
  },
  
  // Border radius styles
  borderRadiusSmall: {
    borderRadius: 8,
  },
  borderRadiusMedium: {
    borderRadius: 12,
  },
  borderRadiusLarge: {
    borderRadius: 16,
  },
  borderRadiusRound: {
    borderRadius: 50,
  },
  
  // Shadow styles
  shadowLight: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  shadowMedium: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shadowHeavy: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  
  // Icon container styles
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // List item styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  
  // Input styles
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  
  // Divider styles
  divider: {
    height: 1,
    opacity: 0.1,
  },
  

});

// Common dimension constants
export const dimensions = {
  headerHeight: 88,
  tabBarHeight: 80,
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    round: 50,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  iconSizes: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32,
  },
};

// Animation delays (for consistent timing)
export const animationDelays = {
  short: 100,
  medium: 200,
  long: 300,
};

// Common color opacity values
export const opacities = {
  light: '10',
  medium: '20',
  heavy: '40',
  transparent: '80',
};