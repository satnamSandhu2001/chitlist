import { View, TextInput } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';
import React, { useState } from 'react';
import { STYLES } from '../constants/styles';
import LinearGradient from 'react-native-linear-gradient';
import Icons from './Icons';
import { COLORS } from '../constants/colors';

type Props = {
  inputClasses?: string;
  icon: string;
  onChangeText: (t: string) => void;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  [key: string]: any;
};

const InputWithIcon = ({
  inputClasses,
  icon,
  onChangeText,
  value,
  keyboardType,
  placeholder,
  ...props
}: Props) => {
  const [isFocused, setisFocused] = useState<boolean>(false);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#ffffff99', '#ffffff33']}
      className="rounded-lg">
      <View
        className={`rounded-lg flex flex-row items-center border ${
          isFocused ? `border-[${COLORS['primary-100']}]` : 'border-white'
        }`}
        style={{ borderColor: isFocused ? COLORS['primary-200'] : '#fff' }}>
        <View className="px-4">
          <Icons name={icon} color={COLORS['primary-200']} />
        </View>
        <TextInput
          {...props}
          onBlur={() => setisFocused(false)}
          onFocus={() => setisFocused(true)}
          className={`flex-1 rounded-lg p-4 pl-2 ${STYLES.p2} ${inputClasses}`}
          style={{ color: '#fff' }}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor={'#fff'}
          placeholder={placeholder}
        />
      </View>
    </LinearGradient>
  );
};

export default InputWithIcon;
