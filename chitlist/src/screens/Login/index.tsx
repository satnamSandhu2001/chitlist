import React, { useCallback, useContext, useState } from 'react';
import Container from '../../components/Container';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import Paragraph from '../../components/Paragraph';
import Heading from '../../components/Heading';
import Form from './Form';
import {
  Link,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { SCREENS } from '../../constants/screens';
import { COLORS } from '../../constants/colors';
import { UserContext } from '../../context/UserContext';
import { AppNavigationProp } from '../../constants/types';

const Login = () => {
  const { isAuth, getMyData } = useContext(UserContext);
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<any>();
  const params = route.params;
  const [refreshing, setrefreshing] = useState(false);

  async function onRefresh() {
    setrefreshing(true);
    await getMyData();
    setrefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      if (isAuth) {
        navigation.replace('Account', {
          screen: params?.redirect ?? SCREENS.Profile,
        });
      }
    }, [isAuth, navigation, params]),
  );
  if (isAuth) {
    return null;
  }
  return (
    <Container>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: COLORS['primary-100'] }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="h-[25vh] overflow-hidden">
          <Image
            source={require('../../assets/images/login-bg.jpg')}
            className="w-full h-full object-cover bg-transparent shadow-xl shadow-black rounded-b-[170px] mx-auto"
          />
        </View>
        <Link
          to={'/Account/' + SCREENS.Profile}
          style={{ backgroundColor: 'skyblue', padding: 20 }}>
          Profile
        </Link>

        <View className="px-4 pt-8 pb-12">
          <Heading
            variant="h1"
            classes="text-white text-center mx-auto font-bold">
            Welcome Back
          </Heading>
          <Paragraph variant="p2" classes="text-white mx-auto mt-2">
            Login to your account
          </Paragraph>
        </View>

        <Form />
      </ScrollView>
    </Container>
  );
};

export default Login;
