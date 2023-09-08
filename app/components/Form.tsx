import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { useEffect, useState } from 'react';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    formChild: {
        margin: 5,
    },
    formInput: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'lightgrey',
        elevation: 1,
        backgroundColor: 'white',
        fontSize: 16,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        elevation: 2,
        backgroundColor: '#427bad',
        margin: 5,
        fontSize: 16,
    },
    disabledButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        elevation: 2,
        backgroundColor: '#768899',
        margin: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    disabledText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#e3e3e3',
    },
});

function Input(props: any) {
    const [focused, setFocused]: any = useState(false)
    const focusedFormInputStyle = {
        ...styles.formInput,
        borderColor: '#95badb'
    }
    return (
        <View style={styles.formChild}>
            <TextInput 
                onChangeText={(t) => props.set ? props.set(t) : null}
                cursorColor={'#427bad'} 
                placeholder={props.placeholder}
                style={focused ? focusedFormInputStyle : styles.formInput} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onSubmitEditing={Keyboard.dismiss}
            />
        </View>
    )
}

function Button(props: any) {
    const { onPress, disabled = false, title = 'Save' } = props;

    return (
        <TouchableOpacity disabled={disabled} style={!disabled ? styles.button : styles.disabledButton} onPress={onPress} activeOpacity={0.6}>
            <Text style={!disabled ? styles.text : styles.disabledText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default { Input, Button }