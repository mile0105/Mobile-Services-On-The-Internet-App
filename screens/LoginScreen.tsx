import {Text, View} from "../components/Themed";
import * as React from "react";
import { SocialIcon } from 'react-native-elements'
import {ScrollView, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {login} from "../api/apis";
import {storeJwt} from "../storage/store";
import {styles} from "../constants/styles";

export default function LoginScreen({navigation}: StackScreenProps<RootStackParamList, 'Login'>) {

    const goToRegister = () => {
        navigation.push('Register');
    };

    const loginWithPassword = () => {
        login(username, password).then(data => {
            storeJwt(data).then(() => {
                navigation.push('Warehouse');
            });
        }).catch(error => {
            if (error.error_description === 'Bad credentials') {
                alert('Invalid username/password');
            }
            console.log(error);
        })
    };

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Username
                </Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter your username here..."
                        placeholderTextColor="#FFFFFF"
                        onChangeText={text => setUsername(text)}/>
                </View>
                <Text style={styles.textStyle}>
                    Password
                </Text>
                <View style={styles.inputView}>
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
                <SocialIcon type={'google'} button={true} style={styles.googleLoginBtn}
                    title={'Login With Google'}
                />
                <TouchableOpacity style={styles.registerBtn} onPress={goToRegister}>
                    <Text style={styles.registerText}>Create account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}
