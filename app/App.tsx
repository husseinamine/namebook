import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from "expo-splash-screen";

import Home from './screens/home';
import Signup from './screens/signup';
import Login from './screens/login';

import UserTokenStorage from './helpers/user_token_storage';
import useLoadFonts from './helpers/use_load_fonts';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

export default function App() {
  const [userToken, setUserToken]: any = useState(null)
  const [drawer, setDrawer]: any = useState(false)
  const [loading, setLoading]: any = useState(true)
  const [fontsLoaded] = useLoadFonts();

  let userTokenStorage = new UserTokenStorage(setUserToken);

  useEffect(() => { 
    userTokenStorage.get() 

    if (!fontsLoaded || userToken == null) {
      SplashScreen.preventAutoHideAsync()
      return
    }

    SplashScreen.hideAsync()
    setLoading(false)
  }, [userToken, fontsLoaded])

  return loading ? null : (
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