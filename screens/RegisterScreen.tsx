import {default as React, useState} from "react";
import {Text, View} from "../components/Themed";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {login, register} from "../api/apis";

export default function RegisterScreen() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const registerUser = () => {

        register({username: username, password: password})
            .then(() => {
                login(username, password).then(jwt => {
                    //todo add to local storage and to header
                    console.log(jwt);
                }).catch(err => {
                    console.log(err);
                })
            }
        ).catch(err => console.log(err));

    };


    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Username
            </Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter your username here..."
                    placeholderTextColor="#ffffff"
                    onChangeText={text => setUsername(text)}/>
            </View>
            <Text style={styles.textStyle}>
                Password
            </Text>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Enter your password here..."
                    placeholderTextColor="#ffffff"
                    onChangeText={text => setPassword(text)}/>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={registerUser}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        marginBottom: 10
    },
    inputText:{
        height:50,
        color:"white"
    },
    submitBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    submitText:{
        color:"white"
    }
});
