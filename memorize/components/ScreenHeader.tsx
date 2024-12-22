import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon, {  } from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { ConstStyleCardsTwinsGame } from '../utils/ConstantsTwinGame';

const ScreenHeader = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={{marginHorizontal:5}} onPress={() => navigation.navigate('tabs'as never)}>
        {({ pressed }) => (
            <Icon
                    name="home"
                    size={36}
                    color={ConstStyleCardsTwinsGame.screenHeaderTextAndIconColor}
                    style={{opacity: pressed ? 0.5 : 1 }}
                  />
                )}
        </Pressable>
        <Text style={styles.textHeader}>TWINS CARDS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    alignItems:"baseline",
    justifyContent:"space-between",
    paddingVertical:5,
    backgroundColor:ConstStyleCardsTwinsGame.screenHeaderBackgroundColor,
  },
  textHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: ConstStyleCardsTwinsGame.screenHeaderTextAndIconColor,
    marginHorizontal:5
  },
 
});

export default ScreenHeader;