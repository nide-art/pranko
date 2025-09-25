import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  index: number;
  backgroundColor?: string;
}

export default function QuickAction({ 
  icon, 
  label, 
  onPress, 
  index,
  backgroundColor 
}: QuickActionProps) {
  const { theme } = useTheme();

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200).springify()}
    >
      <TouchableOpacity 
        style={[
          styles.quickAction, 
          { backgroundColor: backgroundColor || theme.colors.surface }
        ]}
        onPress={onPress}
      >
        <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
          {icon}
        </View>
        <Text style={[styles.actionLabel, { color: theme.colors.text }]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  quickAction: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    width: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});