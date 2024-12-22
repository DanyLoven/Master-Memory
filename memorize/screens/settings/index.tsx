import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ConstImageTwinGame } from '../../utils/ConstantsTwinGame'
import RewardScreen from '../reward_screen'
import CardBonusChallenge from '../../components/CardBonusChallenge'

const SettingScreen = () => {
  return (
    <ImageBackground style={styles.container} source={ConstImageTwinGame.bgImage}>
     
    </ImageBackground>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})