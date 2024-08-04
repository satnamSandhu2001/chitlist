import { Text, TextStyle } from 'react-native';
import React from 'react';
import { STYLES } from '../constants/styles';

type Props = {
  children: React.ReactNode;
  classes?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  style?: TextStyle | TextStyle[];
};

const Heading = ({ children, classes = '', variant = 'h2', style }: Props) => {
  return (
    <Text className={`${STYLES[variant]} ${classes}`} style={style}>
      {children}
    </Text>
  );
};

export default Heading;
