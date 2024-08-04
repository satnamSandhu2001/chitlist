import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../globalStyles';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  imageContainer: { position: 'relative' },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  avatarCont: {
    marginTop: 90,
    backgroundColor: COLORS['light-100'],
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#fff',
    height: 180,
    aspectRatio: 1 / 1,
    marginHorizontal: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    ...globalStyles.h2,
    color: COLORS['light-200'],
  },

  form: {
    marginTop: 30,
  },
});
