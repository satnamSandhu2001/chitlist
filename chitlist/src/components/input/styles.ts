import { StyleSheet } from 'react-native';
import { globalStyles } from '../../globalStyles';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS['light-100'],
    marginBottom: 4,
  },
  label: {
    ...globalStyles.p3,
    color: COLORS['dark-200'],
    fontWeight: '500',
    marginBottom: 2,
  },
  input: {
    flex: 1,
    padding: 14,
    ...globalStyles['border-rounded-lg'],
    ...globalStyles.p3,
  },
});
