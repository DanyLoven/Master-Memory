import { ImageBackground, Pressable, Text, View } from 'react-native';
import { initCards } from '../../utils/CardsGeneratorTwinsGame';
import { StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ConstImageTwinGame, ConstStyleCardsTwinsGame } from '../../utils/ConstantsTwinGame';
import Icon,{  } from 'react-native-vector-icons/FontAwesome5';
import { useCards } from '../../context/TwinsGameCardsContext';
import ScreenHeader from '../../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { soundStartGame } from '../../utils/Sound';
import { setTime } from '../../components/TimerView';

export default function RewardScreen() {
  const {cards, setCards}=useCards();
    const {isStart, setIsStart}=useCards();
    const {numberOfdeleteCards, setNumberOfdeleteCards }= useCards();
  const {numberOfCoins, setNumberOfCoins }= useCards();
  const {numberOfVictories, setNumberOfVicories }= useCards();
  const {numberOfMoves, setNumberOfMoves }= useCards();
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();
    var coinsGetTwinsGame=numberOfMoves===10 ? 15 :Math.floor(numberOfMoves*10/10);
      useEffect(() => {
      
      soundStartGame.setVolume(1);
      setTime(11);
      setNumberOfdeleteCards(0);
      setIsStart(false);
      setCards(initCards);
        setNumberOfVicories(numberOfVictories+1)
      setNumberOfCoins(numberOfCoins+coinsGetTwinsGame)
      }, []); 
      
      
return (
    
  <ImageBackground style={{flex:1}}  source={ConstImageTwinGame.bgImage}>
    <ScreenHeader/>
    <View style={styles.container}>
    <View style={{alignItems:"center"}}><Text style={styles.congratulation}>Fantastique!</Text></View>
    <View style={{alignItems:"center"}}><Text style={styles.point}>+{coinsGetTwinsGame}</Text></View>
    <View >
    
    <Pressable onPress={() => {
      soundStartGame.stop();
      soundStartGame.play();
      setNumberOfMoves(10);
      navigation.reset({
            index: 0,
            routes: [{ name: 'TwinsGame'as never }],});
            setPressed(!pressed);}}
            style={({ pressed }) => [
              styles.button,
              { borderBottomWidth: pressed ? 0 : 4 },
            ]}>
            <Text style={styles.buttonText}>Suivant <Icon name="chevron-circle-right" size={24} color="white" /></Text>
        </Pressable> 
    </View>
    </View>
    
  </ImageBackground>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent:"space-between",
  padding:20,
  paddingTop:40
  
},
button: {
  backgroundColor: '#089404',
  padding: 10,
  width:300,
  bottom:40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  marginHorizontal:35,
  borderBottomColor:"gray",
  borderBottomWidth:4,
  position:"absolute"
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize:25,
  
},
congratulation: {
    color: 'gold',
    fontSize:60,
    fontFamily:ConstStyleCardsTwinsGame.congratulationFont,
  },
point: {
  color: 'yellow',
  fontSize:60,
  fontFamily:ConstStyleCardsTwinsGame.coinsGetFont
  
},
});