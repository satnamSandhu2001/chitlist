import React, { useContext, useState } from 'react';
import Container from '../../../components/Container';
import { Alert, ImageBackground, Text, View } from 'react-native';
import Input from '../../../components/input';
import { globalStyles } from '../../../globalStyles';
import { UserContext } from '../../../context/UserContext';
import Button from '../../../components/Button';
import { styles } from './styles';
import Heading from '../../../components/Heading';
import { COLORS } from '../../../constants/colors';
import Paragraph from '../../../components/Paragraph';
import UpdatePasswordModal from './UpdatePasswordModal/UpdatePasswordModal';
import api from '../../../utils/api';
import { updateDetailsSchema } from '../../../utils/zod/userSchema';
import { ZodIssue } from 'zod';

type PersonalData = {
  name: string;
  email: string;
};

export const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const [personalData, sepersonalData] = useState<PersonalData>({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState<ZodIssue[] | null>(null);
  const [isUpdatePassModalVisible, setisUpdatePassModalVisible] =
    useState(false);

  const handleInputChange = (field: keyof PersonalData) => (value: string) => {
    sepersonalData(prev => ({ ...prev, [field]: value }));
  };

  async function handleUpdateData() {
    try {
      setloading(true);
      seterrors(null);
      const validate = updateDetailsSchema.safeParse(personalData);
      if (!validate.success) {
        seterrors(validate.error.issues);
        return;
      }
      const { data } = await api.post('/api/v1/user/update', personalData);
      Alert.alert(data.message);
      if (data.logout) {
        logout();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  // filter validation error
  const getFieldError = (fieldName: keyof PersonalData) =>
    errors?.find(err => err.path?.[0] === fieldName)?.message;

  return (
    <Container>
      <View style={[styles.imageContainer]}>
        <ImageBackground
          style={styles.background}
          source={{
            uri: 'https://img.freepik.com/free-photo/view-gym-room-training-sports_23-2151699546.jpg',
          }}
        />
        <View style={styles.avatarCont}>
          <Text style={styles.avatar}>
            {user?.name
              ?.split(' ')
              .slice(0, 2)
              .map(word => word.charAt(0).toUpperCase())
              .join('')}
          </Text>
        </View>
      </View>

      <Heading
        variant="h4"
        style={[
          {
            marginBottom: 6,
            textAlign: 'center',
            textTransform: 'capitalize',
          },
        ]}>
        {user?.name}
      </Heading>
      <Paragraph
        variant="p3"
        style={[
          {
            color: COLORS['dark-200'],
            marginBottom: 6,
            textAlign: 'center',
          },
        ]}>
        Personal Information
      </Paragraph>

      {/* FORM */}
      <View style={[globalStyles.container, styles.form]}>
        <Input
          label="Email"
          keyboardType="email-address"
          value={personalData.email}
          onChangeText={handleInputChange('email')}
          error={getFieldError('email')}
        />
        <Input
          label="Full Name"
          value={personalData.name}
          onChangeText={handleInputChange('name')}
          error={getFieldError('name')}
        />
        <Button
          onPress={handleUpdateData}
          title="Save"
          loading={loading}
          buttonStyles={{
            marginTop: 16,
          }}
        />

        {/* UPDATE PASSWORD */}
        <View>
          <Button
            variant="secondary"
            onPress={() => {
              setisUpdatePassModalVisible(true);
            }}
            title="Change Password"
            buttonStyles={{
              marginTop: 16,
            }}
          />
          <UpdatePasswordModal
            modalVisibility={setisUpdatePassModalVisible}
            visible={isUpdatePassModalVisible}
          />
        </View>
      </View>
    </Container>
  );
};
