import type { GestureResponderEvent, ViewStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { STYLES } from '../../constants/styles';
import { COLORS } from '../../constants/colors';
import { styles } from './styles';

type Props = PropsWithChildren<{
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  buttonStyles?: ViewStyle | ViewStyle[];
}>;

const Button = ({
  children,
  onPress,
  title,
  loading,
  variant = 'primary',
  buttonStyles,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading ? true : false}
      style={[
        styles.button,
        {
          backgroundColor:
            variant === 'primary' ? COLORS['primary-100'] : '#fff',
        },
        buttonStyles,
      ]}>
      {loading && (
        <ActivityIndicator
          color={variant === 'primary' ? '#fff' : COLORS['primary-100']}
        />
      )}
      {title && (
        <Text
          className={`text-center font-medium ${STYLES.p2}`}
          style={{
            color: variant !== 'primary' ? COLORS['primary-100'] : '#fff',
          }}>
          {title}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

export default Button;
