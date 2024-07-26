import React from 'react';
import Navigator from './src/navigation/Navigator';
import { StatusBar } from 'react-native';

function App() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <Navigator />
    </>
  );
}

export default App;
