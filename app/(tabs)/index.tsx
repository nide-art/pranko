import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Animated as RNAnimated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Plus, CreditCard, PiggyBank, TrendingUp, Bell } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePrank } from '../../contexts/PrankContext';
import GlassCard from '../../components/GlassCard';
import MoneySentAnimation from '../../components/MoneySentAnimation';
import MoneyReceivedAnimation from '../../components/MoneyReceivedAnimation';
import PrankRevealScreen from '../../components/PrankRevealScreen';
import PrankModal from '../../components/PrankModal';
import SendMoneyModal from '../../components/SendMoneyModal';
import TransactionIcon from '../../components/TransactionIcon';
import SwipeableTransaction from '../../components/SwipeableTransaction';
import AppHeader from '../../components/shared/AppHeader';
import QuickAction from '../../components/shared/QuickAction';
import { formatCurrency } from '../../utils/currency';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const { 
    settings, 
    updateSettings,
    showPrankReveal, 
    setShowPrankReveal, 
    transactions, 
    addTransaction,
    deleteTransaction,
    updateMonthlyIncome,
    sendMode,
    setSendMode 
  } = usePrank();
  const [showAnimation, setShowAnimation] = React.useState(false);
  const [animationType, setAnimationType] = React.useState<'sent' | 'received'>('received');
  const [secretTaps, setSecretTaps] = React.useState(0);
  const [lastTapTime, setLastTapTime] = React.useState(0);
  const [longPressTimer, setLongPressTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [showPrankModal, setShowPrankModal] = React.useState(false);
  const [showSendModal, setShowSendModal] = React.useState(false);
  const [animationData, setAnimationData] = React.useState<{
    amount: number;
    currency: string;
    receiver: string;
  } | null>(null);

  const playRequestSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/a-pay.mp3')
      );
      await sound.playAsync();
      
      // Unload sound after playing
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const handleSendMoney = () => {
    const amount = Math.floor(Math.random() * 1000) + 100;
    const phoneNumber = '+1 (555) 123-4567';
    
    setAnimationData({
      amount,
      currency: settings.currency,
      receiver: phoneNumber,
      type: 'Request Money'
    });
    
    setAnimationType('sent');
    setShowAnimation(true);
    
    // Add transaction to history
    const newTransaction = {
      id: Date.now().toString(),
      type: 'sent' as const,
      amount,
      currency: settings.currency,
      description: translations.requestMoney,
      recipient: `${translations.from} ${settings.receiverName}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'transfer'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleSendToPhone = (phoneNumber: string, amount: number) => {
    setAnimationData({
      amount,
      currency: settings.currency,
      receiver: phoneNumber,
      type: translations.sentMoney
    });
    
    setAnimationType('sent');
    setShowAnimation(true);
    
    // Add transaction to history
    const newTransaction = {
      id: Date.now().toString(),
      type: 'sent' as const,
      amount,
      currency: settings.currency,
      description: translations.sentMoney,
      recipient: `${translations.to} ${phoneNumber}`,
      date: translations.today,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'transfer'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setShowSendModal(false);
  };

  const handleSecretTap = () => {
    const now = Date.now();
    
    if (now - lastTapTime < 500) {
      const newCount = secretTaps + 1;
      setSecretTaps(newCount);
      
      if (newCount >= 3) {
        setShowPrankReveal(true);
        setSecretTaps(0);
      }
    } else {
      setSecretTaps(1);
    }
    
    setLastTapTime(now);
  };

  const handleLongPressStart = () => {
    const timer = setTimeout(() => {
      setShowPrankReveal(true);
    }, 2000);
    
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const renderTransaction = (transaction: any, index: number) => (
    <SwipeableTransaction
      key={transaction.id}
      transaction={transaction}
      index={index}
      onDelete={() => deleteTransaction(transaction.id)}
      canDelete={transaction.date === 'Today'}
    />
  );

  if (showPrankReveal) {
    return <PrankRevealScreen onClose={() => setShowPrankReveal(false)} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Fixed Header */}
      <AppHeader 
        title={translations.overview}
        showMenu={true}
        onMenuPress={() => {}}
      />

      {/* Secret spots for prank reveal */}
      <TouchableOpacity 
        style={styles.secretSpot}
        onPressIn={handleLongPressStart}
        onPressOut={handleLongPressEnd}
      />
      
      <TouchableOpacity 
        style={styles.secretTapSpot}
        onPress={handleSecretTap}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Section */}
        <LinearGradient
          colors={theme.colors.gradient}
          style={styles.balanceSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.subtitle, { color: theme.colors.surface }]}>
            {translations.overview}
          </Text>

          {/* Balance Card */}
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <GlassCard style={styles.balanceCard}>
              <Text style={[styles.balanceLabel, { color: theme.colors.textSecondary }]}>
              {translations.totalBalance}
            </Text>
              <Text style={[styles.balanceAmount, { color: theme.colors.surface }]}>
                {formatCurrency(settings.profileBalance, settings.currency)}
              </Text>
              
              <View style={styles.balanceStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statAmount, { color: theme.colors.surface }]}>
                    {formatCurrency(settings.profileMonthlyIncome, settings.currency)}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    {translations.todaySpent}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statAmount, { color: theme.colors.surface }]}>
                    -{formatCurrency(settings.profileTodaySpent, settings.currency)}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.surface }]}>
                    {translations.todaySpent}
                  </Text>
                </View>
              </View>
            </GlassCard>
          </Animated.View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <QuickAction
              icon={<Plus size={24} color={theme.colors.success} />}
              label={translations.request}
              onPress={handleSendMoney}
              index={0}
            />
            
            <QuickAction
              icon={<Send size={24} color={theme.colors.primary} />}
              label={translations.send}
              onPress={() => setShowSendModal(true)}
              index={1}
            />
            
            <QuickAction
              icon={<PiggyBank size={24} color={theme.colors.primary} />}
              label={translations.loan}
              onPress={() => {}}
              index={2}
            />
            
            <QuickAction
              icon={<CreditCard size={24} color={theme.colors.primary} />}
              label={translations.topup}
              onPress={() => {}}
              index={3}
            />
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {translations.recentTransactions}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
                  {translations.seeAll}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.transactionsList}>
              <Text style={[styles.transactionGroup, { color: theme.colors.textSecondary }]}>
                {translations.today}
              </Text>
              {transactions.filter(t => t.date === 'Today' || t.date === 'Aug 26').map(renderTransaction)}
              
              <Text style={[styles.transactionGroup, { color: theme.colors.textSecondary }]}>
                {translations.yesterday}
              </Text>
              {transactions.filter(t => t.date === 'Aug 25').map(renderTransaction)}
            </View>
          </View>
        </View>
      </ScrollView>
      
      {showAnimation && (
        <>
          {animationType === 'sent' && (
            <MoneySentAnimation 
              amount={animationData?.amount || 0}
              currency={animationData?.currency || settings.currency}
              receiver={animationData?.receiver || ''}
              onClose={() => {
                setShowAnimation(false);
                setAnimationData(null);
              }}
            />
          )}
          {animationType === 'received' && (
            <MoneyReceivedAnimation 
              amount={animationData?.amount || 0}
              currency={animationData?.currency || settings.currency}
              receiver={animationData?.receiver || ''}
              onClose={() => {
                setShowAnimation(false);
                setAnimationData(null);
              }}
            />
          )}
        </>
      )}
      
      <PrankModal 
        visible={showPrankModal}
        onClose={() => setShowPrankModal(false)}
      />
      
      <SendMoneyModal
        visible={showSendModal}
        onClose={() => setShowSendModal(false)}
        onSend={handleSendToPhone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceSection: {
    marginTop: 88,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLines: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 20,
  },
  balanceCard: {
    marginTop: 10,
  },
  balanceLabel: {
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 8,
  },
  transactionGroup: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secretSpot: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  secretTapSpot: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
});