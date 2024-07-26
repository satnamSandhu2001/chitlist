import React from 'react';
import { SafeAreaView } from 'react-native';

type Props = {
  children?: React.ReactNode;
  classes?: string;
};

const Container = ({ children, classes = '' }: Props) => {
  return (
    <SafeAreaView className={`flex-1 bg-white ${classes}`}>
      {children}
    </SafeAreaView>
  );
};

export default Container;
