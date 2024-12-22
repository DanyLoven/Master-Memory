/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  ImageBackground,
  StyleSheet,
} from 'react-native';
import RootLayout from './navigation';
import { TwinsGameCardsProvider } from './context/TwinsGameCardsContext';
import { ConstImageTwinGame } from './utils/ConstantsTwinGame';

const App = () => {
  /*const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/

  return (
    <TwinsGameCardsProvider>
      <ImageBackground  style={styles.container} source={ConstImageTwinGame.bgImage} >
      <RootLayout/>
    </ImageBackground>
    </TwinsGameCardsProvider>
    
  );
};

const styles = StyleSheet.create({
  
  container:{
    flex:1,
  },
});

export default App;
