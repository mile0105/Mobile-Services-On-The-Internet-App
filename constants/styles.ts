import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({

    scrollView: {
        flex: 1,
        backgroundColor: '#003f5c',
    },
    container: {
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        marginBottom: 10
    },
    inputText:{
        height:50,
        color:"white"
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    },
    googleLoginBtn: {
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    registerBtn: {
        width:"80%",
        backgroundColor:"#33FF51",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    registerText: {
        color: "#003f5c"
    },
    submitBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    submitText:{
        color:"white"
    }
});
