import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

function Home({navigation, route, userToken, setUserToken, drawer, setDrawer}: any) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(userToken)
        navigation.setOptions({
            title: "namebook"
        })

        if (userToken === "0") {
            setDrawer(false)
            navigation.jumpTo("Signup")
        } else {
            setLoading(false)
            setDrawer(true)
        }
    }, [userToken])

    if (!loading) {
        SplashScreen.hideAsync()

        return (
            <View>
                <Text>Hello</Text>
                <Button title="test" onPress={() => {
                    setUserToken("0")
                    AsyncStorage.setItem("userToken", "0")
                }}/>
            </View>
        )
    }

    SplashScreen.preventAutoHideAsync()
    return null
}

export default Home;