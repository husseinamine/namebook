import { TouchableWithoutFeedback, View, Text, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import FlashMessage, {showMessage, hideMessage} from 'react-native-flash-message';

import { useState } from "react";
import Form from '../components/Form';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({navigation, route, userToken, setUserToken}: any) {
    const [login, setLogin]: any = useState(false)
    const [username, setUsername]: any = useState("")
    const [password, setPassword]: any = useState("")

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                
                <Form.Input placeholder="Username" set={setUsername} />
                <Form.Input placeholder="Password" set={setPassword} />

                <Form.Button 
                    title="Log in" 
                    disabled={login}
                    onPress={() =>{
                        setLogin(true)
                        
                        console.log({ username, password })

                        axios.post("http://172.20.10.3:8080/auth/login", {
                            username,
                            password
                        }, { timeout: 10000 })
                            .then((res: any) => {
                                const token = res.data.message[1].token
                                AsyncStorage.setItem("userToken", token)

                                setUserToken(token)
                                navigation.jumpTo("Home")
                            })
                            .catch((err: any) => {
                                let errorMessage;
                                console.log(err.message)

                                if (err.response) {
                                    errorMessage = err.response.data.message
                                    
                                    if (!errorMessage) {
                                        errorMessage = "Unexpected error occured."
                                    } else {
                                        errorMessage = errorMessage[0]
                                    }
                                } else if (err.request) {
                                    errorMessage = "Server might be offline. Try again later."
                                }

                                console.log(errorMessage)

                                showMessage({
                                    duration: 2000,
                                    message: errorMessage,
                                    type: 'danger',
                                    icon: 'danger'
                                })
                            })
                            .finally(() => {
                                setTimeout(() => {
                                    setLogin(false)
                                }, 2000)
                            })
                    }}
                />
                <View style={{flexDirection: 'row', margin: 10}}>
                    <Text style={{marginRight: 2}}>Don't have an account?</Text> 
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{color: '#427bad'}}>Sign up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})

export default Login;