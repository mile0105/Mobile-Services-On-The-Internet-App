import {JwtToken} from "../api/models";

const TOKEN_KEY = "access_token";

export const storeJwt = (token: JwtToken) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const getAccessToken = (): string | null => {
    const tokenString = localStorage.getItem(TOKEN_KEY);
    if(tokenString == null) {
        console.log('error');
        return null;
    }
    const token = JSON.parse(tokenString!!) as JwtToken;
    return token.accessToken;
};
