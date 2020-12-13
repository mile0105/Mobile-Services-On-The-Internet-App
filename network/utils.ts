import NetInfo from '@react-native-community/netinfo';


export const isConnected = async (): Promise<boolean> => {
    const networkInfo = await NetInfo.fetch();
    const connected = networkInfo.isConnected;
    // return true;

    return connected
};
