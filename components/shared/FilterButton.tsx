import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

export default function FilterButton({ 
  label, 
  isSelected, 
  onPress, 
  index 
}: FilterButtonProps) {
  const { theme } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(index * 100)}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: isSelected 
              ? theme.colors.primary 
              : theme.colors.surface,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.filterText,
            {
              color: isSelected 
                ? theme.colors.surface 
                : theme.colors.text,
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
});