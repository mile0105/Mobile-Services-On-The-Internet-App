import {Product} from "../api/models";
import React from "react";
import {ListItem} from "react-native-elements";
import {Button} from "react-native";

export interface ProductItemProps {
    product: Product
}

export const ProductItem = (props: ProductItemProps) => {

    const {product} = props;

    const productName = `${product.manufacturerName} - ${product.modelName} : ${product.price} PLN`;
    const quantity = `In storage: ${product.quantity} items`;

    return (
        <>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{productName}</ListItem.Title>
                    <ListItem.Subtitle>{quantity}</ListItem.Subtitle>
                    <Button title={'Delete'} onPress={() => {}}/>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        </>)
};
