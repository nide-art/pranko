import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePrank } from '../../contexts/PrankContext';
import AppHeader from '../../components/shared/AppHeader';
import SettingItem from '../../components/shared/SettingItem';
import { formatCurrency } from '../../utils/currency';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const { settings } = usePrank();

  // Mock user profile data
  const userProfile = {
    name: settings.profileName || 'Maria Smith',
    email: 'maria.smith@example.com',
    avatar: settings.receiverPhoto || 'https://via.placeholder.com/80',
    balance: settings.profileBalance || 15420
  };

  const profileStats = [
     {
       label: translations.totalBalance,
       value: formatCurrency(userProfile.balance, settings.currency),
       color: theme.colors.primary
     },
     {
       label: translations.monthlySpending,
       value: formatCurrency(2450, settings.currency),
       color: theme.colors.error
     },
     {
       label: translations.savings,
       value: formatCurrency(8750, settings.currency),
       color: theme.colors.success
     }
   ];

  const settingsGroups = [
    {
       title: translations.account,
       items: [
        {
           icon: User,
           title: translations.personalInformation,
           subtitle: translations.personalInformationSubtitle,
           onPress: () => console.log('Personal Info')
         },
         {
           icon: Shield,
           title: translations.security,
           subtitle: translations.securitySubtitle,
           onPress: () => console.log('Security')
         },
         {
           icon: Bell,
           title: translations.notifications,
           subtitle: translations.notificationsSubtitle,
           onPress: () => console.log('Notifications')
         }
      ]
    },
    {
       title: translations.preferences,
       items: [
        {
           icon: Settings,
           title: translations.appSettings,
           subtitle: translations.appSettingsSubtitle,
           onPress: () => console.log('App Settings')
         },
         {
           icon: HelpCircle,
           title: translations.helpSupport,
           subtitle: translations.helpSupportSubtitle,
           onPress: () => console.log('Help & Support')
         }
      ]
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title={translations.profile}
        rightComponent={
          <TouchableOpacity>
            <Settings size={24} color={theme.colors.text} />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header */}
          <Animated.View 
            entering={FadeInDown.delay(100).springify()}
            style={styles.profileHeader}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primary + '80']}
              style={styles.profileGradient}
            >
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: userProfile.avatar || 'https://via.placeholder.com/80' }}
                  style={styles.profileImage}
                />
              </View>
              <Text style={[styles.profileName, { color: '#FFFFFF' }]}>
                {userProfile.name}
              </Text>
              <Text style={[styles.profileEmail, { color: '#FFFFFF90' }]}>
                {userProfile.email}
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {profileStats.map((stat, index) => (
              <Animated.View
                key={stat.label}
                entering={FadeInDown.delay(200 + index * 100).springify()}
                style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
              >
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  {stat.label}
                </Text>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.value}
                </Text>
              </Animated.View>
            ))}
          </View>

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <Animated.View
              key={group.title}
              entering={FadeInDown.delay(500 + groupIndex * 100).springify()}
              style={styles.settingsGroup}
            >
              <Text style={[styles.groupTitle, { color: theme.colors.textSecondary }]}>
                {group.title}
              </Text>
              <View style={[styles.groupContainer, { backgroundColor: theme.colors.surface }]}>
                {group.items.map((item, itemIndex) => (
                  <SettingItem
                    key={item.title}
                    icon={<item.icon size={20} color={theme.colors.primary} />}
                    title={item.title}
                    subtitle={item.subtitle}
                    onPress={item.onPress}
                    index={itemIndex}
                  />
                ))}
              </View>
            </Animated.View>
          ))}

          {/* Logout Button */}
          <Animated.View 
            entering={FadeInDown.delay(800).springify()}
            style={styles.logoutContainer}
          >
            <TouchableOpacity 
              style={[styles.logoutButton, { backgroundColor: theme.colors.error + '10' }]}
              onPress={() => console.log('Logout')}
            >
              <LogOut size={20} color={theme.colors.error} />
              <Text style={[styles.logoutText, { color: theme.colors.error }]}>
                 {translations.logout}
               </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 108,
    paddingBottom: 20,
  },
  profileHeader: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  profileGradient: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});