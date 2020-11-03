import {Product} from "../api/models";
import {Text} from "react-native";
import {View} from "./Themed";
import React from "react";

export interface ProductItemProps {
    product: Product
}

export const ProductItem = (props: ProductItemProps) => {

    const {product} = props;

    const productName = `${product.manufacturerName} - ${product.modelName} : ${product.price} $`;
    console.log(productName);

    return (
        <>
            <View>
                <Text>${productName}</Text>
            </View>

        </>)
};
