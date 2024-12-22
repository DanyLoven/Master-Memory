
import { Text, View,Image } from 'react-native';

import {  StyleSheet} from 'react-native';
import React from 'react';
import { ConstImageTwinGame, ConstStyleCardsTwinsGame } from '../utils/ConstantsTwinGame';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CoinsAndVictoriesTwinsGame({coins,victories}:{coins:number;victories:number}) {


return (
  <View style={styles.container}>
    

    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
    <View style={{alignItems:"center",justifyContent:"center"}}>
    <MaterialIcons name="stay-primary-landscape" size={60} color="#089404" />
    <Text style={{position:"absolute",fontWeight:"700",fontSize:16,color:"white"}}>12%</Text>
    </View>

    
    <View style={{alignItems:"center",justifyContent:"center",position:"absolute",marginHorizontal:"50%"}}>
    <Image
        source={ConstImageTwinGame.victory} 
        style={styles.image}
      />
    <Text style={{color:"white", fontSize:24,position:"absolute",fontFamily:ConstStyleCardsTwinsGame.victoryNumberFont}}>{victories}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
    <Image
        source={ConstImageTwinGame.iconTotalCoins}
        style={styles.coins}
      />
    <Text style={{color:"#ffc000", fontSize:26,fontWeight:"500",fontFamily:ConstStyleCardsTwinsGame.allCoinsFont}}>{coins}</Text>
    </View>
    </View>
    
    
  </View>
);
};

const styles = StyleSheet.create({
container: {
  marginVertical:5,
  paddingHorizontal:5

},

image: {
  width: 70,
  height: 70, 
  resizeMode: "contain",

},
coins: {
  width: 37,
  height: 37, 
  resizeMode: "contain",
  marginRight:2

},
});