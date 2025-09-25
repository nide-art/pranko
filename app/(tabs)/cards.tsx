import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Eye, EyeOff, Settings, Lock, Smartphone, Globe, Shield } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePrank } from '../../contexts/PrankContext';
import GlassCard from '../../components/GlassCard';
import AppHeader from '../../components/shared/AppHeader';
import SettingItem from '../../components/shared/SettingItem';
import FilterButton from '../../components/shared/FilterButton';
import { formatCurrency } from '../../utils/currency';

export default function CardsScreen() {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const { settings, updateSettings } = usePrank();
  const [showBalance, setShowBalance] = React.useState(true);
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  const [cardLocked, setCardLocked] = React.useState(false);
  const [contactlessEnabled, setContactlessEnabled] = React.useState(true);
  const [onlinePaymentsEnabled, setOnlinePaymentsEnabled] = React.useState(true);
  const [fraudProtectionEnabled, setFraudProtectionEnabled] = React.useState(true);

  const renderCard = (card: any, index: number) => (
    <Animated.View
      key={card.id}
      entering={FadeInDown.delay(index * 100).springify()}
    >
      <LinearGradient
        colors={card.gradient}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardType}>{card.type}</Text>
          <CreditCard size={24} color="white" />
        </View>
        
        <View style={styles.cardBalance}>
          <Text style={styles.balanceLabel}>{translations.balance}</Text>
          <Text style={styles.balanceAmount}>
            {showBalance ? formatCurrency(card.balance, settings.currency) : '••••••'}
          </Text>
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.cardNumber}>
            •••• •••• •••• {card.lastFour}
          </Text>
          <Text style={styles.cardExpiry}>{card.expiry}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const cards = [
    {
      id: 1,
      type: 'Visa Debit',
      balance: settings.profileBalance,
      lastFour: '4532',
      expiry: '12/26',
      gradient: ['#667eea', '#764ba2']
    },
    {
      id: 2,
      type: 'Mastercard Credit',
      balance: 2500,
      lastFour: '8901',
      expiry: '08/27',
      gradient: ['#f093fb', '#f5576c']
    }
  ];

  const filters = [
    { id: 'all', label: translations.all },
    { id: 'debit', label: translations.debit },
    { id: 'credit', label: translations.credit },
    { id: 'virtual', label: translations.virtual }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title={translations.cards}
        rightComponent={
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <Eye size={24} color={theme.colors.text} />
            ) : (
              <EyeOff size={24} color={theme.colors.text} />
            )}
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            {filters.map((filter, index) => (
              <FilterButton
                key={filter.id}
                label={filter.label}
                isSelected={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                index={index}
              />
            ))}
          </View>

          {/* Cards */}
          <View style={styles.cardsContainer}>
            {cards.map(renderCard)}
          </View>

          {/* Card Settings */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {translations.cardSettings}
            </Text>
            
            <View style={[styles.settingsContainer, { backgroundColor: theme.colors.surface }]}>
              <SettingItem
                icon={<Lock size={20} color={theme.colors.primary} />}
                title={translations.lockCard}
                subtitle={translations.lockCardSubtitle}
                switchValue={cardLocked}
                onSwitchChange={setCardLocked}
                index={0}
              />
              
              <SettingItem
                icon={<Smartphone size={20} color={theme.colors.primary} />}
                title={translations.contactlessPayments}
                subtitle={translations.contactlessPaymentsSubtitle}
                switchValue={contactlessEnabled}
                onSwitchChange={setContactlessEnabled}
                index={1}
              />
              
              <SettingItem
                icon={<Globe size={20} color={theme.colors.primary} />}
                title={translations.onlinePayments}
                subtitle={translations.onlinePaymentsSubtitle}
                switchValue={onlinePaymentsEnabled}
                onSwitchChange={setOnlinePaymentsEnabled}
                index={2}
              />
              
              <SettingItem
                icon={<Shield size={20} color={theme.colors.primary} />}
                title={translations.fraudProtection}
                subtitle={translations.fraudProtectionSubtitle}
                switchValue={fraudProtectionEnabled}
                onSwitchChange={setFraudProtectionEnabled}
                index={3}
              />
            </View>
          </View>
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
    padding: 20,
    paddingTop: 108,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 30,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    height: 200,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cardBalance: {
    marginTop: 20,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cardNumber: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '500',
  },
  cardExpiry: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});