
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from '../screens/(tabs)';
import TwinsGame from '../screens/twins_game';
import RewardScreen from '../screens/reward_screen';
import LoseScreen from '../screens/lose_screen';
export type RootStackParamList = {
  tabs: undefined;
  TwinsGame: undefined;
  RewardScreen:undefined;
  LoseScreen:undefined;
};

export default function RootLayout() {
    
    const Stack = createNativeStackNavigator<RootStackParamList>();
  
    return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="tabs">
        <Stack.Screen name="tabs" component={BottomTabs} options={{ headerShown: false ,presentation:'containedModal'}}/>
        <Stack.Screen name="TwinsGame" component={TwinsGame} options={{ headerShown: false ,presentation:'modal'}}/>
        <Stack.Screen name="RewardScreen" component={RewardScreen} options={{ headerShown: false ,presentation:'modal'}}/>
        <Stack.Screen name="LoseScreen" component={LoseScreen} options={{ headerShown: false ,presentation:'modal'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    
    );
  }
