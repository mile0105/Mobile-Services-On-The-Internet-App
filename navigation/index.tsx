import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WarehouseScreen from "../screens/WarehouseScreen";
import {useState} from "react";
import {AuthContext} from '../context/context';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {

    const [userToken, setUserToken] = useState<null | string>(null);

    const authContext = React.useMemo(() => ({
        signIn: (token: string) => {
            setUserToken(token);
        },
        signOut: () => {
            setUserToken(null)
        }
    }), []);


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer
                linking={LinkingConfiguration}
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <RootNavigator token={userToken}/>
            </NavigationContainer>
        </AuthContext.Provider>

    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
    token: string | null;
}

function RootNavigator({token}: RootNavigatorProps) {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            {token === null ? (
                <>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                </>
            ) : (
                <>
                    <Stack.Screen name="Warehouse" component={WarehouseScreen}/>
                </>
            )}
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}
