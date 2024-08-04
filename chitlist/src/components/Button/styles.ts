import { StyleSheet } from 'react-native';
import { globalStyles } from '../../globalStyles';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    ...globalStyles['border-rounded-lg'],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: COLORS['primary-100'],
  },
});
