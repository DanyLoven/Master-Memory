
import React from "react";
import { View,Text, Pressable, useColorScheme } from "react-native";
import { StyleSheet } from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function CategoriesBtnSelect({title}:{title :string}){
  //const gotoScreen=()=>router.replace('/twinGame')
return(
    <View style={styles.categoryBtStyle}>
    
        <Pressable >
        {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.categoryBtStyleText}>{title}</Text>
            
          </View>
            
            
                )}
        </Pressable>
     
    </View>
)

}

const styles = StyleSheet.create({
    categoryBtStyle: {
      flex: 1,
      flexDirection:"row",
      height: '20%',
      width: 300,
      backgroundColor: 'purple',
      marginVertical : 10,
      padding :20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius : 11
    },
    categoryBtStyleText: {
        fontSize : 20,
        fontWeight:"bold",
        color:"white"
      },
  });