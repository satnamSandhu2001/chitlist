import React from 'react';
import { View, TextInput, Text } from 'react-native';
import type { KeyboardTypeOptions, ViewStyle } from 'react-native';
import { styles } from './styles';
import { globalStyles } from '../../globalStyles';
import { COLORS } from '../../constants/colors';

type Props = {
  wrapperStyles?: ViewStyle | ViewStyle[];
  onChangeText: (t: string) => void;
  value: string;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string | undefined;
  [key: string]: any;
};

const Input = ({
  wrapperStyles,
  onChangeText,
  value,
  label,
  keyboardType,
  secureTextEntry,
  placeholder,
  error,
  ...props
}: Props) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label]}>{label}</Text>
      <View
        style={[
          styles.wrapper,
          globalStyles['border-rounded-lg'],
          wrapperStyles,
        ]}>
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor={COLORS['dark-300']}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ?? false}
        />
      </View>

      {error && <Text style={globalStyles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
