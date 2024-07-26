import React from 'react';
import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../constants/colors';

type Props = PropsWithChildren<{
  name: string;
  color?: string;
  size?: number;
}>;

const Icons = ({ name, color, size }: Props) => {
  return (
    <Icon name={name} color={color || COLORS['dark-100']} size={size || 25} />
  );
};

export default Icons;
