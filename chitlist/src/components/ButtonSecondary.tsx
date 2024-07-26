import type { GestureResponderEvent } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { STYLES } from '../constants/styles';
import { COLORS } from '../constants/colors';

type Props = PropsWithChildren<{
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}>;

const ButtonSecondary = ({ children, onPress, title }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-lg py-4 px-8">
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
