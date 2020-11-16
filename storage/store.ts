import {JwtToken} from "../api/models";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ACCESS_TOKEN_KEY = "access_token";

export const storeJwt = async (token: JwtToken): Promise<void> => {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
};

export const removeAccessToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getAccessToken = async (): Promise<string | null> => {
    const tokenString = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    if(tokenString == null) {
        console.log('error');
        return null;
    }
    const token = JSON.parse(tokenString!!) as JwtToken;
    return token.accessToken;
};
