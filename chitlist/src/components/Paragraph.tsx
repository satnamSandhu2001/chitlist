import { Text } from 'react-native';
import React from 'react';
import { STYLES } from '../constants/styles';

type Props = {
  children: React.ReactNode;
  classes?: string;
  variant?: 'p1' | 'p2' | 'p3' | 'p4';
};

const Paragraph = ({ children, classes = '', variant = 'p2' }: Props) => {
  return <Text className={`${STYLES[variant]} ${classes}`}>{children}</Text>;
};

export default Paragraph;
