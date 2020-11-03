import {Text, View} from "../components/Themed";
import * as React from "react";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {login} from "../api/apis";
import {storeJwt} from "../storage/store";
import {styles} from "../constants/styles";

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
