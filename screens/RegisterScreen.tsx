import {default as React, useState} from "react";
import {Text, View} from "../components/Themed";
import {TextInput, TouchableOpacity} from "react-native";
import {login, register} from "../api/apis";
import {styles} from "../constants/styles";
import {storeJwt} from "../storage/store";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";

export default function RegisterScreen({navigation}: StackScreenProps<RootStackParamList, 'Register'>) {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const registerUser = () => {

        register({username: username, password: password})
            .then(() => {
                login(username, password).then(jwt => {
                    storeJwt(jwt).then(() => {
                        navigation.push('Warehouse');
                    });
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
