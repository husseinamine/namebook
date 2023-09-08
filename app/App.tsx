import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';

import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from "expo-splash-screen";

import { useFonts,
  SourceSerifPro_200ExtraLight,
  SourceSerifPro_200ExtraLight_Italic,
  SourceSerifPro_300Light,
  SourceSerifPro_300Light_Italic,
  SourceSerifPro_400Regular,
  SourceSerifPro_400Regular_Italic,
  SourceSerifPro_600SemiBold,
  SourceSerifPro_600SemiBold_Italic,
  SourceSerifPro_700Bold,
  SourceSerifPro_700Bold_Italic,
  SourceSerifPro_900Black,
  SourceSerifPro_900Black_Italic,
} from '@expo-google-fonts/source-serif-pro';

import Home from './screens/home';
import Signup from './screens/signup';
import Login from './screens/login';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

async function getUserToken() {
    try {
        let userToken = await AsyncStorage.getItem("userToken");

        if (userToken != null) {
          return userToken
        }

        return "0"
    } catch (e) {
        console.log(e);
    }

}

export default function App() {
  let [userToken, setUserToken]: any = useState(null)
  let [drawer, setDrawer]: any = useState(false)

  useEffect(() => {
    getUserToken().then(uToken => {
      setUserToken(uToken)
      console.log(uToken)
    })
  }, [])

  let [fontsLoaded] = useFonts({
    SourceSerifPro_200ExtraLight,
    SourceSerifPro_200ExtraLight_Italic,
    SourceSerifPro_300Light,
    SourceSerifPro_300Light_Italic,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_600SemiBold_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_900Black,
    SourceSerifPro_900Black_Italic
  })

  if (!fontsLoaded || userToken == null) {
    SplashScreen.preventAutoHideAsync()

    return
  }

  SplashScreen.hideAsync()

  return (
    <>
    <NavigationContainer>
      <Drawer.Navigator 
        screenOptions={{
          headerShown:  drawer,
          swipeEnabled: drawer,
          headerTintColor: 'white',
                  
          headerTitleStyle: {
            color: "white",
            fontFamily: "SourceSerifPro_900Black",
            fontSize: 24
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#427bad"
          }
      }}

        drawerContent={(props) => {
          const filteredProps = {
            ...props,
            state: {
              ...props.state,
              routeNames: props.state.routeNames.filter(
                // To hide single option
                // (routeName) => routeName !== 'HiddenPage1',
                // To hide multiple options you can add & condition
                (routeName) => {
                  let currentRoute = props.state.routeNames[props.state.index]

                  if (routeName === currentRoute || !drawer) return true
                  return routeName !== 'Auth';
                }
              ),
              routes: props.state.routes.filter(
                (route) => {
                  let currentRoute = props.state.routeNames[props.state.index]

                  if (route.name === currentRoute || !drawer) return true
                  return route.name !== 'Auth';
                }
              ),
            },
          };
          return (
            <DrawerContentScrollView {...filteredProps}>
              <DrawerItemList {...filteredProps} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name='Home'>
          {({ navigation, route }) => <Home {...{navigation, route, userToken, setUserToken, drawer, setDrawer}} />}
        </Drawer.Screen>
        <Drawer.Screen name='Auth'>
          {(props) => {
            return (
              <Stack.Navigator {...props} screenOptions={{ 
                headerShown: !drawer,
                headerTintColor: 'white',
                        
                headerTitleStyle: {
                  color: "white",
                  fontFamily: "SourceSerifPro_900Black",
                  fontSize: 24
                },
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#427bad"
                }
              }}>
                <Stack.Screen name='Signup'>
                  {({ navigation, route }) => <Signup {...{navigation, route, userToken, setUserToken}} />}
                </Stack.Screen>
                <Stack.Screen name='Login'>
                  {({ navigation, route }) => <Login {...{navigation, route, userToken, setUserToken}} />}
                </Stack.Screen>
              </Stack.Navigator>
            )
          }}
        </Drawer.Screen>

      </Drawer.Navigator>

    </NavigationContainer>
    <FlashMessage position={"top"}/>
    </>
  );
}