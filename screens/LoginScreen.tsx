import {Text, View} from "../components/Themed";
import * as React from "react";

// import * as Expo from 'expo';
import * as Google from 'expo-google-app-auth';


import {ScrollView, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import {login, loginWithGoogle} from "../api/apis";
import {storeJwt} from "../storage/store";
import {styles} from "../constants/styles";
import {SocialIcon} from "react-native-elements";

export default function LoginScreen({navigation}: StackScreenProps<RootStackParamList, 'Login'>) {


    const androidClientId = '943009418326-obu9jtnmf8afkvknmk5mdkd5gsg1mneh.apps.googleusercontent.com';

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

    const signInWithGoogle = () => {

        Google.logInAsync({
            androidClientId: androidClientId,
            //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
            scopes: ["profile", "email"]
        }).then(result => {
            if (result.type === 'success') {
                const googleToken = result.idToken!!;

                loginWithGoogle(googleToken).then(data => {
                    storeJwt(data).then(() => {
                        navigation.push('Warehouse');
                    })
                }).catch(error => {
                    console.log(error);
                    alert('Could not log in with google');
                })

            } else {
                alert('Could not sign in to Google');
            }
        }).catch(err => {
            console.log(err);
            alert('Could not log in with google')
        });

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
                            title={'Login with Google'} onPress={signInWithGoogle}
                />

                <TouchableOpacity style={styles.registerBtn} onPress={goToRegister}>
                    <Text style={styles.registerText}>Create account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}
