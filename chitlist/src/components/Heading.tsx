import { Text } from 'react-native';
import React from 'react';
import { STYLES } from '../constants/styles';

type Props = {
  children: React.ReactNode;
  classes?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
};

const Heading = ({ children, classes = '', variant = 'h2' }: Props) => {
  return <Text className={`${STYLES[variant]} ${classes}`}>{children}</Text>;
};

export default Heading;
