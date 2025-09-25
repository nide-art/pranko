import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  index?: number;
  showChevron?: boolean;
}

export default function SettingItem({ 
  icon, 
  title, 
  subtitle,
  onPress, 
  rightComponent,
  switchValue,
  onSwitchChange,
  index = 0,
  showChevron = true
}: SettingItemProps) {
  const { theme } = useTheme();

  const renderRightComponent = () => {
    if (rightComponent) {
      return rightComponent;
    }
    
    if (switchValue !== undefined && onSwitchChange) {
      return (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          thumbColor={theme.colors.surface}
        />
      );
    }
    
    if (showChevron) {
      return <ChevronRight size={20} color={theme.colors.textSecondary} />;
    }
    
    return null;
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
    >
      <TouchableOpacity
        style={[styles.settingItem, { backgroundColor: theme.colors.surface }]}
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={styles.settingLeft}>
          <View style={[styles.settingIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            {icon}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {renderRightComponent()}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});