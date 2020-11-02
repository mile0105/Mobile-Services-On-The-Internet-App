import {default as React, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {TextInput, TouchableOpacity} from "react-native";
import {getAllProducts} from "../api/apis";

// @ts-ignore
export default function WarehouseScreen() {

    useEffect(() => {
        getAllProducts().then(data => {
            console.log(data);
        })
    });

    const [products, setProducts] = useState([]);

    return(
        <View>
            <Text>
                Under construction
            </Text>

        </View>
    )
}
