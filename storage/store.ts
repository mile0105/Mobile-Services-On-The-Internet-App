import {JwtToken} from "../api/models";
import AsyncStorage from '@react-native-async-storage/async-storage';


const TOKEN_KEY = "access_token";

export const storeJwt = async (token: JwtToken): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const getAccessToken = async (): Promise<string | null> => {
    const tokenString = await AsyncStorage.getItem(TOKEN_KEY);
    if(tokenString == null) {
        console.log('error');
        return null;
    }
    const token = JSON.parse(tokenString!!) as JwtToken;
    return token.accessToken;
};
