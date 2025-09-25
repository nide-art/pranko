import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/currency';
import TransactionIcon from '../TransactionIcon';

interface TransactionItemProps {
  transaction: {
    id: string;
    title: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    icon: string;
    color: string;
  };
  index: number;
  currency: string;
  onPress?: () => void;
  showIcon?: boolean;
  compact?: boolean;
}

export default function TransactionItem({ 
  transaction, 
  index, 
  currency, 
  onPress, 
  showIcon = true,
  compact = false 
}: TransactionItemProps) {
  const { theme } = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify()}
    >
      <TouchableOpacity 
        style={[
          compact ? styles.compactItem : styles.transactionItem, 
          { backgroundColor: theme.colors.surface }
        ]}
        onPress={onPress}
      >
        {showIcon && (
          <View style={styles.iconContainer}>
            {typeof transaction.icon === 'string' && transaction.icon.length === 1 ? (
              <Text style={styles.transactionEmoji}>{transaction.icon}</Text>
            ) : (<TransactionIcon
                icon={transaction.icon}
                color={transaction.color}
              />
            )}
          </View>
        )}
        
        <View style={styles.transactionDetails}>
          <Text style={[styles.transactionTitle, { color: theme.colors.text }]}>
            {transaction.title}
          </Text>
          <Text style={[styles.transactionDescription, { color: theme.colors.textSecondary }]}>
            {transaction.description}
          </Text>
        </View>
        
        <View style={styles.transactionAmount}>
          <Text style={[
            styles.amountText,
            { color: transaction.amount > 0 ? theme.colors.success : theme.colors.text }
          ]}>
            {formatCurrency(transaction.amount, currency)}
          </Text>
          <Text style={[styles.transactionDate, { color: theme.colors.textSecondary }]}>
            {transaction.date}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  compactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionDescription: {
    fontSize: 13,
    opacity: 0.7,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 11,
    marginTop: 2,
  },
});