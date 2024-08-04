import { Modal, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Icons from '../../../../components/Icons';
import Heading from '../../../../components/Heading';
import Input from '../../../../components/input';
import Button from '../../../../components/Button';

type Props = {
  modalVisibility: (value: boolean) => void;
  visible: boolean;
};
type TFormData = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const UpdatePasswordModal = (props: Props) => {
  const [formData, setformData] = useState<TFormData>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleInputChange = (field: keyof TFormData) => (value: string) => {
    setformData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      animationType="fade"
      onRequestClose={() => {
        props.modalVisibility(false);
      }}>
      <View style={styles.container}>
        <View style={styles.modal}>
          {/* header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                props.modalVisibility(false);
              }}>
              <Icons name="arrow-back" size={22} />
            </TouchableOpacity>
            <Heading
              variant="h4"
              style={{
                flex: 1,
                textAlign: 'center',
              }}>
              Update Password
            </Heading>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            {/* TODO := error handling */}
            <Input
              label="Old Password"
              value={formData.oldPassword}
              onChangeText={handleInputChange('oldPassword')}
              secureTextEntry
              placeholder="Enter your old password"
            />
            <Input
              label="New Password"
              value={formData.newPassword}
              onChangeText={handleInputChange('newPassword')}
              secureTextEntry
              placeholder="Enter new password"
            />
            <Input
              label="Confirm New Password"
              value={formData.confirmNewPassword}
              onChangeText={handleInputChange('confirmNewPassword')}
              secureTextEntry
              placeholder="Confirm new password"
            />
            <Button
              onPress={() => {}}
              title="Update Password"
              buttonStyles={{
                marginVertical: 16,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdatePasswordModal;
