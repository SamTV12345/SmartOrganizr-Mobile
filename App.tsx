import React from 'react';
import {Center, NativeBaseProvider, extendTheme} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {Main} from './main';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {StatusBar, StatusBarStyle, View} from 'react-native';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({config});
type MyThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

const CustomStatusBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <StatusBar
      barStyle="light-content"
      hidden={false}
      backgroundColor="transparent"
      translucent={true}
    />
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <CustomStatusBar />
        <NativeBaseProvider>
          <Main />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
