import { StyleSheet } from 'react-native';
import { COLORS } from './constants/colors';

const headingCommonStyles = {
  color: COLORS['dark-100'],
  fontWeight: '500',
} as const;

const paragraphCommonStyles = {
  color: COLORS['dark-100'],
} as const;

export const globalStyles = StyleSheet.create({
  h1: {
    ...headingCommonStyles,
    fontSize: 48,
    lineHeight: 52,
  },
  h2: {
    ...headingCommonStyles,
    fontSize: 36,
    lineHeight: 40,
  },
  h3: {
    ...headingCommonStyles,
    fontSize: 30,
    lineHeight: 36,
  },
  h4: {
    ...headingCommonStyles,
    fontSize: 24,
    lineHeight: 32,
  },
  h5: {
    ...headingCommonStyles,
    fontSize: 20,
    lineHeight: 28,
  },
  p1: { ...paragraphCommonStyles, fontSize: 20, lineHeight: 28 },
  p2: { ...paragraphCommonStyles, fontSize: 18, lineHeight: 28 },
  p3: { ...paragraphCommonStyles, fontSize: 16, lineHeight: 24 },
  p4: { ...paragraphCommonStyles, fontSize: 14, lineHeight: 20 },
  container: { width: '90%', marginHorizontal: 'auto' },
  error: {
    color: COLORS['danger-100'],
    fontWeight: '500',
    fontSize: 13,
  },
  'border-rounded-lg': { borderRadius: 8 },
});
