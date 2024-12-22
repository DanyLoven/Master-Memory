import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { ConstImageTwinGame } from '../../utils/ConstantsTwinGame';
import { soundCardMovement, soundStartGame } from '../../utils/Sound';


type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'tabs'>;
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  soundStartGame.setVolume(1);
  soundCardMovement.stop();
  return (
    <ImageBackground style={styles.container} source={ConstImageTwinGame.bgImage}>
      <Button
        title="Twins Cards"
        onPress={() => {
          soundStartGame.stop();
          soundStartGame.play();
          navigation.navigate('TwinsGame')}}
      />
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center"
    }
})