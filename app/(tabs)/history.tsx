import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Search, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePrank } from '../../contexts/PrankContext';
import AppHeader from '../../components/shared/AppHeader';
import TransactionItem from '../../components/shared/TransactionItem';
import FilterButton from '../../components/shared/FilterButton';
import { formatCurrency } from '../../utils/currency';

export default function HistoryScreen() {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const { transactions, settings } = usePrank();
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  const [selectedPeriod, setSelectedPeriod] = React.useState('month');

  const filterOptions = [
    { id: 'all', label: translations.all },
    { id: 'income', label: translations.income },
    { id: 'expense', label: translations.expense },
    { id: 'transfer', label: translations.transfer }
  ];

  const periods = [
    { id: 'week', label: translations.week },
    { id: 'month', label: translations.month },
    { id: 'year', label: translations.year }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'income') return transaction.amount > 0;
    if (selectedFilter === 'expense') return transaction.amount < 0;
    if (selectedFilter === 'transfer') return transaction.category === 'transfer';
    return true;
  });

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const groupTransactionsByDate = (transactions: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });
    return grouped;
  };

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title={translations.history}
        rightComponent={
          <TouchableOpacity>
            <Search size={24} color={theme.colors.text} />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <Animated.View 
              entering={FadeInDown.delay(100).springify()}
              style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}
            >
              <View style={[styles.summaryIcon, { backgroundColor: theme.colors.success + '20' }]}>
                <TrendingUp size={20} color={theme.colors.success} />
              </View>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                {translations.totalIncome}
              </Text>
              <Text style={[styles.summaryAmount, { color: theme.colors.success }]}>
                +{formatCurrency(totalIncome, settings.currency)}
              </Text>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(200).springify()}
              style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}
            >
              <View style={[styles.summaryIcon, { backgroundColor: theme.colors.error + '20' }]}>
                <TrendingDown size={20} color={theme.colors.error} />
              </View>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                {translations.totalExpense}
              </Text>
              <Text style={[styles.summaryAmount, { color: theme.colors.error }]}>
                -{formatCurrency(totalExpense, settings.currency)}
              </Text>
            </Animated.View>
          </View>

          {/* Period Filter */}
          <View style={styles.periodContainer}>
            {periods.map((period, index) => (
              <FilterButton
                key={period.id}
                label={period.label}
                isSelected={selectedPeriod === period.id}
                onPress={() => setSelectedPeriod(period.id)}
                index={index}
              />
            ))}
          </View>

          {/* Transaction Filter */}
          <View style={styles.filterContainer}>
          {filterOptions.map((filter, index) => (
            <FilterButton
              key={filter.id}
              label={filter.label}
              isSelected={selectedFilter === filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              index={index}
            />
          ))}
        </View>

          {/* Transactions List */}
          <View style={styles.transactionsContainer}>
            {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
              <View key={date} style={styles.dateGroup}>
                <Text style={[styles.dateHeader, { color: theme.colors.textSecondary }]}>
                  {date}
                </Text>
                {dateTransactions.map((transaction, index) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                    currency={settings.currency}
                  />
                ))}
              </View>
            ))}
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
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  periodContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  transactionsContainer: {
    gap: 16,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});