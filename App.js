import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from './screens/Home';
import Detail from './screens/Detail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from './components/NavBar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
