import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListView from '../Screens/ListView/ListView';
import MapViewScreen from '../Screens/MapView/MapView';
import EventDetail from '../Screens/EventDetail/EventDetail';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="ListView" 
          component={ListView}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MapView" 
          component={MapViewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetail}
          options={{ 
            headerShown: false,
            presentation: 'modal',
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;