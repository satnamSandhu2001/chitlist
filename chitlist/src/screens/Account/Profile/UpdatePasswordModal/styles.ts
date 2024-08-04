import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { globalStyles } from '../../../../globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10382972',
  },
  modal: {
    position: 'relative',
    width: '90%',
    marginHorizontal: 'auto',
    ...globalStyles['border-rounded-lg'],
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20, // Android shadow
  },
  closeButton: {
    backgroundColor: COLORS['light-100'],
    ...globalStyles['border-rounded-lg'],
    padding: 8,
    display: 'flex',
    aspectRatio: 1 / 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginTop: 30,
  },
});
