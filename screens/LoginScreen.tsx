import {Text, View} from "../components/Themed";
import * as React from "react";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {login} from "../api/apis";
import {storeJwt} from "../storage/store";

export default function LoginScreen({ navigation }: StackScreenProps<RootStackParamList, 'Login'>) {

    const goToRegister = () => {
        navigation.push('Register');
    };

    const loginWithPassword = () => {
        login(username, password).then(data => {
            storeJwt(data);
            navigation.push('Warehouse');
        }).catch(err => {
            console.log(err);
        })
    };

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Username
            </Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter your username here..."
                    placeholderTextColor="#FFFFFF"
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
                    placeholderTextColor="#FFFFFF"
                    onChangeText={text => setPassword(text)}/>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={loginWithPassword}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleLoginBtn}>
                <Text style={styles.loginText}>Login with google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn} onPress={goToRegister}>
                <Text style={styles.registerText}>Create account</Text>
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
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    },
    googleLoginBtn: {
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    registerBtn: {
        width:"80%",
        backgroundColor:"#33FF51",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    registerText: {
        color: "003f5c"
    }
});
