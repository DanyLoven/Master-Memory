import { ImageBackground, Pressable, Text, View } from 'react-native';
import { initCards } from '../../utils/CardsGeneratorTwinsGame';
import { StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ConstImageTwinGame, ConstStyleCardsTwinsGame } from '../../utils/ConstantsTwinGame';
import Icon, { } from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import { soundStartGame } from '../../utils/Sound';
import { useCards } from '../../context/TwinsGameCardsContext';
import { setTime } from '../../components/TimerView';



export default function LoseScreen() {
  const [pressed, setPressed] = useState(false);
  const {cards, setCards}=useCards();
    const {isStart, setIsStart}=useCards();
    const {numberOfdeleteCards, setNumberOfdeleteCards }= useCards();
    const {numberOfMoves, setNumberOfMoves }= useCards();
  const navigation = useNavigation();
  useEffect(()=>{
          soundStartGame.setVolume(1);
          setTime(11);
          setNumberOfdeleteCards(0);
          setIsStart(false);
          setCards(initCards);
  },[])
  
return (
    <ImageBackground style={{flex:1}} source={ConstImageTwinGame.bgImage}>
      <ScreenHeader/>
      <View style={styles.container}>
      <View style={{alignItems:"center"}}>
    <Text style={styles.lose}>Partie perdue!</Text>
    <Icon name="emoji-sad" size={74} color="#C1000F" />
    </View>
    
    <Text style={styles.encouragement}>Ne reste pas sur cet échec</Text>
    
    <View>
    
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
            <Icon name="ccw" size={30} color="white" />
            <Text style={styles.buttonText}>Réessayer</Text>
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
  flexDirection:"row",
  width:300,
  bottom:30,
  backgroundColor: 'orange',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  marginHorizontal:35,
  padding:10,
  borderBottomColor:"gray",
  borderBottomWidth:4,
  position:"absolute"
},
buttonText: {
  color: '#F7F6F0',
  fontWeight: 'bold',
  fontSize:20,
  
},
lose: {
    color: '#C1000F',
    fontSize:50,
    //fontFamily:"Roboto",
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:70
  },
encouragement: {
  color: '#F7F6F0',
  fontSize:60,
  fontFamily:ConstStyleCardsTwinsGame.encouragementFont,
  textAlign:"center"
  
},
});