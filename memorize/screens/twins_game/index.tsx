import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardsDisplay from './CardsDisplay'
import { ConstImageTwinGame } from '../../utils/ConstantsTwinGame'
import TimeView from '../../components/TimerView'
import ScreenHeader from '../../components/ScreenHeader'
import CoinsAndVictoriesTwinsGame from '../../components/CoinsAndVictoriesTwinsGame'
import { useCards } from '../../context/TwinsGameCardsContext'
import ShowCardsButtonJoker from '../../components/ShowCardsButtonJoker'
import CardBonusChallenge from '../../components/CardBonusChallenge'
import { numberOfCards } from '../../utils/CardsGeneratorTwinsGame'


const TwinsGame = () => {
  const {numberOfCoins, setNumberOfCoins }= useCards();
  const {numberOfVictories, setNumberOfVicories }= useCards();
  return (

      
      <ImageBackground style={styles.container}  source={ConstImageTwinGame.bgImage}>
      <ScreenHeader/>
       <CoinsAndVictoriesTwinsGame coins={numberOfCoins} victories={numberOfVictories}/>
       <View style={{marginTop:37,marginBottom:numberOfCards===12 ? 20:0}}><CardBonusChallenge/></View>
       <View style={{marginTop:10,justifyContent:"center",alignItems:"center"}}><TimeView/></View>
       <CardsDisplay/>
        <View style={styles.container2}>
      <View style={{marginTop:30,alignItems:"center",justifyContent:"center"}}><ShowCardsButtonJoker /></View>
        </View>
      
        
      
      
    </ImageBackground>
  )
}

export default TwinsGame

const styles = StyleSheet.create({
  container:{
    flex:1,
    
  },
  container2:{
    flex:1,
    justifyContent:"space-around",
    paddingBottom:10
   
  },
})