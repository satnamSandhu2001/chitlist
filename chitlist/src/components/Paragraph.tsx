import { Text, TextStyle } from 'react-native';
import React from 'react';
import { STYLES } from '../constants/styles';

type Props = {
  children: React.ReactNode;
  classes?: string;
  variant?: 'p1' | 'p2' | 'p3' | 'p4';
  style?: TextStyle | TextStyle[];
};

const Paragraph = ({
  children,
  classes = '',
  variant = 'p2',
  style,
}: Props) => {
  return (
    <Text className={`${STYLES[variant]} ${classes}`} style={style}>
      {children}
    </Text>
  );
};

export default Paragraph;
