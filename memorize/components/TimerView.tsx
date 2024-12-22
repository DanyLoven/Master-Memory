import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCards } from '../context/TwinsGameCardsContext';
import NumberOfMoves from './NumberOfMoves';
import { jokerShowCardsUse, setCardClickable, showAllCardJoker } from '../screens/twins_game/CardsDisplay';


export var setTime : Dispatch<SetStateAction<number>>
export var time:number

const TimeView = () => {
  const {isStart, setIsStart}=useCards();
  const {numberOfMoves, setNumberOfMoves}=useCards();
   [time, setTime] = useState(11);
  useEffect(() => {
    if(time>0 && !isStart){
      const timerId = setInterval(() => {
        setTime((prevTemps) => {
          if (prevTemps === 1) {
            clearInterval(timerId); 
          }
          return prevTemps - 1;
        });
      }, 1000);
  
      // Nettoyer le timer lorsque le composant est démonté ou lorsque le temps est écoulé
      return () => {
        clearInterval(timerId);
      };
    }
  }, []);

  useEffect(() => {
    console.log(`time:${time} ; isStart:${isStart} ; jokerShowCardsUse:${jokerShowCardsUse}`);
    console.log("time could pass");
   
    if(time>0 && !isStart && jokerShowCardsUse){
      const timerId = setInterval(() => {
        setCardClickable(false);
        setTime((prevTemps) => {
          if (prevTemps === 1) {
            setCardClickable(true);
            clearInterval(timerId); 
          }
          console.log("time pass");
          
          return prevTemps - 1;
        });
      }, 1000);
  
      // Nettoyer le timer lorsque le composant est démonté ou lorsque le temps est écoulé
      return () => {
        clearInterval(timerId);
      };
    }
  }, [isStart]);

  function formatUnitesTimer(unites: number): string {
    return unites < 10 ? `0${unites}` : `${unites}`;
  }

  return (
    <View style={styles.container}>
      {time>=11 && <View style={{marginVertical:16.5}}><NumberOfMoves itemCount={10} currentCount={numberOfMoves}/></View>}
      {time<11 && time>0 && <Text style={styles.timerText}>{formatUnitesTimer(time)}</Text>}
      {time<=0 && <View style={{marginVertical:16.5}}><NumberOfMoves itemCount={10} currentCount={numberOfMoves}/></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
 
});

export default TimeView;