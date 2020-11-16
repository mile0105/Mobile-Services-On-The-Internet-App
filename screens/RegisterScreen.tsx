import {default as React, useState} from "react";
import {Text, View} from "../components/Themed";
import {TextInput, TouchableOpacity} from "react-native";
import {login, register} from "../api/apis";
import {styles} from "../constants/styles";
import {storeJwt} from "../storage/store";
import {AuthContext} from "../context/context";

export default function RegisterScreen() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    // @ts-ignore
    const {signIn} = React.useContext(AuthContext);

    const registerUser = () => {

        register({username: username, password: password})
            .then(() => {
                    login(username, password).then(jwt => {
                        storeJwt(jwt).then(() => {
                            signIn(jwt.accessToken)
                        });
                    }).catch(err => {
                        alert('Something went wrong');
                        console.log(err);
                    })
                }
            ).catch(err => {

            if (err.message === 'User already exists') {
                alert('User with that username already exists');
            }
            console.log(err)
        });

    };


    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Username
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter your username here..."
                    placeholderTextColor="#ffffff"
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
                    placeholderTextColor="#ffffff"
                    onChangeText={text => setPassword(text)}/>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={registerUser}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}
