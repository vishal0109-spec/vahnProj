import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListView from '../Screens/ListView/ListView';
import MapView from '../Screens/MapView/MapView';
import EventDetail from '../Screens/EventDetail/EventDetail';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="ListView" component={ListView} />
        <Stack.Screen name="MapView" component={MapView} />
        <Stack.Screen name="EventDetail" component={EventDetail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;