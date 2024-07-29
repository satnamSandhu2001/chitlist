import React from 'react';
import Navigator from './src/navigation/Navigator';
import { StatusBar } from 'react-native';
import ContextProvider from './src/context';

function App() {
  return (
    <>
      <ContextProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <Navigator />
      </ContextProvider>
    </>
  );
}

export default App;
