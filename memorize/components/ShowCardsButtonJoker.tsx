import { Pressable, View ,Image} from 'react-native';

import {  StyleSheet} from 'react-native';
import React, { useState } from 'react';
import { useCards } from '../context/TwinsGameCardsContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ConstImageTwinGame } from '../utils/ConstantsTwinGame';
import { jokerShowCardsUse, showAllCardJoker } from '../screens/twins_game/CardsDisplay';
import { time } from './TimerView';






export default function ShowCardsButtonJoker() {

  const {numberOfCoins, setNumberOfCoins }= useCards();
  const [pressed, setPressed] = useState(false);

  const showCards=()=>{
    if(numberOfCoins>=75 && time===0){
      !jokerShowCardsUse && showAllCardJoker(10,10000);
      setNumberOfCoins(numberOfCoins-75);
    }
  }

return (

    <Pressable style={styles.container} onPress={()=>{
      showCards();
      setPressed(!pressed)
    }}>
        {({ pressed }) => (
            <View style={[styles.button,{borderBottomWidth: pressed ? 0 : 5 }]}>
              <View style={{position:"absolute"}}>
              <Fontisto name="arrow-swap" size={45} color="white" />
              </View>
              
            
            <Image source={pressed && numberOfCoins<75 ? ConstImageTwinGame.coinShowCardJokerFalse : ConstImageTwinGame.coinShowCardJokerValue}
        style={styles.image}/>
          </View>
                )}
        </Pressable>
 
);
};

const styles = StyleSheet.create({
container: {
  alignItems: 'center',
  position:"absolute"
},

button: {
  flexDirection:"row",
  backgroundColor: '#089404',
  padding: 10,
  width:300,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderRadius: 18,
  borderBottomColor:"gray",
  borderBottomWidth:4,
  
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
},
image: {
  width: 24,
  height: 24, 
  resizeMode: 'cover',
  left:130,

},
});