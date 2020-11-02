import {default as React, useState} from "react";
import {Text, View} from "../components/Themed";
import {TextInput, TouchableOpacity} from "react-native";

// @ts-ignore
export default function WarehouseScreen() {

    //todo add api call to products

    const [products, setProducts] = useState([]);

    return(
        <View>
            <Text>
                Under construction
            </Text>

        </View>
    )
}
