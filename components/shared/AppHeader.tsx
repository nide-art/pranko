import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  centerLayout?: boolean;
}

export default function AppHeader({ 
  title, 
  subtitle, 
  leftComponent, 
  rightComponent, 
  centerLayout = true 
}: AppHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
      {centerLayout ? (
        <View style={styles.centerLayout}>
          {leftComponent && <View style={styles.leftComponent}>{leftComponent}</View>}
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
          {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
        </View>
      ) : (
        <View style={styles.flexLayout}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
          {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    height: 88,
    justifyContent: 'flex-end',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
  },
  centerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  flexLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftComponent: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightComponent: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});