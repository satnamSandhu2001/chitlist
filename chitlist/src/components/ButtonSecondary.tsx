import type { GestureResponderEvent } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { STYLES } from '../constants/styles';
import { COLORS } from '../constants/colors';

type Props = PropsWithChildren<{
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  loading?: boolean;
}>;

const ButtonSecondary = ({ children, onPress, title, loading }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading ? true : false}
      className="bg-white rounded-lg py-4 px-8 flex flex-row items-center justify-center">
      {loading && (
        <ActivityIndicator
          className="-ml-4 mr-4"
          color={COLORS['primary-100']}
        />
      )}
      {title && (
        <Text
          className={`text-center font-medium ${STYLES.p2}`}
          style={{ color: COLORS['primary-100'] }}>
          {title}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

export default ButtonSecondary;
