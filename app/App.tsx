import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerTintColor: 'white',
          
            headerTitleStyle: {
              color: "white",
              fontWeight: "bold"
            },
            
            headerStyle: {
              backgroundColor: "#427bad"
            }
        }}
      >
        <Stack.Screen 
          name='namebook'
          component={Home} 
        />
        <Stack.Screen 
          name='namebook2'
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = ({ navigation }: any) => {
  return (
    <View>
      <Button title='test' onPress={() => navigation.navigate("namebook2")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
